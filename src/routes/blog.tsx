import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Filter & Fluent" },
      { name: "description", content: "Long reads, quick tips and coffee-shop reflections on English learning." },
      { property: "og:title", content: "Blog — Filter & Fluent" },
      { property: "og:description", content: "Long reads and quick tips on English learning." },
    ],
  }),
  component: () => (
    <PlaceholderPage
      title="Blog"
      tagline="Notes from the Café"
      description="Articles, essays and stories on language, culture and confident communication."
    />
  ),
});
