import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const Route = createFileRoute("/vocabulary")({
  head: () => ({
    meta: [
      { title: "Vocabulary — Filter & Fluent" },
      { name: "description", content: "Build a vocabulary that lives on your tongue, not just on flashcards." },
      { property: "og:title", content: "Vocabulary — Filter & Fluent" },
      { property: "og:description", content: "Vocabulary that lives on your tongue." },
    ],
  }),
  component: () => (
    <PlaceholderPage
      title="Vocabulary"
      tagline="Words with Warmth"
      description="Every word carries a story. We're brewing a vocabulary experience rooted in context, culture and everyday conversation."
    />
  ),
});
