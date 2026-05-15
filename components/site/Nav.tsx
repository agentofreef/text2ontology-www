"use client";

import Link from "next/link";
import { GithubIcon } from "@/components/site/icons";
import { cn } from "@/lib/cn";

const links = [
  { href: "/manifesto/", label: "Manifesto" },
  { href: "/docs/", label: "Docs" },
  { href: "/blog/", label: "Blog" },
];

/**
 * Top nav — fixed, transparent over the hero, picks up canvas background
 * once you scroll. Industrial: square edges, monospace site mark, no
 * decoration on links beyond a 1-px hover underline.
 */
export function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-transparent bg-canvas/0 backdrop-blur transition-colors data-[scrolled=true]:border-border data-[scrolled=true]:bg-canvas/95">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-xs tracking-[0.22em] text-ink uppercase"
        >
          <span className="inline-block size-3 bg-ink" aria-hidden />
          text2ontology
        </Link>

        <div className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-mono text-xs uppercase tracking-[0.18em] text-text-soft hover:text-ink",
                "border-b border-transparent hover:border-ink"
              )}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://github.com/agentofreef/text2ontology"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 border border-border-strong px-2.5 py-1 font-mono text-xs uppercase tracking-[0.18em] text-text hover:border-ink"
          >
            <GithubIcon className="size-3.5" />
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}
