import { defineField, defineType } from "sanity";

export const timelineEvent = defineType({
  name: "timelineEvent",
  title: "Timeline Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Work", value: "work" },
          { title: "Education", value: "education" },
          { title: "Project", value: "project" },
          { title: "Writing", value: "writing" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "organization",
      title: "Organization",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "startDate",
      title: "Start Date (YYYY-MM)",
      type: "string",
      description: "Format: YYYY-MM (e.g. 2024-03)",
      validation: (rule) =>
        rule.required().regex(/^\d{4}-\d{2}$/, { name: "YYYY-MM format" }),
    }),
    defineField({
      name: "endDate",
      title: "End Date (YYYY-MM)",
      type: "string",
      description: "Leave empty to show 'Present'. Format: YYYY-MM",
      validation: (rule) =>
        rule.regex(/^\d{4}-\d{2}$/, { name: "YYYY-MM format" }),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "skills",
      title: "Skills & Technologies",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            },
            {
              name: "url",
              title: "URL",
              type: "string",
              validation: (rule) => rule.required(),
            },
          ],
          preview: {
            select: { title: "label", subtitle: "url" },
          },
        },
      ],
    }),
    defineField({
      name: "projectRef",
      title: "Linked Project",
      type: "reference",
      to: [{ type: "project" }],
      description:
        "Optional — link to an existing Project document (for Timeline Events of kind Project).",
      hidden: ({ document }) => document?.type !== "project",
    }),
    defineField({
      name: "postRef",
      title: "Linked Post",
      type: "reference",
      to: [{ type: "post" }],
      description:
        "Optional — link to an existing Post document (for Timeline Events of kind Writing).",
      hidden: ({ document }) => document?.type !== "writing",
    }),
  ],
  orderings: [
    {
      title: "Start Date (Newest First)",
      name: "startDateDesc",
      by: [{ field: "startDate", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "organization",
      type: "type",
    },
    prepare({ title, subtitle, type }) {
      const icons: Record<string, string> = {
        work: "💼",
        education: "🎓",
        project: "🛠️",
        writing: "✍️",
      };
      return {
        title,
        subtitle: `${icons[type] ?? "•"} ${subtitle}`,
      };
    },
  },
});
