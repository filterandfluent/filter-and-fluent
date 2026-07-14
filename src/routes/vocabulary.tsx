import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Briefcase,
  Coffee,
  Download,
  FileText,
  Flame,
  GraduationCap,
  Layers,
  Plane,
  Search,
  Sparkles,
  Volume2,
  X,
} from "lucide-react";
import kolam from "@/assets/kolam-mandala.png";
import coffeeBranch from "@/assets/coffee-branch.png";

export const Route = createFileRoute("/vocabulary")({
  head: () => ({
    meta: [
      { title: "Word Roast — Learn Vocabulary the Filter & Fluent Way" },
      {
        name: "description",
        content:
          "Discover carefully selected English words, richly explained — pronunciation, meaning, examples, and practice, all in one place.",
      },
      { property: "og:title", content: "Word Roast — Filter & Fluent Vocabulary" },
      {
        property: "og:description",
        content: "Freshly selected words, richly explained. Browse by level or theme, practice with flashcards and quizzes.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/vocabulary" },
    ],
    links: [{ rel: "canonical", href: "/vocabulary" }],
  }),
  component: VocabularyPage,
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

// ============ DATA MODEL ============
type CEFR = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
type Theme = "Travel" | "Food" | "Emotions" | "Work" | "Academic" | "Everyday";

interface Word {
  slug: string;
  word: string;
  ipa: string;
  partOfSpeech: string;
  level: CEFR;
  themes: Theme[];
  simpleMeaning: string;
  formalMeaning: string;
  examples: string[];
  collocations: string[];
  synonyms: string[];
  antonyms: string[];
  wordFamily: { noun?: string; verb?: string; adjective?: string; adverb?: string };
  relatedIdioms?: string[];
}

const words: Word[] = [
  {
    slug: "brew",
    word: "Brew",
    ipa: "/bruː/",
    partOfSpeech: "verb / noun",
    level: "A2",
    themes: ["Food", "Everyday"],
    simpleMeaning: "To make a hot drink like coffee or tea; or the drink itself.",
    formalMeaning: "To prepare a beverage by mixing it with hot water; also, something that is in the process of developing.",
    examples: [
      "She loves to brew filter coffee every morning.",
      "There's a storm brewing over the hills.",
    ],
    collocations: ["brew coffee", "brew tea", "trouble brewing"],
    synonyms: ["prepare", "make", "concoct"],
    antonyms: [],
    wordFamily: { noun: "brew", verb: "brew", adjective: "brewed" },
  },
  {
    slug: "resilient",
    word: "Resilient",
    ipa: "/rɪˈzɪl.i.ənt/",
    partOfSpeech: "adjective",
    level: "B2",
    themes: ["Emotions", "Work"],
    simpleMeaning: "Able to recover quickly from difficulties.",
    formalMeaning: "Capable of withstanding or recovering swiftly from adverse conditions.",
    examples: [
      "Children are remarkably resilient after setbacks.",
      "A resilient economy bounces back after a shock.",
    ],
    collocations: ["remarkably resilient", "resilient economy", "emotionally resilient"],
    synonyms: ["tough", "strong", "adaptable"],
    antonyms: ["fragile", "weak"],
    wordFamily: { noun: "resilience", adjective: "resilient", adverb: "resiliently" },
  },
  {
    slug: "ubiquitous",
    word: "Ubiquitous",
    ipa: "/juːˈbɪk.wɪ.təs/",
    partOfSpeech: "adjective",
    level: "C1",
    themes: ["Academic"],
    simpleMeaning: "Found everywhere.",
    formalMeaning: "Present, appearing, or found everywhere at the same time.",
    examples: [
      "Smartphones have become ubiquitous in modern life.",
      "Coffee stalls are ubiquitous in South Indian towns.",
    ],
    collocations: ["ubiquitous presence", "become ubiquitous"],
    synonyms: ["omnipresent", "widespread", "pervasive"],
    antonyms: ["rare", "scarce"],
    wordFamily: { noun: "ubiquity", adjective: "ubiquitous", adverb: "ubiquitously" },
  },
  {
    slug: "commute",
    word: "Commute",
    ipa: "/kəˈmjuːt/",
    partOfSpeech: "verb / noun",
    level: "B1",
    themes: ["Work", "Travel"],
    simpleMeaning: "To travel regularly between home and work.",
    formalMeaning: "To make a regular journey of some distance between one's home and place of work.",
    examples: [
      "I commute to Chennai by train every day.",
      "Her commute takes almost two hours.",
    ],
    collocations: ["daily commute", "long commute", "commute to work"],
    synonyms: ["travel", "journey"],
    antonyms: [],
    wordFamily: { noun: "commuter", verb: "commute" },
  },
  {
    slug: "aroma",
    word: "Aroma",
    ipa: "/əˈroʊ.mə/",
    partOfSpeech: "noun",
    level: "B1",
    themes: ["Food"],
    simpleMeaning: "A pleasant, noticeable smell.",
    formalMeaning: "A distinctive, typically pleasant smell.",
    examples: [
      "The aroma of freshly roasted coffee filled the room.",
      "I love the aroma of jasmine flowers in the evening.",
    ],
    collocations: ["rich aroma", "pleasant aroma", "coffee aroma"],
    synonyms: ["fragrance", "scent", "perfume"],
    antonyms: ["stench"],
    wordFamily: { noun: "aroma", adjective: "aromatic" },
  },
  {
    slug: "meticulous",
    word: "Meticulous",
    ipa: "/məˈtɪk.jə.ləs/",
    partOfSpeech: "adjective",
    level: "C1",
    themes: ["Work", "Academic"],
    simpleMeaning: "Very careful and paying great attention to detail.",
    formalMeaning: "Showing great attention to detail; very careful and precise.",
    examples: [
      "She keeps meticulous notes during every lesson.",
      "The chef is meticulous about the coffee-to-water ratio.",
    ],
    collocations: ["meticulous attention", "meticulously planned"],
    synonyms: ["careful", "thorough", "precise"],
    antonyms: ["careless", "sloppy"],
    wordFamily: { noun: "meticulousness", adjective: "meticulous", adverb: "meticulously" },
  },
  {
    slug: "cozy",
    word: "Cozy",
    ipa: "/ˈkoʊ.zi/",
    partOfSpeech: "adjective",
    level: "A2",
    themes: ["Everyday", "Emotions"],
    simpleMeaning: "Warm, comfortable, and relaxing.",
    formalMeaning: "Giving a feeling of comfort, warmth, and relaxation.",
    examples: [
      "The little café felt so cozy on a rainy afternoon.",
      "She curled up in a cozy corner with a book.",
    ],
    collocations: ["cozy corner", "cozy café", "cozy blanket"],
    synonyms: ["snug", "warm", "comfortable"],
    antonyms: ["cold", "uncomfortable"],
    wordFamily: { adjective: "cozy", adverb: "cozily" },
  },
  {
    slug: "articulate",
    word: "Articulate",
    ipa: "/ɑːrˈtɪk.jə.lət/",
    partOfSpeech: "adjective / verb",
    level: "B2",
    themes: ["Work", "Academic"],
    simpleMeaning: "Able to express ideas clearly and easily.",
    formalMeaning: "Having or showing the ability to speak fluently and coherently.",
    examples: [
      "She's an articulate speaker who wins every debate.",
      "Try to articulate your thoughts before you write.",
    ],
    collocations: ["articulate speaker", "clearly articulate"],
    synonyms: ["eloquent", "fluent", "expressive"],
    antonyms: ["inarticulate", "unclear"],
    wordFamily: { noun: "articulation", verb: "articulate", adjective: "articulate" },
  },
  {
    slug: "wander",
    word: "Wander",
    ipa: "/ˈwɒn.dər/",
    partOfSpeech: "verb",
    level: "A2",
    themes: ["Travel"],
    simpleMeaning: "To walk around without a clear direction.",
    formalMeaning: "To walk or move in a leisurely or aimless way.",
    examples: [
      "We wandered through the old streets of Pondicherry.",
      "Her mind wandered during the long lecture.",
    ],
    collocations: ["wander around", "mind wanders"],
    synonyms: ["roam", "stroll", "meander"],
    antonyms: ["rush"],
    wordFamily: { noun: "wanderer", verb: "wander" },
  },
  {
    slug: "nostalgia",
    word: "Nostalgia",
    ipa: "/nɒˈstæl.dʒə/",
    partOfSpeech: "noun",
    level: "B2",
    themes: ["Emotions"],
    simpleMeaning: "A warm feeling when remembering the past.",
    formalMeaning: "A sentimental longing or wistful affection for the past.",
    examples: [
      "The song filled her with nostalgia for her school days.",
      "There's a wave of nostalgia for old filter-coffee cafés.",
    ],
    collocations: ["wave of nostalgia", "sense of nostalgia"],
    synonyms: ["longing", "yearning", "reminiscence"],
    antonyms: [],
    wordFamily: { noun: "nostalgia", adjective: "nostalgic" },
  },
  {
    slug: "endeavor",
    word: "Endeavor",
    ipa: "/ɪnˈdev.ər/",
    partOfSpeech: "verb / noun",
    level: "C1",
    themes: ["Work", "Academic"],
    simpleMeaning: "To try hard to do something; a serious effort.",
    formalMeaning: "An attempt to achieve a goal; to try earnestly.",
    examples: [
      "We endeavor to serve every student with care.",
      "Learning a language is a lifelong endeavor.",
    ],
    collocations: ["human endeavor", "endeavor to improve"],
    synonyms: ["attempt", "strive", "undertaking"],
    antonyms: ["neglect"],
    wordFamily: { noun: "endeavor", verb: "endeavor" },
  },
  {
    slug: "savour",
    word: "Savour",
    ipa: "/ˈseɪ.vər/",
    partOfSpeech: "verb",
    level: "B2",
    themes: ["Food", "Emotions"],
    simpleMeaning: "To enjoy something slowly and fully.",
    formalMeaning: "To taste and enjoy completely; to appreciate fully.",
    examples: [
      "She savoured every sip of the morning coffee.",
      "Let's savour this quiet moment together.",
    ],
    collocations: ["savour the moment", "savour every bite"],
    synonyms: ["relish", "enjoy", "appreciate"],
    antonyms: ["rush"],
    wordFamily: { verb: "savour", adjective: "savoury" },
  },
];

interface Collection {
  id: string;
  title: string;
  blurb: string;
  wordSlugs: string[];
  tag: string;
}

const collections: Collection[] = [
  {
    id: "coffee-shop-english",
    title: "Everyday Coffee-Shop English",
    blurb: "Warm, natural words for cafés, small talk, and everyday moments.",
    wordSlugs: ["brew", "aroma", "cozy", "savour", "wander"],
    tag: "A2 – B1",
  },
  {
    id: "ielts-band-8",
    title: "50 Words for IELTS Band 8",
    blurb: "High-impact vocabulary that lifts your writing and speaking scores.",
    wordSlugs: ["ubiquitous", "meticulous", "resilient", "articulate", "endeavor"],
    tag: "B2 – C1",
  },
  {
    id: "sound-fluent",
    title: "Words That Make You Sound Fluent",
    blurb: "The natural expressions native speakers reach for without thinking.",
    wordSlugs: ["savour", "nostalgia", "resilient", "articulate", "commute"],
    tag: "B1 – C1",
  },
];

// Paths for Start Here
const paths = [
  { icon: Sparkles, title: "Beginner Words", desc: "Everyday words to build your confidence.", filter: { level: "A1" as CEFR | "All" } },
  { icon: GraduationCap, title: "IELTS Vocabulary", desc: "Band-boosting words for writing and speaking.", filter: { theme: "Academic" as Theme | "All" } },
  { icon: Briefcase, title: "Business English", desc: "Words for meetings, emails, and the workplace.", filter: { theme: "Work" as Theme | "All" } },
  { icon: Layers, title: "Academic Words", desc: "Formal vocabulary for essays and lectures.", filter: { level: "C1" as CEFR | "All" } },
];

// Downloads
const downloads = [
  { title: "50 IELTS Words — Printable Cards", format: "PDF", size: "1.4 MB" },
  { title: "Coffee-Shop English Flashcards", format: "PDF", size: "820 KB" },
  { title: "Theme Wordlist — Emotions", format: "PDF", size: "540 KB" },
  { title: "Beginner Word Roast Workbook", format: "PDF", size: "2.1 MB" },
  { title: "Teacher Worksheet — Synonyms", format: "PDF", size: "680 KB" },
  { title: "Word Family Practice Sheet", format: "PDF", size: "410 KB" },
];

const levels: (CEFR | "All")[] = ["All", "A1", "A2", "B1", "B2", "C1", "C2"];
const themes: (Theme | "All")[] = ["All", "Travel", "Food", "Emotions", "Work", "Academic", "Everyday"];

const levelColor: Record<CEFR, string> = {
  A1: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  A2: "bg-teal-500/15 text-teal-300 border-teal-500/30",
  B1: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  B2: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
  C1: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  C2: "bg-pink-500/15 text-pink-300 border-pink-500/30",
};

const levelColorLight: Record<CEFR, string> = {
  A1: "bg-emerald-100 text-emerald-800 border-emerald-200",
  A2: "bg-teal-100 text-teal-800 border-teal-200",
  B1: "bg-sky-100 text-sky-800 border-sky-200",
  B2: "bg-indigo-100 text-indigo-800 border-indigo-200",
  C1: "bg-purple-100 text-purple-800 border-purple-200",
  C2: "bg-pink-100 text-pink-800 border-pink-200",
};

// ============ COMPONENT ============
function VocabularyPage() {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<CEFR | "All">("All");
  const [theme, setTheme] = useState<Theme | "All">("All");
  const [saved, setSaved] = useState<string[]>([]);
  const [activeWord, setActiveWord] = useState<Word | null>(null);
  const [practiceMode, setPracticeMode] = useState<"flashcards" | "quiz">("flashcards");

  // Load/save from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("wordroast:saved");
      if (raw) setSaved(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("wordroast:saved", JSON.stringify(saved));
    } catch {}
  }, [saved]);

  const toggleSave = (slug: string) =>
    setSaved((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : [...s, slug]));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return words.filter((w) => {
      if (level !== "All" && w.level !== level) return false;
      if (theme !== "All" && !w.themes.includes(theme)) return false;
      if (
        q &&
        !(
          w.word.toLowerCase().includes(q) ||
          w.simpleMeaning.toLowerCase().includes(q) ||
          w.themes.join(" ").toLowerCase().includes(q)
        )
      )
        return false;
      return true;
    });
  }, [query, level, theme]);

  const wordOfTheDay = words[new Date().getDate() % words.length];

  const speak = (text: string) => {
    if (typeof window === "undefined") return;
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US";
      u.rate = 0.9;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } catch {}
  };

  return (
    <div className="min-h-screen bg-navy-deep text-cream">
      {/* ===== HERO + NAV ===== */}
      <section className="relative overflow-hidden">
        <img src={kolam} alt="" className="pointer-events-none absolute -top-32 -left-32 w-[520px] opacity-[0.06]" />
        <img src={coffeeBranch} alt="" className="pointer-events-none absolute -bottom-24 -right-24 w-[420px] opacity-[0.07]" />

        <nav className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10 pt-6 flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-navy/60">
              <Coffee className="h-5 w-5 text-gold" aria-hidden />
            </span>
            <span className="font-serif text-xl tracking-wide text-cream">Filter &amp; Fluent</span>
          </Link>
          <ul className="hidden xl:flex items-center gap-7 text-[13px] font-medium">
            {navLinks.map((l) => {
              const isActive = l.label === "Vocabulary";
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

        <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-10 py-20 lg:py-28">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-navy/50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                Vocabulary
              </span>
              <h1 className="mt-6 font-serif text-5xl lg:text-7xl leading-[1.05] text-cream">Word Roast</h1>
              <p className="mt-3 text-sm lg:text-base uppercase tracking-[0.25em] text-gold/85 font-serif italic">
                Freshly selected words, richly explained
              </p>
              <p className="mt-6 max-w-xl text-cream/80 text-lg leading-relaxed">
                A curated tasting menu of English words — with pronunciation, meaning, examples and gentle practice. Not a dictionary. A daily habit.
              </p>

              {/* Search */}
              <div className="mt-8 relative max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-navy-deep/50" aria-hidden />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search a word, theme or level…"
                  aria-label="Search vocabulary"
                  className="w-full rounded-full bg-cream text-navy-deep placeholder:text-navy-deep/50 pl-12 pr-4 py-4 text-[15px] shadow-[var(--shadow-card)] focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a href="#start-here" className="btn-gold rounded-full px-8 py-4 text-sm font-semibold inline-flex items-center gap-2">
                  Start Brewing <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
                <a href="#browse" className="inline-flex items-center gap-2 rounded-full bg-cream text-navy-deep px-8 py-4 text-sm font-semibold hover:bg-gold transition-colors">
                  Browse All Words
                </a>
              </div>
            </div>

            {/* Today's Brew card */}
            <button
              type="button"
              onClick={() => setActiveWord(wordOfTheDay)}
              className="group text-left rounded-3xl bg-cream text-navy-deep p-7 shadow-[var(--shadow-luxury)] border border-gold/30 hover:-translate-y-1 transition-transform"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-coffee">
                  <Flame className="h-3.5 w-3.5" aria-hidden /> Today&rsquo;s Brew
                </span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${levelColorLight[wordOfTheDay.level]}`}>
                  {wordOfTheDay.level}
                </span>
              </div>
              <h2 className="mt-5 font-serif text-5xl text-navy-deep">{wordOfTheDay.word}</h2>
              <div className="mt-1 flex items-center gap-2 text-coffee text-sm">
                <span>{wordOfTheDay.ipa}</span>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); speak(wordOfTheDay.word); }}
                  aria-label={`Play pronunciation of ${wordOfTheDay.word}`}
                  className="h-8 w-8 inline-flex items-center justify-center rounded-full border border-coffee/30 hover:bg-coffee hover:text-cream transition-colors"
                >
                  <Volume2 className="h-4 w-4" aria-hidden />
                </button>
              </div>
              <p className="mt-4 text-[15px] text-navy-deep/80 leading-relaxed">{wordOfTheDay.simpleMeaning}</p>
              <p className="mt-3 text-[14px] italic text-coffee">&ldquo;{wordOfTheDay.examples[0]}&rdquo;</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-coffee group-hover:text-navy-deep">
                See full word <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ===== START HERE ===== */}
      <section id="start-here" className="bg-cream text-navy-deep py-20 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="text-center mb-12">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-coffee">Start Here</span>
            <h2 className="mt-3 font-serif text-4xl lg:text-5xl text-navy-deep">Choose your first pour</h2>
            <p className="mt-3 text-navy-deep/70 max-w-xl mx-auto">
              Four paths to begin — pick whichever matches your goal today.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {paths.map((p) => (
              <button
                key={p.title}
                type="button"
                onClick={() => {
                  if ("level" in p.filter && p.filter.level) setLevel(p.filter.level);
                  if ("theme" in p.filter && p.filter.theme) setTheme(p.filter.theme);
                  document.getElementById("browse")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group text-left rounded-2xl bg-white border border-beige p-6 shadow-[var(--shadow-card)] hover:-translate-y-1 hover:border-gold/60 transition-all"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-deep text-gold">
                  <p.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 font-serif text-xl text-navy-deep">{p.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-navy-deep/70">{p.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-coffee group-hover:text-navy-deep">
                  Explore <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BROWSE ===== */}
      <section id="browse" className="bg-navy-deep py-20 lg:py-24">
        <div className="mx-auto max-w-[1300px] px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">Browse &amp; Discover</span>
              <h2 className="mt-3 font-serif text-4xl lg:text-5xl text-cream">The Word Library</h2>
              <p className="mt-2 text-cream/70 max-w-xl">
                Filter by CEFR level or by theme. Every word opens into a full detail view.
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="rounded-2xl bg-navy/50 border border-cream/10 p-5 mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cream/60">Level</span>
              <div className="flex flex-wrap gap-1.5">
                {levels.map((lv) => {
                  const active = level === lv;
                  return (
                    <button
                      key={lv}
                      type="button"
                      onClick={() => setLevel(lv)}
                      aria-pressed={active}
                      className={`rounded-full px-3 py-1 text-[12px] font-semibold transition-colors border ${
                        active
                          ? "bg-gold text-navy-deep border-gold"
                          : lv === "All"
                          ? "bg-navy/60 text-cream/80 border-cream/15 hover:border-gold/50"
                          : `${levelColor[lv as CEFR]} hover:border-gold/50`
                      }`}
                    >
                      {lv}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cream/60">Theme</span>
              <div className="flex flex-wrap gap-1.5">
                {themes.map((t) => {
                  const active = theme === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTheme(t)}
                      aria-pressed={active}
                      className={`rounded-full px-3 py-1 text-[12px] font-medium transition-colors ${
                        active
                          ? "bg-gold text-navy-deep"
                          : "bg-navy/60 text-cream/80 border border-cream/15 hover:border-gold/50"
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>
            {(level !== "All" || theme !== "All" || query) && (
              <button
                type="button"
                onClick={() => { setLevel("All"); setTheme("All"); setQuery(""); }}
                className="self-start lg:self-end text-[12px] font-semibold text-gold hover:text-cream transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-cream/15 bg-navy/40 p-12 text-center">
              <p className="text-cream/70">No words match this filter yet. Try clearing filters or another theme.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((w) => (
                <WordCard
                  key={w.slug}
                  word={w}
                  saved={saved.includes(w.slug)}
                  onOpen={() => setActiveWord(w)}
                  onToggleSave={() => toggleSave(w.slug)}
                  onSpeak={() => speak(w.word)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== COLLECTIONS ===== */}
      <section className="bg-cream text-navy-deep py-20 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="text-center mb-12">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-coffee">Curated Collections</span>
            <h2 className="mt-3 font-serif text-4xl lg:text-5xl text-navy-deep">Editorial word sets</h2>
            <p className="mt-3 text-navy-deep/70 max-w-xl mx-auto">
              Hand-picked words, grouped with care — a coffee-tasting menu, not a database dump.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {collections.map((c) => (
              <article key={c.id} className="rounded-2xl bg-white border border-beige overflow-hidden shadow-[var(--shadow-card)] flex flex-col">
                <div className="relative h-36 bg-gradient-to-br from-navy-deep via-coffee to-gold flex items-center justify-center">
                  <Coffee className="h-14 w-14 text-cream/80" aria-hidden />
                  <span className="absolute top-3 right-3 rounded-full bg-cream text-navy-deep text-[11px] font-semibold px-2.5 py-0.5">
                    {c.tag}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-serif text-xl text-navy-deep">{c.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-navy-deep/70 flex-1">{c.blurb}</p>
                  <div className="mt-3 text-[12px] text-coffee font-semibold">{c.wordSlugs.length} words</div>
                  <button
                    type="button"
                    onClick={() => {
                      const first = words.find((w) => w.slug === c.wordSlugs[0]);
                      if (first) setActiveWord(first);
                    }}
                    className="mt-5 btn-gold rounded-full px-5 py-2.5 text-[13px] font-semibold self-start inline-flex items-center gap-2"
                  >
                    Start Collection <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRACTICE ZONE ===== */}
      <section id="practice" className="bg-navy-deep py-20 lg:py-24">
        <div className="mx-auto max-w-[1000px] px-6 lg:px-10">
          <div className="text-center mb-10">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">Practice Zone</span>
            <h2 className="mt-3 font-serif text-4xl lg:text-5xl text-cream">Steep a little deeper</h2>
            <p className="mt-3 text-cream/70 max-w-xl mx-auto">
              Flashcards and a quick quiz — practice with the whole library or just your saved words.
            </p>
          </div>

          <div className="flex justify-center gap-2 mb-8">
            {(["flashcards", "quiz"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setPracticeMode(m)}
                aria-pressed={practiceMode === m}
                className={`rounded-full px-5 py-2 text-[13px] font-semibold capitalize transition-colors ${
                  practiceMode === m ? "bg-gold text-navy-deep" : "bg-navy/60 text-cream/80 border border-cream/15 hover:border-gold/50"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {practiceMode === "flashcards" ? (
            <FlashcardDeck deck={words} onSpeak={speak} />
          ) : (
            <QuizEngine deck={words} />
          )}
        </div>
      </section>

      {/* ===== TEACHER CORNER ===== */}
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="rounded-3xl bg-navy-deep text-cream p-10 lg:p-14 relative overflow-hidden">
            <img src={coffeeBranch} alt="" className="pointer-events-none absolute -right-16 -bottom-16 w-72 opacity-10" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">Teacher Corner</span>
            <h2 className="mt-3 font-serif text-3xl lg:text-4xl text-cream max-w-2xl">Teaching English? This is for you.</h2>
            <p className="mt-3 text-cream/80 max-w-2xl leading-relaxed">
              Downloadable worksheets, printable flashcard sets and classroom activity packs — built around every collection, ready for tomorrow&rsquo;s lesson.
            </p>
            <a href="#downloads" className="mt-6 inline-flex items-center gap-2 btn-gold rounded-full px-6 py-3 text-sm font-semibold">
              Browse Teacher Downloads <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </section>

      {/* ===== DOWNLOADS ===== */}
      <section id="downloads" className="bg-cream text-navy-deep pb-24">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="text-center mb-10">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-coffee">Download Centre</span>
            <h2 className="mt-3 font-serif text-4xl lg:text-5xl text-navy-deep">Take the brew home</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {downloads.map((d) => (
              <div key={d.title} className="rounded-2xl bg-white border border-beige p-5 shadow-[var(--shadow-card)] flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-deep text-gold">
                  <FileText className="h-5 w-5" aria-hidden />
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-lg text-navy-deep leading-tight">{d.title}</h3>
                  <p className="mt-1 text-[12px] text-coffee">{d.format} · {d.size}</p>
                  <button
                    type="button"
                    className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-coffee hover:text-navy-deep"
                  >
                    <Download className="h-3.5 w-3.5" aria-hidden /> Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA / NEWSLETTER ===== */}
      <section className="bg-navy-deep py-20 border-t border-cream/10">
        <div className="mx-auto max-w-[900px] px-6 lg:px-10 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl text-cream">Get a new word roasted every morning</h2>
          <p className="mt-3 text-cream/70 max-w-xl mx-auto">
            One carefully chosen word, delivered gently to your inbox — with meaning, example and a sip of practice.
          </p>
          <form
            onSubmit={(e) => { e.preventDefault(); }}
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="you@example.com"
              aria-label="Email address"
              className="flex-1 rounded-full bg-cream text-navy-deep placeholder:text-navy-deep/50 px-5 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <button type="submit" className="btn-gold rounded-full px-6 py-3 text-sm font-semibold">
              Subscribe
            </button>
          </form>
          <div className="mt-10 flex flex-wrap justify-center gap-5 text-[13px] text-cream/70">
            <Link to="/grammar" className="hover:text-gold">Grammar Brew →</Link>
            <Link to="/speaking" className="hover:text-gold">Speaking →</Link>
            <Link to="/writing" className="hover:text-gold">Writing →</Link>
          </div>
        </div>
      </section>

      {/* ===== WORD DETAIL MODAL ===== */}
      {activeWord && (
        <WordDetailModal
          word={activeWord}
          saved={saved.includes(activeWord.slug)}
          onClose={() => setActiveWord(null)}
          onToggleSave={() => toggleSave(activeWord.slug)}
          onSpeak={speak}
        />
      )}
    </div>
  );
}

// ============ SUB-COMPONENTS ============

function WordCard({
  word,
  saved,
  onOpen,
  onToggleSave,
  onSpeak,
}: {
  word: Word;
  saved: boolean;
  onOpen: () => void;
  onToggleSave: () => void;
  onSpeak: () => void;
}) {
  return (
    <article className="group rounded-2xl bg-cream text-navy-deep p-5 shadow-[var(--shadow-card)] hover:-translate-y-1 transition-all border border-transparent hover:border-gold/50 flex flex-col">
      <div className="flex items-start justify-between gap-2">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${levelColorLight[word.level]}`}>
          {word.level}
        </span>
        <button
          type="button"
          onClick={onToggleSave}
          aria-label={saved ? `Remove ${word.word} from saved` : `Save ${word.word}`}
          aria-pressed={saved}
          className="text-coffee hover:text-gold transition-colors"
        >
          {saved ? <BookmarkCheck className="h-4 w-4" aria-hidden /> : <Bookmark className="h-4 w-4" aria-hidden />}
        </button>
      </div>
      <button type="button" onClick={onOpen} className="text-left mt-2 flex-1">
        <h3 className="font-serif text-2xl text-navy-deep">{word.word}</h3>
        <div className="mt-0.5 flex items-center gap-2 text-[12px] text-coffee">
          <span>{word.ipa}</span>
          <span className="text-navy-deep/40">·</span>
          <span className="italic">{word.partOfSpeech}</span>
        </div>
        <p className="mt-3 text-[14px] leading-relaxed text-navy-deep/80 line-clamp-3">{word.simpleMeaning}</p>
      </button>
      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onSpeak}
          aria-label={`Play pronunciation of ${word.word}`}
          className="h-8 w-8 inline-flex items-center justify-center rounded-full border border-coffee/30 text-coffee hover:bg-coffee hover:text-cream transition-colors"
        >
          <Volume2 className="h-3.5 w-3.5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={onOpen}
          className="text-[12px] font-semibold text-coffee inline-flex items-center gap-1 group-hover:text-navy-deep"
        >
          Full detail <ArrowRight className="h-3 w-3" aria-hidden />
        </button>
      </div>
    </article>
  );
}

function WordDetailModal({
  word,
  saved,
  onClose,
  onToggleSave,
  onSpeak,
}: {
  word: Word;
  saved: boolean;
  onClose: () => void;
  onToggleSave: () => void;
  onSpeak: (text: string) => void;
}) {
  const [showFormal, setShowFormal] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${word.word} details`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-deep/85 backdrop-blur-sm animate-fade-up"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90dvh] overflow-y-auto rounded-3xl bg-cream text-navy-deep shadow-[var(--shadow-luxury)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close word details"
          className="absolute top-4 right-4 h-9 w-9 inline-flex items-center justify-center rounded-full bg-navy-deep text-cream hover:bg-coffee transition-colors"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>

        <div className="p-8 lg:p-10">
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${levelColorLight[word.level]}`}>{word.level}</span>
            <span className="text-[11px] italic text-coffee">{word.partOfSpeech}</span>
            {word.themes.map((t) => (
              <span key={t} className="text-[11px] text-coffee/80 border border-coffee/25 rounded-full px-2 py-0.5">{t}</span>
            ))}
          </div>

          <h2 className="mt-4 font-serif text-5xl text-navy-deep">{word.word}</h2>
          <div className="mt-1 flex items-center gap-3 text-coffee">
            <span>{word.ipa}</span>
            <button
              type="button"
              onClick={() => onSpeak(word.word)}
              aria-label={`Play pronunciation of ${word.word}`}
              className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-coffee/30 hover:bg-coffee hover:text-cream transition-colors"
            >
              <Volume2 className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={onToggleSave}
              aria-pressed={saved}
              className={`inline-flex items-center gap-1.5 text-[13px] font-semibold px-3 py-1.5 rounded-full transition-colors ${
                saved ? "bg-navy-deep text-gold" : "border border-coffee/30 text-coffee hover:bg-coffee hover:text-cream"
              }`}
            >
              {saved ? <BookmarkCheck className="h-4 w-4" aria-hidden /> : <Bookmark className="h-4 w-4" aria-hidden />}
              {saved ? "Saved" : "Save to my words"}
            </button>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-coffee">Meaning</h3>
              <button
                type="button"
                onClick={() => setShowFormal((v) => !v)}
                className="text-[12px] font-semibold text-coffee hover:text-navy-deep"
              >
                {showFormal ? "Show simple" : "Show formal"}
              </button>
            </div>
            <p className="mt-2 text-[16px] leading-relaxed text-navy-deep">
              {showFormal ? word.formalMeaning : word.simpleMeaning}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-coffee">Examples</h3>
            <ul className="mt-2 space-y-2">
              {word.examples.map((ex, i) => (
                <li key={i} className="text-[15px] italic text-navy-deep/85 border-l-2 border-gold pl-4">&ldquo;{ex}&rdquo;</li>
              ))}
            </ul>
          </div>

          {word.collocations.length > 0 && (
            <div className="mt-6">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-coffee">Commonly used with</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {word.collocations.map((c) => (
                  <span key={c} className="text-[13px] bg-white border border-beige rounded-full px-3 py-1 text-navy-deep">{c}</span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 grid sm:grid-cols-2 gap-6">
            {word.synonyms.length > 0 && (
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-coffee">Synonyms</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {word.synonyms.map((s) => (
                    <span key={s} className="text-[13px] bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-full px-3 py-1">{s}</span>
                  ))}
                </div>
              </div>
            )}
            {word.antonyms.length > 0 && (
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-coffee">Antonyms</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {word.antonyms.map((s) => (
                    <span key={s} className="text-[13px] bg-rose-100 text-rose-800 border border-rose-200 rounded-full px-3 py-1">{s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {(word.wordFamily.noun || word.wordFamily.verb || word.wordFamily.adjective || word.wordFamily.adverb) && (
            <div className="mt-6">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-coffee">Word Family</h3>
              <dl className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(["noun","verb","adjective","adverb"] as const).map((k) => (
                  word.wordFamily[k] ? (
                    <div key={k} className="rounded-xl bg-white border border-beige p-3">
                      <dt className="text-[10px] uppercase tracking-[0.15em] text-coffee">{k}</dt>
                      <dd className="mt-1 font-serif text-lg text-navy-deep">{word.wordFamily[k]}</dd>
                    </div>
                  ) : null
                ))}
              </dl>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#practice" onClick={onClose} className="btn-gold rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center gap-2">
              Practice this word <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlashcardDeck({ deck, onSpeak }: { deck: Word[]; onSpeak: (t: string) => void }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const w = deck[idx];

  const next = () => { setFlipped(false); setIdx((i) => (i + 1) % deck.length); };
  const prev = () => { setFlipped(false); setIdx((i) => (i - 1 + deck.length) % deck.length); };

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        aria-label={`Flashcard: ${flipped ? "meaning" : w.word}. Press to flip.`}
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setFlipped((f) => !f); } }}
        className="mx-auto max-w-xl h-72 rounded-3xl bg-cream text-navy-deep shadow-[var(--shadow-luxury)] flex flex-col items-center justify-center p-8 cursor-pointer select-none transition-transform hover:scale-[1.01]"
      >
        {!flipped ? (
          <>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${levelColorLight[w.level]}`}>{w.level}</span>
            <h3 className="mt-4 font-serif text-5xl text-navy-deep">{w.word}</h3>
            <div className="mt-2 flex items-center gap-3 text-coffee text-sm">
              <span>{w.ipa}</span>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onSpeak(w.word); }}
                aria-label={`Play pronunciation of ${w.word}`}
                className="h-8 w-8 inline-flex items-center justify-center rounded-full border border-coffee/30 hover:bg-coffee hover:text-cream transition-colors"
              >
                <Volume2 className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <p className="mt-4 text-[12px] text-navy-deep/50 uppercase tracking-[0.2em]">Tap to reveal meaning</p>
          </>
        ) : (
          <>
            <p className="text-[16px] leading-relaxed text-navy-deep text-center">{w.simpleMeaning}</p>
            <p className="mt-4 italic text-coffee text-[14px] text-center">&ldquo;{w.examples[0]}&rdquo;</p>
            <p className="mt-4 text-[12px] text-navy-deep/50 uppercase tracking-[0.2em]">Tap to flip back</p>
          </>
        )}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={prev}
          className="rounded-full px-5 py-2.5 text-[13px] font-semibold bg-navy/60 text-cream border border-cream/15 hover:border-gold/50 transition-colors"
        >
          ← Previous
        </button>
        <span className="text-[12px] text-cream/60">{idx + 1} / {deck.length}</span>
        <button
          type="button"
          onClick={next}
          className="rounded-full px-5 py-2.5 text-[13px] font-semibold bg-gold text-navy-deep hover:brightness-105 transition"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

function QuizEngine({ deck }: { deck: Word[] }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);

  const question = deck[i];
  const options = useMemo(() => {
    const others = deck.filter((w) => w.slug !== question.slug);
    const shuffled = [...others].sort(() => Math.random() - 0.5).slice(0, 3).map((w) => w.simpleMeaning);
    return [...shuffled, question.simpleMeaning].sort(() => Math.random() - 0.5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i]);

  const pick = (opt: string) => {
    if (picked) return;
    setPicked(opt);
    setAnswered((a) => a + 1);
    if (opt === question.simpleMeaning) setScore((s) => s + 1);
  };

  const next = () => {
    setPicked(null);
    setI((v) => (v + 1) % deck.length);
  };

  return (
    <div className="rounded-3xl bg-cream text-navy-deep p-8 lg:p-10 shadow-[var(--shadow-luxury)] max-w-2xl mx-auto">
      <div className="flex items-center justify-between text-[12px] text-coffee font-semibold">
        <span>Question {answered + (picked ? 0 : 1)} / {deck.length}</span>
        <span>Score: {score} / {answered}</span>
      </div>
      <h3 className="mt-3 font-serif text-3xl text-navy-deep">
        What does <span className="text-coffee">&ldquo;{question.word}&rdquo;</span> mean?
      </h3>
      <div className="mt-6 grid gap-3">
        {options.map((opt) => {
          const isCorrect = opt === question.simpleMeaning;
          const isPicked = picked === opt;
          const state = !picked
            ? "bg-white hover:border-gold border-beige"
            : isCorrect
            ? "bg-emerald-100 border-emerald-300"
            : isPicked
            ? "bg-rose-100 border-rose-300"
            : "bg-white border-beige opacity-60";
          return (
            <button
              key={opt}
              type="button"
              onClick={() => pick(opt)}
              disabled={!!picked}
              className={`text-left rounded-xl border-2 p-4 text-[14px] leading-relaxed text-navy-deep transition-colors ${state}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {picked && (
        <button
          type="button"
          onClick={next}
          className="mt-6 btn-gold rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center gap-2"
        >
          Next question <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      )}
    </div>
  );
}
