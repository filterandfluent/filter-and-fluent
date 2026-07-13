import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Coffee,
  Download,
  FileText,
  Film,
  Filter,
  Headphones,
  Image as ImageIcon,
  Layers,
  ListChecks,
  Puzzle,
  Search,
  Sparkles,
  Type,
} from "lucide-react";
import kolam from "@/assets/kolam-mandala.png";
import coffeeBranch from "@/assets/coffee-branch.png";

export const Route = createFileRoute("/grammar")({
  head: () => ({
    meta: [
      { title: "Grammar — Filter & Fluent" },
      {
        name: "description",
        content:
          "Clear, searchable grammar lessons for students and teachers — verb tenses, sentence structure, prepositions, punctuation and more. Filter by level, format and topic.",
      },
      { property: "og:title", content: "Grammar — Filter & Fluent" },
      {
        property: "og:description",
        content: "Searchable grammar lessons filtered by level, format and topic.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/grammar" },
    ],
    links: [{ rel: "canonical", href: "/grammar" }],
  }),
  component: GrammarPage,
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
type Format = "Worksheet" | "Video" | "Audio" | "PPT" | "Infographic" | "Quiz";
type Audience = "Student" | "Teacher";

interface Lesson {
  slug: string;
  title: string;
  topic: string;
  level: Level;
  format: Format;
  audience: Audience;
  desc: string;
}

const quickStart = [
  { icon: BookOpen, title: "Verb Tenses", desc: "Past, present, future — used correctly and naturally." },
  { icon: ListChecks, title: "Common Mistakes", desc: "Fix the errors most learners make every day." },
  { icon: Layers, title: "Sentence Structure", desc: "Build clear, confident sentences from the ground up." },
  { icon: Type, title: "Prepositions", desc: "In, on, at — and every tricky one in between." },
  { icon: Puzzle, title: "Parts of Speech", desc: "Nouns, verbs, adjectives — the building blocks." },
  { icon: Sparkles, title: "Punctuation", desc: "Commas, semicolons and full stops made simple." },
];

const lessons: Lesson[] = [
  { slug: "present-perfect-tense", title: "Present Perfect Tense", topic: "Tenses", level: "Intermediate", format: "Video", audience: "Student", desc: "When to use 'have/has + past participle' — with real examples." },
  { slug: "simple-past-vs-present-perfect", title: "Simple Past vs Present Perfect", topic: "Tenses", level: "Intermediate", format: "Worksheet", audience: "Student", desc: "The single most confused pair — cleared up for good." },
  { slug: "articles-a-an-the", title: "Articles: a, an, the", topic: "Parts of Speech", level: "Beginner", format: "Infographic", audience: "Student", desc: "Simple rules for choosing the right article every time." },
  { slug: "subject-verb-agreement", title: "Subject–Verb Agreement", topic: "Sentence Structure", level: "Beginner", format: "Quiz", audience: "Student", desc: "Match subjects and verbs with confidence." },
  { slug: "prepositions-of-time", title: "Prepositions of Time", topic: "Prepositions", level: "Beginner", format: "Worksheet", audience: "Student", desc: "In the morning, on Monday, at 5pm — sorted." },
  { slug: "conditionals-zero-first-second", title: "Conditionals: 0, 1st & 2nd", topic: "Tenses", level: "Intermediate", format: "Video", audience: "Student", desc: "If it rains… if I were you… learn to switch smoothly." },
  { slug: "reported-speech", title: "Reported Speech", topic: "Sentence Structure", level: "Advanced", format: "PPT", audience: "Teacher", desc: "Turn direct quotes into fluent reported speech." },
  { slug: "modal-verbs", title: "Modal Verbs (can, should, must)", topic: "Parts of Speech", level: "Intermediate", format: "Audio", audience: "Student", desc: "Ability, advice, obligation — with tone examples." },
  { slug: "punctuation-commas", title: "Commas: The Complete Guide", topic: "Punctuation", level: "Intermediate", format: "Infographic", audience: "Student", desc: "Every comma rule you actually need in writing." },
  { slug: "active-vs-passive-voice", title: "Active vs Passive Voice", topic: "Sentence Structure", level: "Advanced", format: "Worksheet", audience: "Teacher", desc: "Choose the right voice for clarity and impact." },
  { slug: "phrasal-verbs-everyday", title: "Everyday Phrasal Verbs", topic: "Parts of Speech", level: "Intermediate", format: "Video", audience: "Student", desc: "Turn on, look after, run into — used the natural way." },
  { slug: "relative-clauses", title: "Relative Clauses (who, which, that)", topic: "Sentence Structure", level: "Advanced", format: "Quiz", audience: "Student", desc: "Add detail without breaking your sentence." },
];

const brewShelf = [
  { title: "Verb Tense Master Chart", format: "PDF", desc: "One-page reference of all 12 English tenses." },
  { title: "Common Mistakes Workbook", format: "PDF", desc: "40 exercises targeting the errors learners repeat." },
  { title: "Punctuation Cheat Sheet", format: "PDF", desc: "Every rule on a single printable page." },
  { title: "Prepositions Classroom PPT", format: "PPT", desc: "Ready-to-teach slides for busy teachers." },
];

const levels: (Level | "All")[] = ["All", "Beginner", "Intermediate", "Advanced"];
const formats: (Format | "All")[] = ["All", "Worksheet", "Video", "Audio", "PPT", "Infographic", "Quiz"];
const topics = ["All", "Tenses", "Parts of Speech", "Sentence Structure", "Prepositions", "Punctuation"];
const audiences: (Audience | "All")[] = ["All", "Student", "Teacher"];

const formatIcon: Record<Format, typeof FileText> = {
  Worksheet: FileText,
  Video: Film,
  Audio: Headphones,
  PPT: Layers,
  Infographic: ImageIcon,
  Quiz: ListChecks,
};

const levelStyles: Record<Level, string> = {
  Beginner: "bg-cream text-navy-deep",
  Intermediate: "bg-gold/25 text-gold border border-gold/40",
  Advanced: "bg-coffee/30 text-cream border border-coffee/50",
};

function GrammarPage() {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<(typeof levels)[number]>("All");
  const [format, setFormat] = useState<(typeof formats)[number]>("All");
  const [topic, setTopic] = useState<(typeof topics)[number]>("All");
  const [audience, setAudience] = useState<(typeof audiences)[number]>("All");
  const [visible, setVisible] = useState(8);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return lessons.filter((l) => {
      if (level !== "All" && l.level !== level) return false;
      if (format !== "All" && l.format !== format) return false;
      if (topic !== "All" && l.topic !== topic) return false;
      if (audience !== "All" && l.audience !== audience) return false;
      if (q && !(l.title.toLowerCase().includes(q) || l.desc.toLowerCase().includes(q) || l.topic.toLowerCase().includes(q))) return false;
      return true;
    });
  }, [query, level, format, topic, audience]);

  const shown = filtered.slice(0, visible);

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
              const isActive = l.label === "Grammar";
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
            Grammar
          </span>
          <h1 className="mt-6 font-serif text-5xl lg:text-7xl leading-[1.05] text-cream">
            Grammar
          </h1>
          <p className="mt-3 text-sm lg:text-base uppercase tracking-[0.25em] text-gold/85 font-serif italic">
            The Grammar Brew — where every rule is served fresh
          </p>
          <p className="mt-6 mx-auto max-w-2xl text-cream/80 text-lg leading-relaxed">
            Brew Knowledge. Speak with Confidence. Clear explanations, real examples, and gentle practice —
            for students, teachers and everyone in between.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="#quick-start" className="btn-gold rounded-full px-8 py-4 text-sm font-semibold inline-flex items-center gap-2">
              Start Your First Brew <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a
              href="#library"
              className="inline-flex items-center gap-2 rounded-full bg-cream text-navy-deep px-8 py-4 text-sm font-semibold hover:bg-gold transition-colors"
            >
              Browse All Lessons
            </a>
          </div>
        </div>
      </section>

      {/* ===== QUICK START ===== */}
      <section id="quick-start" className="bg-cream text-navy-deep py-20 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="text-center mb-12">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-coffee">Start Here</span>
            <h2 className="mt-3 font-serif text-4xl lg:text-5xl text-navy-deep">Popular Starting Points</h2>
            <p className="mt-3 text-navy-deep/70 max-w-xl mx-auto">
              The most common questions new learners ask — one click away.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
            {quickStart.map((t) => (
              <a
                key={t.title}
                href="#library"
                className="group rounded-2xl bg-white border border-beige p-6 shadow-[var(--shadow-card)] hover:-translate-y-1 hover:border-gold/60 transition-all"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-deep text-gold">
                  <t.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 font-serif text-xl text-navy-deep">{t.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-navy-deep/70">{t.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-coffee group-hover:text-navy-deep">
                  Explore <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LIBRARY ===== */}
      <section id="library" className="bg-navy-deep py-20 lg:py-24">
        <div className="mx-auto max-w-[1300px] px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">The Full Library</span>
              <h2 className="mt-3 font-serif text-4xl lg:text-5xl text-cream">All Grammar Lessons</h2>
              <p className="mt-2 text-cream/70 max-w-xl">
                Filter by level, format or topic. Search for anything.
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-cream/50" aria-hidden />
              <label htmlFor="grammar-search" className="sr-only">Search grammar lessons</label>
              <input
                id="grammar-search"
                type="search"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setVisible(8); }}
                placeholder="Search lessons — e.g. tenses, commas…"
                className="w-full rounded-full border border-cream/20 bg-navy/60 pl-11 pr-4 py-3 text-[15px] text-cream placeholder:text-cream/50 focus:outline-none focus:border-gold/70 focus:ring-2 focus:ring-gold/30"
              />
            </div>
          </div>

          {/* Filters (desktop) */}
          <div className="hidden lg:flex flex-wrap items-center gap-6 mb-8 rounded-2xl bg-navy/50 border border-cream/10 p-5">
            <FilterGroup label="Level" value={level} options={levels} onChange={(v) => { setLevel(v as Level | "All"); setVisible(8); }} />
            <FilterGroup label="Format" value={format} options={formats} onChange={(v) => { setFormat(v as Format | "All"); setVisible(8); }} />
            <FilterGroup label="Topic" value={topic} options={topics} onChange={(v) => { setTopic(v); setVisible(8); }} />
            <FilterGroup label="For" value={audience} options={audiences} onChange={(v) => { setAudience(v as Audience | "All"); setVisible(8); }} />
          </div>

          {/* Filters (mobile) */}
          <div className="lg:hidden mb-6">
            <button
              type="button"
              onClick={() => setShowFilters((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-5 py-2.5 text-sm font-semibold text-cream"
              aria-expanded={showFilters}
            >
              <Filter className="h-4 w-4" aria-hidden /> Filters
            </button>
            {showFilters && (
              <div className="mt-4 space-y-4 rounded-2xl bg-navy/60 border border-cream/10 p-5">
                <FilterGroup label="Level" value={level} options={levels} onChange={(v) => setLevel(v as Level | "All")} />
                <FilterGroup label="Format" value={format} options={formats} onChange={(v) => setFormat(v as Format | "All")} />
                <FilterGroup label="Topic" value={topic} options={topics} onChange={(v) => setTopic(v)} />
                <FilterGroup label="For" value={audience} options={audiences} onChange={(v) => setAudience(v as Audience | "All")} />
              </div>
            )}
          </div>

          {/* Card grid */}
          {shown.length === 0 ? (
            <p className="text-center text-cream/70 py-16">No lessons match those filters yet. Try widening your search.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {shown.map((l) => {
                const Icon = formatIcon[l.format];
                return (
                  <article
                    key={l.slug}
                    className="group flex flex-col rounded-2xl bg-navy/60 border border-cream/10 p-5 hover:border-gold/60 hover:-translate-y-1 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${levelStyles[l.level]}`}>
                        {l.level}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] text-cream/60">
                        <Icon className="h-3.5 w-3.5" aria-hidden /> {l.format}
                      </span>
                    </div>
                    <h3 className="mt-4 font-serif text-xl text-cream leading-snug">{l.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-cream/70 flex-1">{l.desc}</p>
                    <div className="mt-4 flex items-center justify-between text-[12px] text-cream/60">
                      <span>{l.topic}</span>
                      <span>{l.audience}</span>
                    </div>
                    <button
                      type="button"
                      className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-cream text-navy-deep px-5 py-2.5 text-sm font-semibold hover:bg-gold transition-colors"
                    >
                      Start <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </button>
                  </article>
                );
              })}
            </div>
          )}

          {visible < filtered.length && (
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={() => setVisible((v) => v + 8)}
                className="btn-gold rounded-full px-8 py-3.5 text-sm font-semibold"
              >
                Load more brews
              </button>
              <p className="mt-3 text-[12px] text-cream/50">
                Showing {shown.length} of {filtered.length} lessons
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ===== BREW SHELF (Resources) ===== */}
      <section className="bg-cream text-navy-deep py-20 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-coffee">Downloads</span>
              <h2 className="mt-3 font-serif text-4xl lg:text-5xl text-navy-deep">Resources &amp; Worksheets</h2>
              <p className="mt-2 text-navy-deep/70 font-serif italic text-sm">The Brew Shelf — grab, print, teach.</p>
            </div>
            <Link
              to="/resources"
              className="inline-flex items-center gap-2 rounded-full border-2 border-navy-deep px-6 py-2.5 text-sm font-semibold text-navy-deep hover:bg-navy-deep hover:text-cream transition-colors"
            >
              View All <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {brewShelf.map((r) => (
              <article key={r.title} className="rounded-2xl bg-white border border-beige p-6 shadow-[var(--shadow-card)] flex flex-col">
                <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-navy-deep text-gold px-2.5 py-0.5 text-[11px] font-semibold tracking-wide">
                  <FileText className="h-3 w-3" aria-hidden /> {r.format}
                </span>
                <h3 className="mt-4 font-serif text-lg text-navy-deep leading-snug">{r.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-navy-deep/70 flex-1">{r.desc}</p>
                <button
                  type="button"
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-navy-deep text-cream px-5 py-2.5 text-sm font-semibold hover:bg-coffee transition-colors"
                  aria-label={`Download ${r.title}`}
                >
                  <Download className="h-4 w-4" aria-hidden /> Download
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-navy-deep py-20 lg:py-24">
        <div className="mx-auto max-w-[900px] px-6 lg:px-10 text-center">
          <h2 className="font-serif text-4xl lg:text-5xl text-cream">Not sure where to start?</h2>
          <p className="mt-4 text-cream/75 text-lg">
            Tell us your level and your goal — we'll pour you a personalized starter path.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="#quick-start" className="btn-gold rounded-full px-8 py-4 text-sm font-semibold">
              Start Your First Brew
            </a>
            <Link to="/" hash="contact" className="inline-flex items-center gap-2 rounded-full border border-cream/40 px-8 py-4 text-sm font-semibold text-cream hover:bg-cream hover:text-navy-deep transition-colors">
              Ask a Question
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

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
              className={`rounded-full px-3 py-1 text-[12px] font-medium transition-colors ${
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
