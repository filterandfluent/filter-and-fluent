import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Courses — Filter & Fluent" },
      { name: "description", content: "Signature English courses brewed with heart and structure." },
      { property: "og:title", content: "Courses — Filter & Fluent" },
      { property: "og:description", content: "Signature English courses brewed with heart." },
    ],
  }),
  component: () => (
    <PlaceholderPage
      title="Courses"
      tagline="Learn with Heart"
      description="Foundational to advanced English programs designed for students, teachers and lifelong learners."
    />
  ),
});
