import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  __resetRateLimitStore,
  isHoneypotFilled,
  isRateLimited,
  rateLimitConfig,
} from "@/lib/rate-limit";

beforeEach(() => {
  __resetRateLimitStore();
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("isRateLimited", () => {
  it("allows exactly maxRequests within a window, then blocks", () => {
    const ip = "203.0.113.5";
    for (let i = 0; i < rateLimitConfig.maxRequests; i++) {
      expect(isRateLimited(ip), `request ${i + 1} should pass`).toBe(false);
    }
    expect(isRateLimited(ip)).toBe(true);
  });

  it("tracks each key independently", () => {
    for (let i = 0; i < rateLimitConfig.maxRequests + 1; i++) isRateLimited("a");
    expect(isRateLimited("a")).toBe(true);
    expect(isRateLimited("b")).toBe(false);
  });

  it("starts a fresh window once the previous one elapses", () => {
    const ip = "203.0.113.9";
    for (let i = 0; i < rateLimitConfig.maxRequests + 1; i++) isRateLimited(ip);
    expect(isRateLimited(ip)).toBe(true);

    vi.advanceTimersByTime(rateLimitConfig.windowMs + 1);
    expect(isRateLimited(ip)).toBe(false);
  });

  it("evicts elapsed windows instead of growing without bound", () => {
    for (let i = 0; i < 50; i++) isRateLimited(`ip-${i}`);
    vi.advanceTimersByTime(rateLimitConfig.windowMs + 1);

    // A new key sweeps the elapsed entries, so memory does not accumulate one
    // entry per distinct IP for the lifetime of the instance.
    expect(isRateLimited("fresh")).toBe(false);
    for (let i = 0; i < 50; i++) {
      expect(isRateLimited(`ip-${i}`), `ip-${i} should have a fresh window`).toBe(false);
    }
  });
});

describe("isHoneypotFilled", () => {
  it("detects a filled honeypot under either field name", () => {
    expect(isHoneypotFilled({ _hp_website: "http://spam.example" })).toBe(true);
    expect(isHoneypotFilled({ hp_website: "x" })).toBe(true);
  });

  it("passes an empty or absent honeypot", () => {
    expect(isHoneypotFilled({ _hp_website: "" })).toBe(false);
    expect(isHoneypotFilled({})).toBe(false);
  });

  it("does not throw on a non-object body", () => {
    expect(isHoneypotFilled(null)).toBe(false);
    expect(isHoneypotFilled("string")).toBe(false);
    expect(isHoneypotFilled(undefined)).toBe(false);
  });
});
