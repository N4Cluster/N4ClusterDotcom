import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("@/lib/mail", () => ({
  sendMail: vi.fn(),
  notificationRecipient: () => "inbox@example.com",
  notificationSender: () => "site@example.com",
}));

import { sendMail } from "@/lib/mail";
import { POST } from "@/app/api/careers/route";

const sendMailMock = vi.mocked(sendMail);

let ipCounter = 0;
const nextIp = () => `10.3.0.${++ipCounter}`;

function req(body: unknown, ip = nextIp(), raw = false) {
  return new NextRequest("http://localhost/api/careers", {
    method: "POST",
    body: raw ? (body as string) : JSON.stringify(body),
    headers: { "x-forwarded-for": ip },
  });
}

const validBody = {
  name: "Sam Ortiz",
  phone: "(615) 555-0100",
  email: "sam@example.com",
  city: "Austin, TX",
};

beforeEach(() => {
  sendMailMock.mockReset();
  sendMailMock.mockResolvedValue(undefined as never);
});

describe("POST /api/careers", () => {
  it("emails a valid application with the applicant as reply-to", async () => {
    const res = await POST(req(validBody));
    expect(res.status).toBe(200);
    expect(sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "inbox@example.com",
        from: "site@example.com",
        replyTo: "sam@example.com",
        subject: "Growth Partner application from Sam Ortiz – Austin, TX",
      })
    );
  });

  it("returns 400 with the parser's error for an invalid application", async () => {
    const res = await POST(req({ name: "", phone: "x", email: "a@b.co", city: "Austin" }));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ ok: false, error: "Name is required." });
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("silently accepts a filled honeypot without sending", async () => {
    const res = await POST(req({ _hp_website: "spam" }));
    expect(res.status).toBe(200);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("returns 500 with a retry message when the mail send fails", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    sendMailMock.mockRejectedValueOnce(new Error("gmail down"));
    const res = await POST(req(validBody));
    expect(res.status).toBe(500);
    expect((await res.json()).error).toBe(
      "Failed to send your application. Please try again later."
    );
    expect(spy).toHaveBeenCalled();
    for (const call of spy.mock.calls) {
      for (const arg of call) expect(typeof arg).not.toBe("object");
    }
    spy.mockRestore();
  });

  it("rate limits after 5 requests from one IP", async () => {
    const ip = nextIp();
    for (let i = 0; i < 5; i++) {
      expect((await POST(req(validBody, ip))).status).toBe(200);
    }
    expect((await POST(req(validBody, ip))).status).toBe(429);
  });

  it("returns 400 for a body that isn't JSON", async () => {
    const res = await POST(req("not json", nextIp(), true));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ ok: false, error: "Invalid request body." });
  });
});
