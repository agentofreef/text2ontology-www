"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { GithubIcon } from "@/components/site/icons";
import { cn } from "@/lib/cn";

/**
 * Top nav — fixed, transparent over the hero, picks up canvas background
 * once you scroll. Industrial: square edges, monospace site mark, no
 * decoration on links beyond a 1-px hover underline.
 *
 * Below md: the three section links collapse behind a hamburger; the locale
 * + GitHub chips stay visible. Tapping the trigger toggles a dropdown panel
 * pinned to the nav strip; selecting any link auto-closes it.
 *
 * The locale toggle reads usePathname() and swaps `/foo` ↔ `/zh/foo`.
 */
export function Nav() {
  const pathname = usePathname() || "/";
  const isZh = pathname === "/zh" || pathname.startsWith("/zh/");
  const [open, setOpen] = useState(false);

  const links = isZh
    ? [
        { href: "/zh/manifesto/", label: "宣言" },
        { href: "/zh/docs/", label: "文档" },
        { href: "/zh/blog/", label: "博客" },
      ]
    : [
        { href: "/manifesto/", label: "Manifesto" },
        { href: "/docs/", label: "Docs" },
        { href: "/blog/", label: "Blog" },
      ];

  const otherLocale = isZh
    ? pathname.replace(/^\/zh/, "") || "/"
    : "/zh" + (pathname === "/" ? "" : pathname);
  const otherLabel = isZh ? "EN" : "中";

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-transparent bg-canvas/0 backdrop-blur transition-colors data-[scrolled=true]:border-border data-[scrolled=true]:bg-canvas/95">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-6">
        <Link
          href={isZh ? "/zh/" : "/"}
          className="flex items-center gap-2.5 font-mono text-xs tracking-[0.22em] text-ink uppercase"
          onClick={() => setOpen(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="" className="size-6" aria-hidden />
          text2ontology
        </Link>

        {/* Desktop link bar (md+) */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-mono text-xs uppercase tracking-[0.18em] text-text-soft hover:text-ink",
                "border-b border-transparent hover:border-ink",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={otherLocale}
            className="border border-border-strong px-2 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-text hover:border-ink"
            aria-label={isZh ? "Switch to English" : "切换中文"}
          >
            {otherLabel}
          </Link>
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

        {/* Mobile cluster (< md): locale + github icon + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href={otherLocale}
            className="border border-border-strong px-2 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-text hover:border-ink"
            aria-label={isZh ? "Switch to English" : "切换中文"}
            onClick={() => setOpen(false)}
          >
            {otherLabel}
          </Link>
          <a
            href="https://github.com/agentofreef/text2ontology"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex items-center justify-center border border-border-strong px-2 py-1 text-text hover:border-ink"
          >
            <GithubIcon className="size-3.5" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex items-center justify-center border border-border-strong p-1.5 text-text hover:border-ink"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown panel */}
      {open ? (
        <div className="border-t border-border bg-canvas md:hidden">
          <div className="mx-auto flex max-w-[1600px] flex-col gap-1 px-6 py-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-border py-3 font-mono text-sm uppercase tracking-[0.18em] text-text hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </nav>
  );
}
