import { describe, it, expect, beforeEach, vi } from "vitest";

const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

const env = {
  CONTACT_WEBHOOK_URL: "https://hooks.example.com/test",
} as const;

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  async function post(body: unknown) {
    const { onRequestPost } = await import("../contact");
    return onRequestPost({
      request: new Request("https://example.com/api/contact", {
        method: "POST",
        body: JSON.stringify(body),
      }),
      env,
    });
  }

  it("rejects missing name", async () => {
    const res = await post({
      email: "a@b.com",
      message: "Hello there, this is a test message",
    });
    expect(res.status).toBe(400);
  });

  it("rejects invalid email", async () => {
    const res = await post({
      name: "Alice",
      email: "not-email",
      message: "Hello there, this is a test message",
    });
    expect(res.status).toBe(400);
  });

  it("rejects short message", async () => {
    const res = await post({ name: "Alice", email: "a@b.com", message: "Hi" });
    expect(res.status).toBe(400);
  });

  it("returns 200 for honeypot fill", async () => {
    const res = await post({
      name: "Bot",
      email: "b@c.com",
      message: "Hello there this is spam",
      _hp: "filled",
    });
    expect(res.status).toBe(200);
  });

  it("sends valid submission to webhook", async () => {
    mockFetch.mockResolvedValueOnce(new Response(null, { status: 200 }));
    const res = await post({
      name: "Alice",
      email: "a@b.com",
      message: "Hello there, this is a test message",
    });
    expect(res.status).toBe(200);
    expect(mockFetch).toHaveBeenCalled();
  });

  it("handles webhook failure", async () => {
    mockFetch.mockResolvedValueOnce(new Response(null, { status: 500 }));
    const res = await post({
      name: "Alice",
      email: "a@b.com",
      message: "Hello there, this is a test message",
    });
    expect(res.status).toBe(502);
  });

  it("rejects non-JSON body", async () => {
    const { onRequestPost } = await import("../contact");
    const res = await onRequestPost({
      request: new Request("https://example.com/api/contact", {
        method: "POST",
        body: "not json",
      }),
      env,
    });
    expect(res.status).toBe(400);
  });
});
