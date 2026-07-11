import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const Route = createFileRoute("/workshops")({
  head: () => ({
    meta: [
      { title: "Workshops — Filter & Fluent" },
      { name: "description", content: "Live workshops for speaking, writing and confident English." },
      { property: "og:title", content: "Workshops — Filter & Fluent" },
      { property: "og:description", content: "Live workshops for confident English." },
    ],
  }),
  component: () => (
    <PlaceholderPage
      title="Workshops"
      tagline="Gather &amp; Grow"
      description="Small-group live workshops on speaking, writing and communication — schedule opening soon."
    />
  ),
});
