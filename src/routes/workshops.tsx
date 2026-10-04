import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDown, ArrowRight, Brain, Coffee, Eye, FlaskConical, GraduationCap, HelpCircle, Lightbulb,
  RefreshCw, School, Search, Sparkles, Target, UserCheck, Users, Wrench, Zap,
} from "lucide-react";
import kolam from "@/assets/kolam-mandala.png";
import coffeeBranch from "@/assets/coffee-branch.png";

export const Route = createFileRoute("/workshops")({
  head: () => ({
    meta: [
      { title: "The Teacher Lab — Filter & Fluent Workshops" },
      { name: "description", content: "Beyond methods: a Teacher Lab where teachers diagnose and solve real English classroom problems. Led by Gnana Soundari Devaraj." },
      { property: "og:title", content: "The Filter & Fluent Teacher Lab" },
      { property: "og:description", content: "Real classroom problems. Better questions. Practical solutions." },
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

const oldWay = ["Topic", "Method", "Activity", "Worksheet"];
const newWay = ["Observe", "Diagnose", "Decide", "Teach", "Observe Again"];

const problems = [
  { n: "01", t: "The Silent Classroom", d: "Students understand English but still don't speak.", q: "What is really stopping them?" },
  { n: "02", t: "The Vocabulary Illusion", d: "Students can define a word but cannot naturally use it.", q: "Do they know the word—or only recognise it?" },
  { n: "03", t: "The Reading Mystery", d: "A child can read the words but cannot explain the meaning.", q: "Is the problem actually reading?" },
  { n: "04", t: "The 40-Minute Grammar Rescue", d: "One grammar concept. Mixed learners. Forty minutes.", q: "How do we move from teaching the rule to using it?" },
];

const lens = [
  { icon: Eye, t: "See", d: "What is happening?" },
  { icon: HelpCircle, t: "Question", d: "What might be causing it?" },
  { icon: FlaskConical, t: "Test", d: "What small change can I make?" },
  { icon: Search, t: "Observe", d: "What changes?" },
  { icon: RefreshCw, t: "Adapt", d: "What should I do next?" },
];

const different = [
  { icon: School, t: "Real Classroom Problems", d: "Work with situations teachers actually recognise." },
  { icon: Brain, t: "Diagnostic Thinking", d: "Look beyond the obvious learner mistake." },
  { icon: Target, t: "Micro-Teaching", d: "Turn an idea into an actual classroom move." },
  { icon: Wrench, t: "Lesson Makeovers", d: "Transform ordinary teaching moments into purposeful learning." },
  { icon: Users, t: "Learner Perspective", d: "Understand what may be happening from the learner's side." },
  { icon: Zap, t: "Immediate Application", d: "Leave with something that can be used in the classroom." },
];

const journey = ["A Classroom Problem", "Think", "Investigate", "Build", "Try", "Reflect", "Apply"];

const audiences = [
  { icon: UserCheck, t: "School Teachers" },
  { icon: Sparkles, t: "School Leaders & Coordinators" },
  { icon: GraduationCap, t: "College Faculty" },
  { icon: Lightbulb, t: "English Language Educators" },
];

const challenges = [
  "Speaking confidence", "Reading comprehension", "Vocabulary-to-communication", "Writing development",
  "Grammar in context", "Mixed-ability classrooms", "Primary English teaching", "Classroom communication",
  "Teacher confidence", "AI-supported English learning",
];

function Eyebrow({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] ${dark ? "text-gold" : "text-coffee"}`}>
      <Coffee className="h-3.5 w-3.5" /> {children}
    </span>
  );
}

function EnquireBtn({ label = "Enquire About a Workshop" }: { label?: string }) {
  return (
    <Link to="/" hash="contact" className="btn-gold inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold">
      {label} <ArrowRight className="h-4 w-4" />
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

        <div className="relative z-10 mx-auto max-w-[1300px] px-6 lg:px-10 py-16 lg:py-24 grid lg:grid-cols-[1.3fr_1fr] gap-12 items-center">
          <div className="animate-fade-up">
            <Eyebrow dark>The Filter &amp; Fluent Teacher Lab</Eyebrow>
            <p className="mt-4 text-sm uppercase tracking-[0.2em] text-gold-soft/80">Beyond Methods: Solving Real English Classroom Problems</p>
            <h1 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.08]">
              What if the problem <span className="text-gold-gradient italic">isn't the lesson?</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-cream/80 leading-relaxed">
              Sometimes the visible classroom problem is only the symptom. The Teacher Lab helps teachers look deeper,
              diagnose what is happening, and make better teaching decisions.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <EnquireBtn label="Bring a Teacher Lab to Your School" />
              <a href="#shift" className="btn-ghost-gold inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold">
                Explore the Experience <ArrowDown className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="relative rounded-[1.75rem] border border-gold/30 bg-navy/60 p-8 shadow-luxury">
            <p className="text-xs uppercase tracking-[0.25em] text-gold">Lab Notebook · Entry 01</p>
            <div className="mt-6 space-y-5">
              <div>
                <p className="text-sm text-cream/60">What we see</p>
                <p className="mt-1 font-serif text-2xl">"They just won't speak."</p>
              </div>
              <div className="h-px bg-gold/25" />
              <div>
                <p className="text-sm text-cream/60">What we ask</p>
                <p className="mt-1 font-serif text-2xl text-gold-soft">Why — really?</p>
              </div>
            </div>
            <p className="mt-8 text-base font-medium text-cream/85">Real classroom problems. Better questions. Practical solutions.</p>
          </div>
        </div>
      </section>

      {/* SHIFT */}
      <section id="shift" className="mx-auto max-w-[1300px] px-6 lg:px-10 py-16 lg:py-20 scroll-mt-6">
        <div className="text-center">
          <Eyebrow>The Shift</Eyebrow>
          <h2 className="mt-3 text-4xl lg:text-5xl">From teaching the lesson to reading the classroom</h2>
        </div>
        <div className="mt-12 grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-border bg-beige/50 p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">The usual route</p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {oldWay.map((s, i) => (
                <span key={s} className="flex items-center gap-2">
                  <span className="rounded-full border border-border bg-card px-4 py-2 text-base text-muted-foreground">{s}</span>
                  {i < oldWay.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-navy p-7 text-cream shadow-luxury">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">The Teacher Lab route</p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {newWay.map((s, i) => (
                <span key={s} className="flex items-center gap-2">
                  <span className="rounded-full border border-gold/50 bg-navy-deep px-4 py-2 text-base font-medium text-gold-soft">{s}</span>
                  {i < newWay.length - 1 && <ArrowRight className="h-4 w-4 text-gold" />}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 mx-auto max-w-2xl text-center">
          <p className="font-serif text-3xl lg:text-4xl text-coffee italic">"The mistake is visible. The cause may not be."</p>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Teachers are encouraged to look beyond visible learner errors and investigate what may be causing them.
          </p>
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="relative overflow-hidden bg-navy-deep text-cream py-16 lg:py-20">
        <img src={kolam} alt="" className="pointer-events-none absolute -right-40 top-0 w-[500px] opacity-[0.05]" />
        <div className="relative mx-auto max-w-[1300px] px-6 lg:px-10">
          <Eyebrow dark>Inside the Teacher Lab</Eyebrow>
          <h2 className="mt-3 text-4xl lg:text-5xl">4 classroom problems we investigate</h2>
          <div className="mt-10 grid sm:grid-cols-2 gap-5">
            {problems.map((p) => (
              <div key={p.t} className="group relative rounded-2xl border border-gold/25 bg-navy/70 p-7 transition-all hover:-translate-y-1 hover:border-gold/70">
                <span className="absolute right-6 top-5 font-serif text-5xl text-gold/20">{p.n}</span>
                <Coffee className="h-6 w-6 text-gold" />
                <h3 className="mt-4 text-2xl lg:text-3xl">{p.t}</h3>
                <p className="mt-3 text-base text-cream/75 leading-relaxed">{p.d}</p>
                <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-2 text-base font-medium text-gold-soft">
                  <HelpCircle className="h-4 w-4" /> {p.q}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LENS */}
      <section className="mx-auto max-w-[1300px] px-6 lg:px-10 py-16 lg:py-20 text-center">
        <Eyebrow>The Filter &amp; Fluent 5-Step Lens</Eyebrow>
        <h2 className="mt-3 text-4xl lg:text-5xl">Don't fix the symptom. Find the cause.</h2>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {lens.map(({ icon: I, t, d }, i) => (
            <div key={t} className="relative rounded-2xl border border-border bg-card p-6 shadow-card">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-coffee text-cream"><I className="h-6 w-6" /></span>
              <p className="mt-3 text-xs font-semibold tracking-[0.2em] text-gold">STEP {i + 1}</p>
              <h3 className="mt-1 text-2xl uppercase tracking-wide">{t}</h3>
              <p className="mt-2 text-base text-muted-foreground">{d}</p>
              {i < lens.length - 1 && <ArrowRight className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gold" />}
            </div>
          ))}
        </div>
        <p className="mt-10 font-serif text-2xl lg:text-3xl text-navy-deep">
          Teachers don't need more activities. <span className="text-coffee italic">They need better classroom decisions.</span>
        </p>
      </section>

      {/* DIFFERENT */}
      <section className="bg-beige/60 py-16 lg:py-20">
        <div className="mx-auto max-w-[1300px] px-6 lg:px-10">
          <Eyebrow>What Makes the Lab Different?</Eyebrow>
          <h2 className="mt-3 text-4xl lg:text-5xl">Built around real classrooms</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {different.map(({ icon: I, t, d }) => (
              <div key={t} className="rounded-2xl bg-card p-7 border-l-4 border-gold shadow-card">
                <I className="h-7 w-7 text-coffee" />
                <h3 className="mt-4 text-xl uppercase tracking-wide">{t}</h3>
                <p className="mt-2 text-base text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="bg-coffee text-cream py-16 lg:py-20">
        <div className="mx-auto max-w-[1300px] px-6 lg:px-10 text-center">
          <Eyebrow dark>The Experience</Eyebrow>
          <h2 className="mt-3 text-4xl lg:text-5xl">This is not a lecture.</h2>
          <div className="mt-10 flex flex-wrap justify-center items-center gap-3">
            {journey.map((s, i) => (
              <span key={s} className="flex items-center gap-3">
                <span className={`rounded-full px-5 py-2.5 text-base font-semibold uppercase tracking-wide ${i === 0 ? "btn-gold" : "border border-gold/50 text-gold-soft"}`}>{s}</span>
                {i < journey.length - 1 && <ArrowRight className="h-4 w-4 text-gold" />}
              </span>
            ))}
          </div>
          <p className="mt-8 mx-auto max-w-2xl text-lg text-cream/85 leading-relaxed">
            Teachers don't simply receive strategies. They experience the problem, investigate it, build a response and
            consider how it can work in their own classrooms.
          </p>
        </div>
      </section>

      {/* WHO */}
      <section className="mx-auto max-w-[1300px] px-6 lg:px-10 py-16 lg:py-20">
        <Eyebrow>Who Is It For?</Eyebrow>
        <h2 className="mt-3 text-4xl lg:text-5xl">For the people shaping English classrooms</h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {audiences.map(({ icon: I, t }) => (
            <div key={t} className="rounded-2xl bg-card p-7 border-t-4 border-gold shadow-card">
              <I className="h-7 w-7 text-coffee" />
              <h3 className="mt-4 text-2xl">{t}</h3>
            </div>
          ))}
        </div>
        <p className="mt-6 text-lg text-muted-foreground">
          Sessions can be adapted to learner age, curriculum, school priorities and teacher needs.
        </p>
      </section>

      {/* CUSTOM */}
      <section className="relative overflow-hidden bg-navy text-cream py-16 lg:py-20">
        <img src={coffeeBranch} alt="" className="pointer-events-none absolute -right-20 -top-20 w-[380px] opacity-[0.06]" />
        <div className="relative mx-auto max-w-[1300px] px-6 lg:px-10 grid lg:grid-cols-[1fr_1.4fr] gap-10 items-center">
          <div>
            <Eyebrow dark>Custom Workshop Experiences</Eyebrow>
            <h2 className="mt-3 text-4xl lg:text-5xl">Your classroom. Your challenge. Your lab.</h2>
            <p className="mt-5 text-lg text-cream/75 leading-relaxed">
              Every Teacher Lab can be shaped around your institution's actual needs. Bring the challenge your teachers
              face — we'll investigate it together.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Challenges we can investigate</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {challenges.map((c) => (
                <span key={c} className="inline-flex items-center gap-2 rounded-xl border border-gold/25 bg-navy-deep/60 px-4 py-3 text-base">
                  <Search className="h-4 w-4 text-gold" /> {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FACILITATOR */}
      <section className="mx-auto max-w-[1000px] px-6 lg:px-10 py-16 lg:py-20">
        <div className="rounded-2xl bg-card border border-border p-8 lg:p-12 shadow-card text-center">
          <Eyebrow>Meet Your Facilitator</Eyebrow>
          <h2 className="mt-3 text-4xl lg:text-5xl">Gnana Soundari Devaraj</h2>
          <p className="mt-2 text-coffee font-medium">English Language Educator | Workshop Facilitator | TEFL Educator</p>
          <p className="mt-5 mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
            An English language educator and workshop facilitator with 9+ years of experience in English teaching,
            communication training, teacher development and learner-focused language education.
          </p>
          <Link to="/about" className="mt-6 inline-flex items-center gap-2 text-coffee font-semibold hover:underline">
            Meet the teacher <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-navy-deep text-cream py-16 lg:py-20 text-center">
        <img src={kolam} alt="" className="pointer-events-none absolute -left-32 -bottom-32 w-[420px] opacity-[0.06]" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Coffee className="mx-auto h-8 w-8 text-gold" />
          <h2 className="mt-4 text-4xl lg:text-5xl">Come with a classroom problem.</h2>
          <p className="mt-2 font-serif text-3xl lg:text-4xl text-gold-gradient italic">Leave with a classroom possibility.</p>
          <p className="mt-5 text-lg text-cream/80">Let's design a Teacher Lab experience around the real needs of your teachers and learners.</p>
          <div className="mt-8"><EnquireBtn /></div>
          <p className="mt-6 text-sm tracking-[0.15em] text-gold-soft/80">Schools • Colleges • Teacher Development • Student Enrichment</p>
        </div>
      </section>
    </div>
  );
}
