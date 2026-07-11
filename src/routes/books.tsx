import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const Route = createFileRoute("/books")({
  head: () => ({
    meta: [
      { title: "Books — Filter & Fluent" },
      { name: "description", content: "Books and reading lists brewed for every English learner." },
      { property: "og:title", content: "Books — Filter & Fluent" },
      { property: "og:description", content: "Books and reading lists for English learners." },
    ],
  }),
  component: () => (
    <PlaceholderPage
      title="Books"
      tagline="Pages to Savour"
      description="A curated collection of books, workbooks and reading lists — brewing here soon."
    />
  ),
});
