import { describe, expect, it } from "vitest";
import { buildRawMessage, encodeHeaderWord } from "@/lib/mail";

/** Reverse the base64url encoding the Gmail API expects, to inspect the message. */
function decode(raw: string): string {
  const padded = raw.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(padded, "base64").toString("utf8");
}

const base = {
  to: "contact@n4cluster.com",
  from: "N4Cluster Website <contact@n4cluster.com>",
  subject: "New enquiry",
  body: "Name: Dana Reyes",
};

describe("encodeHeaderWord", () => {
  it("produces an RFC 2047 encoded word", () => {
    expect(encodeHeaderWord("Hello")).toBe("=?UTF-8?B?SGVsbG8=?=");
  });

  it("survives non-ASCII", () => {
    const encoded = encodeHeaderWord("Café Ñoño");
    expect(encoded.startsWith("=?UTF-8?B?")).toBe(true);
    const payload = encoded.slice("=?UTF-8?B?".length, -"?=".length);
    expect(Buffer.from(payload, "base64").toString("utf8")).toBe("Café Ñoño");
  });
});

describe("buildRawMessage", () => {
  it("round-trips headers and body", () => {
    const message = decode(buildRawMessage(base));
    expect(message).toContain("To: contact@n4cluster.com");
    expect(message).toContain("Content-Type: text/plain; charset=utf-8");
    expect(message).toContain("Name: Dana Reyes");
  });

  it("separates headers from body with exactly one blank line", () => {
    const message = decode(buildRawMessage(base));
    const [headers, body] = message.split("\r\n\r\n");
    expect(headers).toContain("From:");
    expect(body).toBe("Name: Dana Reyes");
  });

  it("encodes the subject so user text cannot break the header", () => {
    const message = decode(
      buildRawMessage({ ...base, subject: "hi\r\nBcc: victim@example.com" })
    );
    expect(message).not.toContain("Bcc:");
    expect(message).toContain("Subject: =?UTF-8?B?");
  });

  it("refuses to build a message with an injected Reply-To", () => {
    expect(() =>
      buildRawMessage({
        ...base,
        replyTo: "dana@tacoshop.com\r\nBcc: victim@example.com",
      })
    ).toThrow(/unsafe value/i);
  });

  it("refuses to build a message with an injected To or From", () => {
    expect(() =>
      buildRawMessage({ ...base, to: "a@b.com\r\nBcc: victim@example.com" })
    ).toThrow(/unsafe value/i);
    expect(() =>
      buildRawMessage({ ...base, from: "a@b.com\nBcc: victim@example.com" })
    ).toThrow(/unsafe value/i);
  });

  it("omits Reply-To entirely when none is given", () => {
    const message = decode(buildRawMessage(base));
    expect(message).not.toContain("Reply-To:");
  });

  it("includes Reply-To when it is a clean address", () => {
    const message = decode(buildRawMessage({ ...base, replyTo: "dana@tacoshop.com" }));
    expect(message).toContain("Reply-To: dana@tacoshop.com");
  });

  it("emits base64url with no padding, as the Gmail API requires", () => {
    const raw = buildRawMessage(base);
    expect(raw).not.toMatch(/[+/=]/);
  });

  it("keeps a multi-line body intact without letting it forge a header", () => {
    const message = decode(
      buildRawMessage({ ...base, body: "Message:\nBcc: victim@example.com" })
    );
    const [headers] = message.split("\r\n\r\n");
    // The text appears in the body, but not among the headers.
    expect(headers).not.toContain("Bcc:");
    expect(message).toContain("Bcc: victim@example.com");
  });
});
