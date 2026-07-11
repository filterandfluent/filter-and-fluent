import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Filter & Fluent" },
      { name: "description", content: "The story behind Filter & Fluent — English learning brewed with South Indian soul." },
      { property: "og:title", content: "About — Filter & Fluent" },
      { property: "og:description", content: "The story behind Filter & Fluent." },
    ],
  }),
  component: () => (
    <PlaceholderPage
      title="About"
      tagline="Our Story"
      description="Filter & Fluent was brewed to make English feel like your favourite coffee shop — warm, familiar, and full of confidence."
    />
  ),
});
