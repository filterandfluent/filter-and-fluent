import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Bookmark,
  Clock,
  Coffee,
  Mail,
  Search,
  Sparkles,
  User,
} from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Coffee Journal — Filter & Fluent" },
      {
        name: "description",
        content:
          "Stories, strategies, and small sips of English wisdom — grammar tips, vocabulary, IELTS prep, classroom ideas and more.",
      },
      { property: "og:title", content: "Coffee Journal — Filter & Fluent" },
      {
        property: "og:description",
        content: "Stories, strategies, and small sips of English wisdom.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogPage,
});

/* ---------- Types ---------- */
type Difficulty = "Beginner" | "Intermediate" | "Advanced" | "All levels";

interface Author {
  id: string;
  name: string;
  avatar?: string;
}

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: Author;
  publishedDate: string;
  readingTime: number; // minutes
  difficulty: Difficulty;
  popularityScore: number;
  featured?: boolean;
}

/* ---------- Data ---------- */
const CATEGORIES = [
  "Grammar Tips",
  "Vocabulary",
  "Speaking Skills",
  "Writing Skills",
  "Reading Strategies",
  "IELTS Preparation",
  "Classroom Ideas",
  "Teacher Development",
  "Student Success",
  "Book Reviews",
  "English in Everyday Life",
  "Productivity & Study Skills",
  "AI Tools for Learning",
  "Learning Psychology",
  "Communication Skills",
];

const author: Author = { id: "gsd", name: "Gnana Soundari Devaraj" };

const featured: Article = {
  id: "f1",
  title:
    "Why 'Filter Coffee Grammar' Works: Brewing Tenses Slowly for Lasting Fluency",
  slug: "filter-coffee-grammar",
  excerpt:
    "Grammar isn't a race. Like decoction dripping through a filter, tenses settle when we give them time — a slower approach that finally makes fluency stick.",
  category: "Grammar Tips",
  tags: ["tenses", "fluency", "method"],
  author,
  publishedDate: "2026-07-10",
  readingTime: 6,
  difficulty: "Intermediate",
  popularityScore: 98,
  featured: true,
};

const articles: Article[] = [
  {
    id: "a1",
    title: "5 Vocabulary Swaps That Instantly Sound More IELTS-Band-9",
    slug: "ielts-vocabulary-swaps",
    excerpt:
      "Trade tired words for precise ones — small swaps that examiners notice and reward.",
    category: "Vocabulary",
    tags: ["ielts", "band-9", "lexical"],
    author,
    publishedDate: "2026-07-08",
    readingTime: 5,
    difficulty: "Advanced",
    popularityScore: 92,
  },
  {
    id: "a2",
    title:
      "The 40-Minute Class Problem: Fitting Grammar and Speaking Into One Period",
    slug: "40-minute-class",
    excerpt:
      "A realistic lesson blueprint for teachers juggling syllabus pressure and real communication.",
    category: "Classroom Ideas",
    tags: ["lesson plan", "esl"],
    author,
    publishedDate: "2026-07-05",
    readingTime: 7,
    difficulty: "Intermediate",
    popularityScore: 84,
  },
  {
    id: "a3",
    title: "Reading Slowly on Purpose: A Strategy Most Students Skip",
    slug: "reading-slowly",
    excerpt:
      "Speed is overrated. Deliberate, unhurried reading builds vocabulary and comprehension faster than skimming ever will.",
    category: "Reading Strategies",
    tags: ["reading", "habits"],
    author,
    publishedDate: "2026-07-02",
    readingTime: 4,
    difficulty: "Beginner",
    popularityScore: 77,
  },
  {
    id: "a4",
    title: "Speaking Part 2: How to Fill 2 Minutes Without Panicking",
    slug: "ielts-speaking-part-2",
    excerpt:
      "A calm four-part frame you can rehearse today — even if the cue card catches you off guard.",
    category: "IELTS Preparation",
    tags: ["ielts", "speaking"],
    author,
    publishedDate: "2026-06-28",
    readingTime: 6,
    difficulty: "Intermediate",
    popularityScore: 95,
  },
  {
    id: "a5",
    title: "Three Books Every ESL Teacher Should Reread",
    slug: "esl-teacher-books",
    excerpt:
      "Older isn't outdated. These three quietly shape how thoughtful teachers still plan lessons today.",
    category: "Book Reviews",
    tags: ["teaching", "books"],
    author,
    publishedDate: "2026-06-24",
    readingTime: 5,
    difficulty: "All levels",
    popularityScore: 71,
  },
  {
    id: "a6",
    title: "Kaizen for Vocabulary: Small Daily Brews, Big Fluency Gains",
    slug: "kaizen-vocabulary",
    excerpt:
      "Five words a day, done consistently, will outpace any weekend cram session. Here's the routine.",
    category: "Learning Psychology",
    tags: ["habits", "kaizen"],
    author,
    publishedDate: "2026-06-20",
    readingTime: 4,
    difficulty: "Beginner",
    popularityScore: 88,
  },
  {
    id: "a7",
    title: "Writing Emails That Sound Warm, Not Stiff",
    slug: "warm-emails",
    excerpt:
      "Professional doesn't have to mean cold. Small tweaks that make your English emails read like a person, not a template.",
    category: "Writing Skills",
    tags: ["email", "tone"],
    author,
    publishedDate: "2026-06-16",
    readingTime: 5,
    difficulty: "Intermediate",
    popularityScore: 68,
  },
  {
    id: "a8",
    title: "Using AI as a Study Partner (Not a Shortcut)",
    slug: "ai-study-partner",
    excerpt:
      "Prompts and habits that make AI genuinely help your English — without doing the thinking for you.",
    category: "AI Tools for Learning",
    tags: ["ai", "study"],
    author,
    publishedDate: "2026-06-12",
    readingTime: 6,
    difficulty: "Intermediate",
    popularityScore: 81,
  },
  {
    id: "a9",
    title: "Everyday English: What to Say at the Coffee Counter",
    slug: "coffee-counter-english",
    excerpt:
      "A tiny script for one very common moment — with the phrases native speakers actually use.",
    category: "English in Everyday Life",
    tags: ["conversation", "phrases"],
    author,
    publishedDate: "2026-06-08",
    readingTime: 3,
    difficulty: "Beginner",
    popularityScore: 74,
  },
];

/* ---------- Helpers ---------- */
const difficultyStyles: Record<Difficulty, string> = {
  Beginner: "bg-emerald-100 text-emerald-800",
  Intermediate: "bg-amber-100 text-amber-900",
  Advanced: "bg-rose-100 text-rose-800",
  "All levels": "bg-beige text-navy-deep",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/* ---------- Components ---------- */
function CategoryPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all border ${
        active
          ? "bg-navy-deep text-cream border-navy-deep shadow-sm"
          : "bg-white text-navy-deep border-border hover:border-gold hover:text-coffee"
      }`}
    >
      {label}
    </button>
  );
}

function ArticleCard({ a }: { a: Article }) {
  return (
    <article className="group flex flex-col rounded-2xl bg-white border border-border/60 overflow-hidden shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(91,58,41,0.25)]">
      <div
        className="relative aspect-[16/10] bg-gradient-to-br from-coffee/80 via-navy/70 to-navy-deep overflow-hidden"
        aria-hidden
      >
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.6),transparent_60%)]" />
        <Coffee className="absolute right-4 bottom-4 h-16 w-16 text-gold/40" strokeWidth={1} />
        <button
          aria-label="Save article (coming soon)"
          className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/90 flex items-center justify-center text-navy-deep hover:text-gold transition-colors"
          type="button"
        >
          <Bookmark className="h-4 w-4" />
        </button>
      </div>
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="rounded-full bg-gold/20 text-coffee px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider">
            {a.category}
          </span>
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${difficultyStyles[a.difficulty]}`}
          >
            {a.difficulty}
          </span>
        </div>
        <h3 className="font-serif text-xl leading-snug text-navy-deep line-clamp-2">
          {a.title}
        </h3>
        <p className="mt-3 text-sm text-navy-deep/75 leading-relaxed line-clamp-3">
          {a.excerpt}
        </p>
        <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-navy-deep/60">
          <span className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" /> {a.author.name.split(" ")[0]}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> {a.readingTime} min read
          </span>
        </div>
        <button
          type="button"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-coffee hover:text-gold transition-colors self-start"
        >
          Continue Reading <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </article>
  );
}

function RecommendationStrip({ items }: { items: Article[] }) {
  return (
    <section aria-labelledby="more-to-brew" className="mt-16">
      <div className="flex items-center gap-3 mb-6">
        <Coffee className="h-5 w-5 text-coffee" />
        <h2
          id="more-to-brew"
          className="font-serif text-2xl text-navy-deep"
        >
          More to brew
        </h2>
        <span className="h-px flex-1 bg-border" />
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((a) => (
          <ArticleCard key={a.id} a={a} />
        ))}
      </div>
    </section>
  );
}

/* ---------- Page ---------- */
function BlogPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<string>("");
  const [readingTime, setReadingTime] = useState<string>("");
  const [sort, setSort] = useState<"newest" | "popular">("newest");
  const [visible, setVisible] = useState(6);

  const filtered = useMemo(() => {
    let list = articles.filter((a) => {
      if (category && a.category !== category) return false;
      if (difficulty && a.difficulty !== difficulty) return false;
      if (readingTime === "short" && a.readingTime > 4) return false;
      if (readingTime === "medium" && (a.readingTime < 5 || a.readingTime > 7))
        return false;
      if (readingTime === "long" && a.readingTime < 8) return false;
      if (query) {
        const q = query.toLowerCase();
        const hay = `${a.title} ${a.excerpt} ${a.category} ${a.tags.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    list = [...list].sort((x, y) =>
      sort === "newest"
        ? y.publishedDate.localeCompare(x.publishedDate)
        : y.popularityScore - x.popularityScore,
    );
    return list;
  }, [query, category, difficulty, readingTime, sort]);

  const activeChips: { label: string; clear: () => void }[] = [];
  if (category)
    activeChips.push({ label: category, clear: () => setCategory(null) });
  if (difficulty)
    activeChips.push({ label: difficulty, clear: () => setDifficulty("") });
  if (readingTime)
    activeChips.push({
      label:
        readingTime === "short"
          ? "Under 5 min"
          : readingTime === "medium"
            ? "5–7 min"
            : "8+ min",
      clear: () => setReadingTime(""),
    });

  const clearAll = () => {
    setCategory(null);
    setDifficulty("");
    setReadingTime("");
    setQuery("");
  };

  const recommendations = articles.slice(0, 3);

  return (
    <div className="min-h-screen bg-[oklch(0.98_0.015_80)] text-navy-deep">
      {/* Header */}
      <header className="bg-navy-deep text-cream">
        <nav className="mx-auto max-w-[1300px] px-6 lg:px-10 py-5 flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-navy/60">
              <Coffee className="h-5 w-5 text-gold" />
            </span>
            <span className="leading-tight">
              <span className="block font-serif text-xl text-gold-gradient tracking-wide">
                Filter &amp; Fluent
              </span>
              <span className="block text-[10px] tracking-[0.22em] text-cream/60 uppercase">
                Coffee Journal
              </span>
            </span>
          </Link>
          <ul className="hidden md:flex items-center gap-6 text-[13px] font-medium">
            <li>
              <Link to="/" className="text-cream/85 hover:text-gold">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-cream/85 hover:text-gold">
                About
              </Link>
            </li>
            <li>
              <Link to="/grammar" className="text-cream/85 hover:text-gold">
                Grammar
              </Link>
            </li>
            <li>
              <Link to="/vocabulary" className="text-cream/85 hover:text-gold">
                Vocabulary
              </Link>
            </li>
            <li>
              <Link to="/blog" className="text-gold">
                Journal
              </Link>
            </li>
          </ul>
        </nav>

        {/* Hero banner */}
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_20%_30%,var(--gold),transparent_50%),radial-gradient(circle_at_80%_70%,var(--coffee),transparent_55%)]" />
          <div className="relative mx-auto max-w-[1300px] px-6 lg:px-10 py-20 lg:py-28 text-center">
            <div className="inline-flex items-center gap-2 text-gold mb-6">
              <span className="h-px w-8 bg-gold/60" />
              <Sparkles className="h-3.5 w-3.5" />
              <span className="text-[11px] tracking-[0.3em] font-semibold uppercase">
                The Coffee Journal
              </span>
              <Sparkles className="h-3.5 w-3.5" />
              <span className="h-px w-8 bg-gold/60" />
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
              Coffee <span className="text-gold-gradient italic">Journal</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-cream/75 text-lg leading-relaxed">
              Stories, strategies, and small sips of English wisdom.
            </p>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mx-auto max-w-[1300px] px-6 lg:px-10 pt-8 text-xs text-navy-deep/60"
      >
        <ol className="flex items-center gap-2">
          <li>
            <Link to="/" className="hover:text-coffee">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-navy-deep font-medium">Coffee Journal</li>
        </ol>
      </nav>

      <main className="mx-auto max-w-[1300px] px-6 lg:px-10 py-10">
        {/* Featured */}
        <section aria-labelledby="featured-heading" className="mb-14">
          <h2 id="featured-heading" className="sr-only">
            Featured article
          </h2>
          <article className="grid lg:grid-cols-2 gap-8 items-stretch rounded-3xl overflow-hidden bg-white border border-border/60 shadow-[var(--shadow-card)]">
            <div
              className="relative min-h-[280px] lg:min-h-full bg-gradient-to-br from-navy-deep via-coffee to-navy overflow-hidden"
              aria-hidden
            >
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_40%_60%,rgba(212,175,55,0.7),transparent_55%)]" />
              <Coffee
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-36 w-36 text-gold/50"
                strokeWidth={1}
              />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="rounded-full bg-gold text-navy-deep px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
                  {featured.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-navy-deep/70">
                  <Clock className="h-3.5 w-3.5" /> {featured.readingTime} min
                  read
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${difficultyStyles[featured.difficulty]}`}
                >
                  {featured.difficulty}
                </span>
              </div>
              <h3 className="font-serif text-3xl md:text-4xl leading-tight text-navy-deep">
                {featured.title}
              </h3>
              <p className="mt-5 text-navy-deep/75 leading-relaxed">
                {featured.excerpt}
              </p>
              <div className="mt-6 flex items-center gap-3 text-sm text-navy-deep/70">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-beige text-coffee">
                  <User className="h-4 w-4" />
                </span>
                <div>
                  <div className="font-medium text-navy-deep">
                    {featured.author.name}
                  </div>
                  <time
                    dateTime={featured.publishedDate}
                    className="text-xs text-navy-deep/60"
                  >
                    {formatDate(featured.publishedDate)}
                  </time>
                </div>
              </div>
              <button className="btn-gold mt-8 self-start rounded-full px-7 py-3 text-sm font-semibold inline-flex items-center gap-2">
                Continue Reading <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </article>
        </section>

        {/* Search + filters */}
        <section
          aria-label="Search and filters"
          className="sticky top-0 z-20 -mx-6 lg:-mx-10 px-6 lg:px-10 py-4 bg-[oklch(0.98_0.015_80)]/90 backdrop-blur border-b border-border/60"
        >
          <div className="flex flex-col md:flex-row gap-3">
            <label className="flex items-center gap-2 flex-1 rounded-full border border-border bg-white px-4 py-2.5 focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/30">
              <Search className="h-4 w-4 text-navy-deep/60" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles, topics, or skills..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-navy-deep/50"
                aria-label="Search articles"
              />
            </label>
            <div className="flex flex-wrap gap-2">
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                aria-label="Filter by difficulty"
                className="rounded-full border border-border bg-white px-4 py-2.5 text-sm text-navy-deep"
              >
                <option value="">All levels</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
              <select
                value={readingTime}
                onChange={(e) => setReadingTime(e.target.value)}
                aria-label="Filter by reading time"
                className="rounded-full border border-border bg-white px-4 py-2.5 text-sm text-navy-deep"
              >
                <option value="">Any length</option>
                <option value="short">Under 5 min</option>
                <option value="medium">5–7 min</option>
                <option value="long">8+ min</option>
              </select>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as "newest" | "popular")}
                aria-label="Sort articles"
                className="rounded-full border border-border bg-white px-4 py-2.5 text-sm text-navy-deep"
              >
                <option value="newest">Newest</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>
          {activeChips.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {activeChips.map((c) => (
                <button
                  key={c.label}
                  onClick={c.clear}
                  className="rounded-full bg-coffee/10 text-coffee px-3 py-1 text-xs font-medium hover:bg-coffee/20"
                >
                  {c.label} ✕
                </button>
              ))}
              <button
                onClick={clearAll}
                className="text-xs font-semibold text-navy-deep/60 hover:text-coffee underline underline-offset-2"
              >
                Clear all
              </button>
            </div>
          )}
        </section>

        {/* Category strip */}
        <section aria-label="Browse categories" className="mt-8">
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-thin">
            <CategoryPill
              label="All"
              active={!category}
              onClick={() => setCategory(null)}
            />
            {CATEGORIES.map((c) => (
              <CategoryPill
                key={c}
                label={c}
                active={category === c}
                onClick={() => setCategory(c)}
              />
            ))}
          </div>
        </section>

        {/* Latest grid */}
        <section aria-labelledby="latest-heading" className="mt-12">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2
                id="latest-heading"
                className="font-serif text-3xl text-navy-deep"
              >
                Latest Articles
              </h2>
              <p className="text-sm text-navy-deep/60 mt-1">
                {filtered.length}{" "}
                {filtered.length === 1 ? "article" : "articles"} freshly brewed
              </p>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-white p-12 text-center">
              <Coffee className="mx-auto h-10 w-10 text-coffee/60 mb-4" />
              <p className="font-serif text-xl text-navy-deep">
                No articles match your filters.
              </p>
              <p className="text-sm text-navy-deep/60 mt-2">
                Try clearing filters or searching a different term.
              </p>
              <button
                onClick={clearAll}
                className="mt-5 rounded-full bg-navy-deep text-cream px-5 py-2 text-sm font-semibold"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filtered.slice(0, visible).map((a) => (
                  <ArticleCard key={a.id} a={a} />
                ))}
              </div>
              {visible < filtered.length && (
                <div className="mt-10 text-center">
                  <button
                    onClick={() => setVisible((v) => v + 6)}
                    className="btn-gold rounded-full px-8 py-3 text-sm font-semibold inline-flex items-center gap-2"
                  >
                    Load more <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        {/* Recommendations */}
        <RecommendationStrip items={recommendations} />
      </main>

      {/* Newsletter */}
      <section className="mt-16 bg-[color:var(--beige)]">
        <div className="mx-auto max-w-[900px] px-6 lg:px-10 py-20 text-center">
          <Mail className="mx-auto h-10 w-10 text-coffee mb-5" strokeWidth={1.4} />
          <h2 className="font-serif text-4xl text-navy-deep">
            A Weekly Cup of English Wisdom
          </h2>
          <p className="mt-4 text-navy-deep/75 max-w-xl mx-auto">
            Grammar tips, vocabulary, and IELTS strategies — delivered every
            week.
          </p>
          <form
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <label className="sr-only" htmlFor="newsletter-email">
              Your email
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="you@example.com"
              className="flex-1 rounded-full border border-border bg-white px-5 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
            />
            <button
              type="submit"
              className="btn-gold rounded-full px-7 py-3 text-sm font-semibold whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-4 text-xs text-navy-deep/55">
            No spam. Just good English, brewed weekly.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-deep text-cream/80">
        <div className="mx-auto max-w-[1300px] px-6 lg:px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Coffee className="h-4 w-4 text-gold" />
            <span className="font-serif text-gold">Filter &amp; Fluent</span>
            <span className="text-cream/50">
              · Brew Knowledge. Speak with Confidence.
            </span>
          </div>
          <div className="flex gap-5 text-xs">
            <Link to="/about" className="hover:text-gold">
              About
            </Link>
            <Link to="/resources" className="hover:text-gold">
              Resources
            </Link>
            <Link to="/blog" className="hover:text-gold">
              Journal
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
