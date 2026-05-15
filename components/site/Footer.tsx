"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const t = {
  en: {
    license: ["Apache 2.0 — code", "CC BY 4.0 — docs & essays"],
    navHeader: "▼// Navigation",
    nav: [
      { href: "/manifesto/", label: "Manifesto" },
      { href: "/docs/", label: "Docs" },
      { href: "/blog/", label: "Blog" },
    ],
    builtHeader: "▼// Built by",
    builtBlurb: [
      "Open-source. Self-hosted.",
      "Patience required. No magic.",
    ],
    foot1: "// text2ontology.com",
    foot2: "// ontology before query",
  },
  zh: {
    license: ["代码 — Apache 2.0", "文档 & essay — CC BY 4.0"],
    navHeader: "▼// 导航",
    nav: [
      { href: "/zh/manifesto/", label: "宣言" },
      { href: "/zh/docs/", label: "文档" },
      { href: "/zh/blog/", label: "博客" },
    ],
    builtHeader: "▼// 作者",
    builtBlurb: [
      "开源,自托管。",
      "需要耐心,不会有魔法。",
    ],
    foot1: "// text2ontology.com",
    foot2: "// 本体先于查询",
  },
};

/**
 * Footer reads locale from pathname so the layout stays a single component
 * — the page-level lang prop only drives section content, not chrome.
 */
export function Footer() {
  const pathname = usePathname() || "/";
  const isZh = pathname === "/zh" || pathname.startsWith("/zh/");
  const c = isZh ? t.zh : t.en;

  return (
    <footer className="border-t border-ink mt-32 bg-canvas-alt">
      <div className="mx-auto max-w-[1600px] px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.22em]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="" className="size-6" aria-hidden />
              text2ontology
            </div>
            <p className="font-mono text-[11px] leading-relaxed text-text-soft">
              {c.license[0]}
              <br />
              {c.license[1]}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-ghost">
              {c.navHeader}
            </div>
            {c.nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="font-mono text-xs text-text hover:text-accent"
              >
                {n.label}
              </Link>
            ))}
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
              {c.builtHeader}
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
              {c.builtBlurb[0]}
              <br />
              {c.builtBlurb[1]}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-text-ghost md:flex-row md:items-center md:justify-between">
          <span>{c.foot1}</span>
          <span>{c.foot2}</span>
        </div>
      </div>
    </footer>
  );
}
