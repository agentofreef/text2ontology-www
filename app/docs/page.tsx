import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/**
 * /docs placeholder. Real Fumadocs wiring lands in the next iteration —
 * for now this just routes the docs nav-link to a landing page that points
 * at the canonical essays on GitHub, so nothing 404s.
 */
export const metadata = {
  title: "Docs",
  description: "Documentation for text2ontology — coming soon.",
};

const links = [
  {
    title: "Manifesto — Ontology Before Query",
    href: "https://github.com/agentofreef/text2ontology/blob/main/docs/manifesto/manifesto.en.md",
    desc: "The thesis. Why ontology-first, why bounded error, why Resolution over Discovery.",
  },
  {
    title: "Design Philosophy",
    href: "https://github.com/agentofreef/text2ontology/blob/main/docs/spec/design-philosophy.en.md",
    desc: "Three-layer ontology lifecycle + two-level query architecture + recall in depth.",
  },
  {
    title: "Responsibility as Moat",
    href: "https://github.com/agentofreef/text2ontology/blob/main/docs/essays/responsibility-as-moat.en.md",
    desc: "Why AI enterprise services' real moat is who carries the responsibility, not who has the bigger model.",
  },
  {
    title: "AI Agentic Illusion",
    href: "https://github.com/agentofreef/text2ontology/blob/main/docs/essays/ai-agentic-illusion.en.md",
    desc: "Five layers of why \"AI Agentic Data Analyst\" as a product category is the wrong shape.",
  },
  {
    title: "Business Ontology Engineer",
    href: "https://github.com/agentofreef/text2ontology/blob/main/docs/essays/business-ontology-engineer.en.md",
    desc: "A new role that is emerging — what it does, why it isn't an existing job, where it lands first.",
  },
];

export default function DocsLanding() {
  return (
    <main className="min-h-screen pt-24">
      <section className="mx-auto max-w-[1100px] px-6 py-20">
        <div className="mb-12 flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-ghost">
            ▼// docs
          </span>
          <span className="status-block status-block-accent">
            wiring in progress
          </span>
        </div>

        <h1 className="mb-8 font-sans text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-tight text-ink">
          Docs
        </h1>

        <p className="mb-16 max-w-[680px] font-mono text-sm leading-relaxed text-text-soft">
          A full Fumadocs-powered docs site lives in the next iteration. Until
          then, the canonical essays + design notes live in the GitHub repo —
          all five are in English and Chinese:
        </p>

        <div className="grid gap-px bg-border md:grid-cols-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col bg-canvas p-8 hover:bg-canvas-alt"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <h2 className="font-sans text-lg font-semibold leading-tight tracking-tight text-ink group-hover:text-accent">
                  {l.title}
                </h2>
                <ArrowUpRight className="size-4 shrink-0 text-text-ghost group-hover:text-accent" />
              </div>
              <p className="font-mono text-xs leading-relaxed text-text-soft">
                {l.desc}
              </p>
            </a>
          ))}
        </div>

        <div className="mt-16 border-t border-border pt-8">
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
