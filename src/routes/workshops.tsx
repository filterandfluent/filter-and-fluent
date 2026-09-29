import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, BookOpen, Bot, Building2, CalendarClock, CheckCircle2, Clock, Coffee, GraduationCap,
  Layers, Mic, MessageCircle, PenLine, Presentation, School, Sparkles, Sun, Type, UserCheck, Users,
} from "lucide-react";
import kolam from "@/assets/kolam-mandala.png";
import coffeeBranch from "@/assets/coffee-branch.png";
import workshopImg from "@/assets/card-workshops.jpg";

export const Route = createFileRoute("/workshops")({
  head: () => ({
    meta: [
      { title: "English Language Enrichment Workshops — Filter & Fluent" },
      { name: "description", content: "Practical, interactive English workshops for schools, teachers, students and colleges — led by TEFL educator Gnana Soundari Devaraj." },
      { property: "og:title", content: "English Language Enrichment Workshops — Filter & Fluent" },
      { property: "og:description", content: "Interactive English training for confident communication — for schools, teachers, students and colleges." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WorkshopsPage,
});

const navLinks: { label: string; to: string; hash?: string }[] = [
  { label: "Home", to: "/" }, { label: "About", to: "/about" }, { label: "Grammar", to: "/grammar" },
  { label: "Vocabulary", to: "/vocabulary" }, { label: "Speaking", to: "/speaking" }, { label: "Writing", to: "/writing" },
  { label: "Courses", to: "/courses" }, { label: "Resources", to: "/resources" }, { label: "Blog", to: "/blog" },
  { label: "Books", to: "/books" }, { label: "Workshops", to: "/workshops" }, { label: "Contact", to: "/", hash: "contact" },
];

const areas = [
  { icon: MessageCircle, t: "Spoken English & Communication", d: "Everyday fluency, conversation strategies and confident expression." },
  { icon: BookOpen, t: "Reading & Comprehension", d: "Active reading habits, inference and understanding of texts." },
  { icon: PenLine, t: "Writing Skills", d: "Clear, structured writing — from paragraphs to formal pieces." },
  { icon: Layers, t: "Grammar Through Activities", d: "Games, tasks and real contexts that make grammar stick." },
  { icon: Type, t: "Vocabulary & Pronunciation", d: "Useful words, natural usage and clear, confident sounds." },
  { icon: Presentation, t: "Presentation & Public Speaking", d: "Stage presence, structure and speaking with impact." },
  { icon: School, t: "Classroom English & Teaching Methodology", d: "Practical strategies and classroom language for teachers." },
  { icon: Bot, t: "AI-Enhanced English Learning", d: "Using AI tools thoughtfully to practise and teach English." },
];

const audiences = [
  { icon: UserCheck, t: "School Teachers", d: "Methodology, classroom English and activity-based teaching strategies." },
  { icon: Users, t: "School Students", d: "Fun, interactive sessions that build speaking, reading and writing confidence." },
  { icon: GraduationCap, t: "College Students", d: "Communication, presentations and workplace-ready English." },
  { icon: MessageCircle, t: "English Language Learners", d: "Supportive practice for anyone growing their everyday English." },
];

const institution = [
  { icon: UserCheck, t: "Teacher Training" },
  { icon: Sparkles, t: "Student Enrichment Workshops" },
  { icon: Building2, t: "Customised English Programmes" },
  { icon: Clock, t: "Half-Day Workshops" },
  { icon: Sun, t: "Full-Day Workshops" },
  { icon: CalendarClock, t: "Multi-Session Training" },
];

const steps = [
  { t: "Discover", d: "Explore the idea through examples and context." },
  { t: "Practise", d: "Try it in guided, low-pressure activities." },
  { t: "Participate", d: "Speak, share and collaborate with others." },
  { t: "Apply", d: "Use it confidently in real situations." },
];

const why = [
  "Practical & activity-based", "Interactive learning", "Real-life English usage",
  "Customised to learner needs", "Confidence-focused", "Classroom-friendly strategies",
];

function Eyebrow({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] ${dark ? "text-gold" : "text-coffee"}`}>
      <Coffee className="h-3.5 w-3.5" /> {children}
    </span>
  );
}

function EnquireBtn() {
  return (
    <Link to="/" hash="contact" className="btn-gold inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold">
      Enquire About a Workshop <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

function WorkshopsPage() {
  return (
    <div className="min-h-screen bg-cream text-navy-deep">
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-deep text-cream">
        <img src={kolam} alt="" className="pointer-events-none absolute -top-32 -left-32 w-[520px] opacity-[0.06]" />
        <img src={coffeeBranch} alt="" className="pointer-events-none absolute -bottom-24 -right-24 w-[420px] opacity-[0.07]" />
        <nav className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10 pt-6 flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-navy/60">
              <Coffee className="h-5 w-5 text-gold" />
            </span>
            <span className="font-serif text-xl tracking-wide text-cream">Filter &amp; Fluent</span>
          </Link>
          <ul className="hidden xl:flex items-center gap-7 text-[13px] font-medium">
            {navLinks.map((l) => {
              const active = l.label === "Workshops";
              return (
                <li key={l.label}>
                  <Link to={l.to} hash={l.hash} className={`relative transition-colors hover:text-gold ${active ? "text-gold" : "text-cream/85"}`}>
                    {l.label}
                    {active && <span className="absolute -bottom-2 left-0 right-0 mx-auto h-[2px] w-6 bg-gold rounded-full" />}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link to="/" hash="contact" className="btn-gold rounded-full px-7 py-3 text-sm font-semibold whitespace-nowrap">Get Started</Link>
        </nav>

        <div className="relative z-10 mx-auto max-w-[1300px] px-6 lg:px-10 py-16 lg:py-24 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <div>
            <Eyebrow dark>Gather &amp; Grow</Eyebrow>
            <h1 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.08]">
              English Language <span className="text-gold-gradient">Enrichment</span> Workshops
            </h1>
            <p className="mt-6 max-w-xl text-lg text-cream/80 leading-relaxed">
              Practical, interactive English training designed for confident communication and effective learning.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Schools", "Teachers", "Students", "Colleges"].map((a) => (
                <span key={a} className="rounded-full border border-gold/40 bg-navy/50 px-4 py-1.5 text-sm text-gold-soft">{a}</span>
              ))}
            </div>
            <div className="mt-9"><EnquireBtn /></div>
          </div>
          <div className="relative">
            <div className="absolute -inset-3 rounded-[2rem] border border-gold/25" />
            <img src={workshopImg} alt="Filter coffee and workshop materials on a table" className="relative w-full aspect-[4/3] object-cover rounded-[1.75rem] shadow-luxury" />
          </div>
        </div>
      </section>

      {/* AREAS */}
      <section className="mx-auto max-w-[1300px] px-6 lg:px-10 py-16 lg:py-20">
        <div className="max-w-2xl">
          <Eyebrow>Workshop Areas</Eyebrow>
          <h2 className="mt-3 text-4xl lg:text-5xl">What we brew together</h2>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {areas.map(({ icon: I, t, d }) => (
            <div key={t} className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-gold/60">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold"><I className="h-5 w-5" /></span>
              <h3 className="mt-5 text-xl leading-snug text-navy-deep">{t}</h3>
              <p className="mt-2 text-[15px] text-muted-foreground leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHO */}
      <section className="bg-beige/60 py-16 lg:py-20">
        <div className="mx-auto max-w-[1300px] px-6 lg:px-10">
          <Eyebrow>Who We Train</Eyebrow>
          <h2 className="mt-3 text-4xl lg:text-5xl">Every learner, every classroom</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {audiences.map(({ icon: I, t, d }) => (
              <div key={t} className="rounded-2xl bg-card p-7 border-t-4 border-gold shadow-card">
                <I className="h-7 w-7 text-coffee" />
                <h3 className="mt-4 text-2xl text-navy-deep">{t}</h3>
                <p className="mt-2 text-[15px] text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTITUTIONS */}
      <section className="relative overflow-hidden bg-navy text-cream py-16 lg:py-20">
        <img src={kolam} alt="" className="pointer-events-none absolute -right-40 top-0 w-[500px] opacity-[0.05]" />
        <div className="relative mx-auto max-w-[1300px] px-6 lg:px-10 grid lg:grid-cols-[1fr_1.4fr] gap-10 items-center">
          <div>
            <Eyebrow dark>For Schools &amp; Institutions</Eyebrow>
            <h2 className="mt-3 text-4xl lg:text-5xl">Programmes shaped around you</h2>
            <p className="mt-5 text-lg text-cream/75 leading-relaxed">Flexible formats for teachers and students — designed around your timetable, goals and learners.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {institution.map(({ icon: I, t }) => (
              <div key={t} className="flex items-center gap-4 rounded-xl border border-gold/25 bg-navy-deep/60 p-5">
                <I className="h-6 w-6 shrink-0 text-gold" />
                <span className="text-base font-medium">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="mx-auto max-w-[1300px] px-6 lg:px-10 py-16 lg:py-20 text-center">
        <Eyebrow>Our Approach</Eyebrow>
        <h2 className="mt-3 text-4xl lg:text-5xl">From first sip to full confidence</h2>
        <p className="mt-5 mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Every workshop focuses on practical usage, interaction, activities, real classroom situations and confidence-building.
        </p>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={s.t} className="relative rounded-2xl bg-card border border-border p-7 shadow-card">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-coffee text-cream font-serif text-2xl">{i + 1}</span>
              <h3 className="mt-4 text-2xl text-navy-deep">{s.t}</h3>
              <p className="mt-2 text-[15px] text-muted-foreground">{s.d}</p>
              {i < steps.length - 1 && <ArrowRight className="hidden lg:block absolute -right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gold" />}
            </div>
          ))}
        </div>
      </section>

      {/* WHY + FACILITATOR */}
      <section className="bg-beige/60 py-16 lg:py-20">
        <div className="mx-auto max-w-[1300px] px-6 lg:px-10 grid lg:grid-cols-2 gap-8">
          <div className="rounded-2xl bg-card p-8 lg:p-10 shadow-card">
            <Eyebrow>Why Filter &amp; Fluent</Eyebrow>
            <h2 className="mt-3 text-3xl lg:text-4xl">Learning that feels real</h2>
            <ul className="mt-7 grid sm:grid-cols-2 gap-4">
              {why.map((w) => (
                <li key={w} className="flex items-start gap-3 text-base text-navy-deep">
                  <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0 text-gold" /> {w}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-coffee text-cream p-8 lg:p-10 shadow-card">
            <Eyebrow dark>Your Facilitator</Eyebrow>
            <h2 className="mt-3 text-3xl lg:text-4xl">Gnana Soundari Devaraj</h2>
            <p className="mt-2 text-gold-soft font-medium">English Language Educator | Workshop Facilitator | TEFL Educator</p>
            <p className="mt-5 text-base text-cream/85 leading-relaxed">
              With 9+ years of English teaching and training experience, Gnana has worked across school curricula,
              communication training, workshops and teacher development — bringing warmth, clarity and practical
              strategies to every session.
            </p>
            <Link to="/about" className="mt-6 inline-flex items-center gap-2 text-gold font-semibold hover:underline">
              Meet the teacher <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-navy-deep text-cream py-16 lg:py-20 text-center">
        <img src={coffeeBranch} alt="" className="pointer-events-none absolute -left-20 -bottom-20 w-[380px] opacity-[0.07]" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Mic className="mx-auto h-8 w-8 text-gold" />
          <h2 className="mt-4 text-4xl lg:text-5xl">Bring English Learning to Life</h2>
          <p className="mt-4 text-lg text-cream/80">Let's create a workshop that fits your learners, teachers, or institution.</p>
          <div className="mt-8"><EnquireBtn /></div>
        </div>
      </section>
    </div>
  );
}
