import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export interface IndexEntry {
  slug: string;
  title: string;
  subtitle: string;
  kicker?: string;
  meta?: string;
  featured?: boolean;
}

/**
 * Shared layout for /docs/ and /blog/ index pages. Same industrial chrome as
 * DocShell — section label, big title, mono lede — followed by featured cards
 * (full-width, left accent stripe) on top and a 2-column grid below.
 *
 * `topSlot` renders between the header and the entries — used by /blog/ to
 * drop in the 30-second overview video.
 */
export function IndexShell({
  sectionLabel,
  title,
  lede,
  entries,
  basePath,
  backHref,
  backLabel,
  topSlot,
}: {
  sectionLabel: string;
  title: string;
  lede: string;
  entries: IndexEntry[];
  basePath: string;
  backHref: string;
  backLabel: string;
  topSlot?: ReactNode;
}) {
  const featured = entries.filter((e) => e.featured);
  const regular = entries.filter((e) => !e.featured);

  return (
    <main className="min-h-screen pt-24">
      <section className="mx-auto max-w-[1100px] px-6 py-16">
        <div className="mb-10 flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-ghost">
            ▼// {sectionLabel}
          </span>
        </div>

        <header className="mb-12 border-b border-ink pb-10">
          <h1 className="mb-5 font-sans text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-tight text-ink">
            {title}
          </h1>
          <p className="max-w-[680px] font-mono text-sm leading-relaxed text-text-soft">
            {lede}
          </p>
        </header>

        {topSlot ? <div className="mb-14">{topSlot}</div> : null}

        {featured.length > 0 && (
          <div className="mb-px flex flex-col gap-px bg-border">
            {featured.map((e) => (
              <Link
                key={e.slug}
                href={`${basePath}/${e.slug}/`}
                className="group flex flex-col border-l-4 border-l-accent bg-canvas p-10 hover:bg-canvas-alt"
              >
                {e.kicker && (
                  <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                    {e.kicker}
                  </div>
                )}
                {e.meta && (
                  <div className="mb-6 font-mono text-[10px] uppercase tracking-[0.22em] text-text-ghost">
                    {e.meta}
                  </div>
                )}
                <div className="mb-5 flex items-start justify-between gap-4">
                  <h2 className="font-sans text-3xl font-semibold leading-tight tracking-tight text-ink group-hover:text-accent md:text-4xl">
                    {e.title}
                  </h2>
                  <ArrowUpRight className="size-5 shrink-0 text-text-ghost group-hover:text-accent" />
                </div>
                <p className="max-w-[760px] font-mono text-sm leading-relaxed text-text-soft">
                  {e.subtitle}
                </p>
              </Link>
            ))}
          </div>
        )}

        {regular.length > 0 && (
          <div
            className={`grid gap-px bg-border md:grid-cols-2 ${
              featured.length > 0 ? "mt-px" : ""
            }`}
          >
            {regular.map((e, i) => (
              <Link
                key={e.slug}
                href={`${basePath}/${e.slug}/`}
                className="group flex flex-col bg-canvas p-8 hover:bg-canvas-alt"
              >
                <div className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-text-ghost">
                  <span className="inline-block size-1.5 bg-accent" />
                  {e.kicker ?? String(i + 1).padStart(2, "0")}
                </div>
                {e.meta && (
                  <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-text-ghost">
                    {e.meta}
                  </div>
                )}
                <div className="mb-4 flex items-start justify-between gap-3">
                  <h2 className="font-sans text-xl font-semibold leading-tight tracking-tight text-ink group-hover:text-accent">
                    {e.title}
                  </h2>
                  <ArrowUpRight className="size-4 shrink-0 text-text-ghost group-hover:text-accent" />
                </div>
                <p className="font-mono text-xs leading-relaxed text-text-soft">
                  {e.subtitle}
                </p>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-16 border-t border-border pt-8">
          <Link
            href={backHref}
            className="font-mono text-xs uppercase tracking-[0.22em] text-text-soft hover:text-ink"
          >
            ← {backLabel}
          </Link>
        </div>
      </section>
    </main>
  );
}
