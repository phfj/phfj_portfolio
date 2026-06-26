import { describe, it, expect } from "vitest";
import {
  formatTimelineDate,
  sortTimelineEvents,
  filterTimelineEvents,
  type TimelineEvent,
} from "@/lib/timeline";

describe("formatTimelineDate", () => {
  it("formats YYYY-MM correctly into MMM YYYY", () => {
    expect(formatTimelineDate("2023-01")).toBe("Jan 2023");
    expect(formatTimelineDate("2024-11")).toBe("Nov 2024");
  });

  it("returns Present for null, undefined, or empty string", () => {
    expect(formatTimelineDate(null)).toBe("Present");
    expect(formatTimelineDate(undefined)).toBe("Present");
    expect(formatTimelineDate("")).toBe("Present");
  });
});

describe("sortTimelineEvents", () => {
  it("sorts events chronologically descending (newest first)", () => {
    const events: TimelineEvent[] = [
      {
        _id: "1",
        type: "work",
        title: "Dev 1",
        organization: "Org 1",
        startDate: "2020-01",
        endDate: "2022-01",
        description: "",
        skills: [],
      },
      {
        _id: "2",
        type: "work",
        title: "Dev 2",
        organization: "Org 2",
        startDate: "2021-05",
        endDate: null,
        description: "",
        skills: [],
      },
      {
        _id: "3",
        type: "work",
        title: "Dev 3",
        organization: "Org 3",
        startDate: "2021-05",
        endDate: "2022-12",
        description: "",
        skills: [],
      },
    ];

    const sorted = sortTimelineEvents(events);
    expect(sorted.map((e) => e._id)).toEqual(["2", "3", "1"]);
  });
});

describe("filterTimelineEvents", () => {
  const events: TimelineEvent[] = [
    {
      _id: "1",
      type: "work",
      title: "Dev 1",
      organization: "Org 1",
      startDate: "2020-01",
      endDate: "2022-01",
      description: "",
      skills: [],
    },
    {
      _id: "2",
      type: "education",
      title: "Degree",
      organization: "Uni",
      startDate: "2018-09",
      endDate: "2022-06",
      description: "",
      skills: [],
    },
    {
      _id: "3",
      type: "project",
      title: "App",
      organization: "Personal",
      startDate: "2023-01",
      endDate: null,
      description: "",
      skills: [],
    },
  ];

  it("returns all events when filter is 'all'", () => {
    expect(filterTimelineEvents(events, "all")).toHaveLength(3);
  });

  it("filters by type 'work'", () => {
    const filtered = filterTimelineEvents(events, "work");
    expect(filtered).toHaveLength(1);
    expect(filtered[0]._id).toBe("1");
  });

  it("filters by type 'education'", () => {
    const filtered = filterTimelineEvents(events, "education");
    expect(filtered).toHaveLength(1);
    expect(filtered[0]._id).toBe("2");
  });
});
