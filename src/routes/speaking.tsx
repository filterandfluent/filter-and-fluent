import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const Route = createFileRoute("/speaking")({
  head: () => ({
    meta: [
      { title: "Speaking — Filter & Fluent" },
      { name: "description", content: "Find your voice in English — fluency built through warm, guided conversations." },
      { property: "og:title", content: "Speaking — Filter & Fluent" },
      { property: "og:description", content: "Find your voice in English." },
    ],
  }),
  component: () => (
    <PlaceholderPage
      title="Speaking"
      tagline="Every Voice Matters"
      description="From the first hello to your first speech — speaking lessons that build fluency, warmth and confidence."
    />
  ),
});
