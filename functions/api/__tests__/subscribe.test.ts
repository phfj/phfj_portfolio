import { describe, it, expect, vi, beforeEach } from "vitest";
import { onRequestPost } from "../subscribe";

const env = {
  BUTTONDOWN_API_KEY: "test-key",
} as unknown as { BUTTONDOWN_API_KEY: string };

function mockRequest(body: unknown): Request {
  return new Request("https://example.com/api/subscribe", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

describe("subscribe endpoint", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("rejects non-JSON bodies", async () => {
    const req = new Request("https://example.com/api/subscribe", {
      method: "POST",
      body: "not json",
    });
    const res = await onRequestPost({ request: req, env });
    expect(res.status).toBe(400);
    const data = (await res.json()) as { error: string };
    expect(data.error).toBe("Invalid request body");
  });

  it("rejects missing email", async () => {
    const res = await onRequestPost({ request: mockRequest({}), env });
    expect(res.status).toBe(400);
    const data = (await res.json()) as { error: string };
    expect(data.error).toBe("Valid email is required");
  });

  it("rejects invalid email format", async () => {
    const res = await onRequestPost({
      request: mockRequest({ email: "not-an-email" }),
      env,
    });
    expect(res.status).toBe(400);
    const data = (await res.json()) as { error: string };
    expect(data.error).toBe("Valid email is required");
  });

  it("forwards valid email to Buttondown and returns success", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify({}), { status: 201 }),
    );

    const res = await onRequestPost({
      request: mockRequest({ email: "test@example.com" }),
      env,
    });
    expect(res.status).toBe(200);
    const data = (await res.json()) as { message: string };
    expect(data.message).toContain("inbox");
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "https://api.buttondown.com/v1/subscribers",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ email_address: "test@example.com" }),
      }),
    );
  });

  it("returns friendly message for already-subscribed", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify({ code: "email_already_exists" }), {
        status: 400,
      }),
    );

    const res = await onRequestPost({
      request: mockRequest({ email: "existing@example.com" }),
      env,
    });
    expect(res.status).toBe(200);
    const data = (await res.json()) as { message: string };
    expect(data.message).toContain("already");
  });

  it("treats duplicate-confirmation responses as already subscribed", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          detail: "Please confirm your subscription before subscribing again.",
        }),
        { status: 400 },
      ),
    );

    const res = await onRequestPost({
      request: mockRequest({ email: "pending@example.com" }),
      env,
    });
    expect(res.status).toBe(200);
    const data = (await res.json()) as { message: string };
    expect(data.message).toContain("Check your inbox");
  });

  it("forwards actionable upstream validation errors", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          detail: "This email address has been blocked.",
        }),
        { status: 400 },
      ),
    );

    const res = await onRequestPost({
      request: mockRequest({ email: "blocked@example.com" }),
      env,
    });
    expect(res.status).toBe(400);
    const data = (await res.json()) as { error: string };
    expect(data.error).toBe("This email address has been blocked.");
  });

  it("reads structured detail arrays from Buttondown", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          detail: [
            {
              code: "field_renamed",
              detail: "Use `email_address` instead of `email`.",
            },
          ],
        }),
        { status: 422 },
      ),
    );

    const res = await onRequestPost({
      request: mockRequest({ email: "test@example.com" }),
      env,
    });
    expect(res.status).toBe(422);
    const data = (await res.json()) as { error: string };
    expect(data.error).toContain("email_address");
  });

  it("returns 502 when Buttondown has a server error", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify({}), { status: 500 }),
    );

    const res = await onRequestPost({
      request: mockRequest({ email: "test@example.com" }),
      env,
    });
    expect(res.status).toBe(502);
  });

  it("returns 500 when BUTTONDOWN_API_KEY is missing", async () => {
    const res = await onRequestPost({
      request: mockRequest({ email: "test@example.com" }),
      env: {} as unknown as { BUTTONDOWN_API_KEY: string },
    });
    expect(res.status).toBe(500);
    const data = (await res.json()) as { error: string };
    expect(data.error).toContain("BUTTONDOWN_API_KEY is missing");
  });

  it("returns 502 when fetch throws a network error", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(
      new Error("DNS lookup failed"),
    );

    const res = await onRequestPost({
      request: mockRequest({ email: "test@example.com" }),
      env,
    });
    expect(res.status).toBe(502);
    const data = (await res.json()) as { error: string };
    expect(data.error).toContain("Failed to connect to subscription service");
  });
});
