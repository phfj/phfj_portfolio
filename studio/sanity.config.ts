import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { codeInput } from "@sanity/code-input";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "phfj-portfolio",
  title: "PHFJ Portfolio",
  projectId: "xj9m2761",
  dataset: "production",
  plugins: [structureTool(), codeInput()],
  schema: {
    types: schemaTypes,
  },
});
