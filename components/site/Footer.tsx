import Link from "next/link";

/**
 * Industrial footer — square, monospace, single hairline rule on top.
 * Three columns: brand + license, navigation, attribution.
 */
export function Footer() {
  return (
    <footer className="border-t border-ink mt-32 bg-canvas-alt">
      <div className="mx-auto max-w-[1600px] px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em]">
              <span className="inline-block size-3 bg-ink" aria-hidden />
              text2ontology
            </div>
            <p className="font-mono text-[11px] leading-relaxed text-text-soft">
              Apache 2.0 — code
              <br />
              CC BY 4.0 — docs &amp; essays
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-ghost">
              ▼// Navigation
            </div>
            <Link
              href="/manifesto/"
              className="font-mono text-xs text-text hover:text-accent"
            >
              Manifesto
            </Link>
            <Link
              href="/docs/"
              className="font-mono text-xs text-text hover:text-accent"
            >
              Docs
            </Link>
            <Link
              href="/blog/"
              className="font-mono text-xs text-text hover:text-accent"
            >
              Blog
            </Link>
            <a
              href="https://github.com/agentofreef/text2ontology"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-text hover:text-accent"
            >
              GitHub →
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-ghost">
              ▼// Built by
            </div>
            <a
              href="https://github.com/agentofreef"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-text hover:text-accent"
            >
              AgentOfReef
            </a>
            <p className="font-mono text-[11px] leading-relaxed text-text-soft">
              Reference implementation. Not a product.
              <br />
              Patience required. No magic.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-text-ghost md:flex-row md:items-center md:justify-between">
          <span>// text2ontology.com</span>
          <span>// ontology before query</span>
        </div>
      </div>
    </footer>
  );
}
