// TimelineEvent is the canonical type — sourced from Sanity.
export type { TimelineEvent } from "@/lib/sanity/types";
import type { TimelineEvent } from "@/lib/sanity/types";

export function formatTimelineDate(dateStr?: string | null): string {
  if (!dateStr) {
    return "Present";
  }

  const [year, month] = dateStr.split("-");
  if (!year || !month) {
    return "Present";
  }

  const date = new Date(parseInt(year, 10), parseInt(month, 10) - 1, 1);
  if (isNaN(date.getTime())) {
    return "Present";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function sortTimelineEvents(events: TimelineEvent[]): TimelineEvent[] {
  return [...events].sort((a, b) => {
    if (a.startDate !== b.startDate) {
      return b.startDate.localeCompare(a.startDate);
    }
    const endA = a.endDate || "9999-12";
    const endB = b.endDate || "9999-12";
    return endB.localeCompare(endA);
  });
}

export function filterTimelineEvents(
  events: TimelineEvent[],
  filter: string,
): TimelineEvent[] {
  if (filter === "all") {
    return events;
  }
  return events.filter((event) => event.type === filter);
}
