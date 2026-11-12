import { describe, it, expect } from "vitest";
import { restaurantFromParam } from "@/lib/prefill";

describe("restaurantFromParam", () => {
  it("returns empty for missing", () => expect(restaurantFromParam(undefined)).toBe(""));
  it("trims and collapses whitespace", () =>
    expect(restaurantFromParam("  Maple  Street ")).toBe("Maple Street"));
  it("takes the first of an array", () => expect(restaurantFromParam(["A", "B"])).toBe("A"));
  it("caps at 120 chars", () => expect(restaurantFromParam("x".repeat(5000)).length).toBe(120));
  it("does not alter markup (React escapes it)", () =>
    expect(restaurantFromParam("<script>alert(1)</script>")).toBe("<script>alert(1)</script>"));
});
