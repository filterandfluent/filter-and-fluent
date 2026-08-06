import { useEffect, useState, type ComponentType, type ReactNode } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BookMarked,
  BookOpen,
  Brain,
  Check,
  ChevronRight,
  Clock,
  Coffee,
  Download,
  FileText,
  Gauge,
  GraduationCap,
  Headphones,
  Layers,
  Lightbulb,
  ListChecks,
  Sparkles,
  Tag,
  Target,
  Video,
} from "lucide-react";

/* ---------- Shared tokens (mirrors the article page) ---------- */
const CARD =
  "rounded-2xl bg-white border border-border/60 shadow-[var(--shadow-card)]";
const FOCUS =
  "outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--beige)]";
const LIFT =
  "transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_20px_50px_-15px_rgba(91,58,41,0.25)]";

/* =======================================================================
   SECTION 1 — Learning progress chips
   ===================================================================== */
export type LearningMeta = {
  progress: number;
  readingTime: number;
  lastUpdated: string;
  difficulty: string;
  level: "Beginner" | "Intermediate" | "Advanced" | string;
};

function Chip({
  icon: Icon,
  label,
  value,
  accent = false,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: ReactNode;
  accent?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs shadow-[var(--shadow-card)] transition-all duration-300 ease-out hover:-translate-y-0.5 ${
        accent
          ? "border-gold/50 bg-gold/15 text-coffee"
          : "border-border/60 bg-white text-navy-deep/75 hover:border-gold/50"
      }`}
    >
      <Icon className="h-3.5 w-3.5 shrink-0 text-gold" />
      <span className="font-semibold uppercase tracking-wider text-[10px] text-navy-deep/50">
        {label}
      </span>
      <span className="font-medium">{value}</span>
    </span>
  );
}

export function LearningProgressChips({ meta }: { meta: LearningMeta }) {
  const remaining = Math.max(
    0,
    Math.ceil(meta.readingTime * (1 - meta.progress / 100)),
  );
  return (
    <div
      className="flex flex-wrap items-center justify-center gap-3"
      aria-label="Learning progress"
    >
      <Chip
        icon={Gauge}
        label="Progress"
        value={`${meta.progress}% read`}
        accent
      />
      <Chip
        icon={Clock}
        label="Time left"
        value={remaining === 0 ? "Finished" : `${remaining} min`}
      />
      <Chip icon={FileText} label="Updated" value={meta.lastUpdated} />
      <Chip icon={Target} label="Difficulty" value={meta.difficulty} />
      <Chip icon={GraduationCap} label="Level" value={meta.level} />
    </div>
  );
}

/* =======================================================================
   SECTION 2 — Article information bar
   ===================================================================== */
export type ArticleInfo = {
  category: string;
  topic: string;
  readingTime: number;
  skillLevel: string;
  activities: number;
  downloads: number;
};

export function ArticleInfoBar({ info }: { info: ArticleInfo }) {
  const cells: Array<{
    icon: ComponentType<{ className?: string }>;
    label: string;
    value: string;
  }> = [
    { icon: Tag, label: "Category", value: info.category },
    { icon: BookOpen, label: "Topic", value: info.topic },
    { icon: Clock, label: "Reading time", value: `${info.readingTime} min` },
    { icon: GraduationCap, label: "Skill level", value: info.skillLevel },
    {
      icon: ListChecks,
      label: "Practice activities",
      value: `${info.activities} activities`,
    },
    {
      icon: Download,
      label: "Downloadables",
      value: `${info.downloads} resources`,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {cells.map((c) => (
        <div key={c.label} className={`${CARD} ${LIFT} p-4`}>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/15 text-coffee">
            <c.icon className="h-4 w-4" />
          </span>
          <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-navy-deep/50">
            {c.label}
          </p>
          <p className="mt-1 text-sm font-medium leading-snug text-navy-deep">
            {c.value}
          </p>
        </div>
      ))}
    </div>
  );
}

/* =======================================================================
   SECTION 3 — Floating quick navigation
   ===================================================================== */
export type QuickNavItem = { id: string; label: string };

export function QuickNav({ items }: { items: QuickNavItem[] }) {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setOpen(false);
  };

  return (
    <div
      className={`fixed bottom-6 right-5 z-40 flex flex-col items-end gap-2 transition-all duration-300 ease-out ${
        visible
          ? "pointer-events-auto opacity-100 translate-y-0"
          : "pointer-events-none opacity-0 translate-y-3"
      }`}
    >
      <div
        id="quick-nav-panel"
        className={`flex flex-col items-end gap-2 transition-all duration-300 ease-out ${
          open ? "opacity-100" : "pointer-events-none opacity-0 translate-y-2"
        }`}
      >
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => jump(item.id)}
            className={`${CARD} ${FOCUS} group flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-navy-deep transition-all duration-300 ease-out hover:-translate-x-1 hover:border-gold/60 hover:text-coffee focus-visible:ring-offset-white`}
          >
            <ChevronRight className="h-3.5 w-3.5 text-gold transition-transform duration-300 group-hover:translate-x-0.5" />
            {item.label}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="quick-nav-panel"
        aria-label="Quick navigation"
        className={`${FOCUS} inline-flex items-center gap-2 rounded-full border border-gold/60 bg-navy-deep px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gold shadow-[var(--shadow-luxury)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-navy focus-visible:ring-offset-white`}
      >
        <Coffee
          className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-12" : ""}`}
        />
        Jump to
      </button>
    </div>
  );
}

/* =======================================================================
   SECTION 4 — Premium callout components
   ===================================================================== */
export type CalloutTone =
  | "pro-tip"
  | "mistake"
  | "remember"
  | "wisdom"
  | "exam"
  | "vocabulary";

const CALLOUTS: Record<
  CalloutTone,
  {
    label: string;
    emoji: string;
    icon: ComponentType<{ className?: string }>;
    frame: string;
    badge: string;
  }
> = {
  "pro-tip": {
    label: "Pro Tip",
    emoji: "💡",
    icon: Lightbulb,
    frame: "border-l-gold bg-gold/[0.07]",
    badge: "bg-gold/20 text-coffee",
  },
  mistake: {
    label: "Common Mistake",
    emoji: "⚠",
    icon: AlertTriangle,
    frame: "border-l-[color:var(--coffee)] bg-[color:var(--beige)]/70",
    badge: "bg-coffee/15 text-coffee",
  },
  remember: {
    label: "Remember This",
    emoji: "📖",
    icon: BookMarked,
    frame: "border-l-[color:var(--navy)] bg-navy/[0.04]",
    badge: "bg-navy/10 text-navy-deep",
  },
  wisdom: {
    label: "Coffee Wisdom",
    emoji: "☕",
    icon: Coffee,
    frame: "border-l-[color:var(--coffee)] bg-coffee/[0.06]",
    badge: "bg-coffee/15 text-coffee",
  },
  exam: {
    label: "Exam Tip",
    emoji: "🎯",
    icon: Target,
    frame: "border-l-gold bg-[color:var(--beige)]/60",
    badge: "bg-gold/25 text-coffee",
  },
  vocabulary: {
    label: "Vocabulary Upgrade",
    emoji: "✨",
    icon: Sparkles,
    frame: "border-l-gold bg-gold/[0.05]",
    badge: "bg-gold/20 text-coffee",
  },
};

export function PremiumCallout({
  tone,
  title,
  children,
}: {
  tone: CalloutTone;
  title?: string;
  children: ReactNode;
}) {
  const cfg = CALLOUTS[tone];
  const Icon = cfg.icon;
  return (
    <aside
      className={`rounded-2xl border border-border/60 border-l-4 ${cfg.frame} p-6 shadow-[var(--shadow-card)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-15px_rgba(91,58,41,0.25)]`}
    >
      <div className="flex items-center gap-2.5">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full ${cfg.badge} px-3 py-1 text-[10px] font-bold uppercase tracking-wider`}
        >
          <span aria-hidden>{cfg.emoji}</span>
          {cfg.label}
        </span>
        <Icon className="h-4 w-4 text-gold" aria-hidden />
      </div>
      {title ? (
        <h4 className="mt-3 font-serif text-xl leading-snug text-navy-deep">
          {title}
        </h4>
      ) : null}
      <div className="mt-2.5 space-y-2.5 text-[15px] leading-relaxed text-navy-deep/80">
        {children}
      </div>
    </aside>
  );
}

/* =======================================================================
   SECTION 5 — Visual content blocks
   ===================================================================== */
export function ComparisonTable({
  caption,
  columns,
  rows,
}: {
  caption?: string;
  columns: string[];
  rows: string[][];
}) {
  return (
    <figure className={`${CARD} overflow-hidden`}>
      {caption ? (
        <figcaption className="border-b border-border/60 bg-[color:var(--beige)]/50 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-coffee">
          {caption}
        </figcaption>
      ) : null}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="bg-navy-deep/[0.03]">
              {columns.map((c) => (
                <th
                  key={c}
                  scope="col"
                  className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-navy-deep/60"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.join("|")}
                className={`border-t border-border/50 transition-colors duration-200 hover:bg-gold/[0.06] ${i % 2 ? "bg-[color:var(--beige)]/25" : ""}`}
              >
                {row.map((cell, j) => (
                  <td
                    key={`${j}-${cell}`}
                    className={`px-5 py-3.5 leading-relaxed ${j === 0 ? "font-medium text-navy-deep" : "text-navy-deep/75"}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

export type TimelineItem = { time: string; title: string; detail: string };

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className={`${CARD} relative p-6 md:p-8`}>
      <span
        className="absolute left-[2.35rem] top-10 bottom-10 w-px bg-gold/30"
        aria-hidden
      />
      {items.map((item) => (
        <li key={item.title} className="relative flex gap-5 pb-7 last:pb-0">
          <span className="z-10 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-white text-[10px] font-bold text-coffee shadow-[var(--shadow-card)]">
            {item.time}
          </span>
          <div>
            <h4 className="font-serif text-lg leading-snug text-navy-deep">
              {item.title}
            </h4>
            <p className="mt-1 text-[15px] leading-relaxed text-navy-deep/75">
              {item.detail}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export type ProcessStep = { title: string; detail: string };

export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((s, i) => (
        <li key={s.title} className={`${CARD} ${LIFT} p-6`}>
          <span className="font-serif text-3xl text-gold">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h4 className="mt-2 font-serif text-lg leading-snug text-navy-deep">
            {s.title}
          </h4>
          <p className="mt-1.5 text-sm leading-relaxed text-navy-deep/75">
            {s.detail}
          </p>
        </li>
      ))}
    </ol>
  );
}

export function Checklist({
  title,
  items,
}: {
  title?: string;
  items: string[];
}) {
  return (
    <div className={`${CARD} p-6 md:p-8`}>
      {title ? (
        <h4 className="mb-4 font-serif text-xl leading-snug text-navy-deep">
          {title}
        </h4>
      ) : null}
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-[15px] leading-relaxed text-navy-deep/80"
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gold/50 bg-gold/15 text-coffee">
              <Check className="h-3 w-3" aria-hidden />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export type HighlightItem = {
  icon?: ComponentType<{ className?: string }>;
  heading: string;
  detail: string;
};

export function HighlightCards({ items }: { items: HighlightItem[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {items.map((item) => {
        const Icon = item.icon ?? Sparkles;
        return (
          <div
            key={item.heading}
            className={`${CARD} ${LIFT} border-t-2 border-t-gold/60 p-6`}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/15 text-coffee">
              <Icon className="h-4 w-4" />
            </span>
            <h4 className="mt-3 font-serif text-lg leading-snug text-navy-deep">
              {item.heading}
            </h4>
            <p className="mt-1.5 text-sm leading-relaxed text-navy-deep/75">
              {item.detail}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export type DialogueLine = { speaker: string; line: string };

export function ExampleDialogue({
  title,
  lines,
  note,
}: {
  title: string;
  lines: DialogueLine[];
  note?: string;
}) {
  return (
    <div className={`${CARD} p-6 md:p-8`}>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-coffee">
        {title}
      </p>
      <div className="mt-4 space-y-3">
        {lines.map((l, i) => {
          const mine = i % 2 === 0;
          return (
            <div
              key={`${l.speaker}-${l.line}`}
              className={`flex ${mine ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed transition-all duration-300 ease-out hover:-translate-y-0.5 ${
                  mine
                    ? "rounded-bl-sm bg-[color:var(--beige)] text-navy-deep/85"
                    : "rounded-br-sm bg-navy-deep text-cream/90"
                }`}
              >
                <span
                  className={`block text-[10px] font-semibold uppercase tracking-wider ${mine ? "text-coffee" : "text-gold"}`}
                >
                  {l.speaker}
                </span>
                <span className="mt-1 block">{l.line}</span>
              </div>
            </div>
          );
        })}
      </div>
      {note ? (
        <p className="mt-4 text-xs italic text-navy-deep/60">{note}</p>
      ) : null}
    </div>
  );
}

/* =======================================================================
   SECTION 6 — Learning toolkit
   ===================================================================== */
export type ToolkitItem = {
  emoji: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
  hint: string;
};

export const DEFAULT_TOOLKIT: ToolkitItem[] = [
  { emoji: "📄", icon: FileText, label: "Premium Notes", hint: "PDF · coming soon" },
  { emoji: "📝", icon: Layers, label: "Worksheet", hint: "Printable · coming soon" },
  { emoji: "🎥", icon: Video, label: "Video Lesson", hint: "YouTube · coming soon" },
  { emoji: "🎙", icon: Headphones, label: "Audio Lesson", hint: "Listen · coming soon" },
  { emoji: "🧠", icon: Brain, label: "Practice Quiz", hint: "Interactive · coming soon" },
  { emoji: "📚", icon: BookOpen, label: "Related Lessons", hint: "Curated · coming soon" },
];

export function LearningToolkit({
  items = DEFAULT_TOOLKIT,
  intro = "Six premium extras being brewed for this lesson — they unlock here as soon as they're ready.",
}: {
  items?: ToolkitItem[];
  intro?: string;
}) {
  return (
    <div className="rounded-3xl border border-border/60 bg-[color:var(--beige)]/50 p-6 shadow-[var(--shadow-card)] md:p-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-coffee">
        Your Learning Toolkit
      </p>
      <h3 className="mt-2 font-serif text-2xl leading-snug text-navy-deep md:text-3xl">
        Everything you need, on one tray
      </h3>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-navy-deep/70">
        {intro}
      </p>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            disabled
            aria-disabled="true"
            className={`${CARD} ${FOCUS} group flex w-full items-center gap-4 p-5 text-left opacity-90 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gold/60 hover:opacity-100 hover:shadow-[0_20px_50px_-15px_rgba(91,58,41,0.25)] disabled:cursor-not-allowed focus-visible:ring-offset-white`}
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/15 text-coffee transition-transform duration-300 group-hover:scale-105">
              <item.icon className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-navy-deep">
                <span className="mr-1.5" aria-hidden>
                  {item.emoji}
                </span>
                {item.label}
              </span>
              <span className="mt-0.5 block text-xs text-navy-deep/60">
                {item.hint}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* =======================================================================
   SECTION 7 — Keep brewing closing section
   ===================================================================== */
export function KeepBrewingCTA({
  links,
}: {
  links: Array<{ to: string; label: string; primary?: boolean }>;
  }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-navy-deep p-10 text-center shadow-[var(--shadow-luxury)] md:p-14">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle_at_18%_25%,var(--gold),transparent_48%),radial-gradient(circle_at_82%_72%,var(--coffee),transparent_55%)]"
        aria-hidden
      />
      <div className="relative">
        <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">
          <Coffee className="h-3.5 w-3.5" aria-hidden /> One more cup
        </span>
        <h3 className="mx-auto mt-5 max-w-2xl font-serif text-3xl leading-tight text-cream md:text-4xl">
          Keep Brewing Your English Every Day
        </h3>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-cream/70">
          Small daily sips build lasting fluency. Pick your next pour and keep
          the habit warm.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {links.map((l) => (
            <a
              key={l.to}
              href={l.to}
              className={`${FOCUS} group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ease-out hover:-translate-y-0.5 focus-visible:ring-offset-[color:var(--navy-deep)] ${
                l.primary
                  ? "btn-gold"
                  : "btn-ghost-gold border border-gold/40"
              }`}
            >
              {l.label}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
