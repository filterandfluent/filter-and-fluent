import logo from "@/assets/filter-fluent-logo.jpg.asset.json";

/**
 * Official Filter & Fluent logo mark.
 * Rendered inside a softly rounded, gold-rimmed tile so the artwork's own
 * cream background reads as an intentional frame on navy surfaces.
 */
export function BrandLogo({ size = "h-12 w-12" }: { size?: string }) {
  return (
    <img
      src={logo.url}
      alt="Filter & Fluent logo"
      className={`${size} shrink-0 rounded-xl object-cover border border-gold/40 shadow-[var(--shadow-card)]`}
    />
  );
}
