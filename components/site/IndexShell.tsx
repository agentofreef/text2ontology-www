import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export interface IndexEntry {
  slug: string;
  title: string;
  subtitle: string;
}

/**
 * Shared layout for /docs/ and /blog/ index pages. Same industrial chrome as
 * DocShell — section label, big title, mono lede — followed by a grid of
 * entries that link into each doc page.
 */
export function IndexShell({
  sectionLabel,
  title,
  lede,
  entries,
  basePath,
  backHref,
  backLabel,
}: {
  sectionLabel: string;
  title: string;
  lede: string;
  entries: IndexEntry[];
  basePath: string;
  backHref: string;
  backLabel: string;
}) {
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

        <div className="grid gap-px bg-border md:grid-cols-2">
          {entries.map((e, i) => (
            <Link
              key={e.slug}
              href={`${basePath}/${e.slug}/`}
              className="group flex flex-col bg-canvas p-8 hover:bg-canvas-alt"
            >
              <div className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-text-ghost">
                <span className="inline-block size-1.5 bg-accent" />
                {String(i + 1).padStart(2, "0")}
              </div>
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
