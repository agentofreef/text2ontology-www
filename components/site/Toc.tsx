"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/content";

/**
 * Sticky chapter outline for long-form doc pages. Scroll-spy via
 * IntersectionObserver: the heading nearest the top of the viewport's active
 * band is highlighted. Hidden below lg by DocShell — this component assumes it
 * is already in a sidebar slot.
 */
export function Toc({ items, label }: { items: TocItem[]; label: string }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headings = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-96px 0px -70% 0px" },
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label={label}>
      <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-text-ghost">
        ▼// {label}
      </div>
      <ul>
        {items.map((it) => {
          const active = it.id === activeId;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className={[
                  "block border-l-2 py-1 font-mono text-[11px] leading-snug transition-colors",
                  it.level === 3 ? "pl-6" : "pl-3",
                  active
                    ? "border-accent text-accent"
                    : "border-transparent text-text-soft hover:text-ink",
                ].join(" ")}
              >
                {it.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
