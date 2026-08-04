import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Clock,
  Coffee,
  Facebook,
  Instagram,
  Library,
  Link2,
  Linkedin,
  Mail,
  MessageCircle,
  MessagesSquare,
  Send,
  Sparkles,
  Youtube,
} from "lucide-react";

/* ---------- Shared tokens (identical to the article page) ---------- */
const CARD =
  "rounded-2xl bg-white border border-border/60 shadow-[var(--shadow-card)]";
const FOCUS =
  "outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--beige)]";
const LIFT =
  "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(91,58,41,0.25)]";

/* ---------- Section heading (shared by the closing sections) ---------- */
export function FooterSectionHeading({
  id,
  name,
  intro,
  icon: Icon = Coffee,
}: {
  id: string;
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
          className="font-serif text-2xl leading-tight tracking-tight text-navy-deep scroll-mt-28 md:text-3xl"
        >
          {name}
        </h2>
        <span className="h-px flex-1 bg-border" aria-hidden />
      </div>
      {intro ? (
        <p className="mt-2 text-sm leading-relaxed text-navy-deep/60 italic">
          {intro}
        </p>
      ) : null}
    </div>
  );
}

/* ---------- 1. Related articles ---------- */
export type RelatedArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: number;
  image: string;
};

export function RelatedArticleCard({ item }: { item: RelatedArticle }) {
  return (
    <article className={`group flex flex-col ${CARD} overflow-hidden ${LIFT}`}>
      <Link
        to="/blog/$slug"
        params={{ slug: item.slug }}
        className={`flex flex-1 flex-col ${FOCUS} focus-visible:ring-offset-white`}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 via-navy-deep/10 to-transparent"
            aria-hidden
          />
          <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-navy-deep">
            {item.category}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <span className="flex items-center gap-1.5 text-xs text-navy-deep/60">
            <Clock className="h-3.5 w-3.5" aria-hidden /> {item.readingTime} min
            read
          </span>
          <h3 className="mt-3 font-serif text-xl leading-snug text-navy-deep transition-colors duration-200 group-hover:text-coffee">
            {item.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-navy-deep/70">
            {item.excerpt}
          </p>
          <span className="mt-5 inline-flex items-center gap-2 border-t border-border/60 pt-4 text-[13px] font-semibold text-coffee">
            Continue Reading
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden
            />
          </span>
        </div>
      </Link>
    </article>
  );
}

export function RelatedArticles({ items }: { items: RelatedArticle[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((item) => (
        <RelatedArticleCard key={item.slug} item={item} />
      ))}
    </div>
  );
}

/* ---------- 2. Previous / Next ---------- */
export type AdjacentArticle = {
  slug: string;
  title: string;
  preview: string;
};

export function PrevNextNav({
  previous,
  next,
}: {
  previous?: AdjacentArticle;
  next?: AdjacentArticle;
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {previous ? (
        <Link
          to="/blog/$slug"
          params={{ slug: previous.slug }}
          className={`${CARD} group p-7 ${LIFT} ${FOCUS} focus-visible:ring-offset-white`}
        >
          <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-coffee">
            <ArrowLeft
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-1"
              aria-hidden
            />
            Previous Article
          </span>
          <p className="mt-3 font-serif text-lg leading-snug text-navy-deep transition-colors duration-200 group-hover:text-coffee">
            {previous.title}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-navy-deep/65">
            {previous.preview}
          </p>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          to="/blog/$slug"
          params={{ slug: next.slug }}
          className={`${CARD} group p-7 sm:text-right ${LIFT} ${FOCUS} focus-visible:ring-offset-white`}
        >
          <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-coffee sm:justify-end">
            Next Article
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden
            />
          </span>
          <p className="mt-3 font-serif text-lg leading-snug text-navy-deep transition-colors duration-200 group-hover:text-coffee">
            {next.title}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-navy-deep/65">
            {next.preview}
          </p>
        </Link>
      ) : null}
    </div>
  );
}

/* ---------- 3. Author profile ---------- */
export function AuthorProfile({
  name,
  title,
  bio,
  initials,
  photo,
}: {
  name: string;
  title: string;
  bio: string;
  initials: string;
  photo?: string;
}) {
  const socials = [
    { Icon: Instagram, label: `${name} on Instagram` },
    { Icon: Youtube, label: `${name} on YouTube` },
    { Icon: Linkedin, label: `${name} on LinkedIn` },
    { Icon: Mail, label: `Email ${name}` },
  ];
  return (
    <div className={`${CARD} overflow-hidden`}>
      <div className="flex flex-col gap-7 p-8 sm:flex-row sm:items-start sm:gap-8 md:p-10">
        <div className="shrink-0">
          <div className="relative h-28 w-28 overflow-hidden rounded-full border border-gold/40 bg-[color:var(--beige)] shadow-[var(--shadow-card)]">
            {photo ? (
              <img
                src={photo}
                alt={name}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center font-serif text-3xl text-coffee">
                {initials}
              </span>
            )}
          </div>
        </div>
        <div className="min-w-0">
          <span className="inline-flex items-center gap-2 rounded-full bg-gold/20 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-coffee">
            <Sparkles className="h-3 w-3" aria-hidden /> About the Author
          </span>
          <h3 className="mt-4 font-serif text-2xl leading-snug text-navy-deep">
            {name}
          </h3>
          <p className="mt-1 text-sm font-medium text-coffee">{title}</p>
          <p className="mt-4 text-[15px] leading-relaxed text-navy-deep/75">
            {bio}
          </p>
          <div
            className="mt-6 flex items-center gap-2"
            role="group"
            aria-label={`Follow ${name}`}
          >
            {socials.map(({ Icon, label }) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                title={label}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-white text-coffee shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/60 hover:text-gold ${FOCUS} focus-visible:ring-offset-white`}
              >
                <Icon className="h-4 w-4" aria-hidden />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- 4. Newsletter ---------- */
export function NewsletterCTA({
  heading,
  subtitle,
}: {
  heading: string;
  subtitle: string;
}) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-coffee text-cream shadow-[0_25px_60px_-25px_rgba(91,58,41,0.55)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18] bg-[radial-gradient(circle_at_15%_25%,var(--gold),transparent_55%),radial-gradient(circle_at_85%_75%,var(--navy-deep),transparent_60%)]"
        aria-hidden
      />
      <Coffee
        className="pointer-events-none absolute -right-6 -bottom-8 h-44 w-44 text-gold/15"
        strokeWidth={0.75}
        aria-hidden
      />
      <div className="relative grid gap-8 p-8 md:grid-cols-[1.1fr_1fr] md:items-center md:p-12">
        <div>
          <h2 className="font-serif text-2xl leading-tight md:text-3xl">
            {heading}
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-cream/80">
            {subtitle}
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email.trim()) setDone(true);
          }}
          className="space-y-3"
        >
          <label htmlFor="article-newsletter" className="sr-only">
            Your email address
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="article-newsletter"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className={`min-w-0 flex-1 rounded-full border border-cream/25 bg-cream/10 px-5 py-3 text-sm text-cream placeholder:text-cream/50 ${FOCUS} focus-visible:ring-offset-[color:var(--coffee)]`}
            />
            <button
              type="submit"
              className={`inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy-deep transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105 ${FOCUS} focus-visible:ring-offset-[color:var(--coffee)]`}
            >
              {done ? (
                <>
                  <Check className="h-4 w-4" aria-hidden /> Subscribed
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" aria-hidden /> Subscribe
                </>
              )}
            </button>
          </div>
          <p aria-live="polite" className="text-xs text-cream/65">
            {done
              ? "Thank you — your first pour is on its way."
              : "One warm email a week. No spam, ever."}
          </p>
        </form>
      </div>
    </div>
  );
}

/* ---------- 5. Share this article ---------- */
export function ShareArticleBar({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const [url, setUrl] = useState("");
  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      name: "Facebook",
      Icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "LinkedIn",
      Icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: "WhatsApp",
      Icon: MessageCircle,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      name: "Email",
      Icon: Mail,
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className={`${CARD} flex flex-col gap-5 p-7 sm:flex-row sm:items-center sm:justify-between`}>
      <div>
        <p className="font-serif text-xl leading-snug text-navy-deep">
          Share this article
        </p>
        <p className="mt-1 text-sm leading-relaxed text-navy-deep/65">
          Pass the cup along to someone learning English.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {links.map(({ name, Icon, href }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`Share on ${name}`}
            title={`Share on ${name}`}
            className={`inline-flex items-center gap-2 rounded-full border border-border/70 bg-[color:var(--beige)]/60 px-4 py-2 text-[13px] font-medium text-coffee transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/60 hover:text-gold ${FOCUS} focus-visible:ring-offset-white`}
          >
            <Icon className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">{name}</span>
          </a>
        ))}
        <button
          type="button"
          onClick={copy}
          aria-label="Copy link to this article"
          className={`inline-flex items-center gap-2 rounded-full border border-border/70 bg-[color:var(--beige)]/60 px-4 py-2 text-[13px] font-medium text-coffee transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/60 hover:text-gold ${FOCUS} focus-visible:ring-offset-white`}
        >
          {copied ? (
            <Check className="h-4 w-4" aria-hidden />
          ) : (
            <Link2 className="h-4 w-4" aria-hidden />
          )}
          <span className="hidden sm:inline">
            {copied ? "Copied" : "Copy Link"}
          </span>
        </button>
      </div>
      <span aria-live="polite" className="sr-only">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </div>
  );
}

/* ---------- 6. Comments placeholder ---------- */
export function CommentsPlaceholder({ children }: { children?: ReactNode }) {
  return (
    <div
      className={`${CARD} flex flex-col items-center gap-4 px-8 py-12 text-center`}
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/15">
        <MessagesSquare className="h-6 w-6 text-coffee" aria-hidden />
      </span>
      <h3 className="font-serif text-2xl leading-snug text-navy-deep">
        Community Discussions Coming Soon
      </h3>
      <p className="max-w-md text-[15px] leading-relaxed text-navy-deep/70">
        {children ??
          "Soon you'll be able to ask questions, share your answers and learn alongside other readers — right here, over a cup."}
      </p>
    </div>
  );
}

/* ---------- 7. End-of-article CTA ---------- */
export function ClosingCTA() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-navy-deep px-8 py-14 text-center text-cream shadow-[0_25px_60px_-25px_rgba(7,27,58,0.6)] md:px-12">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.1] bg-[radial-gradient(circle_at_25%_25%,var(--gold),transparent_50%),radial-gradient(circle_at_75%_75%,var(--coffee),transparent_55%)]"
        aria-hidden
      />
      <div className="relative">
        <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
          <span className="h-px w-8 bg-gold/60" aria-hidden />
          One More Pour
          <span className="h-px w-8 bg-gold/60" aria-hidden />
        </span>
        <h2 className="mt-6 font-serif text-3xl leading-tight md:text-4xl">
          ☕ Keep Brewing Your English
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-cream/75">
          Every article is one more sip of confidence. Choose your next cup and
          keep the habit warm.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/blog"
            className={`inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-semibold text-navy-deep transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105 ${FOCUS} focus-visible:ring-offset-[color:var(--navy-deep)]`}
          >
            <Library className="h-4 w-4" aria-hidden /> Browse More Articles
          </Link>
          <Link
            to="/resources"
            className={`inline-flex items-center gap-2 rounded-full border border-cream/30 px-7 py-3 text-sm font-semibold text-cream transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/60 hover:text-gold ${FOCUS} focus-visible:ring-offset-[color:var(--navy-deep)]`}
          >
            <BookOpen className="h-4 w-4" aria-hidden /> Explore Learning
            Resources
          </Link>
        </div>
      </div>
    </div>
  );
}
