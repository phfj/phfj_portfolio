import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Mock } from "vitest";
import { onRequest } from "../views/[slug]";

interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
}

interface MockKV {
  get: Mock<[string], Promise<string | null>>;
  put: Mock<[string, string], Promise<void>>;
}

function mockRequest(method: string): Request {
  return new Request(`https://example.com/api/views/test-post`, {
    method,
  });
}

describe("views slug endpoint", () => {
  let mockKv: MockKV;

  beforeEach(() => {
    vi.restoreAllMocks();
    mockKv = {
      get: vi.fn(),
      put: vi.fn(),
    };
  });

  it("rejects invalid post slugs", async () => {
    const invalidSlugs = ["invalid/slug", "in..valid", "a b", "", "../admin"];
    for (const slug of invalidSlugs) {
      const res = await onRequest({
        request: mockRequest("GET"),
        params: { slug },
        env: { VIEWS_KV: mockKv as unknown as KVNamespace },
      });
      expect(res.status).toBe(400);
      const data = (await res.json()) as { error: string };
      expect(data.error).toBe("Invalid post slug");
    }
  });

  it("returns 0 views if key is not found in KV (GET)", async () => {
    mockKv.get.mockResolvedValueOnce(null);

    const res = await onRequest({
      request: mockRequest("GET"),
      params: { slug: "my-first-post" },
      env: { VIEWS_KV: mockKv as unknown as KVNamespace },
    });

    expect(res.status).toBe(200);
    const data = (await res.json()) as { views: number };
    expect(data.views).toBe(0);
    expect(mockKv.get).toHaveBeenCalledWith("post:views:my-first-post");
  });

  it("returns views count from KV (GET)", async () => {
    mockKv.get.mockResolvedValueOnce("42");

    const res = await onRequest({
      request: mockRequest("GET"),
      params: { slug: "my-first-post" },
      env: { VIEWS_KV: mockKv as unknown as KVNamespace },
    });

    expect(res.status).toBe(200);
    const data = (await res.json()) as { views: number };
    expect(data.views).toBe(42);
  });

  it("increments non-existent view count to 1 (POST)", async () => {
    mockKv.get.mockResolvedValueOnce(null);
    mockKv.put.mockResolvedValueOnce(undefined);

    const res = await onRequest({
      request: mockRequest("POST"),
      params: { slug: "my-first-post" },
      env: { VIEWS_KV: mockKv as unknown as KVNamespace },
    });

    expect(res.status).toBe(200);
    const data = (await res.json()) as { views: number };
    expect(data.views).toBe(1);
    expect(mockKv.put).toHaveBeenCalledWith("post:views:my-first-post", "1");
  });

  it("increments existing view count by 1 (POST)", async () => {
    mockKv.get.mockResolvedValueOnce("10");
    mockKv.put.mockResolvedValueOnce(undefined);

    const res = await onRequest({
      request: mockRequest("POST"),
      params: { slug: "my-first-post" },
      env: { VIEWS_KV: mockKv as unknown as KVNamespace },
    });

    expect(res.status).toBe(200);
    const data = (await res.json()) as { views: number };
    expect(data.views).toBe(11);
    expect(mockKv.put).toHaveBeenCalledWith("post:views:my-first-post", "11");
  });

  it("falls back to local memory cache when VIEWS_KV is missing", async () => {
    // First, fetch view count (should be 0)
    const resGet = await onRequest({
      request: mockRequest("GET"),
      params: { slug: "local-post" },
      env: {},
    });
    expect(resGet.status).toBe(200);
    expect((await resGet.json()) as { views: number }).toEqual({ views: 0 });

    // Next, increment view count (should be 1)
    const resPost = await onRequest({
      request: mockRequest("POST"),
      params: { slug: "local-post" },
      env: {},
    });
    expect(resPost.status).toBe(200);
    expect((await resPost.json()) as { views: number }).toEqual({ views: 1 });

    // Fetch again (should be 1)
    const resGet2 = await onRequest({
      request: mockRequest("GET"),
      params: { slug: "local-post" },
      env: {},
    });
    expect(resGet2.status).toBe(200);
    expect((await resGet2.json()) as { views: number }).toEqual({ views: 1 });
  });

  it("rejects unsupported HTTP methods", async () => {
    const res = await onRequest({
      request: mockRequest("PUT"),
      params: { slug: "test-post" },
      env: {},
    });
    expect(res.status).toBe(405);
  });
});
