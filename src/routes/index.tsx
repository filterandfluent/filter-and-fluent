import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Coffee,
  GraduationCap,
  Languages,
  Mail,
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
import velArt from "@/assets/vel-lineart.png";
import { Heart, Lightbulb, Mic, Target, Eye } from "lucide-react";
import cardArticles from "@/assets/card-articles.jpg";
import cardResources from "@/assets/card-resources.jpg";
import cardWorkshops from "@/assets/card-workshops.jpg";
import cardBooks from "@/assets/card-books.jpg";

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
                  href={l === "Contact" ? "#contact" : "#"}
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
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10 pt-16 pb-12 grid lg:grid-cols-2 gap-12 items-center">
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

        {/* Stats bar — sits directly beneath the hero */}
        <div className="relative z-20 mx-auto max-w-[1200px] px-6 lg:px-10">
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
      <section className="relative bg-cream pt-20 pb-24">
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
        <img src={velArt} alt="" aria-hidden className="pointer-events-none absolute right-[22%] bottom-10 w-[90px] opacity-[0.18] hidden lg:block" />
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
            <span className="text-[11px] tracking-[0.3em] font-semibold uppercase">Our Story</span>
            <span className="h-px w-8 bg-coffee/50" />
          </div>

          <h2 className="font-serif text-5xl lg:text-6xl leading-[1.05] text-navy-deep">
            Where Confidence<br />
            <span className="text-gold-gradient italic">is Brewed.</span>
          </h2>

          <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-muted-foreground max-w-xl">
            <p>
              Filter &amp; Fluent wasn't created to be another English learning platform. It was created to be the place we always wished existed.
            </p>
            <p>
              Imagine walking into your favourite coffee shop. The aroma of freshly brewed coffee fills the air. You settle into a comfortable chair, your favourite drink in hand, and for a while, the noise of the world fades away.
            </p>
            <p>
              Learning should feel like that. Not stressful. Not overwhelming. Not like another classroom.
            </p>
            <p>
              At Filter &amp; Fluent, we believe English isn't just a subject to study—it's a language to experience. That's why every lesson, resource, vocabulary word, grammar tip, and conversation is designed to feel simple, practical, and enjoyable.
            </p>
            <p>
              Here, you won't be rushed. You won't be judged for making mistakes. Instead, you'll learn naturally, one meaningful step at a time, in a space that feels welcoming and inspiring.
            </p>
            <p>
              Our dream is to create a place where learning feels as comforting as your favourite cup of coffee—where curiosity replaces fear, confidence grows with every visit, and communication becomes second nature.
            </p>
            <p>
              We don't want you to visit Filter &amp; Fluent just to learn English. We want you to feel at home in the language.
            </p>
            <p className="font-serif italic text-navy-deep text-lg">
              So, grab your favourite cup, stay as long as you like, and enjoy the journey.
            </p>
            <p className="font-serif italic text-coffee">
              Welcome to Filter &amp; Fluent.<br />
              Where confidence is brewed, and every voice finds its place.
            </p>
          </div>

          <button className="mt-10 inline-flex items-center gap-2 rounded-full bg-navy-deep text-cream px-8 py-4 text-sm font-semibold hover:bg-navy transition-colors shadow-[var(--shadow-card)]">
            Learn More About Us <ArrowRight className="h-4 w-4" />
          </button>

          {/* Founder Identity */}
          <div className="mt-14 pt-10 border-t border-coffee/20 flex items-center gap-5">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/50 bg-navy-deep text-gold shrink-0">
              <Coffee className="h-7 w-7" />
            </span>
            <div>
              <p className="font-serif text-2xl text-navy-deep leading-tight">Gnana Soundari Devaraj</p>
              <p className="text-[11px] tracking-[0.28em] font-semibold uppercase text-gold mt-2">Chief Brewer of Confidence</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MISSION & VISION ===== */}
      <section className="relative bg-navy-deep text-cream overflow-hidden py-24">
        <img src={kolam} alt="" aria-hidden className="pointer-events-none absolute -right-24 -top-24 w-[480px] opacity-[0.06]" />
        <img src={gopuramArt} alt="" aria-hidden className="pointer-events-none absolute -left-16 bottom-0 w-[360px] opacity-[0.07]" />
        <div className="relative mx-auto max-w-[1300px] px-6 lg:px-10 grid md:grid-cols-2 gap-10">
          {[
            {
              icon: Target,
              tag: "Our Mission",
              title: "Brewing Confidence, One Voice at a Time.",
              body: "At Filter & Fluent, we see learning as the art of brewing confidence. Just as every perfect cup begins with carefully chosen beans, we believe every confident voice begins with meaningful learning. Our mission is to inspire learners to discover their voice, communicate with purpose, and create a lasting impact wherever life takes them.",
            },
            {
              icon: Eye,
              tag: "Our Vision",
              title: "A Home for Every Voice.",
              body: "To be more than an English learning platform—to become a place where confidence is brewed, dreams are nurtured, and every voice finds its strength.",
            },
          ].map(({ icon: Icon, tag, title, body }) => (
            <article key={tag} className="relative rounded-3xl border border-gold/20 bg-navy/50 backdrop-blur p-10 lg:p-12 shadow-[var(--shadow-luxury)]">
              <span className="flex h-14 w-14 items-center justify-center rounded-xl border border-gold/40 text-gold mb-6">
                <Icon className="h-7 w-7" strokeWidth={1.5} />
              </span>
              <p className="text-[11px] tracking-[0.3em] font-semibold uppercase text-gold/90 mb-4">{tag}</p>
              <h3 className="font-serif text-3xl lg:text-4xl leading-tight text-cream mb-6">
                <span className="text-gold-gradient italic">{title}</span>
              </h3>
              <p className="text-[15px] leading-relaxed text-cream/75">{body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ===== CORE VALUES — WHAT WE BREW EVERY DAY ===== */}
      <section className="relative bg-beige/60 py-24 overflow-hidden">
        <img src={coffeeBranch} alt="" aria-hidden className="pointer-events-none absolute left-0 top-16 w-56 opacity-40" />
        <img src={coffeeBranch} alt="" aria-hidden className="pointer-events-none absolute right-0 bottom-10 w-56 opacity-40 rotate-180" />
        <img src={kolam} alt="" aria-hidden className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/3 w-[500px] opacity-[0.05]" />

        <div className="relative mx-auto max-w-[1300px] px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 text-coffee mb-6">
              <span className="h-px w-8 bg-coffee/50" />
              <span className="text-[11px] tracking-[0.3em] font-semibold uppercase">Our Core Values</span>
              <span className="h-px w-8 bg-coffee/50" />
            </div>
            <h2 className="font-serif text-5xl lg:text-6xl leading-[1.05] text-navy-deep">
              What We Brew<br />
              <span className="text-gold-gradient italic">Every Day.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Coffee, title: "Brew Confidence", body: "Confidence is the first language we teach. Before grammar, vocabulary, and fluency—we help learners believe in their own voice." },
              { icon: Sparkles, title: "Sip. Learn. Grow.", body: "Great coffee isn't rushed, and neither is meaningful learning. We believe every learner should enjoy the journey—one lesson, one conversation, one cup at a time." },
              { icon: Mic, title: "Every Voice Matters", body: "Every learner has a story worth sharing. Communication is not about perfection—it is about connection, understanding, and authenticity." },
              { icon: Lightbulb, title: "Simplicity Creates Clarity", body: "We remove confusion and make English simple, practical, and usable in real life." },
              { icon: Heart, title: "Learn with Heart", body: "Learning happens best in comfort and encouragement. Mistakes are part of growth, curiosity is celebrated, and every learner is valued." },
            ].map(({ icon: Icon, title, body }) => (
              <article key={title} className="group bg-card rounded-2xl p-8 border border-border/40 shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_-20px_rgba(91,58,41,0.4)]">
                <span className="flex h-14 w-14 items-center justify-center rounded-xl border border-coffee/25 text-coffee group-hover:border-gold group-hover:text-gold transition-colors mb-6">
                  <Icon className="h-7 w-7" strokeWidth={1.4} />
                </span>
                <h3 className="font-serif text-2xl text-navy-deep mb-3">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PHILOSOPHY ===== */}
      <section className="relative bg-cream py-24 overflow-hidden">
        <img src={muruganArt} alt="" aria-hidden className="pointer-events-none absolute left-6 top-10 w-[220px] opacity-[0.06]" />
        <img src={gopuramArt} alt="" aria-hidden className="pointer-events-none absolute right-6 bottom-6 w-[240px] opacity-[0.07]" />
        <div className="relative mx-auto max-w-3xl px-6 lg:px-10 text-center">
          <Quote className="h-10 w-10 text-gold mx-auto mb-8" strokeWidth={1.2} />
          <div className="flex items-center justify-center gap-3 text-coffee mb-8">
            <span className="h-px w-8 bg-coffee/50" />
            <span className="text-[11px] tracking-[0.3em] font-semibold uppercase">Our Philosophy</span>
            <span className="h-px w-8 bg-coffee/50" />
          </div>
          <p className="font-serif text-3xl md:text-4xl leading-[1.25] text-navy-deep">
            At Filter &amp; Fluent, learning English should feel less like a classroom and more like your favourite coffee shop—<span className="text-gold-gradient italic">comfortable, inspiring, and filled with meaningful conversations.</span> Everything we create is brewed with purpose so every learner leaves more confident than they arrived.
          </p>
          <div className="mt-12 flex items-center justify-center gap-4 text-coffee">
            <span className="h-px w-12 bg-coffee/40" />
            <Coffee className="h-4 w-4 text-gold" />
            <span className="h-px w-12 bg-coffee/40" />
          </div>
        </div>
      </section>


      {/* ===== FEATURE CARDS ===== */}
      <section className="relative bg-cream pb-20">
        <div className="mx-auto max-w-[1300px] px-6 lg:px-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { img: cardArticles, tag: "Latest Articles", title: ["Practical English", "for Real Life"], cta: "Read Blog" },
            { img: cardResources, tag: "Free Resources", title: ["Worksheets, PDFs", "& Study Guides"], cta: "Download Now" },
            { img: cardWorkshops, tag: "Workshops & Training", title: ["For Teachers.", "By a Teacher."], cta: "Explore Workshops" },
            { img: cardBooks, tag: "Books", title: ["Books that", "Inspire & Teach"], cta: "Explore Books" },
          ].map((c) => (
            <article key={c.tag} className="group relative rounded-2xl overflow-hidden shadow-[var(--shadow-card)] border border-border/40 h-[260px] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_60px_-20px_rgba(91,58,41,0.45)]">
              <img src={c.img} alt={c.title.join(" ")} width={800} height={600} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/40 to-transparent" />
              <div className="relative z-10 h-full flex flex-col justify-end p-6 text-cream">
                <p className="text-[10px] tracking-[0.25em] font-semibold uppercase text-gold/90 mb-2">{c.tag}</p>
                <h3 className="font-serif text-2xl leading-tight mb-3">
                  {c.title[0]}<br />{c.title[1]}
                </h3>
                <a href="#" className="inline-flex items-center gap-1 text-xs font-semibold tracking-wider uppercase text-gold hover:text-cream transition-colors">
                  {c.cta} <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===== NEWSLETTER STRIP ===== */}
      <section className="relative bg-coffee text-cream overflow-hidden">
        <img src={coffeeBranch} alt="" aria-hidden className="pointer-events-none absolute -left-6 top-1/2 -translate-y-1/2 w-40 opacity-30" />
        <img src={coffeeBranch} alt="" aria-hidden className="pointer-events-none absolute right-0 bottom-0 w-44 opacity-25 rotate-180" />
        <img src={kolam} alt="" aria-hidden className="pointer-events-none absolute right-1/4 -top-10 w-56 opacity-[0.06]" />
        <div className="relative mx-auto max-w-[1300px] px-6 lg:px-10 py-14 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <h3 className="font-serif text-3xl lg:text-4xl leading-tight flex items-start gap-3">
              <Coffee className="h-7 w-7 text-gold mt-1 shrink-0" />
              <span>
                <span className="text-gold-gradient">Brew Knowledge.</span><br />
                Stay Inspired.
              </span>
            </h3>
          </div>
          <p className="lg:col-span-3 text-cream/75 text-sm leading-relaxed">
            Get weekly English tips, resources and updates straight to your inbox.
          </p>
          <form className="lg:col-span-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 rounded-full bg-cream text-navy-deep px-5 py-3 text-sm placeholder:text-navy-deep/40 focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <button type="submit" className="btn-gold rounded-full px-6 py-3 text-sm font-semibold whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>



      {/* ===== CONTACT ===== */}
      <section id="contact" className="relative bg-beige/60 overflow-hidden">
        <img src={coffeeBranch} alt="" aria-hidden className="pointer-events-none absolute left-0 top-16 w-56 opacity-40" />
        <img src={coffeeBranch} alt="" aria-hidden className="pointer-events-none absolute right-0 bottom-0 w-48 opacity-40 rotate-180" />
        <img src={kolam} alt="" aria-hidden className="pointer-events-none absolute right-1/4 -top-10 w-72 opacity-[0.05]" />

        <div className="relative mx-auto max-w-[1300px] px-6 lg:px-10 py-24">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <div className="flex items-center gap-3 text-coffee mb-6">
                <span className="h-px w-8 bg-coffee/50" />
                <span className="text-[11px] tracking-[0.3em] font-semibold uppercase">Get in Touch</span>
                <span className="h-px w-8 bg-coffee/50" />
              </div>

              <h2 className="font-serif text-5xl lg:text-6xl leading-[1.05] text-navy-deep mb-6">
                Let's Start a<br />
                <span className="text-gold-gradient italic">Conversation.</span>
              </h2>

              <p className="text-[15px] leading-relaxed text-muted-foreground max-w-md mb-10">
                Got a question, a course inquiry, or just want to say hi? Pour yourself a cup and drop us a message — we reply faster than your coffee gets cold.
              </p>

              <div className="space-y-5">
                <a href="mailto:hello@filterandfluent.com" className="flex items-center gap-4 group">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-navy-deep text-gold group-hover:bg-navy transition-colors">
                    <Mail className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[11px] tracking-[0.2em] font-semibold uppercase text-coffee">Email</span>
                    <span className="block text-sm font-medium text-navy-deep group-hover:text-gold transition-colors">hello@filterandfluent.com</span>
                  </span>
                </a>
                <a href="https://instagram.com/filterandfluent" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-navy-deep text-gold group-hover:bg-navy transition-colors">
                    <Coffee className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[11px] tracking-[0.2em] font-semibold uppercase text-coffee">Instagram</span>
                    <span className="block text-sm font-medium text-navy-deep group-hover:text-gold transition-colors">@filterandfluent</span>
                  </span>
                </a>
                <a href="https://youtube.com/filterandfluent" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-navy-deep text-gold group-hover:bg-navy transition-colors">
                    <PlayCircle className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[11px] tracking-[0.2em] font-semibold uppercase text-coffee">YouTube</span>
                    <span className="block text-sm font-medium text-navy-deep group-hover:text-gold transition-colors">Filter & Fluent</span>
                  </span>
                </a>
              </div>
            </div>

            <form className="bg-card rounded-3xl p-8 lg:p-10 border border-border/40 shadow-[var(--shadow-card)]" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-5">
                <div>
                  <label htmlFor="contact-name" className="block text-[11px] tracking-[0.2em] font-semibold uppercase text-coffee mb-2">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-full bg-cream border border-border px-5 py-3 text-sm text-navy-deep placeholder:text-navy-deep/40 focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-[11px] tracking-[0.2em] font-semibold uppercase text-coffee mb-2">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="your@email.com"
                    className="w-full rounded-full bg-cream border border-border px-5 py-3 text-sm text-navy-deep placeholder:text-navy-deep/40 focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-[11px] tracking-[0.2em] font-semibold uppercase text-coffee mb-2">Message</label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder="How can we help you?"
                    className="w-full rounded-2xl bg-cream border border-border px-5 py-4 text-sm text-navy-deep placeholder:text-navy-deep/40 focus:outline-none focus:ring-2 focus:ring-gold resize-none"
                  />
                </div>
                <button type="submit" className="btn-gold w-full rounded-full px-8 py-4 text-sm font-semibold inline-flex items-center justify-center gap-2">
                  Send Message <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
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
