import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — Filter & Fluent" },
      { name: "description", content: "Worksheets, guides and printables to sip alongside your learning." },
      { property: "og:title", content: "Resources — Filter & Fluent" },
      { property: "og:description", content: "Worksheets, guides and printables." },
    ],
  }),
  component: () => (
    <PlaceholderPage
      title="Resources"
      tagline="Free to Sip"
      description="Downloadable worksheets, printable guides and quick references — brewing here shortly."
    />
  ),
});
