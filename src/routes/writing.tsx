import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const Route = createFileRoute("/writing")({
  head: () => ({
    meta: [
      { title: "Writing — Filter & Fluent" },
      { name: "description", content: "Write with clarity, character and confidence." },
      { property: "og:title", content: "Writing — Filter & Fluent" },
      { property: "og:description", content: "Write with clarity, character and confidence." },
    ],
  }),
  component: () => (
    <PlaceholderPage
      title="Writing"
      tagline="Words on Paper"
      description="Structured writing practice — essays, emails and everyday expression — brewed with warmth and clarity."
    />
  ),
});
