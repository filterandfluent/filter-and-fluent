import { Link } from "@tanstack/react-router";
import { ArrowLeft, Coffee } from "lucide-react";
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

interface Props {
  title: string;
  tagline: string;
  description: string;
}

export function PlaceholderPage({ title, tagline, description }: Props) {
  return (
    <div className="min-h-screen bg-navy-deep text-cream">
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
              const isActive = l.label === title;
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

        <div className="relative z-10 mx-auto max-w-[1000px] px-6 lg:px-10 py-28 lg:py-40 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-navy/50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
            {tagline}
          </span>
          <h1 className="mt-6 font-serif text-5xl lg:text-7xl leading-[1.05] text-cream">
            {title}
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-cream/75 text-lg leading-relaxed font-serif italic">
            {description}
          </p>
          <p className="mt-8 text-sm uppercase tracking-[0.3em] text-gold/80">Brewing soon</p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-cream text-navy-deep px-8 py-4 text-sm font-semibold hover:bg-gold transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
            <Link to="/" hash="contact" className="btn-gold rounded-full px-8 py-4 text-sm font-semibold">
              Notify Me
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
