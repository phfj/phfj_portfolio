import { describe, it, expect } from "vitest";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

describe("constants", () => {
  it("SITE_URL is defined", () => {
    expect(SITE_URL).toBeTruthy();
    expect(SITE_URL.startsWith("https://")).toBe(true);
  });

  it("SITE_NAME is defined", () => {
    expect(SITE_NAME).toBe("Paul Holmes");
  });

  it("SITE_DESCRIPTION is a non-empty string", () => {
    expect(SITE_DESCRIPTION).toBeTruthy();
    expect(SITE_DESCRIPTION.length).toBeGreaterThan(10);
  });
});
