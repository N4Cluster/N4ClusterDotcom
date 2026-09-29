import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * `lib/consent.ts` reads `window` lazily inside each function, so a minimal fake
 * window is enough to exercise the real module in a node environment — no jsdom.
 */
class FakeStorage {
  private data = new Map<string, string>();
  throwOnAccess = false;

  getItem(key: string): string | null {
    if (this.throwOnAccess) throw new Error("storage blocked");
    return this.data.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    if (this.throwOnAccess) throw new Error("storage blocked");
    this.data.set(key, value);
  }
}

let storage: FakeStorage;

function installFakeWindow() {
  storage = new FakeStorage();
  const target = new EventTarget();
  const fake = {
    localStorage: storage,
    addEventListener: target.addEventListener.bind(target),
    removeEventListener: target.removeEventListener.bind(target),
    dispatchEvent: target.dispatchEvent.bind(target),
  };
  vi.stubGlobal("window", fake);
}

beforeEach(() => {
  installFakeWindow();
  vi.resetModules();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

async function loadConsent() {
  return import("@/lib/consent");
}

describe("getConsent", () => {
  it("returns null before any choice is made", async () => {
    const { getConsent } = await loadConsent();
    expect(getConsent()).toBeNull();
  });

  it("reads back a granted choice", async () => {
    const { getConsent, setConsent } = await loadConsent();
    setConsent("granted");
    expect(getConsent()).toBe("granted");
  });

  it("reads back a denied choice", async () => {
    const { getConsent, setConsent } = await loadConsent();
    setConsent("denied");
    expect(getConsent()).toBe("denied");
  });

  it("honours the values the previous banner wrote", async () => {
    // Visitors who already chose must not be re-prompted or silently re-consented.
    storage.setItem("n4cluster-cookie-consent", "accepted");
    const { getConsent } = await loadConsent();
    expect(getConsent()).toBe("granted");
  });

  it("treats unreadable storage as no choice, never as consent", async () => {
    const { getConsent } = await loadConsent();
    storage.throwOnAccess = true;
    expect(getConsent()).toBeNull();
  });

  it("ignores an unrecognised stored value", async () => {
    storage.setItem("n4cluster-cookie-consent", "maybe");
    const { getConsent } = await loadConsent();
    expect(getConsent()).toBeNull();
  });
});

describe("onConsentChange", () => {
  it("notifies subscribers when consent is granted", async () => {
    const { onConsentChange, setConsent } = await loadConsent();
    const seen: (string | null)[] = [];
    const unsubscribe = onConsentChange((state) => seen.push(state));

    setConsent("granted");
    expect(seen).toEqual(["granted"]);

    unsubscribe();
    setConsent("denied");
    expect(seen).toEqual(["granted"]);
  });

  it("still notifies when storage is unavailable, so the choice applies to this page", async () => {
    const { onConsentChange, setConsent } = await loadConsent();
    storage.throwOnAccess = true;
    const listener = vi.fn();
    onConsentChange(listener);

    setConsent("granted");
    expect(listener).toHaveBeenCalledTimes(1);
  });
});
