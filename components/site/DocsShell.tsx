"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search, ArrowLeft, ArrowRight } from "lucide-react";
import { Prose } from "./Prose";
import { Toc } from "./Toc";
import type { TocItem } from "@/lib/content";
import {
  type DocLang,
  type DocPage,
  docsGroups,
  findDoc,
  groupLabelFor,
  docHref,
  docNeighbors,
} from "@/lib/docs-nav";
import { cn } from "@/lib/cn";

/**
 * GitBook-style documentation shell, dressed in the site's industrial design
 * system. Three columns on xl+:
 *   left  — persistent doc tree (groups → pages) with a title filter
 *   center— breadcrumb, title, rendered prose, prev/next nav
 *   right — "on this page" outline (scroll-spy Toc)
 * Below lg the tree collapses behind a sticky "Menu" bar into a slide-in drawer.
 *
 * Pure data (tree, order, neighbours) comes from `@/lib/docs-nav` so this
 * client component never pulls in the server-only markdown loader.
 */

const ui = {
  en: {
    search: "Filter pages",
    onThisPage: "On this page",
    prev: "Previous",
    next: "Next",
    docs: "Docs",
    menu: "Menu",
    noResults: "No matching pages",
  },
  zh: {
    search: "筛选页面",
    onThisPage: "本页目录",
    prev: "上一页",
    next: "下一页",
    docs: "文档",
    menu: "目录",
    noResults: "没有匹配的页面",
  },
} as const;

function NavTree({
  lang,
  basePath,
  slug,
  query,
  onNavigate,
}: {
  lang: DocLang;
  basePath: string;
  slug: string;
  query: string;
  onNavigate?: () => void;
}) {
  const q = query.trim().toLowerCase();
  const groups = docsGroups[lang]
    .map((g) => ({
      label: g.label,
      items: g.slugs
        .map((s) => findDoc(lang, s))
        .filter((p): p is DocPage => Boolean(p))
        .filter((p) => !q || p.title.toLowerCase().includes(q)),
    }))
    .filter((g) => g.items.length > 0);

  if (groups.length === 0) {
    return (
      <p className="px-3 font-mono text-[11px] text-text-ghost">
        {ui[lang].noResults}
      </p>
    );
  }

  return (
    <nav aria-label={ui[lang].docs}>
      {groups.map((group) => (
        <div key={group.label} className="mb-6">
          <div className="mb-2 px-3 font-mono text-[10px] uppercase tracking-[0.22em] text-text-ghost">
            ▼// {group.label}
          </div>
          <ul>
            {group.items.map((p) => {
              const active = p.slug === slug;
              return (
                <li key={p.slug}>
                  <Link
                    href={docHref(basePath, p.slug)}
                    onClick={onNavigate}
                    className={cn(
                      "block border-l-2 py-1.5 pl-3 pr-3 text-[13px] leading-snug transition-colors",
                      active
                        ? "border-accent bg-canvas-alt font-medium text-ink"
                        : "border-transparent text-text-soft hover:border-border-strong hover:text-ink",
                    )}
                  >
                    {p.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function DocsShell({
  lang,
  basePath,
  slug,
  html,
  toc,
}: {
  lang: DocLang;
  basePath: string;
  slug: string;
  html: string;
  toc: TocItem[];
}) {
  const page = findDoc(lang, slug);
  const groupLabel = groupLabelFor(lang, slug);
  const { prev, next } = docNeighbors(lang, slug);
  const [query, setQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const c = ui[lang];

  const sidebarBody = (onNavigate?: () => void) => (
    <>
      <div className="relative mb-6">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-text-ghost" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={c.search}
          className="w-full border border-border-strong bg-canvas py-2 pl-9 pr-3 font-mono text-xs text-ink transition-colors placeholder:text-text-ghost focus:border-ink focus:outline-none"
        />
      </div>
      <NavTree
        lang={lang}
        basePath={basePath}
        slug={slug}
        query={query}
        onNavigate={onNavigate}
      />
    </>
  );

  return (
    <main className="min-h-screen pt-14">
      {/* Mobile docs bar — sticky under the fixed top nav */}
      <div className="sticky top-14 z-30 flex items-center gap-3 border-b-2 border-ink bg-canvas px-6 py-3 lg:hidden">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 border border-border-strong px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-text hover:border-ink"
          aria-label={c.menu}
        >
          <Menu className="size-3.5" />
          {c.menu}
        </button>
        <span className="truncate font-mono text-[10px] uppercase tracking-[0.22em] text-text-ghost">
          ▼// {c.docs}
          {groupLabel ? ` / ${groupLabel}` : ""}
        </span>
      </div>

      <div className="mx-auto flex w-full max-w-[1480px]">
        {/* Left sidebar — desktop */}
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-[272px] shrink-0 overflow-y-auto border-r-2 border-ink px-4 py-8 lg:block">
          {sidebarBody(undefined)}
        </aside>

        {/* Center + right outline */}
        <div className="min-w-0 flex-1">
          <div className="mx-auto flex max-w-[1080px] gap-12 px-6 py-10 md:py-14">
            <article className="min-w-0 flex-1 lg:max-w-[760px]">
              <div className="mb-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-text-ghost">
                <span>▼// {c.docs}</span>
                {groupLabel ? (
                  <>
                    <span>/</span>
                    <span>{groupLabel}</span>
                  </>
                ) : null}
              </div>

              <header className="mb-10 border-b border-ink pb-8">
                <h1 className="mb-4 font-sans text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.02] tracking-tight text-ink">
                  {page?.title}
                </h1>
                {page?.subtitle ? (
                  <p className="max-w-[640px] font-mono text-sm leading-relaxed text-text-soft">
                    {page.subtitle}
                  </p>
                ) : null}
              </header>

              <Prose html={html} />

              {(prev || next) && (
                <div className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
                  {prev ? (
                    <Link
                      href={docHref(basePath, prev.slug)}
                      className="group flex flex-col gap-1.5 border-2 border-ink p-4 transition-colors hover:bg-canvas-alt"
                    >
                      <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-text-ghost">
                        <ArrowLeft className="size-3" />
                        {c.prev}
                      </span>
                      <span className="font-sans text-sm font-semibold text-ink group-hover:text-accent">
                        {prev.title}
                      </span>
                    </Link>
                  ) : (
                    <span />
                  )}
                  {next ? (
                    <Link
                      href={docHref(basePath, next.slug)}
                      className="group flex flex-col items-end gap-1.5 border-2 border-ink p-4 text-right transition-colors hover:bg-canvas-alt"
                    >
                      <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-text-ghost">
                        {c.next}
                        <ArrowRight className="size-3" />
                      </span>
                      <span className="font-sans text-sm font-semibold text-ink group-hover:text-accent">
                        {next.title}
                      </span>
                    </Link>
                  ) : (
                    <span />
                  )}
                </div>
              )}
            </article>

            <aside className="hidden xl:block xl:w-[200px] xl:shrink-0">
              {toc.length > 0 ? (
                <div className="sticky top-24">
                  <Toc items={toc} label={c.onThisPage} />
                </div>
              ) : null}
            </aside>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {drawerOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40"
            onClick={() => setDrawerOpen(false)}
            aria-hidden
          />
          <div className="absolute left-0 top-0 h-full w-[280px] max-w-[85vw] overflow-y-auto border-r-2 border-ink bg-canvas px-4 py-5">
            <div className="mb-5 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-ghost">
                ▼// {c.docs}
              </span>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="border border-border-strong p-1 text-text hover:border-ink"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
            </div>
            {sidebarBody(() => setDrawerOpen(false))}
          </div>
        </div>
      ) : null}
    </main>
  );
}
