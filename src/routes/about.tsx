import { createFileRoute, Link } from "@tanstack/react-router";
import { Coffee, BookOpen, Sparkles, GraduationCap, ArrowRight } from "lucide-react";
import kolam from "@/assets/kolam-mandala.png";
import coffeeBranch from "@/assets/coffee-branch.png";

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

function AboutPage() {
  return (
    <div className="min-h-screen bg-navy-deep text-cream">
      {/* NAV */}
      <section className="relative overflow-hidden">
        <img src={kolam} alt="" className="pointer-events-none absolute -top-32 -left-32 w-[520px] opacity-[0.06]" />
        <img src={coffeeBranch} alt="" className="pointer-events-none absolute -bottom-24 -right-24 w-[420px] opacity-[0.07]" />

        <nav className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10 pt-6 flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3 group">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-navy/60">
              <Coffee className="h-5 w-5 text-gold" />
            </span>
            <span className="font-serif text-xl tracking-wide text-cream">Filter &amp; Fluent</span>
          </Link>

          <ul className="hidden xl:flex items-center gap-7 text-[13px] font-medium">
            {navLinks.map((l) => {
              const isActive = l.label === "About";
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

        {/* HERO */}
        <div className="relative z-10 mx-auto max-w-[1000px] px-6 lg:px-10 py-24 lg:py-32 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-navy/50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
            Meet the Teacher
          </span>
          <h1 className="mt-6 font-serif text-5xl lg:text-7xl leading-[1.05] text-cream">
            Hi, I'm <span className="italic text-gold">Gnana Soundari Devaraj.</span>
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-cream/75 text-lg leading-relaxed">
            English Educator · TEFL-Certified Trainer · Founder, Filter &amp; Fluent
          </p>
        </div>
      </section>

      {/* MY STORY */}
      <section className="relative mx-auto max-w-[900px] px-6 lg:px-10 py-20 lg:py-28">
        <div className="text-center mb-10">
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold/80">Chapter One</span>
          <h2 className="mt-3 font-serif text-4xl lg:text-5xl text-cream">My Story</h2>
        </div>
        <div className="space-y-5 text-[15px] leading-relaxed text-cream/75">
          <p>For 9 years, I've taught English across CBSE and ICSE schools — and noticed the same pattern everywhere.</p>
          <p>Students didn't dislike English. They disliked how it was taught: rushed, rule-heavy, and intimidating to speak out loud.</p>
          <p>So I built <span className="text-gold">Filter &amp; Fluent</span> — a place where English feels approachable, not overwhelming.</p>
        </div>
      </section>

      {/* HOW I TEACH */}
      <section className="relative bg-navy/40 border-y border-gold/10 py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="text-center mb-14">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold/80">The Craft</span>
            <h2 className="mt-3 font-serif text-4xl lg:text-5xl text-cream">How I Teach</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl bg-card border border-gold/15 p-8 lg:p-10">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-navy/60 mb-6">
                <Sparkles className="h-5 w-5 text-gold" />
              </span>
              <h3 className="font-serif text-2xl lg:text-3xl text-navy-deep">The 4E Method</h3>
              <ul className="mt-6 space-y-4 text-[15px] leading-relaxed text-navy-deep">
                <li><span className="text-gold font-semibold">Engage</span> — spark interest through stories and real conversation</li>
                <li><span className="text-gold font-semibold">Explore</span> — discover the rule through examples, not memorization</li>
                <li><span className="text-gold font-semibold">Explain</span> — break it down in plain, simple language</li>
                <li><span className="text-gold font-semibold">Evaluate</span> — practice until it sticks</li>
              </ul>
            </div>

            <div className="rounded-3xl bg-card border border-gold/15 p-8 lg:p-10">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-navy/60 mb-6">
                <BookOpen className="h-5 w-5 text-gold" />
              </span>
              <h3 className="font-serif text-2xl lg:text-3xl text-navy-deep">The S.T.E.P Reading Framework</h3>
              <ul className="mt-6 space-y-4 text-[15px] leading-relaxed text-navy-deep">
                <li><span className="text-gold font-semibold">Scan</span> — get the overview first</li>
                <li><span className="text-gold font-semibold">Track</span> — follow the details</li>
                <li><span className="text-gold font-semibold">Extract</span> — pull out what matters</li>
                <li><span className="text-gold font-semibold">Present</span> — use it in exams, in speech, in life</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* WHAT I DO */}
      <section className="mx-auto max-w-[900px] px-6 lg:px-10 py-20 lg:py-28">
        <div className="text-center mb-12">
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold/80">In Practice</span>
          <h2 className="mt-3 font-serif text-4xl lg:text-5xl text-cream">What I Do</h2>
        </div>
        <ul className="space-y-5">
          {[
            "Language Enrichment Workshops at CBSE schools across Tamil Nadu",
            "Faculty development sessions for English teachers",
            "Grammar workbooks, worksheets, and classroom-ready resources",
            "Recent workshop: St. Anne's Higher Secondary School, Cuddalore",
          ].map((item) => (
            <li key={item} className="flex items-start gap-4 rounded-2xl bg-navy/40 border border-gold/10 px-6 py-5">
              <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-navy/60">
                <GraduationCap className="h-4 w-4 text-gold" />
              </span>
              <span className="text-cream/75 text-[15px] leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* WHY IT MATTERS */}
      <section className="relative bg-navy/40 border-y border-gold/10 py-20 lg:py-28">
        <img src={coffeeBranch} alt="" className="pointer-events-none absolute -top-16 -left-16 w-[320px] opacity-[0.06]" />
        <div className="relative mx-auto max-w-[820px] px-6 lg:px-10 text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold/80">The Heart of It</span>
          <h2 className="mt-3 font-serif text-4xl lg:text-5xl text-cream">Why It Matters</h2>
          <div className="mt-8 space-y-6 font-serif italic text-xl lg:text-2xl leading-relaxed text-cream">
            <p>I don't believe fluency should feel like a test you're always failing.</p>
            <p>It should feel like a skill you're steadily building — <span className="text-gold not-italic font-medium">one lesson at a time.</span></p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[900px] px-6 lg:px-10 py-24 lg:py-32 text-center">
        <h2 className="font-serif text-3xl lg:text-4xl text-cream">Ready to pour yourself a cup?</h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link to="/resources" className="btn-gold rounded-full px-8 py-4 text-sm font-semibold inline-flex items-center gap-2">
            Explore Resources <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-cream text-navy-deep px-8 py-4 text-sm font-semibold hover:bg-gold transition-colors">
            Book a Workshop <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Gnana Soundari Devaraj — Filter & Fluent" },
      { name: "description", content: "Meet Gnana Soundari Devaraj — TEFL-certified English educator and founder of Filter & Fluent. The 4E Method, S.T.E.P framework, and workshops across Tamil Nadu." },
      { property: "og:title", content: "About — Filter & Fluent" },
      { property: "og:description", content: "Meet the teacher behind Filter & Fluent." },
    ],
  }),
  component: AboutPage,
});
