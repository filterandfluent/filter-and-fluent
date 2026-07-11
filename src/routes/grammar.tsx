import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const Route = createFileRoute("/grammar")({
  head: () => ({
    meta: [
      { title: "Grammar — Filter & Fluent" },
      { name: "description", content: "Clear, confidence-building grammar lessons brewed for real conversations." },
      { property: "og:title", content: "Grammar — Filter & Fluent" },
      { property: "og:description", content: "Grammar lessons brewed for real conversations." },
    ],
  }),
  component: () => (
    <PlaceholderPage
      title="Grammar"
      tagline="Rules that Flow"
      description="Grammar without the gatekeeping. Simple explanations, real examples, and gentle practice — brewing here soon."
    />
  ),
});
