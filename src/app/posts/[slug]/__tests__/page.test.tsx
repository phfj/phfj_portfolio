import { describe, it, expect, vi } from "vitest";
import { generateStaticParams } from "@/app/posts/[slug]/page";
import * as queries from "@/lib/sanity/queries";
import type { Post } from "@/lib/sanity/types";

vi.mock("@/lib/sanity/queries");

const mockGetPosts = vi.mocked(queries.getPosts);

describe("generateStaticParams - posts/[slug]", () => {
  it("returns a slug param for each post", async () => {
    mockGetPosts.mockResolvedValue([
      {
        _id: "1",
        title: "Hello World",
        slug: { current: "hello-world" },
      } as Post,
      {
        _id: "2",
        title: "TypeScript Tips",
        slug: { current: "typescript-tips" },
      } as Post,
    ]);

    const params = await generateStaticParams();

    expect(params).toEqual([
      { slug: "hello-world" },
      { slug: "typescript-tips" },
    ]);
  });

  it("returns a placeholder when no posts exist", async () => {
    mockGetPosts.mockResolvedValue([]);

    const params = await generateStaticParams();

    expect(params).toEqual([{ slug: "__placeholder__" }]);
  });
});
