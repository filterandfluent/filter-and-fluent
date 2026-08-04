import type { ReactNode } from "react";
import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Coffee,
  Info,
  Lightbulb,
  Quote,
  Sparkles,
  X,
} from "lucide-react";

/* ============================================================
   Shared design tokens — mirror the article page language.
   ============================================================ */
export const CARD =
  "rounded-2xl bg-white border border-border/60 shadow-[var(--shadow-card)]";
export const FOCUS =
  "outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--beige)]";
export const HOVER_LIFT =
  "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(91,58,41,0.25)]";

const EYEBROW =
  "inline-flex items-center gap-2 rounded-full bg-gold/20 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-coffee";

/** Small section header used by the enhancement blocks. */
export function BlockHeading({
  id,
  name,
  intro,
  icon: Icon = Coffee,
}: {
  id?: string;
  name: string;
  intro?: string;
  icon?: typeof Coffee;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 shrink-0 text-coffee" aria-hidden />
        <h2
          id={id}
          className="font-serif text-3xl leading-tight tracking-tight text-navy-deep scroll-mt-28 md:text-4xl"
        >
          {name}
        </h2>
      </div>
      {intro ? (
        <p className="mt-2 text-sm italic leading-relaxed text-navy-deep/60">
          {intro}
        </p>
      ) : null}
    </div>
  );
}

/* ============================================================
   1. Coffee Sip — motivational lead-in
   ============================================================ */
export function CoffeeSip({
  label = "Coffee Sip",
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <aside className="rounded-2xl border border-border/60 border-l-4 border-l-coffee bg-[color:var(--cream)] p-6 shadow-[var(--shadow-card)] md:p-7">
      <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-coffee">
        <Coffee className="h-4 w-4" aria-hidden />
        {label}
      </span>
      <div className="mt-3 space-y-3 text-[16px] leading-relaxed text-navy-deep/85">
        {children}
      </div>
    </aside>
  );
}

/* ============================================================
   2. What You'll Learn — outcome cards
   ============================================================ */
export type Outcome = {
  icon?: typeof Coffee;
  heading: string;
  detail: string;
};

export function OutcomeCard({ icon: Icon = Sparkles, heading, detail }: Outcome) {
  return (
    <div className={`${CARD} ${HOVER_LIFT} group p-6`}>
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 text-coffee transition-colors duration-200 group-hover:bg-gold/30">
        <Icon className="h-4.5 w-4.5" aria-hidden />
      </span>
      <h3 className="mt-4 font-serif text-xl leading-snug text-navy-deep transition-colors duration-200 group-hover:text-coffee">
        {heading}
      </h3>
      <p className="mt-2 text-[15px] leading-relaxed text-navy-deep/70">
        {detail}
      </p>
    </div>
  );
}

export function OutcomeGrid({ items }: { items: Outcome[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {items.map((o) => (
        <OutcomeCard key={o.heading} {...o} />
      ))}
    </div>
  );
}

/* ============================================================
   3. Premium Brew Notes — branded educational callout
   ============================================================ */
export function BrewNotes({
  label = "Premium Brew Notes",
  title,
  children,
}: {
  label?: string;
  title?: string;
  children: ReactNode;
}) {
  return (
    <aside className="relative overflow-hidden rounded-2xl border-2 border-coffee/25 bg-[color:var(--cream)] p-6 shadow-[var(--shadow-card)] md:p-8">
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold via-gold/40 to-transparent"
        aria-hidden
      />
      <Coffee
        className="pointer-events-none absolute -right-6 -bottom-6 h-32 w-32 text-coffee/[0.07]"
        strokeWidth={1}
        aria-hidden
      />
      <span className={EYEBROW}>
        <Coffee className="h-3.5 w-3.5" aria-hidden />
        {label}
      </span>
      {title ? (
        <h3 className="mt-4 font-serif text-2xl leading-snug text-navy-deep">
          {title}
        </h3>
      ) : null}
      <div className="relative mt-3 space-y-3 text-[15px] leading-relaxed text-navy-deep/80">
        {children}
      </div>
    </aside>
  );
}

/* ============================================================
   4. Real-Life Examples
   ============================================================ */
export type ExampleItem = {
  context: string;
  lines: string[];
  note?: string;
};

export function ExampleCard({ context, lines, note }: ExampleItem) {
  return (
    <div className={`${CARD} ${HOVER_LIFT} p-6`}>
      <span className={EYEBROW}>
        <MessageCircle className="h-3.5 w-3.5" aria-hidden />
        {context}
      </span>
      <ul className="mt-4 space-y-3">
        {lines.map((l, i) => (
          <li
            key={l}
            className={`flex ${i % 2 ? "justify-end" : "justify-start"}`}
          >
            <span
              className={`relative max-w-[88%] rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed ${
                i % 2
                  ? "rounded-br-sm bg-coffee/10 text-navy-deep"
                  : "rounded-bl-sm bg-[color:var(--cream)] text-navy-deep/85"
              }`}
            >
              {l}
            </span>
          </li>
        ))}
      </ul>
      {note ? (
        <p className="mt-4 flex items-center gap-2 border-t border-border/60 pt-3 text-xs italic text-navy-deep/60">
          <Coffee className="h-3.5 w-3.5 shrink-0 text-gold" aria-hidden />
          {note}
        </p>
      ) : null}
    </div>
  );
}


export function ExampleGrid({ items }: { items: ExampleItem[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {items.map((e) => (
        <ExampleCard key={e.context} {...e} />
      ))}
    </div>
  );
}

/* ============================================================
   5. Common Mistakes
   ============================================================ */
export type Mistake = {
  incorrect: string;
  correct: string;
  explanation: string;
};

export function MistakeCard({ incorrect, correct, explanation }: Mistake) {
  return (
    <div className="rounded-2xl border border-coffee/20 border-l-4 border-l-coffee/70 bg-white p-6 shadow-[var(--shadow-card)]">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-coffee/15 text-coffee">
          <X className="h-3.5 w-3.5" aria-hidden />
        </span>
        <p className="text-[15px] leading-relaxed text-navy-deep/70 line-through decoration-coffee/40">
          {incorrect}
        </p>
      </div>
      <div className="my-3 ml-3 h-4 w-px bg-border" aria-hidden />
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/25 text-coffee">
          <Check className="h-3.5 w-3.5" aria-hidden />
        </span>
        <p className="text-[15px] font-medium leading-relaxed text-navy-deep">
          {correct}
        </p>
      </div>
      <p className="mt-4 flex items-start gap-2 border-t border-border/60 pt-3 text-[14px] leading-relaxed text-navy-deep/70">
        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-coffee" aria-hidden />
        <span>{explanation}</span>
      </p>
    </div>
  );
}

export function MistakeList({ items }: { items: Mistake[] }) {
  return (
    <div className="space-y-5">
      {items.map((m) => (
        <MistakeCard key={m.incorrect} {...m} />
      ))}
    </div>
  );
}

/* ============================================================
   6. Comparison blocks
   ============================================================ */
export type ComparisonItem = {
  /** e.g. "Correct vs Incorrect", "Formal vs Informal", "Before vs After" */
  kind: string;
  leftLabel: string;
  rightLabel: string;
  left: string[];
  right: string[];
};

export function ComparisonCard({
  kind,
  leftLabel,
  rightLabel,
  left,
  right,
}: ComparisonItem) {
  return (
    <div className={`${CARD} overflow-hidden`}>
      <div className="flex items-center gap-2 border-b border-border/60 bg-[color:var(--beige)] px-6 py-3">
        <Sparkles className="h-3.5 w-3.5 text-coffee" aria-hidden />
        <span className="text-[11px] font-semibold uppercase tracking-wider text-coffee">
          {kind}
        </span>
      </div>
      <div className="grid divide-y divide-border/60 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        <div className="p-6">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-navy-deep/55">
            {leftLabel}
          </p>
          <ul className="space-y-2 text-[15px] leading-relaxed text-navy-deep/75">
            {left.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>
        <div className="bg-[color:var(--cream)]/60 p-6">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-coffee">
            {rightLabel}
          </p>
          <ul className="space-y-2 text-[15px] font-medium leading-relaxed text-navy-deep">
            {right.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function ComparisonStack({ items }: { items: ComparisonItem[] }) {
  return (
    <div className="space-y-6">
      {items.map((c) => (
        <ComparisonCard key={c.kind} {...c} />
      ))}
    </div>
  );
}

/* ============================================================
   7. Quick Practice — exercise cards with accordion answers
   ============================================================ */
export type ExerciseType =
  | "Multiple Choice"
  | "Fill in the Blanks"
  | "Sentence Correction"
  | "Match the Following"
  | "Writing Prompt"
  | "Speaking Prompt"
  | "Reflection Question";

export type Exercise = {
  type: ExerciseType;
  prompt: string;
  options?: string[];
  pairs?: { left: string; right: string }[];
  answer?: string;
};

export function ExerciseCard({
  type,
  prompt,
  options,
  pairs,
  answer,
}: Exercise) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${CARD} p-6`}>
      <span className={EYEBROW}>{type}</span>
      <p className="mt-4 text-[16px] leading-relaxed text-navy-deep">{prompt}</p>

      {options?.length ? (
        <ul className="mt-4 space-y-2">
          {options.map((o, i) => (
            <li
              key={o}
              className="flex items-start gap-3 rounded-xl border border-border/60 px-4 py-2.5 text-[15px] leading-relaxed text-navy-deep/80 transition-colors duration-200 hover:border-gold/60 hover:bg-[color:var(--cream)]"
            >
              <span className="text-[13px] font-semibold text-coffee">
                {String.fromCharCode(65 + i)}.
              </span>
              <span>{o}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {pairs?.length ? (
        <ul className="mt-4 divide-y divide-border/60 overflow-hidden rounded-xl border border-border/60">
          {pairs.map((p) => (
            <li
              key={p.left}
              className="grid grid-cols-2 gap-4 px-4 py-2.5 text-[15px] leading-relaxed"
            >
              <span className="text-navy-deep/80">{p.left}</span>
              <span className="text-navy-deep/60">{p.right}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {answer ? (
        <div className="mt-5 border-t border-border/60 pt-4">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className={`flex w-full items-center justify-between gap-3 text-left text-[13px] font-semibold uppercase tracking-wider text-coffee ${FOCUS} focus-visible:ring-offset-white`}
          >
            <span>{open ? "Hide answer" : "Reveal answer"}</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              aria-hidden
            />
          </button>
          {open ? (
            <p className="mt-3 rounded-xl bg-[color:var(--cream)] px-4 py-3 text-[15px] leading-relaxed text-navy-deep/85">
              {answer}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export function ExerciseList({ items }: { items: Exercise[] }) {
  return (
    <div className="space-y-5">
      {items.map((e) => (
        <ExerciseCard key={e.type + e.prompt} {...e} />
      ))}
    </div>
  );
}

/* ============================================================
   8. Coffee Break Challenge
   ============================================================ */
export type Challenge = {
  title: string;
  task: string;
  icon?: typeof Coffee;
};

export function ChallengeBoard({
  title = "Coffee Break Challenge",
  intro,
  items,
}: {
  title?: string;
  intro?: string;
  items: Challenge[];
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-coffee p-7 text-cream shadow-[var(--shadow-card)] md:p-9">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14] bg-[radial-gradient(circle_at_15%_20%,var(--gold),transparent_45%),radial-gradient(circle_at_85%_80%,var(--cream),transparent_50%)]"
        aria-hidden
      />
      <div className="relative">
        <span className="inline-flex items-center gap-2 rounded-full bg-cream/15 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-gold">
          <Coffee className="h-3.5 w-3.5" aria-hidden />
          Filter &amp; Fluent
        </span>
        <h3 className="mt-4 font-serif text-3xl leading-tight text-cream">
          {title}
        </h3>
        {intro ? (
          <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-cream/75">
            {intro}
          </p>
        ) : null}
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          {items.map(({ title: t, task, icon: Icon = Coffee }) => (
            <div
              key={t}
              className="rounded-xl border border-cream/15 bg-navy-deep/25 p-5 transition-colors duration-200 hover:border-gold/50"
            >
              <span className="inline-flex items-center gap-2 text-gold">
                <Icon className="h-4 w-4" aria-hidden />
                <span className="font-serif text-lg leading-snug">{t}</span>
              </span>
              <p className="mt-2 text-[14px] leading-relaxed text-cream/75">
                {task}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   9. Key Takeaways
   ============================================================ */
export type Takeaway = {
  /** e.g. "Key Rules", "Quick Revision", "Remember This", "Coffee Wisdom" */
  label: string;
  points: string[];
};

export function TakeawayCard({ label, points }: Takeaway) {
  return (
    <div className={`${CARD} ${HOVER_LIFT} p-6`}>
      <span className={EYEBROW}>{label}</span>
      <ul className="mt-4 space-y-2.5">
        {points.map((p) => (
          <li
            key={p}
            className="flex items-start gap-3 text-[15px] leading-relaxed text-navy-deep/80"
          >
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
              aria-hidden
            />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TakeawayGrid({ items }: { items: Takeaway[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {items.map((t) => (
        <TakeawayCard key={t.label} {...t} />
      ))}
    </div>
  );
}

/* ============================================================
   10. Visual components — tables, cards, boxes
   ============================================================ */
export function DataTable({
  caption,
  headers,
  rows,
}: {
  caption?: string;
  headers: string[];
  rows: string[][];
}) {
  return (
    <figure className={`${CARD} overflow-hidden`}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-[15px]">
          {caption ? (
            <caption className="border-b border-border/60 bg-[color:var(--beige)] px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-coffee">
              {caption}
            </caption>
          ) : null}
          <thead>
            <tr className="bg-[color:var(--cream)]">
              {headers.map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="px-6 py-3 font-serif text-[15px] font-normal text-navy-deep"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {rows.map((r) => (
              <tr key={r.join("|")} className="transition-colors duration-200 hover:bg-[color:var(--cream)]/60">
                {r.map((c) => (
                  <td key={c} className="px-6 py-3 leading-relaxed text-navy-deep/80">
                    {c}
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

export function Infographic({
  label = "Infographic",
  title,
  steps,
}: {
  label?: string;
  title?: string;
  steps: { title: string; detail: string }[];
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-[color:var(--beige)] p-6 shadow-[var(--shadow-card)] md:p-8">
      <span className={EYEBROW}>{label}</span>
      {title ? (
        <h3 className="mt-3 font-serif text-2xl leading-snug text-navy-deep">
          {title}
        </h3>
      ) : null}
      <ol className="mt-6 grid gap-4 sm:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.title} className="rounded-xl bg-white/80 p-5 shadow-[var(--shadow-card)]">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold/25 text-[13px] font-semibold text-coffee">
              {i + 1}
            </span>
            <p className="mt-3 font-serif text-lg leading-snug text-navy-deep">
              {s.title}
            </p>
            <p className="mt-1.5 text-[14px] leading-relaxed text-navy-deep/70">
              {s.detail}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function VocabularyCard({
  word,
  ipa,
  meaning,
  example,
}: {
  word: string;
  ipa?: string;
  meaning: string;
  example?: string;
}) {
  return (
    <div className={`${CARD} ${HOVER_LIFT} p-6`}>
      <div className="flex flex-wrap items-baseline gap-2">
        <h3 className="font-serif text-2xl leading-snug text-navy-deep">{word}</h3>
        {ipa ? <span className="text-[13px] text-navy-deep/55">/{ipa}/</span> : null}
      </div>
      <p className="mt-3 text-[15px] leading-relaxed text-navy-deep/80">{meaning}</p>
      {example ? (
        <p className="mt-3 border-l-2 border-gold/60 pl-3 text-[14px] italic leading-relaxed text-navy-deep/65">
          {example}
        </p>
      ) : null}
    </div>
  );
}

export function GrammarCard({
  rule,
  structure,
  example,
}: {
  rule: string;
  structure: string;
  example?: string;
}) {
  return (
    <div className={`${CARD} ${HOVER_LIFT} p-6`}>
      <span className={EYEBROW}>
        <BookOpen className="h-3.5 w-3.5" aria-hidden />
        Grammar Rule
      </span>
      <h3 className="mt-4 font-serif text-xl leading-snug text-navy-deep">
        {rule}
      </h3>
      <p className="mt-3 rounded-xl bg-[color:var(--cream)] px-4 py-2.5 font-mono text-[13px] leading-relaxed text-coffee">
        {structure}
      </p>
      {example ? (
        <p className="mt-3 text-[15px] leading-relaxed text-navy-deep/80">
          {example}
        </p>
      ) : null}
    </div>
  );
}

export function DefinitionCard({
  term,
  definition,
}: {
  term: string;
  definition: string;
}) {
  return (
    <dl className="rounded-2xl border border-border/60 border-l-4 border-l-gold bg-white p-6 shadow-[var(--shadow-card)]">
      <dt className="font-serif text-xl leading-snug text-navy-deep">{term}</dt>
      <dd className="mt-2 text-[15px] leading-relaxed text-navy-deep/80">
        {definition}
      </dd>
    </dl>
  );
}

type BoxTone = "tip" | "warning" | "example" | "note";

const BOX_STYLES: Record<
  BoxTone,
  { wrap: string; icon: typeof Coffee; accent: string; label: string }
> = {
  tip: {
    wrap: "border-l-gold bg-[color:var(--cream)]",
    icon: Lightbulb,
    accent: "text-coffee",
    label: "Tip",
  },
  warning: {
    wrap: "border-l-coffee bg-[color:var(--beige)]",
    icon: AlertTriangle,
    accent: "text-coffee",
    label: "Watch Out",
  },
  example: {
    wrap: "border-l-navy bg-white",
    icon: Quote,
    accent: "text-navy-deep",
    label: "Example",
  },
  note: {
    wrap: "border-l-gold bg-white",
    icon: Info,
    accent: "text-coffee",
    label: "Note",
  },
};

export function InfoBox({
  tone = "tip",
  label,
  children,
}: {
  tone?: BoxTone;
  label?: string;
  children: ReactNode;
}) {
  const style = BOX_STYLES[tone];
  const Icon = style.icon;
  return (
    <aside
      className={`rounded-2xl border border-border/60 border-l-4 p-6 shadow-[var(--shadow-card)] ${style.wrap}`}
    >
      <span
        className={`inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider ${style.accent}`}
      >
        <Icon className="h-4 w-4" aria-hidden />
        {label ?? style.label}
      </span>
      <div className="mt-3 space-y-2 text-[15px] leading-relaxed text-navy-deep/80">
        {children}
      </div>
    </aside>
  );
}
