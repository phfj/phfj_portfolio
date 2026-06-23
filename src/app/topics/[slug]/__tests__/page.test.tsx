import { describe, it, expect, vi } from "vitest";
import { generateStaticParams } from "@/app/topics/[slug]/page";
import * as queries from "@/lib/sanity/queries";

vi.mock("@/lib/sanity/queries");

const mockGetTopics = vi.mocked(queries.getTopics);

describe("generateStaticParams", () => {
  it("returns a slug param for each topic", async () => {
    mockGetTopics.mockResolvedValue([
      { _id: "1", name: "TypeScript", slug: { current: "typescript" } },
      { _id: "2", name: "React", slug: { current: "react" } },
    ]);

    const params = await generateStaticParams();

    expect(params).toEqual([{ slug: "typescript" }, { slug: "react" }]);
  });

  it("returns a placeholder when no topics exist", async () => {
    mockGetTopics.mockResolvedValue([]);

    const params = await generateStaticParams();

    expect(params).toEqual([{ slug: "__placeholder__" }]);
  });
});
