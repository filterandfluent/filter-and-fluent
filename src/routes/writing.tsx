import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CircleHelp,
  Coffee,
  Download,
  GraduationCap,
  PenLine,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import kolam from "@/assets/kolam-mandala.png";
import coffeeBranch from "@/assets/coffee-branch.png";

export const Route = createFileRoute("/writing")({
  head: () => ({
    meta: [
      { title: "Beginner Writing Centre — Filter & Fluent" },
      {
        name: "description",
        content:
          "Build clear sentences, basic paragraphs and friendly letters with guided examples and practice in the Filter & Fluent Beginner Writing Centre.",
      },
      { property: "og:title", content: "Beginner Writing Centre — Filter & Fluent" },
      {
        property: "og:description",
        content:
          "Build clear sentences, basic paragraphs and friendly letters with guided examples and practice.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WritingPage,
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

const lessons = [
  {
    id: "sentences",
    number: "01",
    title: "Sentence Formation",
    summary: "Put words in a clear order and make each thought complete.",
    objective:
      "Arrange words into a complete sentence, identify who or what it is about, and use a capital letter and full stop.",
    exampleLabel: "Build it step by step",
    example: (
      <>
        <span className="text-coffee">Words:</span> reads / Meena / a story
        <br />
        <span className="text-coffee">Who?</span> Meena. &nbsp;
        <span className="text-coffee">What does she do?</span> reads. &nbsp;
        <span className="text-coffee">What?</span> a story.
        <br />
        <strong>Meena reads a story.</strong>
      </>
    ),
    prompt: "Write one complete sentence about something you enjoy.",
    modelAnswer: "I enjoy drawing after school.",
    checkQuestion: "Which is a complete sentence?",
    choices: ["My sister is kind.", "Runs to the shop."],
    correct: "My sister is kind.",
  },
  {
    id: "paragraphs",
    number: "02",
    title: "Basic Paragraphs",
    summary: "Keep a group of related sentences focused on one topic.",
    objective:
      "Write a topic sentence, add details that support it, and finish with a closing sentence.",
    exampleLabel: "A paragraph about a morning",
    example: (
      <>
        <strong>I get up early each morning.</strong> I wash and get ready for the day. Then I eat breakfast with my family. I feel prepared when I leave home.
      </>
    ),
    prompt: "Write three or four sentences about a favourite place. Include a topic sentence and at least one detail.",
    modelAnswer:
      "The beach is my favourite place. I like walking beside the water. I can watch the waves and collect shells. The beach helps me feel calm.",
    checkQuestion: "Which sentence best supports the topic “My garden”?",
    choices: ["Bright flowers grow beside the gate.", "My cousin has a blue bicycle."],
    correct: "Bright flowers grow beside the gate.",
  },
  {
    id: "letters",
    number: "03",
    title: "Friendly Letter Writing",
    summary: "Write a warm, easy-to-follow note to someone you know.",
    objective:
      "Use a greeting, write a clear message for your reader, and finish with a sign-off and your name.",
    exampleLabel: "A friendly note",
    example: (
      <>
        Dear Anu,
        <br />
        <br />
        Thank you for inviting me to your birthday. I would love to come. I will bring the book we talked about.
        <br />
        <br />
        See you soon,
        <br />
        Maya
      </>
    ),
    prompt: "Write a short note to a classmate about an activity you enjoyed together. Add a greeting, message, sign-off and name.",
    modelAnswer:
      "Dear Ravi,\n\nI enjoyed playing badminton with you after class. Let us play again this weekend.\n\nSee you soon,\nArun",
    checkQuestion: "Which part usually comes at the start of a friendly letter?",
    choices: ["A greeting, such as “Dear Anu,”", "A sign-off, such as “See you soon,”"],
    correct: "A greeting, such as “Dear Anu,”",
  },
];

function WritingPage() {
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [selected, setSelected] = useState<Record<string, string>>({});

  const revealAnswer = (id: string) => {
    setRevealed((current) => ({ ...current, [id]: !current[id] }));
  };

  const resetCheck = (id: string) => {
    setSelected((current) => ({ ...current, [id]: "" }));
  };

  return (
    <main className="min-h-screen bg-cream text-navy-deep">
      <section className="relative overflow-hidden bg-navy-deep text-cream">
        <img
          src={kolam}
          alt=""
          className="pointer-events-none absolute -left-32 -top-32 w-[520px] opacity-[0.06]"
        />
        <img
          src={coffeeBranch}
          alt=""
          className="pointer-events-none absolute -bottom-24 -right-24 w-[420px] opacity-[0.07]"
        />
        <nav className="relative z-10 mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 pt-6 lg:px-10">
          <Link to="/" className="flex items-center gap-3">
            <BrandLogo />
            <span className="font-serif text-xl text-cream">Filter &amp; Fluent</span>
          </Link>
          <ul className="hidden items-center gap-7 text-[13px] font-medium xl:flex">
            {navLinks.map((link) => {
              const active = link.label === "Writing";
              return (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    hash={link.hash}
                    className={`relative transition-colors hover:text-gold ${active ? "text-gold" : "text-cream/85"}`}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.label}
                    {active ? (
                      <span className="absolute -bottom-2 left-0 right-0 mx-auto h-0.5 w-6 rounded-full bg-gold" />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            to="/"
            hash="contact"
            className="btn-gold whitespace-nowrap rounded-full px-7 py-3 text-sm font-semibold"
          >
            Get Started
          </Link>
        </nav>

        <div className="relative z-10 mx-auto max-w-[1120px] px-6 py-20 text-center lg:px-10 lg:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-navy/50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
            <Coffee className="h-3.5 w-3.5" aria-hidden />
            The Writing Centre
          </span>
          <h1 className="mt-6 font-serif text-5xl leading-[1.05] text-cream sm:text-6xl lg:text-7xl">
            Words on Paper, <span className="text-gold-gradient italic">with Confidence.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-cream/75">
            Start with a clear sentence, grow it into a paragraph, and write a friendly letter—one thoughtful step at a time.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#beginner-lessons"
              className="btn-gold inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold"
            >
              Start Beginner Lessons <ArrowDown className="h-4 w-4" aria-hidden />
            </a>
            <a
              href="/writing-centre-beginner-worksheet.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-8 py-4 text-sm font-semibold text-cream transition-colors hover:bg-gold/10"
            >
              Download Practice Sheets <Download className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="mb-9 text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-coffee">
              Choose your level
            </span>
            <h2 className="mt-3 font-serif text-4xl text-navy-deep lg:text-5xl">
              Begin with the basics
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-xl border border-gold/60 bg-white p-6 shadow-[var(--shadow-card)]">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy-deep text-gold">
                <PenLine className="h-5 w-5" aria-hidden />
              </span>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-coffee">Your starting point</p>
              <h3 className="mt-1 font-serif text-2xl text-navy-deep">Beginner</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-deep/70">Three guided lessons with examples, writing practice and answers.</p>
              <a href="#beginner-lessons" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-coffee hover:text-navy-deep">
                Explore lessons <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
            {(["Intermediate", "Advanced"] as const).map((level) => (
              <div key={level} className="rounded-xl border border-border bg-beige/50 p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy-deep/5 text-coffee">
                  <GraduationCap className="h-5 w-5" aria-hidden />
                </span>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-coffee">More lessons are brewing</p>
                <h3 className="mt-1 font-serif text-2xl text-navy-deep">{level}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-deep/70">This learning path is being prepared.</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-coffee/80">
                  <Coffee className="h-4 w-4" aria-hidden /> Brewing soon
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="beginner-lessons" className="scroll-mt-8 bg-navy-deep py-16 text-cream lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="mb-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              <BookOpen className="h-3.5 w-3.5" aria-hidden /> Beginner learning path
            </span>
            <h2 className="mt-3 font-serif text-4xl text-cream lg:text-5xl">Learn by writing</h2>
            <p className="mt-3 leading-relaxed text-cream/70">Read the example, try the short check, then put the idea into your own words.</p>
          </div>

          <div className="space-y-8">
            {lessons.map((lesson) => {
              const choice = selected[lesson.id] ?? "";
              const answered = Boolean(choice);
              const isCorrect = choice === lesson.correct;
              return (
                <article key={lesson.id} id={lesson.id} className="scroll-mt-6 overflow-hidden rounded-xl bg-cream text-navy-deep shadow-[var(--shadow-luxury)]">
                  <div className="flex flex-col gap-4 border-b border-border px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                    <div className="flex items-start gap-4">
                      <span className="font-serif text-3xl text-gold">{lesson.number}</span>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-coffee">Beginner lesson</p>
                        <h3 className="mt-1 font-serif text-2xl text-navy-deep sm:text-3xl">{lesson.title}</h3>
                        <p className="mt-1 text-sm text-navy-deep/65">{lesson.summary}</p>
                      </div>
                    </div>
                    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 text-xs font-medium text-coffee">
                      <Sparkles className="h-3.5 w-3.5" aria-hidden /> Learn · Try · Review
                    </span>
                  </div>

                  <div className="grid gap-8 px-6 py-7 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:py-9">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-coffee">By the end, you can</h4>
                        <p className="mt-2 text-sm leading-relaxed text-navy-deep/80">{lesson.objective}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-coffee">{lesson.exampleLabel}</h4>
                        <div className="mt-3 rounded-lg border-l-4 border-gold bg-beige/65 p-5 text-sm leading-relaxed text-navy-deep/85">
                          {lesson.example}
                        </div>
                      </div>
                      <div className="rounded-lg border border-border bg-white p-5">
                        <div className="flex items-start gap-2">
                          <CircleHelp className="mt-0.5 h-4 w-4 shrink-0 text-coffee" aria-hidden />
                          <p className="text-sm font-semibold text-navy-deep">{lesson.checkQuestion}</p>
                        </div>
                        <div className="mt-3 grid gap-2">
                          {lesson.choices.map((option) => {
                            const chosen = choice === option;
                            const revealCorrect = revealed[`${lesson.id}-check`] && option === lesson.correct;
                            return (
                              <Button
                                key={option}
                                type="button"
                                variant="outline"
                                onClick={() => setSelected((current) => ({ ...current, [lesson.id]: option }))}
                                aria-pressed={chosen}
                                className={`h-auto min-h-10 justify-start whitespace-normal rounded-md px-3 py-2 text-left text-sm ${chosen ? "border-gold bg-gold/10 text-navy-deep" : "border-border bg-cream text-navy-deep hover:border-gold/60"} ${revealCorrect ? "border-green-700 bg-green-50" : ""}`}
                              >
                                {revealCorrect ? <Check className="h-4 w-4 shrink-0 text-green-700" aria-hidden /> : null}
                                <span>{option}</span>
                              </Button>
                            );
                          })}
                        </div>
                        <div className="mt-3 flex flex-wrap items-center gap-3">
                          <Button
                            type="button"
                            onClick={() => revealAnswer(`${lesson.id}-check`)}
                            className="rounded-full bg-navy-deep px-4 text-cream hover:bg-navy"
                          >
                            {revealed[`${lesson.id}-check`] ? "Hide answer" : "Check answer"}
                          </Button>
                          {answered ? (
                            <span role="status" className={`text-sm font-medium ${isCorrect ? "text-green-800" : "text-coffee"}`}>
                              {isCorrect ? "That’s right—well done." : "Not quite. Try again or check the answer."}
                            </span>
                          ) : null}
                          {answered ? (
                            <Button type="button" variant="ghost" size="sm" onClick={() => resetCheck(lesson.id)} aria-label={`Reset ${lesson.title} check`} className="text-coffee">
                              <RotateCcw className="h-4 w-4" aria-hidden /> Reset
                            </Button>
                          ) : null}
                        </div>
                        {revealed[`${lesson.id}-check`] ? (
                          <p className="mt-3 rounded-md bg-beige/65 px-3 py-2 text-sm text-navy-deep" role="status">
                            <strong>Answer:</strong> {lesson.correct}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="rounded-lg border border-border bg-white p-5 sm:p-6">
                      <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-coffee">Your turn</h4>
                      <label htmlFor={`${lesson.id}-response`} className="mt-2 block text-sm leading-relaxed text-navy-deep/80">
                        {lesson.prompt}
                      </label>
                      <Textarea
                        id={`${lesson.id}-response`}
                        value={responses[lesson.id] ?? ""}
                        onChange={(event) => setResponses((current) => ({ ...current, [lesson.id]: event.target.value }))}
                        placeholder="Write your answer here…"
                        className="mt-3 min-h-32 resize-y border-border bg-cream text-navy-deep placeholder:text-navy-deep/45 focus-visible:ring-gold"
                      />
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <span className="text-xs text-navy-deep/55">Your practice stays in this page while it is open.</span>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => revealAnswer(`${lesson.id}-model`)}
                          aria-expanded={Boolean(revealed[`${lesson.id}-model`])}
                          className="rounded-full border-gold/60 text-coffee hover:bg-gold/10"
                        >
                          {revealed[`${lesson.id}-model`] ? "Hide model answer" : "Show model answer"}
                        </Button>
                      </div>
                      {revealed[`${lesson.id}-model`] ? (
                        <div className="mt-4 whitespace-pre-line rounded-md border-l-4 border-gold bg-beige/65 p-4 text-sm leading-relaxed text-navy-deep" role="status">
                          <strong className="block text-xs uppercase tracking-wide text-coffee">One possible answer</strong>
                          <span className="mt-2 block">{lesson.modelAnswer}</span>
                          <span className="mt-2 block text-xs text-navy-deep/65">Your answer can be different. Check that it meets the lesson objective.</span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-cream px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-5xl rounded-xl bg-navy-deep px-6 py-10 text-center text-cream shadow-[var(--shadow-luxury)] sm:px-10">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            <Coffee className="h-4 w-4" aria-hidden /> Keep your practice warm
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl">One clear line at a time.</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-cream/75">
            Review the examples, try the printable practice sheets, and return whenever you are ready for another lesson.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button asChild className="btn-gold rounded-full px-6 text-sm font-semibold">
              <a href="/writing-centre-beginner-worksheet.pdf" download>
                Practice with the worksheet <Download className="h-4 w-4" aria-hidden />
              </a>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-gold/50 bg-transparent px-6 text-sm font-semibold text-cream hover:bg-gold/10 hover:text-cream">
              <Link to="/">
                <ArrowLeft className="h-4 w-4" aria-hidden /> Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}