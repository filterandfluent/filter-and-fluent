import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Clock, Coffee, Mail, Sparkles, User } from "lucide-react";

export const Route = createFileRoute("/blog_/$slug")({
  head: () => ({
    meta: [
      {
        title:
          "Why 'Filter Coffee Grammar' Works — Coffee Journal | Filter & Fluent",
      },
      {
        name: "description",
        content:
          "A slow, filter-coffee approach to tenses: why brewing grammar gradually builds fluency that finally sticks.",
      },
      {
        property: "og:title",
        content: "Why 'Filter Coffee Grammar' Works — Filter & Fluent",
      },
      {
        property: "og:description",
        content:
          "A slow, filter-coffee approach to tenses that builds lasting fluency.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ArticlePage,
});

/* ---------- Data ---------- */
const article = {
  title:
    "Why 'Filter Coffee Grammar' Works: Brewing Tenses Slowly for Lasting Fluency",
  category: "Grammar Tips",
  difficulty: "Intermediate",
  readingTime: 8,
  publishedDate: "2026-07-10",
  author: "Gnana Soundari Devaraj",
};

const SECTIONS = [
  { id: "the-brew", label: "The Brew" },
  { id: "whats-brewing", label: "What's Brewing" },
  { id: "premium-brew-notes", label: "Premium Brew Notes" },
  { id: "grammar-filtered", label: "Grammar, Filtered" },
  { id: "tasting-notes", label: "Tasting Notes" },
  { id: "bitter-notes", label: "Bitter Notes" },
  { id: "grind-practice", label: "Grind & Practice" },
  { id: "coffee-break", label: "Coffee Break Challenge" },
  { id: "last-sip", label: "Last Sip" },
];

const grammarExamples = [
  {
    rule: "Present Perfect for experience",
    example: "I have taught in three schools.",
    note: "The time is unfinished or unstated — the result matters, not the date.",
  },
  {
    rule: "Past Simple for finished time",
    example: "I taught in Cuddalore in 2019.",
    note: "A closed cup: the time reference is complete.",
  },
  {
    rule: "Present Continuous for now",
    example: "She is preparing for her IELTS speaking test.",
    note: "Action in progress around the moment of speaking.",
  },
  {
    rule: "Present Perfect Continuous for duration",
    example: "He has been revising since morning.",
    note: "Emphasises how long, not how many.",
  },
];

const vocabulary = [
  {
    word: "Steep",
    meaning: "To soak something so its flavour is drawn out.",
    example: "Let the new tense steep for a week before testing yourself.",
  },
  {
    word: "Decant",
    meaning: "To pour carefully from one container to another.",
    example: "Decant your notes into your own sentences — don't copy them.",
  },
  {
    word: "Nuance",
    meaning: "A very small difference in meaning or tone.",
    example: "The nuance between 'I did' and 'I have done' changes the answer.",
  },
  {
    word: "Deliberate",
    meaning: "Done on purpose, with careful attention.",
    example: "Ten minutes of deliberate practice beats an hour of scrolling.",
  },
];

const mistakes = [
  {
    wrong: "I am living here since 2020.",
    right: "I have been living here since 2020.",
  },
  {
    wrong: "She didn't went to the workshop.",
    right: "She didn't go to the workshop.",
  },
  {
    wrong: "I have seen him yesterday.",
    right: "I saw him yesterday.",
  },
  {
    wrong: "He is having two brothers.",
    right: "He has two brothers.",
  },
];

const exercises = [
  {
    q: "____ (you / finish) the reading task yet?",
    a: "Have you finished the reading task yet?",
  },
  {
    q: "We ____ (start) the workshop at 9 a.m. yesterday.",
    a: "We started the workshop at 9 a.m. yesterday.",
  },
  {
    q: "They ____ (wait) for the results since Monday.",
    a: "They have been waiting for the results since Monday.",
  },
];

const related = [
  {
    id: "a1",
    title: "5 Vocabulary Swaps That Instantly Sound More IELTS-Band-9",
    category: "Vocabulary",
    excerpt:
      "Trade tired words for precise ones — small swaps that examiners notice and reward.",
    readingTime: 5,
  },
  {
    id: "a2",
    title:
      "The 40-Minute Class Problem: Fitting Grammar and Speaking Into One Period",
    category: "Classroom Ideas",
    excerpt:
      "A realistic lesson blueprint for teachers juggling syllabus pressure and real communication.",
    readingTime: 7,
  },
  {
    id: "a3",
    title: "Reading Slowly on Purpose: A Strategy Most Students Skip",
    category: "Reading Strategies",
    excerpt:
      "Why slower reading builds faster comprehension — and how to practise it daily.",
    readingTime: 6,
  },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/* ---------- Small pieces ---------- */
function SectionHeading({
  id,
  name,
  intro,
}: {
  id: string;
  name: string;
  intro: string;
}) {
  return (
    <div className="mb-6">
      <h2
        id={id}
        className="font-serif text-3xl md:text-4xl leading-tight text-navy-deep scroll-mt-28"
      >
        {name}
      </h2>
      <p className="mt-2 text-sm text-navy-deep/60 italic">{intro}</p>
    </div>
  );
}

function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed inset-x-0 top-0 z-50 h-[3px] bg-transparent"
      role="progressbar"
      aria-label="First Pour — reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-gold transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function MenuBoard() {
  const [open, setOpen] = useState(false);
  return (
    <nav
      aria-label="Menu Board — table of contents"
      className="lg:sticky lg:top-24"
    >
      <div className="rounded-2xl bg-white border border-border/60 shadow-[var(--shadow-card)] overflow-hidden">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left lg:cursor-default"
        >
          <span>
            <span className="block font-serif text-lg text-navy-deep">
              Menu Board
            </span>
            <span className="block text-[11px] text-navy-deep/60 italic">
              Everything on today's board, at a glance.
            </span>
          </span>
          <ArrowRight
            className={`h-4 w-4 text-coffee lg:hidden transition-transform ${open ? "rotate-90" : ""}`}
          />
        </button>
        <ul
          className={`${open ? "block" : "hidden"} lg:block border-t border-border/60 px-5 py-4 space-y-2 text-sm`}
        >
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="text-navy-deep/75 hover:text-coffee transition-colors"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

function ArticleCard({ a }: { a: (typeof related)[number] }) {
  return (
    <article className="group flex flex-col rounded-2xl bg-white border border-border/60 overflow-hidden shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(91,58,41,0.25)]">
      <div
        className="relative aspect-[16/10] bg-gradient-to-br from-coffee/80 via-navy/70 to-navy-deep overflow-hidden"
        aria-hidden
      >
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.6),transparent_60%)]" />
        <Coffee className="absolute right-4 bottom-4 h-16 w-16 text-gold/40" strokeWidth={1} />
      </div>
      <div className="flex flex-col flex-1 p-6">
        <span className="rounded-full bg-gold/20 text-coffee px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider self-start">
          {a.category}
        </span>
        <h3 className="mt-3 font-serif text-xl leading-snug text-navy-deep">
          {a.title}
        </h3>
        <p className="mt-3 text-sm text-navy-deep/75 leading-relaxed">{a.excerpt}</p>
        <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-navy-deep/60">
          <span className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" /> {article.author.split(" ")[0]}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> {a.readingTime} min read
          </span>
        </div>
      </div>
    </article>
  );
}

/* ---------- Page ---------- */
function ArticlePage() {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  return (
    <div className="min-h-screen bg-[oklch(0.98_0.015_80)] text-navy-deep">
      {/* First Pour — reading progress */}
      <ReadingProgress />

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

        {/* Hero */}
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_20%_30%,var(--gold),transparent_50%),radial-gradient(circle_at_80%_70%,var(--coffee),transparent_55%)]" />
          <div className="relative mx-auto max-w-[900px] px-6 lg:px-10 py-16 lg:py-24 text-center">
            <div className="inline-flex items-center gap-2 text-gold mb-6">
              <span className="h-px w-8 bg-gold/60" />
              <Sparkles className="h-3.5 w-3.5" />
              <span className="text-[11px] tracking-[0.3em] font-semibold uppercase">
                The Coffee Journal
              </span>
              <Sparkles className="h-3.5 w-3.5" />
              <span className="h-px w-8 bg-gold/60" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.08] tracking-tight">
              {article.title}
            </h1>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <span className="rounded-full bg-gold text-navy-deep px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
                {article.category}
              </span>
              <span className="rounded-full px-2 py-0.5 text-[11px] font-medium bg-cream/15 text-cream/85">
                {article.difficulty}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-cream/70">
                <Clock className="h-3.5 w-3.5" /> {article.readingTime} min read
              </span>
            </div>
            <div className="mt-6 flex items-center justify-center gap-3 text-sm text-cream/75">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy/60 text-gold">
                <User className="h-4 w-4" />
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
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mx-auto max-w-[1300px] px-6 lg:px-10 pt-8 text-xs text-navy-deep/60"
      >
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link to="/" className="hover:text-coffee">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link to="/blog" className="hover:text-coffee">
              Coffee Journal
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-navy-deep font-medium">{article.category}</li>
        </ol>
      </nav>

      <main className="mx-auto max-w-[1300px] px-6 lg:px-10 py-10">
        <div className="grid lg:grid-cols-[260px_1fr] gap-10">
          {/* Menu Board */}
          <aside className="order-first">
            <MenuBoard />
          </aside>

          <div className="min-w-0 max-w-[760px]">
            {/* The Brew */}
            <section data-reveal aria-labelledby="the-brew" className="mb-14">
              <SectionHeading
                id="the-brew"
                name="The Brew"
                intro="Poured slowly — the main idea, one steady drip at a time."
              />
              <div className="space-y-5 text-[17px] leading-[1.85] text-navy-deep/80">
                <p>
                  Nobody rushes filter coffee. You add the decoction, you wait,
                  and the flavour arrives on its own schedule. Grammar behaves
                  the same way. Most learners try to memorise twelve tenses in a
                  weekend, then wonder why nothing surfaces in conversation.
                </p>
                <p>
                  The alternative is slower and far more effective: take one
                  tense, use it in your own sentences for a week, and let it
                  settle before adding the next. Fluency is not the result of
                  knowing more rules. It is the result of a few rules becoming
                  automatic.
                </p>
                <h3 className="font-serif text-2xl text-navy-deep pt-4">
                  Why speed fails
                </h3>
                <p>
                  When you cram, you build recognition, not production. You can
                  spot the right answer in a multiple-choice test but freeze when
                  a colleague asks about your weekend. Recognition is instant
                  coffee. Production is the real brew.
                </p>
                <h3 className="font-serif text-2xl text-navy-deep pt-4">
                  The one-tense week
                </h3>
                <p>
                  Choose a tense on Monday. Write three true sentences about your
                  own life each day. Say them aloud. By Sunday you will have
                  twenty-one sentences you actually mean — and a structure that
                  no longer needs translating in your head.
                </p>
              </div>
            </section>

            {/* Coffee Sip */}
            <section data-reveal aria-label="Coffee Sip" className="mb-14">
              <div className="rounded-2xl bg-white border-l-4 border-gold border border-border/60 shadow-[var(--shadow-card)] p-7">
                <span className="rounded-full bg-gold/20 text-coffee px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider">
                  Coffee Sip
                </span>
                <p className="mt-4 font-serif text-2xl leading-snug text-navy-deep italic">
                  “One tense, used honestly for seven days, beats twelve tenses
                  memorised in one night.”
                </p>
                <p className="mt-3 text-sm text-navy-deep/60">
                  A single sip you can carry with you.
                </p>
              </div>
            </section>

            {/* What's Brewing */}
            <section data-reveal aria-labelledby="whats-brewing" className="mb-14">
              <SectionHeading
                id="whats-brewing"
                name="What's Brewing"
                intro="What's waiting in the cup by the end of this read."
              />
              <ul className="rounded-2xl bg-white border border-border/60 shadow-[var(--shadow-card)] p-7 space-y-3 text-[15px] text-navy-deep/80">
                {[
                  "Why slow, repeated use beats rule memorisation",
                  "How to run a focused one-tense week",
                  "Four tense patterns with natural example sentences",
                  "Four vocabulary items you can use the same day",
                  "The four mistakes that quietly cost you marks",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Premium Brew Notes */}
            <section data-reveal aria-labelledby="premium-brew-notes" className="mb-14">
              <SectionHeading
                id="premium-brew-notes"
                name="Premium Brew Notes"
                intro="Small refinements the regulars at the counter already know."
              />
              <aside className="rounded-2xl bg-[color:var(--beige)] border border-border/60 p-7 space-y-4 text-[15px] leading-relaxed text-navy-deep/80">
                <p>
                  Record yourself once a week. Hearing your own sentences is the
                  fastest way to notice a tense slipping.
                </p>
                <p>
                  Keep a single notebook page per tense. When it fills, that
                  tense has genuinely settled.
                </p>
                <p>
                  Practise with real content — your work, your family, your
                  commute. Invented sentences fade; true ones stay.
                </p>
              </aside>
            </section>

            {/* Grammar, Filtered */}
            <section data-reveal aria-labelledby="grammar-filtered" className="mb-14">
              <SectionHeading
                id="grammar-filtered"
                name="Grammar, Filtered"
                intro="The grounds removed — just the clear, usable structure."
              />
              <div className="grid gap-5 sm:grid-cols-2">
                {grammarExamples.map((g) => (
                  <div
                    key={g.rule}
                    className="rounded-2xl bg-white border border-border/60 shadow-[var(--shadow-card)] p-6"
                  >
                    <h3 className="font-serif text-lg text-navy-deep">
                      {g.rule}
                    </h3>
                    <p className="mt-3 text-[15px] text-navy-deep/85 italic">
                      “{g.example}”
                    </p>
                    <p className="mt-3 text-sm text-navy-deep/65 leading-relaxed">
                      {g.note}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Tasting Notes */}
            <section data-reveal aria-labelledby="tasting-notes" className="mb-14">
              <SectionHeading
                id="tasting-notes"
                name="Tasting Notes"
                intro="Four words worth holding on the tongue a moment longer."
              />
              <div className="grid gap-5 sm:grid-cols-2">
                {vocabulary.map((v) => (
                  <div
                    key={v.word}
                    className="rounded-2xl bg-white border border-border/60 shadow-[var(--shadow-card)] p-6"
                  >
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-xl text-navy-deep">
                        {v.word}
                      </h3>
                    </div>
                    <p className="mt-2 text-sm text-navy-deep/75 leading-relaxed">
                      {v.meaning}
                    </p>
                    <p className="mt-3 pt-3 border-t border-border/60 text-[15px] text-navy-deep/85 italic">
                      “{v.example}”
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Bitter Notes */}
            <section data-reveal aria-labelledby="bitter-notes" className="mb-14">
              <SectionHeading
                id="bitter-notes"
                name="Bitter Notes"
                intro="Over-extracted habits that leave a sharp aftertaste."
              />
              <div className="rounded-2xl bg-white border-l-4 border-coffee border border-border/60 shadow-[var(--shadow-card)] p-7 space-y-5">
                {mistakes.map((m) => (
                  <div
                    key={m.wrong}
                    className="grid gap-3 md:grid-cols-2 pb-5 border-b border-border/60 last:border-0 last:pb-0"
                  >
                    <div>
                      <span className="rounded-full bg-coffee/15 text-coffee px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider">
                        Incorrect
                      </span>
                      <p className="mt-2 text-[15px] text-navy-deep/70 line-through decoration-coffee/40">
                        {m.wrong}
                      </p>
                    </div>
                    <div>
                      <span className="rounded-full bg-gold/20 text-coffee px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider">
                        Correct
                      </span>
                      <p className="mt-2 text-[15px] text-navy-deep font-medium">
                        {m.right}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Grind & Practice */}
            <section data-reveal aria-labelledby="grind-practice" className="mb-14">
              <SectionHeading
                id="grind-practice"
                name="Grind & Practice"
                intro="A little effort at the mill — this is where flavour comes from."
              />
              <div className="rounded-2xl bg-white border border-border/60 shadow-[var(--shadow-card)] p-7 space-y-5">
                {exercises.map((ex, i) => (
                  <div
                    key={ex.q}
                    className="pb-5 border-b border-border/60 last:border-0 last:pb-0"
                  >
                    <p className="text-[15px] text-navy-deep/85">
                      <span className="font-semibold text-coffee mr-2">
                        {i + 1}.
                      </span>
                      {ex.q}
                    </p>
                    <button
                      type="button"
                      aria-expanded={!!revealed[i]}
                      onClick={() =>
                        setRevealed((r) => ({ ...r, [i]: !r[i] }))
                      }
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-coffee hover:text-gold transition-colors"
                    >
                      {revealed[i] ? "Hide answer" : "Reveal answer"}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                    {revealed[i] && (
                      <p className="mt-3 rounded-xl bg-[color:var(--beige)] px-4 py-3 text-[15px] text-navy-deep">
                        {ex.a}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Coffee Break Challenge */}
            <section data-reveal aria-labelledby="coffee-break" className="mb-14">
              <SectionHeading
                id="coffee-break"
                name="Coffee Break Challenge"
                intro="Five minutes, one cup, one small win."
              />
              <div className="rounded-2xl bg-navy-deep text-cream border border-border/60 shadow-[var(--shadow-card)] p-8">
                <span className="rounded-full bg-gold text-navy-deep px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
                  Today's Challenge
                </span>
                <h3 className="mt-4 font-serif text-2xl text-cream">
                  Write three true sentences about yesterday, and three about
                  this week.
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-cream/75">
                  Use Past Simple for yesterday and Present Perfect for this
                  week. Read all six aloud before your coffee goes cold.
                </p>
              </div>
            </section>

            {/* Last Sip */}
            <section data-reveal aria-labelledby="last-sip" className="mb-14">
              <SectionHeading
                id="last-sip"
                name="Last Sip"
                intro="The final mouthful — what stays with you after the cup."
              />
              <ul className="rounded-2xl bg-[color:var(--beige)] border border-border/60 p-7 space-y-3 text-[15px] text-navy-deep/80">
                {[
                  "Depth beats coverage: one tense a week is enough.",
                  "Produce sentences you actually mean — they stick.",
                  "Say it aloud; silent study hides your errors.",
                  "Review your own writing before chasing new rules.",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                      aria-hidden
                    />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Meet the Roaster */}
            <section data-reveal aria-labelledby="meet-the-roaster" className="mb-14">
              <SectionHeading
                id="meet-the-roaster"
                name="Meet the Roaster"
                intro="The hands behind the blend."
              />
              <div className="rounded-2xl bg-white border border-border/60 shadow-[var(--shadow-card)] p-7 flex flex-col sm:flex-row gap-6 items-start">
                <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-beige text-coffee">
                  <User className="h-8 w-8" strokeWidth={1.4} />
                </span>
                <div>
                  <h3 className="font-serif text-xl text-navy-deep">
                    {article.author}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.2em] text-coffee mt-1">
                    Chief Brewer of Confidence
                  </p>
                  <p className="mt-3 text-[15px] leading-relaxed text-navy-deep/75">
                    English educator and teacher trainer, writing about grammar,
                    vocabulary and classroom practice for learners and teachers
                    across South India.
                  </p>
                  <Link
                    to="/about"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-coffee hover:text-gold transition-colors"
                  >
                    More about the roaster <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* Next Cup / Previous Cup */}
            <section data-reveal aria-label="Article navigation" className="mb-14">
              <div className="grid gap-5 sm:grid-cols-2">
                <Link
                  to="/blog"
                  className="rounded-2xl bg-white border border-border/60 shadow-[var(--shadow-card)] p-6 transition-all hover:-translate-y-1"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-coffee">
                    Previous Cup
                  </span>
                  <p className="mt-2 font-serif text-lg text-navy-deep">
                    Reading Slowly on Purpose: A Strategy Most Students Skip
                  </p>
                </Link>
                <Link
                  to="/blog"
                  className="rounded-2xl bg-white border border-border/60 shadow-[var(--shadow-card)] p-6 transition-all hover:-translate-y-1 sm:text-right"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-coffee">
                    Next Cup
                  </span>
                  <p className="mt-2 font-serif text-lg text-navy-deep">
                    5 Vocabulary Swaps That Instantly Sound More IELTS-Band-9
                  </p>
                </Link>
              </div>
            </section>

            {/* Table Talk */}
            <section data-reveal aria-labelledby="table-talk" className="mb-4">
              <SectionHeading
                id="table-talk"
                name="Table Talk"
                intro="Pull up a chair — conversation opens here soon."
              />
              <div className="rounded-2xl border border-dashed border-border bg-white p-12 text-center">
                <Coffee className="mx-auto h-10 w-10 text-coffee/60 mb-4" />
                <p className="font-serif text-xl text-navy-deep">
                  Comments are brewing.
                </p>
                <p className="text-sm text-navy-deep/60 mt-2">
                  Placeholder only — discussion is not live yet.
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* More From the Menu */}
        <section data-reveal aria-labelledby="more-from-the-menu" className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <Coffee className="h-5 w-5 text-coffee" />
            <h2
              id="more-from-the-menu"
              className="font-serif text-2xl text-navy-deep"
            >
              More From the Menu
            </h2>
            <span className="h-px flex-1 bg-border" />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.id} a={a} />
            ))}
          </div>
        </section>
      </main>

      {/* Stay Brewed — Newsletter */}
      <section data-reveal className="mt-16 bg-[color:var(--beige)]">
        <div className="mx-auto max-w-[900px] px-6 lg:px-10 py-20 text-center">
          <Mail className="mx-auto h-10 w-10 text-coffee mb-5" strokeWidth={1.4} />
          <h2 className="font-serif text-4xl text-navy-deep">Stay Brewed</h2>
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
