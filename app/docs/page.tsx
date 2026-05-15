import Link from "next/link";
import { pageAlternates } from "@/lib/seo";

export const metadata = {
  title: "Docs",
  description: "User documentation for text2ontology — coming soon.",
  alternates: pageAlternates({ enPath: "/docs", lang: "en" }),
};

export default function DocsIndex() {
  return (
    <main className="min-h-screen pt-24">
      <section className="mx-auto max-w-[820px] px-6 py-16">
        <div className="mb-10 flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-ghost">
            ▼// docs
          </span>
          <span className="status-block status-block-accent">in progress</span>
        </div>

        <h1 className="mb-8 font-sans text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-tight text-ink">
          Docs
        </h1>

        <p className="mb-6 max-w-[640px] font-mono text-sm leading-relaxed text-text-soft">
          User documentation is in progress. This is where the install guide,
          the first-time setup walkthrough, the ontology authoring workflow,
          and the agent-mode reference will land — in the order you actually
          touch them.
        </p>

        <p className="mb-12 max-w-[640px] font-mono text-sm leading-relaxed text-text-soft">
          Until then, the README in the GitHub repo carries the install steps,
          and longer-form architecture pieces live in the{" "}
          <Link
            href="/blog/"
            className="border-b border-text-ghost text-ink hover:border-accent hover:text-accent"
          >
            blog
          </Link>{" "}
          — starting with{" "}
          <Link
            href="/blog/design-philosophy/"
            className="border-b border-text-ghost text-ink hover:border-accent hover:text-accent"
          >
            Design Philosophy
          </Link>{" "}
          if you want to understand how the system is laid out.
        </p>

        <div className="mb-12 border-2 border-ink bg-canvas-alt p-6">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-text-ghost">
            // shape this section
          </div>
          <p className="font-mono text-xs leading-relaxed text-text">
            What I want this section to be, when it&apos;s done:
          </p>
          <ul className="mt-4 space-y-2 font-mono text-xs leading-relaxed text-text">
            <li className="relative pl-6 before:absolute before:left-0 before:top-[0.55em] before:size-1.5 before:bg-accent before:content-['']">
              01 — Install &amp; first boot
            </li>
            <li className="relative pl-6 before:absolute before:left-0 before:top-[0.55em] before:size-1.5 before:bg-accent before:content-['']">
              02 — Connect a data source (PBIT / Excel / Postgres / SQLite)
            </li>
            <li className="relative pl-6 before:absolute before:left-0 before:top-[0.55em] before:size-1.5 before:bg-accent before:content-['']">
              03 — Builder mode: walk the agent through your business
            </li>
            <li className="relative pl-6 before:absolute before:left-0 before:top-[0.55em] before:size-1.5 before:bg-accent before:content-['']">
              04 — Curate the ontology (keywords, intents, aliases)
            </li>
            <li className="relative pl-6 before:absolute before:left-0 before:top-[0.55em] before:size-1.5 before:bg-accent before:content-['']">
              05 — Ask questions; when wrong, fix at the address
            </li>
          </ul>
        </div>

        <div className="border-t border-border pt-8">
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-[0.22em] text-text-soft hover:text-ink"
          >
            ← Back home
          </Link>
        </div>
      </section>
    </main>
  );
}
