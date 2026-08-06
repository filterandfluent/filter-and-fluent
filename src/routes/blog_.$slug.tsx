import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Bookmark,
  BookOpen,
  Brain,
  Clock,
  Coffee,
  Ear,
  Facebook,
  Link2,
  Linkedin,
  Download,
  FileText,
  Headphones,
  ListChecks,
  MessagesSquare,
  Mic,
  PenLine,
  Share2,
  Sparkles,
  Table,
  Target,
  Twitter,
  User,
  Youtube,
} from "lucide-react";

import {
  BlockHeading,
  BrewNotes,
  ChallengeBoard,
  CoffeeSip,
  ComparisonStack,
  DataTable,
  DefinitionCard,
  ExampleGrid,
  ExerciseList,
  GrammarCard,
  InfoBox,
  Infographic,
  MistakeList,
  OutcomeGrid,
  ResourceShelf,
  TakeawayGrid,
  VocabularyCard,
  type Challenge,
  type ComparisonItem,
  type ExampleItem,
  type Exercise,
  type Mistake,
  type Outcome,
  type ResourceItem,
  type Takeaway,
} from "../components/article/blocks";

import {
  AuthorProfile,
  ClosingCTA,
  CommentsPlaceholder,
  FooterSectionHeading,
  NewsletterCTA,
  PrevNextNav,
  RelatedArticles,
  ShareArticleBar,
  type AdjacentArticle,
  type RelatedArticle,
} from "../components/article/footer-sections";

import {
  ArticleInfoBar,
  Checklist,
  ComparisonTable,
  ExampleDialogue,
  HighlightCards,
  KeepBrewingCTA,
  LearningProgressChips,
  LearningToolkit,
  PremiumCallout,
  ProcessSteps,
  QuickNav,
  Timeline,
  type ArticleInfo,
  type QuickNavItem,
} from "../components/article/learning-blocks";

import featuredImage from "../assets/card-articles.jpg";
import secondaryImage from "../assets/about-coffee.jpg";
import relatedImageOne from "../assets/card-books.jpg";
import relatedImageTwo from "../assets/card-resources.jpg";
import relatedImageThree from "../assets/card-workshops.jpg";


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
  { id: "coffee-sip", label: "Coffee Sip" },
  { id: "what-youll-learn", label: "What You'll Learn" },
  { id: "main-content", label: "Main Content" },
  { id: "brew-notes", label: "Premium Brew Notes" },
  { id: "real-life", label: "Real-Life Examples" },
  { id: "visual-blocks", label: "At a Glance" },
  { id: "in-practice", label: "In Practice" },
  { id: "common-mistakes", label: "Common Mistakes" },
  { id: "comparisons", label: "Comparisons" },
  { id: "quick-practice", label: "Quick Practice" },
  { id: "coffee-break", label: "Coffee Break Challenge" },
  { id: "key-points", label: "Key Points" },
  { id: "closing-notes", label: "Closing Notes" },
  { id: "key-takeaways", label: "Key Takeaways" },
  { id: "callout-library", label: "Notes & Callouts" },
  { id: "visual-library", label: "Visual Learning" },
  { id: "resources", label: "Learning Resources" },
  { id: "learning-toolkit", label: "Your Learning Toolkit" },
  { id: "related-articles", label: "Continue Your Learning" },
  { id: "author", label: "About the Author" },
  { id: "newsletter", label: "Newsletter" },
  { id: "share", label: "Share This Article" },
  { id: "comments", label: "Discussion" },
];


/* ---------- Reusable lesson content (per-article data) ---------- */
const outcomes: Outcome[] = [
  {
    icon: Brain,
    heading: "Understand the concept",
    detail: "See the idea explained in plain, everyday English — no jargon.",
  },
  {
    icon: AlertTriangle,
    heading: "Recognise common mistakes",
    detail: "Learn the slips most learners make, and how to avoid them.",
  },
  {
    icon: Mic,
    heading: "Improve speaking confidence",
    detail: "Practise short lines you can use in real conversations today.",
  },
  {
    icon: Target,
    heading: "Apply the lesson naturally",
    detail: "Carry the pattern into work, class and daily talk with ease.",
  },
];

const examples: ExampleItem[] = [
  {
    context: "Everyday Conversations",
    lines: [
      "“Shall we grab a coffee after class?”",
      "“I'd love to — give me ten minutes.”",
    ],
    note: "Friendly, everyday tone.",
  },
  {
    context: "Social Interactions",
    lines: [
      "“I usually walk to the market in the evening.”",
      "“The milk boils over if you leave it too long.”",
    ],
  },
  {
    context: "School Situations",
    lines: [
      "“Could you explain that question once more, please?”",
      "“I've finished the first two sections already.”",
    ],
  },
  {
    context: "Workplace Communication",
    lines: [
      "“I'll send the revised draft before six.”",
      "“Let's align on this in tomorrow's stand-up.”",
    ],
  },
  {
    context: "Travel English",
    lines: [
      "“Does this bus stop near the temple?”",
      "“We're checking out at eleven.”",
    ],
  },
];

const mistakes: Mistake[] = [
  {
    incorrect: "I am agree with you.",
    correct: "I agree with you.",
    explanation: "“Agree” is a verb on its own — it does not need “am”.",
  },
  {
    incorrect: "He is having two sisters.",
    correct: "He has two sisters.",
    explanation: "Possession uses the simple present, not the continuous.",
  },
  {
    incorrect: "I am living here since 2019.",
    correct: "I have been living here since 2019.",
    explanation: "“Since” pairs with the present perfect continuous.",
  },
];

const comparisons: ComparisonItem[] = [
  {
    kind: "Correct vs Incorrect",
    leftLabel: "Incorrect",
    rightLabel: "Correct",
    left: ["She don't like coffee.", "Discuss about the plan."],
    right: ["She doesn't like coffee.", "Discuss the plan."],
  },
  {
    kind: "Before vs After",
    leftLabel: "Before",
    rightLabel: "After",
    left: ["The thing was very good.", "I did a mistake."],
    right: ["The session was genuinely useful.", "I made a mistake."],
  },
  {
    kind: "Formal vs Informal",
    leftLabel: "Informal",
    rightLabel: "Formal",
    left: ["Can you send it soon?", "Thanks a lot!"],
    right: [
      "Could you please share it at your earliest convenience?",
      "Thank you for your support.",
    ],
  },
  {
    kind: "Vocabulary Upgrade",
    leftLabel: "Everyday word",
    rightLabel: "Stronger choice",
    left: ["very tired", "good idea"],
    right: ["exhausted", "compelling idea"],
  },
  {
    kind: "Speaking Tip vs Writing Tip",
    leftLabel: "Speaking",
    rightLabel: "Writing",
    left: ["Use short clauses and pause for breath."],
    right: ["Join ideas with linkers and vary sentence length."],
  },
];

const exercises: Exercise[] = [
  {
    type: "Multiple Choice",
    prompt: "Choose the correct sentence.",
    options: [
      "She don't drink filter coffee.",
      "She doesn't drink filter coffee.",
      "She not drink filter coffee.",
    ],
    answer: "B — with “she”, the negative takes “doesn't”.",
  },
  {
    type: "Fill in the Blanks",
    prompt: "I ______ (live) in Madurai since 2018.",
    answer: "have been living — “since” signals the present perfect continuous.",
  },
  {
    type: "Sentence Correction",
    prompt: "Correct this: “He is having a car.”",
    answer: "He has a car.",
  },
  {
    type: "Match the Following",
    prompt: "Match each expression to its register.",
    pairs: [
      { left: "Thanks a lot!", right: "Informal" },
      { left: "I appreciate your help.", right: "Formal" },
      { left: "Catch you later.", right: "Casual" },
    ],
    answer: "Informal · Formal · Casual, in that order.",
  },
  {
    type: "Writing Prompt",
    prompt:
      "Write four sentences about your morning routine using today's pattern.",
  },
  {
    type: "Speaking Prompt",
    prompt:
      "Record yourself describing your favourite café for sixty seconds.",
  },
  {
    type: "Reflection Question",
    prompt: "Which part of this lesson felt easiest, and why?",
  },
];

const challenges: Challenge[] = [
  {
    title: "Speaking Challenge",
    task: "Say three sentences aloud using today's structure — slowly, then naturally.",
    icon: Mic,
  },
  {
    title: "Writing Challenge",
    task: "Write a five-line message to a friend using two new expressions.",
    icon: PenLine,
  },
  {
    title: "Vocabulary Challenge",
    task: "Upgrade three everyday words from your last conversation.",
    icon: BookOpen,
  },
  {
    title: "One Minute Fluency",
    task: "Speak for sixty seconds without stopping. Don't edit — just flow.",
    icon: Clock,
  },
  {
    title: "Reflection Activity",
    task: "Note one sentence you'd like to use tomorrow, and where.",
    icon: Ear,
  },
];

const takeaways: Takeaway[] = [
  {
    label: "Main Rule",
    points: [
      "Match the verb form to the subject, every time.",
      "“Since” asks for a perfect tense.",
    ],
  },
  {
    label: "Quick Revision",
    points: [
      "Read the comparison cards once more.",
      "Re-do the two correction exercises from memory.",
    ],
  },
  {
    label: "Important Reminder",
    points: [
      "Accuracy grows out of noticing, not memorising.",
      "One clean sentence beats three uncertain ones.",
    ],
  },
  {
    label: "Coffee Wisdom",
    points: [
      "Fluency is brewed slowly — a little every day.",
      "Speak before you feel ready; confidence follows use.",
    ],
  },
];

const resources: ResourceItem[] = [
  { label: "Download Premium Notes (PDF)", hint: "Full lesson notes — coming soon", icon: FileText },
  { label: "Download Practice Worksheet", hint: "Printable practice sheet — coming soon", icon: Download },
  { label: "Download Answer Key", hint: "Model answers & explanations — coming soon", icon: ListChecks },
  { label: "Watch YouTube Lesson", hint: "Video walkthrough — coming soon", icon: Youtube },
  { label: "Listen to Audio Lesson", hint: "Audio version — coming soon", icon: Headphones },
  { label: "Interactive Quiz", hint: "Coming soon", icon: Brain },
];

const relatedArticles: RelatedArticle[] = [
  {
    slug: "grammar-that-sounds-natural",
    title: "Grammar That Sounds Natural, Not Textbook",
    excerpt:
      "Small shifts in word order and rhythm that make correct English also sound warm and human.",
    category: "Grammar Tips",
    readingTime: 7,
    image: relatedImageOne,
  },
  {
    slug: "vocabulary-worth-keeping",
    title: "Vocabulary Worth Keeping: Words You'll Actually Use",
    excerpt:
      "How to choose fewer words, learn them deeply, and carry them into real conversations.",
    category: "Vocabulary",
    readingTime: 6,
    image: relatedImageTwo,
  },
  {
    slug: "speaking-with-quiet-confidence",
    title: "Speaking With Quiet Confidence",
    excerpt:
      "A gentle daily routine for learners who understand English but hesitate to speak it.",
    category: "Speaking",
    readingTime: 9,
    image: relatedImageThree,
  },
];

const previousArticle: AdjacentArticle = {
  slug: "grammar-that-sounds-natural",
  title: "Grammar That Sounds Natural, Not Textbook",
  preview:
    "The quiet rules that turn correct sentences into comfortable ones.",
};

const nextArticle: AdjacentArticle = {
  slug: "speaking-with-quiet-confidence",
  title: "Speaking With Quiet Confidence",
  preview:
    "Ten minutes a day, one honest sentence at a time — the slow brew method.",
};


const articleInfo: ArticleInfo = {
  category: "Grammar Tips",
  topic: "Everyday Tenses",
  readingTime: 8,
  skillLevel: "Intermediate",
  activities: 7,
  downloads: 6,
};

const QUICK_NAV: QuickNavItem[] = [
  { id: "main-content", label: "Jump to Lesson" },
  { id: "quick-practice", label: "Jump to Practice" },
  { id: "coffee-break", label: "Coffee Break Challenge" },
  { id: "key-takeaways", label: "Key Takeaways" },
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
  "space-y-5 text-[17px] leading-[1.8] text-navy-deep/85 md:text-[18px] [text-wrap:pretty]";
const PAD = "p-6 md:p-8";

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


/* ---------- Page ---------- */
function ArticlePage() {
  const active = useActiveSection();
  const progress = useReadingProgress();
  const [bookmarked, setBookmarked] = useState(false);
  useSectionReveal();

  return (
    <div className="min-h-screen scroll-smooth bg-[oklch(0.98_0.015_80)] text-navy-deep">
      <ProgressBar progress={progress} />
      <QuickNav items={QUICK_NAV} />

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

      {/* Learning progress chips */}
      <div className="mx-auto max-w-[1100px] px-6 pt-8 lg:px-10">
        <LearningProgressChips
          meta={{
            progress,
            readingTime: article.readingTime,
            lastUpdated: formatDate(article.publishedDate),
            difficulty: article.difficulty,
            level: "Intermediate",
          }}
        />
      </div>

      {/* Article information bar */}
      <div data-reveal className="mx-auto max-w-[1300px] px-6 pt-8 lg:px-10">
        <ArticleInfoBar info={articleInfo} />
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
            <section data-reveal aria-labelledby="introduction" className="mb-12 md:mb-16">
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

            {/* Coffee Sip */}
            <section data-reveal aria-labelledby="coffee-sip" className="mb-12 md:mb-16">
              <h2 id="coffee-sip" className="sr-only scroll-mt-28">
                Coffee Sip
              </h2>
              <CoffeeSip>
                <p>
                  Before the lesson begins, take one slow sip. English isn't a
                  test you pass — it's a language you live in, one small,
                  everyday sentence at a time.
                </p>
              </CoffeeSip>
            </section>

            {/* What You'll Learn */}
            <section data-reveal aria-labelledby="what-youll-learn" className="mb-12 md:mb-16">
              <BlockHeading
                id="what-youll-learn"
                name="What You'll Learn"
                icon={Target}
                intro="Four calm outcomes to carry with you after this cup."
              />
              <OutcomeGrid items={outcomes} />
            </section>

            {/* Main Content */}
            <section data-reveal aria-labelledby="main-content" className="mb-12 md:mb-16">
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
            <section data-reveal aria-labelledby="brew-notes" className="mb-12 md:mb-16">
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
            <section data-reveal aria-labelledby="real-life" className="mb-12 md:mb-16">
              <BlockHeading
                id="real-life"
                name="Real-Life Examples"
                icon={MessagesSquare}
                intro="How the lesson sounds in the places you actually use English."
              />
              <ExampleGrid items={examples} />
            </section>

            {/* Visual toolkit */}
            <section data-reveal aria-labelledby="visual-blocks" className="mb-12 md:mb-16">
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
            <section data-reveal aria-label="Pull quote" className="mb-12 md:mb-16">
              <QuoteBlock
                quote="A pull-quote goes here — one memorable line, poured slowly."
                attribution="Attribution or source line"
              />
            </section>

            {/* In Practice */}
            <section data-reveal aria-labelledby="in-practice" className="mb-12 md:mb-16">
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
            <section data-reveal aria-labelledby="common-mistakes" className="mb-12 md:mb-16">
              <BlockHeading
                id="common-mistakes"
                name="Common Mistakes"
                icon={AlertTriangle}
                intro="The bitter notes — spot them once, avoid them for good."
              />
              <MistakeList items={mistakes} />
            </section>

            {/* Comparisons */}
            <section data-reveal aria-labelledby="comparisons" className="mb-12 md:mb-16">
              <BlockHeading
                id="comparisons"
                name="Grammar &amp; Vocabulary Comparison"
                icon={Sparkles}
                intro="Two cups, side by side, so the difference is easy to taste."
              />
              <ComparisonStack items={comparisons} />
            </section>

            {/* Quick Practice */}
            <section data-reveal aria-labelledby="quick-practice" className="mb-12 md:mb-16">
              <BlockHeading
                id="quick-practice"
                name="Quick Practice"
                icon={PenLine}
                intro="Grind and practise — answers stay tucked away until you're ready."
              />
              <ExerciseList items={exercises} />
            </section>

            {/* Coffee Break Challenge */}
            <section data-reveal aria-labelledby="coffee-break" className="mb-12 md:mb-16">
              <h2 id="coffee-break" className="sr-only scroll-mt-28">
                Coffee Break Challenge
              </h2>
              <ChallengeBoard
                intro="Five small tasks to finish before your cup goes cold."
                items={challenges}
              />
            </section>

            {/* Key Points */}
            <section data-reveal aria-labelledby="key-points" className="mb-12 md:mb-16">
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
            <section data-reveal aria-labelledby="closing-notes" className="mb-12 md:mb-16">
              <SectionHeading id="closing-notes" name="Closing Notes" />
              <div className={PROSE}>
                <p>
                  A closing paragraph rounds off the article and leaves the
                  reader with the last sip.
                </p>
              </div>
            </section>

            {/* Key Takeaways */}
            <section data-reveal aria-labelledby="key-takeaways" className="mb-12 md:mb-16">
              <BlockHeading
                id="key-takeaways"
                name="Key Takeaways"
                icon={ListChecks}
                intro="The last sip — everything worth carrying out of the café."
              />
              <TakeawayGrid items={takeaways} />
            </section>

            {/* Notes & Callouts */}
            <section data-reveal aria-labelledby="callout-library" className="mb-12 md:mb-16">
              <BlockHeading
                id="callout-library"
                name="Notes &amp; Callouts"
                icon={Sparkles}
                intro="The margin notes of this lesson — tips, warnings and wisdom."
              />
              <div className="space-y-5">
                <PremiumCallout tone="pro-tip" title="Say it slowly first">
                  <p>
                    Practise each new pattern at half speed before you use it in
                    conversation — accuracy first, pace later.
                  </p>
                </PremiumCallout>
                <PremiumCallout tone="mistake">
                  <p>
                    Avoid adding “am/is/are” to verbs that already carry meaning
                    on their own: “I agree”, not “I am agree”.
                  </p>
                </PremiumCallout>
                <PremiumCallout tone="remember">
                  <p>
                    “Since” points to a starting moment, so it prefers a perfect
                    tense beside it.
                  </p>
                </PremiumCallout>
                <PremiumCallout tone="wisdom">
                  <p>
                    Fluency is brewed, not poured. Ten quiet minutes a day beats
                    one long, anxious hour.
                  </p>
                </PremiumCallout>
                <PremiumCallout tone="exam">
                  <p>
                    In exams, read the subject before you choose the verb form —
                    most lost marks hide there.
                  </p>
                </PremiumCallout>
                <PremiumCallout tone="vocabulary">
                  <p>
                    Upgrade “very tired” to “exhausted”, and “good idea” to
                    “compelling idea”. One stronger word replaces two weak ones.
                  </p>
                </PremiumCallout>
              </div>
            </section>

            {/* Visual Learning */}
            <section data-reveal aria-labelledby="visual-library" className="mb-12 md:mb-16">
              <BlockHeading
                id="visual-library"
                name="Visual Learning"
                icon={Table}
                intro="Tables, timelines, steps and dialogues — the lesson seen at a glance."
              />
              <div className="space-y-6">
                <ComparisonTable
                  caption="Comparison table"
                  columns={["Situation", "Weaker choice", "Stronger choice"]}
                  rows={[
                    ["Email opener", "Hi, hope you are fine.", "I hope this note finds you well."],
                    ["Asking politely", "Send it fast.", "Could you share it by this evening?"],
                    ["Describing work", "It was very good.", "It was genuinely useful."],
                  ]}
                />
                <Timeline
                  items={[
                    {
                      time: "Day 1",
                      title: "Notice the pattern",
                      detail: "Read the lesson once and mark two sentences you like.",
                    },
                    {
                      time: "Day 3",
                      title: "Use it out loud",
                      detail: "Say four sentences with the structure, slowly.",
                    },
                    {
                      time: "Day 7",
                      title: "Make it yours",
                      detail: "Use it in a real conversation without rehearsing.",
                    },
                  ]}
                />
                <ProcessSteps
                  steps={[
                    { title: "Read", detail: "Understand the rule in plain English." },
                    { title: "Rehearse", detail: "Repeat three model sentences aloud." },
                    { title: "Reuse", detail: "Carry one sentence into today's talk." },
                  ]}
                />
                <Checklist
                  title="Before you close this page"
                  items={[
                    "I can explain the rule in one sentence.",
                    "I wrote two examples of my own.",
                    "I said one sentence aloud, twice.",
                    "I noted one word to upgrade this week.",
                  ]}
                />
                <HighlightCards
                  items={[
                    {
                      icon: Target,
                      heading: "Accuracy grows from noticing",
                      detail: "Spotting the pattern matters more than memorising it.",
                    },
                    {
                      icon: Mic,
                      heading: "Speak before you feel ready",
                      detail: "Confidence follows use — never the other way around.",
                    },
                  ]}
                />
                <ExampleDialogue
                  title="Example dialogue — at the coffee counter"
                  lines={[
                    { speaker: "You", line: "Could I have a filter coffee, please?" },
                    { speaker: "Server", line: "Of course. Strong or light?" },
                    { speaker: "You", line: "Strong, and a little less sugar." },
                    { speaker: "Server", line: "Certainly — it'll be two minutes." },
                  ]}
                  note="Notice how “could” keeps the request warm and polite."
                />
              </div>
            </section>

            {/* Learning Resources */}
            <section data-reveal aria-labelledby="resources" className="mb-12 md:mb-16">
              <BlockHeading
                id="resources"
                name="Learning Resources"
                icon={Download}
                intro="Notes, worksheets and lessons to carry this cup beyond the page."
              />
              <ResourceShelf
                intro="These premium extras are being brewed — they'll unlock here as soon as they're ready."
                items={resources}
              />
            </section>

            {/* Previous / Next */}
            <section data-reveal aria-label="Article navigation" className="mb-4">
              <PrevNextNav previous={previousArticle} next={nextArticle} />
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
        <section data-reveal aria-labelledby="related-articles" className="mt-20 md:mt-24">
          <FooterSectionHeading
            id="related-articles"
            name="Continue Your Learning"
            icon={Coffee}
            intro="Three more cups from the Coffee Journal, chosen to follow this one."
          />
          <RelatedArticles items={relatedArticles} />
        </section>

        {/* Author */}
        <section data-reveal aria-labelledby="author" className="mt-20 md:mt-24">
          <FooterSectionHeading
            id="author"
            name="About the Author"
            icon={User}
            intro="The hands behind every brew on this journal."
          />
          <AuthorProfile
            name="Gnana Soundari Devaraj"
            title="Founder & Chief Brewer of Confidence"
            initials="GS"
            bio="English educator and TEFL-certified trainer with nine years in the classroom. She founded Filter & Fluent to teach English the way filter coffee is made — slowly, warmly, and with South Indian soul. Her lessons blend clear grammar, everyday vocabulary and gentle speaking practice."
          />
        </section>

        {/* Newsletter */}
        <section data-reveal aria-labelledby="newsletter" className="mt-20 md:mt-24">
          <h2 id="newsletter" className="sr-only scroll-mt-28">
            Newsletter
          </h2>
          <NewsletterCTA
            heading="☕ Brew Better English Every Week"
            subtitle="Join the Coffee Beans Community and receive weekly English lessons, vocabulary tips, worksheets, and exclusive learning resources."
          />
        </section>

        {/* Share */}
        <section data-reveal aria-labelledby="share" className="mt-20 md:mt-24">
          <h2 id="share" className="sr-only scroll-mt-28">
            Share This Article
          </h2>
          <ShareArticleBar title={article.title} />
        </section>

        {/* Comments */}
        <section data-reveal aria-labelledby="comments" className="mt-20 md:mt-24">
          <FooterSectionHeading
            id="comments"
            name="Discussion"
            icon={MessagesSquare}
          />
          <CommentsPlaceholder />
        </section>

        {/* Learning Toolkit */}
        <section data-reveal aria-labelledby="learning-toolkit" className="mt-20 md:mt-24">
          <h2 id="learning-toolkit" className="sr-only scroll-mt-28">
            Your Learning Toolkit
          </h2>
          <LearningToolkit />
        </section>

        {/* Closing CTA */}
        <section data-reveal aria-label="Keep learning" className="mt-20 md:mt-24">
          <ClosingCTA />
        </section>

        {/* Keep brewing */}
        <section data-reveal aria-label="Keep brewing your English" className="mt-20 md:mt-24">
          <KeepBrewingCTA
            links={[
              { to: "/blog", label: "Continue Learning", primary: true },
              { to: "/grammar", label: "Explore Grammar Library" },
              { to: "/vocabulary", label: "Explore Vocabulary Library" },
            ]}
          />
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
