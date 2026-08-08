import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Coffee,
  Download,
  Eye,
  FileText,
  Headphones,
  Layers,
  Mic,
  MessageCircle,
  PenLine,
  Search,
  Sparkles,
  Type,
  Users,
} from "lucide-react";
import kolam from "@/assets/kolam-mandala.png";
import coffeeBranch from "@/assets/coffee-branch.png";
import cardResources from "@/assets/card-resources.jpg";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Learning Resources — Filter & Fluent" },
      {
        name: "description",
        content:
          "A premium library of English lessons, notes, worksheets and learning tools — searchable by category and difficulty, for students and teachers.",
      },
      { property: "og:title", content: "Learning Resources — Filter & Fluent" },
      {
        property: "og:description",
        content:
          "Practical English lessons, notes, worksheets and learning tools — brewed for confident speaking and writing.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources" }],
  }),
  component: ResourcesPage,
});

const navLinks: { label: string; to: string; hash?: string }[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Grammar", to: "/grammar" },
  { label: "Vocabulary", to: "/vocabulary" },
  { label: "Speaking", to: "/speaking" },
  { label: "Writing", to: "/writing" },
  { label: "Courses", to: "/courses" },
  { label: "Resources", to: "/resources" },
  { label: "Blog", to: "/blog" },
  { label: "Books", to: "/books" },
  { label: "Workshops", to: "/workshops" },
  { label: "Contact", to: "/", hash: "contact" },
];

type Level = "Beginner" | "Intermediate" | "Advanced";
type Category =
  | "Grammar"
  | "Vocabulary"
  | "Speaking"
  | "Writing"
  | "Reading"
  | "Listening"
  | "Pronunciation"
  | "Teacher Resources";

const categories: {
  name: Category;
  desc: string;
  icon: typeof BookOpen;
  to?: string;
}[] = [
  { name: "Grammar", desc: "Clear rules, gentle practice, real examples.", icon: BookOpen, to: "/grammar" },
  { name: "Vocabulary", desc: "Words worth keeping — with context and usage.", icon: Type, to: "/vocabulary" },
  { name: "Speaking", desc: "Prompts and drills for everyday confidence.", icon: MessageCircle, to: "/speaking" },
  { name: "Writing", desc: "Structure, tone and polish for any purpose.", icon: PenLine, to: "/writing" },
  { name: "Reading", desc: "Passages and strategies that build meaning.", icon: Layers },
  { name: "Listening", desc: "Train your ear with guided audio practice.", icon: Headphones },
  { name: "Pronunciation", desc: "Sounds, stress and rhythm made simple.", icon: Mic },
  { name: "Teacher Resources", desc: "Lesson kits, printables and answer keys.", icon: Users },
];

const filterCategories = [
  "All",
  "Grammar",
  "Vocabulary",
  "Speaking",
  "Writing",
  "Reading",
  "Listening",
  "Teacher Resources",
] as const;

const levels = ["All", "Beginner", "Intermediate", "Advanced"] as const;

interface Resource {
  title: string;
  desc: string;
  category: Category;
  level: Level;
  type: string;
}

const resources: Resource[] = [
  {
    title: "Tenses at a Glance",
    desc: "A one-page map of all twelve tenses with signal words and example sentences.",
    category: "Grammar",
    level: "Beginner",
    type: "PDF Notes",
  },
  {
    title: "Punctuation Practice Pack",
    desc: "Commas, semicolons and apostrophes — twenty graded exercises with an answer key.",
    category: "Grammar",
    level: "Intermediate",
    type: "Worksheet",
  },
  {
    title: "150 Everyday Power Words",
    desc: "High-frequency words grouped by theme, each with a natural example line.",
    category: "Vocabulary",
    level: "Beginner",
    type: "PDF Notes",
  },
  {
    title: "Academic Word Builder",
    desc: "Formal alternatives for common words, plus collocations for essays and reports.",
    category: "Vocabulary",
    level: "Advanced",
    type: "Worksheet",
  },
  {
    title: "Small Talk Starter Cards",
    desc: "Thirty printable prompts for warm-ups, pair work and daily speaking practice.",
    category: "Speaking",
    level: "Beginner",
    type: "Printable",
  },
  {
    title: "Interview Answer Frames",
    desc: "Sentence frames and model answers for confident, structured responses.",
    category: "Speaking",
    level: "Intermediate",
    type: "Guide",
  },
  {
    title: "Email Writing Toolkit",
    desc: "Openings, closings and tone shifts for polite, professional email in English.",
    category: "Writing",
    level: "Intermediate",
    type: "Guide",
  },
  {
    title: "Paragraph Builder Worksheet",
    desc: "Topic sentence, support, example, close — practise the shape of good writing.",
    category: "Writing",
    level: "Beginner",
    type: "Worksheet",
  },
  {
    title: "S.T.E.P Reading Framework",
    desc: "A four-step routine for reading any passage with better focus and recall.",
    category: "Reading",
    level: "Intermediate",
    type: "Guide",
  },
  {
    title: "Lesson Planning Kit",
    desc: "Editable plan templates, warm-up bank and reflection sheets for the classroom.",
    category: "Teacher Resources",
    level: "Advanced",
    type: "Template",
  },
  {
    title: "Classroom Assessment Sheets",
    desc: "Simple rubrics for speaking, writing and participation with progress trackers.",
    category: "Teacher Resources",
    level: "Intermediate",
    type: "Printable",
  },
];

const featured: Resource & { note: string } = {
  title: "The Confidence Starter Pack",
  desc: "Our most-loved bundle: a grammar refresher, a hundred everyday words, thirty speaking prompts and a daily practice tracker — everything you need for your first thirty days.",
  category: "Speaking",
  level: "Beginner",
  type: "Bundle · 42 pages",
  note: "Featured Brew",
};

const levelStyles: Record<Level, string> = {
  Beginner: "bg-gold/20 text-gold border border-gold/30",
  Intermediate: "bg-cream/15 text-cream border border-cream/25",
  Advanced: "bg-coffee/30 text-gold-soft border border-gold/25",
};

function ResourcesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof filterCategories)[number]>("All");
  const [level, setLevel] = useState<(typeof levels)[number]>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return resources.filter((r) => {
      if (category !== "All" && r.category !== category) return false;
      if (level !== "All" && r.level !== level) return false;
      if (
        q &&
        !`${r.title} ${r.desc} ${r.category} ${r.type}`.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [query, category, level]);

  return (
    <div className="min-h-screen bg-navy-deep text-cream">
      {/* ===== HERO + NAV ===== */}
      <section className="relative overflow-hidden">
        <img src={kolam} alt="" className="pointer-events-none absolute -top-32 -left-32 w-[520px] opacity-[0.06]" />
        <img src={coffeeBranch} alt="" className="pointer-events-none absolute -bottom-24 -right-24 w-[420px] opacity-[0.07]" />

        <nav className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10 pt-6 flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-navy/60">
              <Coffee className="h-5 w-5 text-gold" aria-hidden />
            </span>
            <span className="font-serif text-xl tracking-wide text-cream">Filter &amp; Fluent</span>
          </Link>

          <ul className="hidden xl:flex items-center gap-7 text-[13px] font-medium">
            {navLinks.map((l) => {
              const isActive = l.label === "Resources";
              return (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    hash={l.hash}
                    className={`relative transition-colors hover:text-gold ${isActive ? "text-gold" : "text-cream/85"}`}
                  >
                    {l.label}
                    {isActive && <span className="absolute -bottom-2 left-0 right-0 mx-auto h-[2px] w-6 bg-gold rounded-full" />}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link to="/" hash="contact" className="btn-gold rounded-full px-7 py-3 text-sm font-semibold whitespace-nowrap">
            Get Started
          </Link>
        </nav>

        <div className="relative z-10 mx-auto max-w-[1000px] px-6 lg:px-10 py-24 lg:py-32 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-navy/50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
            <Sparkles className="h-3.5 w-3.5" aria-hidden /> Free to Sip
          </span>
          <h1 className="mt-6 font-serif text-5xl lg:text-7xl leading-[1.05] text-cream">
            Learning Resources
          </h1>
          <span className="mt-8 mx-auto block h-px w-24 bg-gold/40" />
          <p className="mt-8 mx-auto max-w-2xl text-cream/80 text-lg leading-relaxed">
            Your collection of practical English lessons, notes, worksheets and learning tools — brewed
            to help you speak and write with confidence.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="#library" className="btn-gold rounded-full px-8 py-4 text-sm font-semibold inline-flex items-center gap-2">
              Browse the Library <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a
              href="#categories"
              className="btn-ghost-gold inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold"
            >
              Explore Categories
            </a>
          </div>
        </div>
      </section>

      {/* ===== CATEGORY GRID ===== */}
      <section id="categories" className="bg-cream text-navy-deep py-20 lg:py-24 scroll-mt-8">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="max-w-2xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-coffee">Browse by Skill</span>
            <h2 className="mt-3 font-serif text-4xl lg:text-5xl text-navy-deep">Resource Categories</h2>
            <p className="mt-3 text-navy-deep/70 leading-relaxed">
              Eight shelves, one library. Pick the skill you want to strengthen today.
            </p>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((c) => {
              const Icon = c.icon;
              const body = (
                <>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-deep/5 border border-beige">
                    <Icon className="h-5 w-5 text-coffee" strokeWidth={1.6} aria-hidden />
                  </span>
                  <h3 className="mt-5 font-serif text-xl text-navy-deep">{c.name}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-navy-deep/70 flex-1">{c.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-coffee group-hover:text-navy-deep transition-colors">
                    Explore <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </span>
                </>
              );
              const cls =
                "group flex flex-col rounded-2xl bg-white border border-beige p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60";
              return c.to ? (
                <Link key={c.name} to={c.to} className={cls}>
                  {body}
                </Link>
              ) : (
                <a key={c.name} href="#library" className={cls}>
                  {body}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FEATURED RESOURCE ===== */}
      <section className="bg-beige text-navy-deep py-20 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-coffee">{featured.note}</span>
          <h2 className="mt-3 font-serif text-4xl lg:text-5xl text-navy-deep">Featured Resource</h2>

          <article className="mt-10 overflow-hidden rounded-3xl bg-white border border-beige shadow-[var(--shadow-card)] grid lg:grid-cols-[1.05fr_1fr]">
            <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[380px]">
              <img
                src={cardResources}
                alt="Printed English worksheets beside a brass filter coffee tumbler"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <span className="absolute top-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-navy-deep/90 text-gold px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em]">
                <Sparkles className="h-3 w-3" aria-hidden /> {featured.note}
              </span>
            </div>

            <div className="p-8 lg:p-12 flex flex-col">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex rounded-full bg-navy-deep text-gold px-3 py-1 text-[11px] font-semibold tracking-wide">
                  {featured.category}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] text-navy-deep/60">
                  <FileText className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden /> {featured.type}
                </span>
              </div>

              <h3 className="mt-5 font-serif text-3xl lg:text-4xl leading-snug text-navy-deep">{featured.title}</h3>
              <p className="mt-4 text-[15.5px] leading-[1.8] text-navy-deep/75">{featured.desc}</p>

              <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-4 text-[13px]">
                <div>
                  <dt className="uppercase tracking-[0.18em] text-navy-deep/50 text-[10.5px]">Difficulty</dt>
                  <dd className="mt-1 font-semibold text-navy-deep">{featured.level}</dd>
                </div>
                <div>
                  <dt className="uppercase tracking-[0.18em] text-navy-deep/50 text-[10.5px]">Resource Type</dt>
                  <dd className="mt-1 font-semibold text-navy-deep">{featured.type}</dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-navy-deep text-cream px-7 py-3.5 text-sm font-semibold hover:bg-coffee transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
                >
                  <Eye className="h-4 w-4" strokeWidth={1.7} aria-hidden /> Preview
                </button>
                <button
                  type="button"
                  className="btn-gold inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"
                >
                  <Download className="h-4 w-4" strokeWidth={1.7} aria-hidden /> Download
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ===== LIBRARY: SEARCH + FILTERS + CARDS ===== */}
      <section id="library" className="bg-navy-deep py-20 lg:py-24 scroll-mt-8">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">The Full Shelf</span>
              <h2 className="mt-3 font-serif text-4xl lg:text-5xl text-cream">All Resources</h2>
              <p className="mt-2 text-cream/70 max-w-xl">
                Search or filter by skill and difficulty — every resource, one card design.
              </p>
            </div>

            <div className="relative w-full lg:w-96">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-cream/50" strokeWidth={1.7} aria-hidden />
              <label htmlFor="resource-search" className="sr-only">Search English resources</label>
              <input
                id="resource-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search English resources..."
                className="w-full rounded-full border border-cream/20 bg-navy/60 pl-11 pr-4 py-3 text-[15px] text-cream placeholder:text-cream/50 focus:outline-none focus:border-gold/70 focus:ring-2 focus:ring-gold/30"
              />
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-navy/50 border border-cream/10 p-5 flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:gap-8">
            <FilterGroup
              label="Category"
              value={category}
              options={filterCategories}
              onChange={(v) => setCategory(v as (typeof filterCategories)[number])}
            />
            <FilterGroup
              label="Difficulty"
              value={level}
              options={levels}
              onChange={(v) => setLevel(v as (typeof levels)[number])}
            />
          </div>

          {filtered.length === 0 ? (
            <div className="mt-12 rounded-3xl border border-dashed border-gold/30 bg-navy/40 px-8 py-16 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-navy/60">
                <Coffee className="h-6 w-6 text-gold" strokeWidth={1.6} aria-hidden />
              </span>
              <p className="mt-5 font-serif text-2xl text-cream">More resources brewing...</p>
              <p className="mt-2 mx-auto max-w-md text-[14.5px] leading-relaxed text-cream/70">
                Nothing on this shelf just yet. Widen your filters, or check back soon — fresh notes and
                worksheets are added every week.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                  setLevel("All");
                }}
                className="mt-7 inline-flex items-center gap-2 rounded-full border border-cream/35 px-7 py-3 text-sm font-semibold text-cream hover:bg-cream hover:text-navy-deep transition-colors"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <>
              <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filtered.map((r) => (
                  <ResourceCard key={r.title} resource={r} />
                ))}
              </div>
              <p className="mt-8 text-[12.5px] text-cream/50">
                Showing {filtered.length} of {resources.length} resources · more brewing every week
              </p>
            </>
          )}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-cream text-navy-deep py-20 lg:py-24">
        <div className="mx-auto max-w-[900px] px-6 lg:px-10 text-center">
          <h2 className="font-serif text-4xl lg:text-5xl text-navy-deep">Looking for something specific?</h2>
          <p className="mt-4 text-navy-deep/70 text-lg leading-relaxed">
            Tell us the skill you're working on and we'll brew a resource for it.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/" hash="contact" className="btn-gold rounded-full px-8 py-4 text-sm font-semibold">
              Request a Resource
            </Link>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 rounded-full border-2 border-navy-deep px-8 py-4 text-sm font-semibold text-navy-deep hover:bg-navy-deep hover:text-cream transition-colors"
            >
              Read the Coffee Journal <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- Reusable resource card ---------- */
function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-navy/60 border border-cream/10 transition-all hover:-translate-y-1 hover:border-gold/60">
      <div className="relative aspect-[16/10] overflow-hidden bg-navy">
        <img
          src={cardResources}
          alt=""
          aria-hidden
          className="h-full w-full object-cover opacity-70 transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 inline-flex rounded-full bg-navy-deep/85 text-gold px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.15em]">
          {resource.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-xl leading-snug text-cream">{resource.title}</h3>
        <p className="mt-2 text-[14px] leading-relaxed text-cream/70 flex-1">{resource.desc}</p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${levelStyles[resource.level]}`}>
            {resource.level}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] text-cream/60">
            <FileText className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden /> {resource.type}
          </span>
        </div>

        <button
          type="button"
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-cream text-navy-deep px-5 py-3 text-sm font-semibold hover:bg-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep"
          aria-label={`Download ${resource.title}`}
        >
          <Download className="h-4 w-4" strokeWidth={1.7} aria-hidden /> Download
        </button>
      </div>
    </article>
  );
}

/* ---------- Filter group ---------- */
function FilterGroup({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cream/60">{label}</span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              aria-pressed={active}
              className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 ${
                active
                  ? "bg-gold text-navy-deep"
                  : "bg-navy/60 text-cream/80 border border-cream/15 hover:border-gold/50"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
