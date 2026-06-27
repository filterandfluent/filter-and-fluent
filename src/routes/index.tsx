import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Coffee,
  GraduationCap,
  Languages,
  MessageCircle,
  PenLine,
  PlayCircle,
  Quote,
  Sparkles,
  Type,
  User,
  Users,
} from "lucide-react";
import heroImg from "@/assets/hero-coffee.jpg";
import aboutImg from "@/assets/about-coffee.jpg";
import muruganArt from "@/assets/murugan-lineart.png";
import gopuramArt from "@/assets/gopuram-lineart.png";
import coffeeBranch from "@/assets/coffee-branch.png";
import kolam from "@/assets/kolam-mandala.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Filter & Fluent — Where English Feels Like Home" },
      { name: "description", content: "Premium English learning inspired by South Indian filter coffee. Grammar, vocabulary, speaking and writing for students, teachers and lifelong learners." },
      { property: "og:title", content: "Filter & Fluent — Where English Feels Like Home" },
      { property: "og:description", content: "English Learning, South Indian Soul." },
    ],
  }),
  component: Index,
});

const navLinks = ["Home", "About", "Grammar", "Vocabulary", "Speaking", "Writing", "Courses", "Resources", "Blog", "Books", "Workshops", "Contact"];

const learningCards = [
  { icon: BookOpen, title: "Grammar", desc: "Clear explanations and practice exercises." },
  { icon: Languages, title: "Vocabulary", desc: "Build strong vocabulary in context." },
  { icon: MessageCircle, title: "Speaking", desc: "Improve fluency and confidence in real conversations." },
  { icon: PenLine, title: "Writing", desc: "Write better essays, emails and professional texts." },
  { icon: GraduationCap, title: "Teacher Resources", desc: "Ready-to-use materials for busy teachers." },
  { icon: User, title: "Student Resources", desc: "Worksheets, guides and extra practice materials." },
];

const stats = [
  { icon: PlayCircle, value: "500+", label: "Video Lessons" },
  { icon: BookOpen, value: "100+", label: "Grammar Topics" },
  { icon: Type, value: "10,000+", label: "Vocabulary Words" },
  { icon: Users, value: "All Ages", label: "Welcome" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ===== HERO + NAV (Navy block) ===== */}
      <section className="relative bg-navy-deep text-cream overflow-hidden">
        {/* Cultural background art */}
        <img
          src={muruganArt}
          alt=""
          aria-hidden
          className="pointer-events-none select-none absolute right-[18%] top-20 w-[420px] opacity-[0.09]"
        />
        <img
          src={gopuramArt}
          alt=""
          aria-hidden
          className="pointer-events-none select-none absolute right-0 top-24 w-[320px] opacity-[0.08]"
        />
        <img
          src={kolam}
          alt=""
          aria-hidden
          className="pointer-events-none select-none absolute -left-32 top-1/3 w-[420px] opacity-[0.06]"
        />

        {/* Nav */}
        <nav className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10 pt-6 flex items-center justify-between gap-6">
          <a href="#" className="flex items-center gap-3 group">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-navy/60">
              <Coffee className="h-6 w-6 text-gold" />
            </span>
            <span className="leading-tight">
              <span className="block font-serif text-2xl text-gold-gradient tracking-wide">Filter &amp; Fluent</span>
              <span className="block text-[10px] tracking-[0.22em] text-cream/60 font-medium uppercase">English Learning, South Indian Soul</span>
            </span>
          </a>

          <ul className="hidden xl:flex items-center gap-7 text-[13px] font-medium">
            {navLinks.map((l, i) => (
              <li key={l}>
                <a
                  href="#"
                  className={`relative transition-colors hover:text-gold ${i === 0 ? "text-gold" : "text-cream/85"}`}
                >
                  {l}
                  {i === 0 && <span className="absolute -bottom-2 left-0 right-0 mx-auto h-[2px] w-6 bg-gold rounded-full" />}
                </a>
              </li>
            ))}
          </ul>

          <button className="btn-gold rounded-full px-7 py-3 text-sm font-semibold whitespace-nowrap">
            Get Started
          </button>
        </nav>

        {/* Hero content */}
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10 pt-16 pb-40 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="animate-fade-up">
            <div className="flex items-center gap-3 text-gold mb-8">
              <span className="h-px w-10 bg-gold/60" />
              <span className="text-[11px] tracking-[0.3em] font-semibold uppercase">English Learning · South Indian Soul</span>
              <Sparkles className="h-3.5 w-3.5" />
            </div>

            <h1 className="font-serif text-[64px] leading-[1.05] md:text-[78px] tracking-tight">
              Where English<br />
              Feels Like <span className="text-gold-gradient italic">Home.</span>
            </h1>

            <p className="mt-8 max-w-md text-cream/75 text-[15px] leading-relaxed">
              Learn English through grammar, vocabulary, speaking, writing and practical
              communication for students, teachers and lifelong learners.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="btn-gold rounded-full px-8 py-4 text-sm font-semibold inline-flex items-center gap-2">
                Start Learning <ArrowRight className="h-4 w-4" />
              </button>
              <button className="btn-ghost-gold rounded-full px-8 py-4 text-sm font-semibold">
                Explore Resources
              </button>
            </div>

            <p className="mt-10 flex items-center gap-2 text-gold/90 text-sm">
              <Coffee className="h-4 w-4" /> Brew. Learn. Grow. Fluent.
            </p>
          </div>

          {/* Right — image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-[var(--shadow-luxury)] animate-float-slow">
              <img
                src={heroImg}
                alt="Brass South Indian filter coffee tumbler beside leather English grammar books"
                width={1280}
                height={1024}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-navy-deep/40 via-transparent to-transparent" />
            </div>

            {/* Quote card */}
            <div className="hidden md:block absolute -right-4 top-10 w-44 rounded-2xl bg-navy/70 backdrop-blur border border-gold/20 p-5 text-cream shadow-xl">
              <Quote className="h-4 w-4 text-gold mb-2" />
              <p className="font-serif italic text-[15px] leading-snug">
                Arise with knowledge. Shine with purpose.
              </p>
              <p className="mt-3 text-[11px] tracking-[0.2em] text-gold/80 uppercase">— Murugan</p>
            </div>
          </div>
        </div>

        {/* Stats bar — overlaps next section */}
        <div className="relative z-20 mx-auto max-w-[1200px] px-6 lg:px-10 -mb-12">
          <div className="rounded-2xl bg-navy border border-gold/15 shadow-[var(--shadow-luxury)] py-7 px-6 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gold/15">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center justify-center gap-4 py-4 md:py-0">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/40 text-gold">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <div>
                  <div className="font-serif text-2xl text-gold leading-none">{value}</div>
                  <div className="text-xs tracking-wide text-cream/70 mt-1">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LEARNING CARDS ===== */}
      <section className="relative bg-cream pt-32 pb-24">
        <img src={coffeeBranch} alt="" aria-hidden className="pointer-events-none absolute left-0 top-24 w-56 opacity-40" />
        <img src={kolam} alt="" aria-hidden className="pointer-events-none absolute right-10 bottom-10 w-72 opacity-[0.07]" />
        <img src={coffeeBranch} alt="" aria-hidden className="pointer-events-none absolute right-2 top-40 w-24 opacity-50 rotate-12" />

        <div className="relative mx-auto max-w-[1300px] px-6 lg:px-10 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
          {learningCards.map(({ icon: Icon, title, desc }) => (
            <article
              key={title}
              className="group bg-card rounded-2xl p-7 text-center shadow-[var(--shadow-card)] border border-border/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-15px_rgba(91,58,41,0.3)]"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center text-coffee group-hover:text-gold transition-colors">
                <Icon className="h-9 w-9" strokeWidth={1.4} />
              </div>
              <h3 className="font-serif text-2xl text-navy-deep mb-3">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{desc}</p>
              <a href="#" className="inline-flex items-center gap-1 text-xs font-semibold text-coffee tracking-wider uppercase hover:text-gold transition-colors">
                Explore <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="relative bg-beige/60 grid lg:grid-cols-2 overflow-hidden">
        <img src={gopuramArt} alt="" aria-hidden className="pointer-events-none absolute right-0 bottom-0 w-[460px] opacity-[0.12]" />
        <div className="relative h-[420px] lg:h-auto">
          <img
            src={aboutImg}
            alt="Filter coffee on an open notebook with vintage grammar books"
            width={1024}
            height={1024}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className="relative px-8 lg:px-20 py-20 lg:py-28 max-w-2xl">
          <div className="flex items-center gap-3 text-coffee mb-6">
            <span className="h-px w-8 bg-coffee/50" />
            <span className="text-[11px] tracking-[0.3em] font-semibold uppercase">About Filter &amp; Fluent</span>
            <span className="h-px w-8 bg-coffee/50" />
          </div>

          <h2 className="font-serif text-5xl lg:text-6xl leading-[1.05] text-navy-deep">
            Rooted in Tradition.<br />
            <span className="text-gold-gradient italic">Designed for Fluency.</span>
          </h2>

          <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-muted-foreground max-w-xl">
            <p>
              Filter &amp; Fluent is an English learning platform inspired by the warmth,
              simplicity and depth of South Indian filter coffee. We believe learning
              English should be practical, meaningful and enjoyable.
            </p>
            <p>
              Whether you are a student, teacher or lifelong learner, you'll find
              everything you need to learn, teach and grow with confidence.
            </p>
          </div>

          <button className="mt-10 inline-flex items-center gap-2 rounded-full bg-navy-deep text-cream px-8 py-4 text-sm font-semibold hover:bg-navy transition-colors shadow-[var(--shadow-card)]">
            Learn More About Us <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative bg-navy-deep text-cream overflow-hidden">
        <img src={kolam} alt="" aria-hidden className="pointer-events-none absolute -left-20 -bottom-20 w-96 opacity-[0.05]" />
        <img src={gopuramArt} alt="" aria-hidden className="pointer-events-none absolute right-0 bottom-0 w-72 opacity-[0.06]" />

        <div className="relative mx-auto max-w-[1300px] px-6 lg:px-10 py-20 grid lg:grid-cols-12 gap-12">
          {/* Newsletter */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40">
                <Coffee className="h-5 w-5 text-gold" />
              </span>
              <span className="font-serif text-2xl text-gold-gradient">Filter &amp; Fluent</span>
            </div>
            <p className="text-cream/70 text-sm leading-relaxed max-w-sm mb-6">
              Brewed lessons, delivered weekly. Join our newsletter for grammar tips,
              vocabulary, and stories from the world of English.
            </p>
            <form className="flex gap-2 max-w-md" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 rounded-full bg-navy border border-gold/20 px-5 py-3 text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold/60"
              />
              <button type="submit" className="btn-gold rounded-full px-6 py-3 text-sm font-semibold">
                Subscribe
              </button>
            </form>
          </div>

          {/* Columns */}
          {[
            { title: "Learn", items: ["Grammar", "Vocabulary", "Speaking", "Writing"] },
            { title: "Resources", items: ["Books", "Worksheets", "Blog", "Workshops"] },
            { title: "Company", items: ["About", "Contact", "Careers", "Press"] },
          ].map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h4 className="font-serif text-lg text-gold mb-5">{col.title}</h4>
              <ul className="space-y-3 text-sm text-cream/70">
                {col.items.map((i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-gold transition-colors">{i}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-1" />
        </div>

        <div className="relative border-t border-gold/15">
          <div className="mx-auto max-w-[1300px] px-6 lg:px-10 py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-cream/50">
            <p>© {new Date().getFullYear()} Filter &amp; Fluent. Brewed with care.</p>
            <p className="tracking-[0.2em] uppercase">English Learning · South Indian Soul</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
