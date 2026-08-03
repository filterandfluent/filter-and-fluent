import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Clock,
  Coffee,
  Facebook,
  Link2,
  Linkedin,
  Share2,
  Sparkles,
  Twitter,
  User,
} from "lucide-react";

import featuredImage from "../assets/card-articles.jpg";
import secondaryImage from "../assets/about-coffee.jpg";

export const Route = createFileRoute("/blog_/$slug")({
  head: () => ({
    meta: [
      {
        title: "Article — Coffee Journal | Filter & Fluent",
      },
      {
        name: "description",
        content:
          "A premium long-form reading experience from the Filter & Fluent Coffee Journal — English learning with South Indian soul.",
      },
      {
        property: "og:title",
        content: "Article — Coffee Journal | Filter & Fluent",
      },
      {
        property: "og:description",
        content:
          "A premium long-form reading experience from the Filter & Fluent Coffee Journal.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ArticlePage,
});

/* ---------- Article meta (layout placeholder) ---------- */
const article = {
  title: "Article Title Goes Here — An Elegant, Long-Form Headline",
  description:
    "A short article description sits here: one or two calm sentences that set the mood and tell the reader what this cup contains.",
  category: "Grammar Tips",
  difficulty: "Intermediate",
  readingTime: 8,
  publishedDate: "2026-07-10",
  author: "Gnana Soundari Devaraj",
};

/** Section outline — drives both the page and the Table of Contents. */
const SECTIONS = [
  { id: "introduction", label: "Introduction" },
  { id: "main-content", label: "Main Content" },
  { id: "in-practice", label: "In Practice" },
  { id: "key-points", label: "Key Points" },
  { id: "closing-notes", label: "Closing Notes" },
];

const relatedPlaceholders = [
  { id: "r1", category: "Category" },
  { id: "r2", category: "Category" },
  { id: "r3", category: "Category" },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/* ---------- Shared tokens ---------- */
const CARD =
  "rounded-2xl bg-white border border-border/60 shadow-[var(--shadow-card)]";
const FOCUS =
  "outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--beige)]";
const PROSE =
  "space-y-6 text-[17px] leading-[1.85] text-navy-deep/80 [text-wrap:pretty]";

/* ---------- Behaviour hooks ---------- */
function useSectionReveal() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (!nodes.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    nodes.forEach((n) => {
      n.style.opacity = "0";
      n.style.willChange = "opacity, transform";
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          el.style.opacity = "";
          el.classList.add("animate-fade-up");
          el.addEventListener(
            "animationend",
            () => {
              el.style.willChange = "";
            },
            { once: true },
          );
          io.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
}

function useActiveSection() {
  const [active, setActive] = useState(SECTIONS[0]!.id);
  useEffect(() => {
    const targets = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => !!el,
    );
    if (!targets.length) return;

    let frame = 0;
    const compute = () => {
      frame = 0;
      const line = window.innerHeight * 0.3;
      let current = targets[0]!.id;
      for (const el of targets) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return active;
}

/** Scroll progress, 0–100. */
function useReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const value = max > 0 ? Math.min(1, Math.max(0, h.scrollTop / max)) : 0;
      setProgress(Math.round(value * 100));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return progress;
}

/* ---------- Reusable content blocks ---------- */
function SectionHeading({
  id,
  name,
  intro,
}: {
  id: string;
  name: string;
  intro?: string;
}) {
  return (
    <div className="mb-6">
      <h2
        id={id}
        className="font-serif text-3xl md:text-4xl leading-tight tracking-tight text-navy-deep scroll-mt-28"
      >
        {name}
      </h2>
      {intro ? (
        <p className="mt-2 text-sm leading-relaxed text-navy-deep/60 italic">
          {intro}
        </p>
      ) : null}
    </div>
  );
}

function Subheading({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-serif text-2xl leading-snug text-navy-deep pt-2">
      {children}
    </h3>
  );
}

function Figure({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="my-2">
      <div className={`${CARD} overflow-hidden`}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="aspect-[16/9] w-full object-cover"
        />
      </div>
      <figcaption className="mt-3 text-xs text-navy-deep/60 italic">
        {caption}
      </figcaption>
    </figure>
  );
}

function QuoteBlock({
  quote,
  attribution,
}: {
  quote: string;
  attribution?: string;
}) {
  return (
    <blockquote className={`${CARD} border-l-4 border-l-gold p-7`}>
      <p className="font-serif text-2xl leading-snug text-navy-deep italic">
        “{quote}”
      </p>
      {attribution ? (
        <footer className="mt-3 text-sm text-navy-deep/60">
          {attribution}
        </footer>
      ) : null}
    </blockquote>
  );
}

function Callout({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <aside className="rounded-2xl bg-[color:var(--beige)] border border-border/60 shadow-[var(--shadow-card)] p-7">
      <span className="rounded-full bg-gold/20 text-coffee px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider">
        {label}
      </span>
      <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-navy-deep/80">
        {children}
      </div>
    </aside>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className={`${CARD} p-7 space-y-3 text-[15px] leading-relaxed text-navy-deep/80`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
            aria-hidden
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className={`${CARD} p-7 space-y-4 text-[15px] leading-relaxed text-navy-deep/80`}>
      {items.map((item, i) => (
        <li key={item} className="flex items-start gap-4">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/20 text-[13px] font-semibold text-coffee">
            {i + 1}
          </span>
          <span className="pt-0.5">{item}</span>
        </li>
      ))}
    </ol>
  );
}

/* ---------- Chrome pieces ---------- */
function ProgressBar({ progress }: { progress: number }) {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (barRef.current) {
      barRef.current.style.transform = `scaleX(${progress / 100})`;
    }
  }, [progress]);

  return (
    <div
      className="fixed inset-x-0 top-0 z-50 h-[3px] bg-transparent"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={`${progress}% of the article read`}
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-gold transition-transform duration-100 ease-out"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}

function ShareButtons({
  size = "md",
  label = "Share this article",
}: {
  size?: "sm" | "md";
  label?: string;
}) {
  const items = [
    { Icon: Twitter, name: "Share on X" },
    { Icon: Facebook, name: "Share on Facebook" },
    { Icon: Linkedin, name: "Share on LinkedIn" },
    { Icon: Link2, name: "Copy link" },
  ];
  const dim = size === "sm" ? "h-9 w-9" : "h-10 w-10";
  const icon = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  return (
    <div className="flex items-center gap-2" role="group" aria-label={label}>
      {items.map(({ Icon, name }) => (
        <button
          key={name}
          type="button"
          aria-label={name}
          title={name}
          className={`${dim} inline-flex items-center justify-center rounded-full border border-border/70 bg-white text-coffee shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/60 hover:text-gold ${FOCUS} focus-visible:ring-offset-white`}
        >
          <Icon className={icon} aria-hidden />
        </button>
      ))}
    </div>
  );
}

function TableOfContents({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  return (
    <nav aria-label="Table of contents">
      <div className={`${CARD} overflow-hidden`}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="toc-list"
          className={`w-full flex items-center justify-between gap-3 px-5 py-4 text-left lg:cursor-default ${FOCUS} focus-visible:ring-offset-white`}
        >
          <span>
            <span className="block font-serif text-lg leading-snug text-navy-deep">
              On This Page
            </span>
            <span className="block text-[11px] leading-relaxed text-navy-deep/60 italic">
              Everything on today's board, at a glance.
            </span>
          </span>
          <ArrowRight
            className={`h-4 w-4 text-coffee lg:hidden transition-transform duration-200 ${open ? "rotate-90" : ""}`}
            aria-hidden
          />
        </button>
        <ul
          id="toc-list"
          className={`${open ? "block" : "hidden"} lg:block border-t border-border/60 px-5 py-4 space-y-1 text-sm`}
        >
          {SECTIONS.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2.5 rounded-md px-2 py-1.5 transition-colors duration-200 ${FOCUS} focus-visible:ring-offset-white ${
                    isActive
                      ? "bg-gold/15 text-coffee font-semibold"
                      : "text-navy-deep/75 hover:bg-beige/60 hover:text-coffee"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-200 ${isActive ? "bg-gold" : "bg-border"}`}
                    aria-hidden
                  />
                  <span>{s.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

function Sidebar({ active, progress }: { active: string; progress: number }) {
  return (
    <div className="lg:sticky lg:top-24 space-y-5">
      <div className={`${CARD} p-5`}>
        <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-coffee">
          <span>Reading progress</span>
          <span className="text-navy-deep/60">{progress}%</span>
        </div>
        <div
          className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-beige"
          aria-hidden
        >
          <div
            className="h-full rounded-full bg-gold transition-[width] duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-4 flex items-center gap-1.5 text-xs text-navy-deep/60">
          <Clock className="h-3.5 w-3.5" aria-hidden />
          {article.readingTime} min read
        </p>
        <div className="mt-5 border-t border-border/60 pt-4">
          <p className="mb-3 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-coffee">
            <Share2 className="h-3.5 w-3.5" aria-hidden /> Share
          </p>
          <ShareButtons size="sm" label="Share this article from the sidebar" />
        </div>
      </div>

      <TableOfContents active={active} />
    </div>
  );
}

function RelatedPlaceholderCard() {
  return (
    <article
      className={`group flex flex-col ${CARD} overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(91,58,41,0.25)]`}
    >
      <div
        className="relative aspect-[16/10] bg-gradient-to-br from-coffee/80 via-navy/70 to-navy-deep overflow-hidden"
        aria-hidden
      >
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.6),transparent_60%)]" />
        <Coffee
          className="absolute right-4 bottom-4 h-16 w-16 text-gold/40 transition-transform duration-300 group-hover:scale-105"
          strokeWidth={1}
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="self-start rounded-full bg-gold/20 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-coffee">
          Category
        </span>
        <h3 className="mt-3 font-serif text-xl leading-snug text-navy-deep transition-colors duration-200 group-hover:text-coffee">
          Related article title placeholder
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-navy-deep/70">
          A short excerpt will appear here once this article slot is filled.
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4 text-xs text-navy-deep/60">
          <span className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" aria-hidden /> Author
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden /> — min read
          </span>
        </div>
      </div>
    </article>
  );
}

/* ---------- Page ---------- */
function ArticlePage() {
  const active = useActiveSection();
  const progress = useReadingProgress();
  const [bookmarked, setBookmarked] = useState(false);
  useSectionReveal();

  return (
    <div className="min-h-screen scroll-smooth bg-[oklch(0.98_0.015_80)] text-navy-deep">
      <ProgressBar progress={progress} />

      {/* Header + Hero */}
      <header className="bg-navy-deep text-cream">
        <nav className="mx-auto flex max-w-[1300px] items-center justify-between gap-6 px-6 py-5 lg:px-10">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-navy/60">
              <Coffee className="h-5 w-5 text-gold" />
            </span>
            <span className="leading-tight">
              <span className="block font-serif text-xl tracking-wide text-gold-gradient">
                Filter &amp; Fluent
              </span>
              <span className="block text-[10px] uppercase tracking-[0.22em] text-cream/60">
                Coffee Journal
              </span>
            </span>
          </Link>
          <ul className="hidden items-center gap-6 text-[13px] font-medium md:flex">
            <li>
              <Link to="/" className="text-cream/85 transition-colors duration-200 hover:text-gold">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-cream/85 transition-colors duration-200 hover:text-gold">
                About
              </Link>
            </li>
            <li>
              <Link to="/grammar" className="text-cream/85 transition-colors duration-200 hover:text-gold">
                Grammar
              </Link>
            </li>
            <li>
              <Link to="/vocabulary" className="text-cream/85 transition-colors duration-200 hover:text-gold">
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

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_20%_30%,var(--gold),transparent_50%),radial-gradient(circle_at_80%_70%,var(--coffee),transparent_55%)]" />
          <div className="relative mx-auto max-w-[900px] px-6 py-16 text-center lg:px-10 lg:py-24">
            <div className="mb-6 inline-flex items-center gap-2 text-gold">
              <span className="h-px w-8 bg-gold/60" />
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em]">
                The Coffee Journal
              </span>
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              <span className="h-px w-8 bg-gold/60" />
            </div>

            <div className="mb-7 flex flex-wrap items-center justify-center gap-3">
              <span className="rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-navy-deep">
                {article.category}
              </span>
              <span className="rounded-full bg-cream/15 px-3 py-1 text-[11px] font-medium text-cream/85">
                {article.difficulty}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-cream/70">
                <Clock className="h-3.5 w-3.5" aria-hidden /> {article.readingTime} min
                read
              </span>
            </div>

            <h1 className="font-serif text-4xl leading-[1.08] tracking-tight md:text-5xl lg:text-6xl">
              {article.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-cream/75">
              {article.description}
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8">
              <div className="flex items-center gap-3 text-sm text-cream/75">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy/60 text-gold">
                  <User className="h-4 w-4" aria-hidden />
                </span>
                <div className="text-left">
                  <div className="font-medium text-cream">{article.author}</div>
                  <time
                    dateTime={article.publishedDate}
                    className="text-xs text-cream/60"
                  >
                    {formatDate(article.publishedDate)}
                  </time>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <ShareButtons label="Share this article" />
                <button
                  type="button"
                  onClick={() => setBookmarked((b) => !b)}
                  aria-pressed={bookmarked}
                  aria-label={bookmarked ? "Remove bookmark" : "Bookmark this article"}
                  title={bookmarked ? "Bookmarked" : "Bookmark"}
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 hover:-translate-y-0.5 ${FOCUS} focus-visible:ring-offset-[color:var(--navy-deep)] ${
                    bookmarked
                      ? "border-gold bg-gold text-navy-deep"
                      : "border-cream/25 bg-navy/50 text-cream/80 hover:border-gold/60 hover:text-gold"
                  }`}
                >
                  <Bookmark
                    className="h-4 w-4"
                    strokeWidth={1.8}
                    fill={bookmarked ? "currentColor" : "none"}
                    aria-hidden
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Featured image */}
      <div className="mx-auto -mt-8 max-w-[1100px] px-6 lg:-mt-12 lg:px-10">
        <figure className={`${CARD} overflow-hidden`}>
          <img
            src={featuredImage}
            alt="Filter coffee brewing beside an open book — the Coffee Journal featured image"
            className="aspect-[16/9] w-full object-cover"
          />
        </figure>
      </div>

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mx-auto max-w-[1300px] px-6 pt-10 text-xs text-navy-deep/60 lg:px-10"
      >
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link to="/" className="transition-colors duration-200 hover:text-coffee">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link to="/blog" className="transition-colors duration-200 hover:text-coffee">
              Coffee Journal
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="font-medium text-navy-deep">{article.category}</li>
        </ol>
      </nav>

      <main className="mx-auto max-w-[1300px] px-6 py-10 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
          {/* Article body */}
          <article className="order-2 min-w-0 max-w-[72ch] lg:order-1">
            {/* Introduction */}
            <section data-reveal aria-labelledby="introduction" className="mb-14">
              <SectionHeading id="introduction" name="Introduction" />
              <div className={PROSE}>
                <p className="text-[19px] leading-[1.8] text-navy-deep/85">
                  The opening paragraph sits here — a warm, unhurried lead-in
                  that invites the reader to sit down before the first sip.
                </p>
                <p>
                  A second paragraph continues the thought at a comfortable
                  reading width, with generous line height and a measured rhythm
                  built for long-form reading.
                </p>
              </div>
            </section>

            {/* Main Content */}
            <section data-reveal aria-labelledby="main-content" className="mb-14">
              <SectionHeading id="main-content" name="Main Content" />
              <div className={PROSE}>
                <p>
                  Body copy paragraph. This block demonstrates the default
                  paragraph style used throughout every article on the Coffee
                  Journal.
                </p>
                <Subheading>A section subheading</Subheading>
                <p>
                  Subheadings break the page into calm, scannable parts while
                  keeping a clear hierarchy beneath the section title above.
                </p>
                <Figure
                  src={secondaryImage}
                  alt="A brass tumbler of filter coffee resting on a warm wooden table"
                  caption="Image caption — a short, elegant line of context sits here."
                />
                <p>
                  Copy continues after the image, holding the same measure so the
                  reader's eye never has to reset.
                </p>
              </div>
            </section>

            {/* Premium Brew Notes */}
            <section data-reveal aria-labelledby="brew-notes" className="mb-14">
              <h2 id="brew-notes" className="sr-only scroll-mt-28">
                Premium Brew Notes
              </h2>
              <BrewNotes title="The one idea worth remembering">
                <p>
                  A short, high-value explanation of the concept sits here —
                  the note a reader would underline and return to later.
                </p>
                <p>
                  Reusable across every article: pass a title and any content.
                </p>
              </BrewNotes>
            </section>

            {/* Real-Life Examples */}
            <section data-reveal aria-labelledby="real-life" className="mb-14">
              <BlockHeading
                id="real-life"
                name="Real-Life Examples"
                icon={MessagesSquare}
                intro="How the lesson sounds in the places you actually use English."
              />
              <ExampleGrid items={examples} />
            </section>

            {/* Visual toolkit */}
            <section data-reveal aria-labelledby="visual-blocks" className="mb-14">
              <BlockHeading
                id="visual-blocks"
                name="At a Glance"
                icon={Table}
                intro="Tables, cards and boxes — the visual language of every lesson."
              />
              <div className="space-y-6">
                <DataTable
                  caption="Reference table"
                  headers={["Form", "Structure", "Example"]}
                  rows={[
                    ["Affirmative", "Subject + verb", "Placeholder example line."],
                    ["Negative", "Subject + do not + verb", "Placeholder example line."],
                    ["Question", "Do + subject + verb", "Placeholder example line?"],
                  ]}
                />
                <Infographic
                  title="Three steps, one clear habit"
                  steps={[
                    { title: "Notice", detail: "Spot the pattern in real speech." },
                    { title: "Practise", detail: "Use it in two sentences today." },
                    { title: "Apply", detail: "Carry it into a real conversation." },
                  ]}
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  <VocabularyCard
                    word="Placeholder"
                    ipa="ˈpleɪshəʊldə"
                    meaning="A short, clear meaning written in everyday English."
                    example="Use the word naturally in a full sentence like this."
                  />
                  <GrammarCard
                    rule="Rule name placeholder"
                    structure="Subject + auxiliary + main verb"
                    example="A model sentence showing the rule in use."
                  />
                </div>
                <DefinitionCard
                  term="Definition card"
                  definition="A precise, one-line definition of a key term from the lesson."
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  <InfoBox tone="tip">
                    <p>A practical tip the reader can use immediately.</p>
                  </InfoBox>
                  <InfoBox tone="warning">
                    <p>A common trap to avoid when using this structure.</p>
                  </InfoBox>
                  <InfoBox tone="example">
                    <p>“A model sentence, quoted for clarity.”</p>
                  </InfoBox>
                  <InfoBox tone="note">
                    <p>A small aside that adds useful context.</p>
                  </InfoBox>
                </div>
              </div>
            </section>

            {/* Quote block */}
            <section data-reveal aria-label="Pull quote" className="mb-14">
              <QuoteBlock
                quote="A pull-quote goes here — one memorable line, poured slowly."
                attribution="Attribution or source line"
              />
            </section>

            {/* In Practice */}
            <section data-reveal aria-labelledby="in-practice" className="mb-14">
              <SectionHeading
                id="in-practice"
                name="In Practice"
                intro="Numbered steps and callouts live in this part of the layout."
              />
              <div className="space-y-6">
                <NumberedList
                  items={[
                    "First step placeholder — one clear action per line.",
                    "Second step placeholder — kept short and readable.",
                    "Third step placeholder — closing the sequence.",
                  ]}
                />
                <Callout label="Callout">
                  <p>
                    A callout box highlights a note, tip, or aside without
                    interrupting the flow of the article.
                  </p>
                </Callout>
              </div>
            </section>

            {/* Common Mistakes */}
            <section data-reveal aria-labelledby="common-mistakes" className="mb-14">
              <BlockHeading
                id="common-mistakes"
                name="Common Mistakes"
                icon={AlertTriangle}
                intro="The bitter notes — spot them once, avoid them for good."
              />
              <MistakeList items={mistakes} />
            </section>

            {/* Comparisons */}
            <section data-reveal aria-labelledby="comparisons" className="mb-14">
              <BlockHeading
                id="comparisons"
                name="Grammar &amp; Vocabulary Comparison"
                icon={Sparkles}
                intro="Two cups, side by side, so the difference is easy to taste."
              />
              <ComparisonStack items={comparisons} />
            </section>

            {/* Quick Practice */}
            <section data-reveal aria-labelledby="quick-practice" className="mb-14">
              <BlockHeading
                id="quick-practice"
                name="Quick Practice"
                icon={PenLine}
                intro="Grind and practise — answers stay tucked away until you're ready."
              />
              <ExerciseList items={exercises} />
            </section>

            {/* Coffee Break Challenge */}
            <section data-reveal aria-labelledby="coffee-break" className="mb-14">
              <h2 id="coffee-break" className="sr-only scroll-mt-28">
                Coffee Break Challenge
              </h2>
              <ChallengeBoard
                intro="Five small tasks to finish before your cup goes cold."
                items={challenges}
              />
            </section>

            {/* Key Points */}
            <section data-reveal aria-labelledby="key-points" className="mb-14">
              <SectionHeading id="key-points" name="Key Points" />
              <BulletList
                items={[
                  "Bullet list item placeholder.",
                  "A second point, in the same calm rhythm.",
                  "A third point to close the list.",
                ]}
              />
            </section>

            {/* Closing Notes */}
            <section data-reveal aria-labelledby="closing-notes" className="mb-14">
              <SectionHeading id="closing-notes" name="Closing Notes" />
              <div className={PROSE}>
                <p>
                  A closing paragraph rounds off the article and leaves the
                  reader with the last sip.
                </p>
              </div>
            </section>

            {/* Key Takeaways */}
            <section data-reveal aria-labelledby="key-takeaways" className="mb-14">
              <BlockHeading
                id="key-takeaways"
                name="Key Takeaways"
                icon={ListChecks}
                intro="The last sip — everything worth carrying out of the café."
              />
              <TakeawayGrid items={takeaways} />
            </section>

            {/* Previous / Next */}
            <section data-reveal aria-label="Article navigation" className="mb-4">
              <div className="grid gap-5 sm:grid-cols-2">
                <Link
                  to="/blog"
                  className={`${CARD} group p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(91,58,41,0.25)] ${FOCUS}`}
                >
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-coffee">
                    <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> Previous
                    article
                  </span>
                  <p className="mt-2 font-serif text-lg text-navy-deep transition-colors duration-200 group-hover:text-coffee">
                    Previous article title placeholder
                  </p>
                </Link>
                <Link
                  to="/blog"
                  className={`${CARD} group p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(91,58,41,0.25)] sm:text-right ${FOCUS}`}
                >
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-coffee sm:justify-end">
                    Next article{" "}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  <p className="mt-2 font-serif text-lg text-navy-deep transition-colors duration-200 group-hover:text-coffee">
                    Next article title placeholder
                  </p>
                </Link>
              </div>
            </section>
          </article>

          {/* Sidebar */}
          <aside
            aria-label="Article tools"
            className="order-1 lg:order-2"
          >
            <Sidebar active={active} progress={progress} />
          </aside>
        </div>

        {/* Related articles */}
        <section data-reveal aria-labelledby="related-articles" className="mt-20">
          <div className="mb-6 flex items-center gap-3">
            <Coffee className="h-5 w-5 text-coffee" aria-hidden />
            <h2
              id="related-articles"
              className="font-serif text-2xl text-navy-deep"
            >
              Related Articles
            </h2>
            <span className="h-px flex-1 bg-border" />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {relatedPlaceholders.map((r) => (
              <RelatedPlaceholderCard key={r.id} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 bg-navy-deep text-cream/80">
        <div className="mx-auto flex max-w-[1300px] flex-col items-center justify-between gap-4 px-6 py-10 text-sm md:flex-row lg:px-10">
          <div className="flex items-center gap-2">
            <Coffee className="h-4 w-4 text-gold" aria-hidden />
            <span className="font-serif text-gold">Filter &amp; Fluent</span>
            <span className="text-cream/50">
              · Brew Knowledge. Speak with Confidence.
            </span>
          </div>
          <div className="flex gap-5 text-xs">
            <Link to="/about" className="transition-colors duration-200 hover:text-gold">
              About
            </Link>
            <Link to="/resources" className="transition-colors duration-200 hover:text-gold">
              Resources
            </Link>
            <Link to="/blog" className="transition-colors duration-200 hover:text-gold">
              Journal
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
