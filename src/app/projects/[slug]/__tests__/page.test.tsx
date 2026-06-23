import { describe, it, expect, vi } from "vitest";
import { generateStaticParams } from "@/app/projects/[slug]/page";
import * as queries from "@/lib/sanity/queries";
import type { Project } from "@/lib/sanity/types";

vi.mock("@/lib/sanity/queries");

const mockGetProjects = vi.mocked(queries.getProjects);

describe("generateStaticParams - projects/[slug]", () => {
  it("returns a slug param for each project", async () => {
    mockGetProjects.mockResolvedValue([
      { _id: "1", title: "My App", slug: { current: "my-app" } } as Project,
      {
        _id: "2",
        title: "Portfolio",
        slug: { current: "portfolio" },
      } as Project,
    ]);

    const params = await generateStaticParams();

    expect(params).toEqual([{ slug: "my-app" }, { slug: "portfolio" }]);
  });

  it("returns a placeholder when no projects exist", async () => {
    mockGetProjects.mockResolvedValue([]);

    const params = await generateStaticParams();

    expect(params).toEqual([{ slug: "__placeholder__" }]);
  });
});
