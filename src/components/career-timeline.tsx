"use client";

import { useState } from "react";
import type { TimelineEvent } from "@/lib/sanity/types";
import {
  sortTimelineEvents,
  filterTimelineEvents,
  formatTimelineDate,
} from "@/lib/timeline";

export function CareerTimeline({
  initialEvents,
}: {
  initialEvents: TimelineEvent[];
}) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [expandedEvents, setExpandedEvents] = useState<Record<string, boolean>>(
    () => {
      // Expand the first (newest) event by default
      const sorted = sortTimelineEvents(initialEvents);
      if (sorted.length > 0) {
        return { [sorted[0]._id]: true };
      }
      return {};
    },
  );

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const toggleEvent = (id: string) => {
    setExpandedEvents((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const sortedEvents = sortTimelineEvents(initialEvents);
  const filteredEvents = filterTimelineEvents(sortedEvents, activeFilter);

  const filterOptions = [
    { value: "all", label: "All" },
    { value: "work", label: "Work" },
    { value: "education", label: "Education" },
    { value: "project", label: "Projects" },
    { value: "writing", label: "Writing" },
  ];

  return (
    <section className="mt-16">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="font-mono text-xs font-semibold tracking-wider text-[var(--accent)] uppercase">
            Timeline
          </span>
          <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            Experience & Milestones
          </h2>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => {
            const isActive = activeFilter === option.value;
            return (
              <button
                key={option.value}
                onClick={() => handleFilterChange(option.value)}
                className={`cursor-pointer rounded-lg border px-3.5 py-1.5 font-mono text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? "border-[var(--accent)] bg-[var(--accent-50)] text-[var(--foreground)] dark:bg-[var(--accent-100)]"
                    : "border-[var(--border)] text-[var(--muted)] hover:bg-[var(--muted-bg)] hover:text-[var(--foreground)]"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Timeline List */}
      <div className="relative mt-8 space-y-4 before:absolute before:top-2 before:bottom-0 before:left-4 before:w-px before:bg-[var(--border)] sm:before:left-6">
        {filteredEvents.length === 0 ? (
          <p className="py-8 text-center font-mono text-sm text-[var(--muted)]">
            No milestones found for this category.
          </p>
        ) : (
          filteredEvents.map((event) => {
            const isExpanded = !!expandedEvents[event._id];
            const startFormatted = formatTimelineDate(event.startDate);
            const endFormatted = formatTimelineDate(event.endDate);

            return (
              <div key={event._id} className="group relative pl-9 sm:pl-14">
                {/* Timeline connector dot */}
                <div
                  className={`absolute top-5 left-2.5 h-3 w-3 -translate-x-1/2 rounded-full border-2 bg-[var(--background)] transition-colors duration-200 sm:left-6 ${
                    isExpanded
                      ? "border-[var(--accent)] bg-[var(--accent)]"
                      : "border-[var(--border)] group-hover:border-[var(--accent)]"
                  }`}
                />

                {/* Card Container */}
                <div
                  onClick={() => toggleEvent(event._id)}
                  className="relative cursor-pointer overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--muted-bg)] p-5 transition-all duration-200 select-none hover:-translate-y-0.5"
                  style={{ boxShadow: "var(--shadow-card)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "var(--shadow-card-hover)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "var(--shadow-card)";
                  }}
                >
                  {/* Left accent border on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-[3px] bg-[var(--accent)] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  />

                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs">
                        <span className="font-semibold tracking-wider text-[var(--accent-blue)] uppercase">
                          {event.type}
                        </span>
                        <span className="text-[var(--border)]">•</span>
                        <span className="text-[var(--muted)]">
                          {startFormatted} – {endFormatted}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold tracking-tight transition-colors duration-150 group-hover:text-[var(--accent)] sm:text-lg">
                        {event.title}
                      </h3>
                      <p className="text-sm text-[var(--muted)]">
                        {event.organization}
                      </p>
                    </div>

                    {/* Collapse/Expand indicator */}
                    <button
                      className="mt-1 shrink-0 cursor-pointer rounded-md p-1 text-[var(--muted)] transition-colors hover:bg-[var(--background)]"
                      aria-label={
                        isExpanded ? "Collapse details" : "Expand details"
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`transform transition-transform duration-200 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                  </div>

                  {/* Expandable details container */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isExpanded
                        ? "mt-4 grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="space-y-4 border-t border-[var(--border)] pt-4">
                        <p className="text-sm leading-relaxed text-[var(--muted)]">
                          {event.description}
                        </p>

                        {/* Skills / Tech Stack */}
                        {event.skills.length > 0 && (
                          <div className="space-y-1.5">
                            <span className="block font-mono text-[10px] font-semibold tracking-wider text-[var(--muted)] uppercase">
                              Skills & Technologies
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {event.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="rounded-md border border-[var(--border)] bg-[var(--background)] px-2 py-0.5 font-mono text-xs text-[var(--muted)]"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Links */}
                        {event.links && event.links.length > 0 && (
                          <div className="flex flex-wrap gap-3 pt-1">
                            {event.links.map((link) => (
                              <a
                                key={link.label}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--accent-blue)] transition-colors hover:text-[var(--accent)]"
                              >
                                {link.label}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M15 3h6v6" />
                                  <path d="M10 14 21 3" />
                                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                </svg>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
