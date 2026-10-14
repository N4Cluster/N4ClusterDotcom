import { describe, expect, it, vi } from "vitest";
import {
  DEMO_TRACKING_CODE,
  isValidTrackingCode,
  parseTrackingSummary,
  resolveTrackingCode,
} from "@/lib/tracking";

const env = { TRACKING_RESOLVER_URL: "https://orders.example/tracking/", TRACKING_RESOLVER_API_KEY: "k" };

const delivery = {
  orderNo: "2201",
  merchantName: "Pasta and Pita Grill",
  status: "OUT_FOR_DELIVERY",
  fulfillmentMode: "DELIVERY",
  courierTrackingUrl: "https://courier.example/track/abc",
  orderUrl: "https://pastaandpita.com/en/track/ord_1",
};

function respond(status: number, body?: unknown) {
  return vi.fn<typeof fetch>().mockResolvedValue(
    new Response(body === undefined ? null : JSON.stringify(body), { status })
  );
}

describe("isValidTrackingCode", () => {
  it("accepts the registered sample and other base62 codes of 6+ characters", () => {
    expect(isValidTrackingCode("8KX42Q")).toBe(true);
    expect(isValidTrackingCode("aZ09bY7x")).toBe(true);
  });

  it("rejects short, overlong, or non-alphanumeric codes", () => {
    for (const code of ["", "8KX42", "8KX42Q-", "../etc", "8KX 42Q", "A".repeat(17)]) {
      expect(isValidTrackingCode(code), code).toBe(false);
    }
  });
});

describe("resolveTrackingCode", () => {
  it("always resolves the registration sample, without calling the platform", async () => {
    const fetchImpl = respond(500);
    const result = await resolveTrackingCode(DEMO_TRACKING_CODE, { env: {}, fetchImpl });
    expect(DEMO_TRACKING_CODE).toBe("8KX42Q");
    expect(result.kind).toBe("found");
    if (result.kind === "found") expect(result.summary.demo).toBe(true);
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("treats an invalid code as not found without calling the platform", async () => {
    const fetchImpl = respond(200, delivery);
    expect(await resolveTrackingCode("../x", { env, fetchImpl })).toEqual({ kind: "not_found" });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("treats every real code as not found when no resolver is configured", async () => {
    expect(await resolveTrackingCode("AB12CD", { env: {}, fetchImpl: respond(200, delivery) })).toEqual({
      kind: "not_found",
    });
  });

  it("asks the platform with the bearer key and returns the summary", async () => {
    const fetchImpl = respond(200, delivery);
    const result = await resolveTrackingCode("AB12CD", { env, fetchImpl });
    expect(fetchImpl).toHaveBeenCalledWith(
      "https://orders.example/tracking/AB12CD",
      expect.objectContaining({ headers: { Authorization: "Bearer k" }, cache: "no-store" })
    );
    expect(result).toEqual({
      kind: "found",
      summary: {
        orderNo: "2201",
        merchantName: "Pasta and Pita Grill",
        status: "OUT_FOR_DELIVERY",
        fulfillmentMode: "DELIVERY",
        courierTrackingUrl: "https://courier.example/track/abc",
        orderUrl: "https://pastaandpita.com/en/track/ord_1",
      },
    });
  });

  it("maps unknown (404) and expired (410) codes to not found", async () => {
    for (const status of [404, 410]) {
      expect(await resolveTrackingCode("AB12CD", { env, fetchImpl: respond(status) })).toEqual({
        kind: "not_found",
      });
    }
  });

  it("reports an outage as unavailable rather than claiming the link expired", async () => {
    expect((await resolveTrackingCode("AB12CD", { env, fetchImpl: respond(503) })).kind).toBe("unavailable");
    const failing = vi.fn<typeof fetch>().mockRejectedValue(new TypeError("network"));
    expect((await resolveTrackingCode("AB12CD", { env, fetchImpl: failing })).kind).toBe("unavailable");
    expect((await resolveTrackingCode("AB12CD", { env, fetchImpl: respond(200, { nope: 1 }) })).kind).toBe(
      "unavailable"
    );
  });
});

describe("parseTrackingSummary", () => {
  it("drops links that are not https", () => {
    const summary = parseTrackingSummary({
      ...delivery,
      courierTrackingUrl: "javascript:alert(1)",
      orderUrl: "http://pastaandpita.com/x",
    });
    expect(summary?.courierTrackingUrl).toBeUndefined();
    expect(summary?.orderUrl).toBeUndefined();
  });

  it("shows no courier link on a pickup order", () => {
    const summary = parseTrackingSummary({ ...delivery, fulfillmentMode: "PICKUP", status: "READY" });
    expect(summary?.courierTrackingUrl).toBeUndefined();
  });

  it("rejects payloads with an unknown status or missing fields", () => {
    expect(parseTrackingSummary({ ...delivery, status: "LOST" })).toBeNull();
    expect(parseTrackingSummary({ ...delivery, merchantName: " " })).toBeNull();
    expect(parseTrackingSummary(null)).toBeNull();
  });
});
