"use client";

import Giscus from "@giscus/react";
import { GISCUS_CONFIG, isGiscusConfigured } from "@/lib/giscus";

/**
 * Comments widget — Giscus over GitHub Discussions on the text2ontology-www
 * repo. Pure client component because the widget mounts an iframe and needs
 * the browser environment. Until the 4 Giscus IDs are filled in (see
 * `lib/giscus.ts`), this renders a non-interactive placeholder so the section
 * is visible on the page but obviously not wired up.
 */
export function Comments({ lang }: { lang: "en" | "zh" }) {
  if (!isGiscusConfigured()) {
    return (
      <div className="mt-16 border-2 border-dashed border-border-strong bg-canvas-alt p-6">
        <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-text-ghost">
          ▼// {lang === "zh" ? "评论" : "comments"}
        </div>
        <p className="font-mono text-xs leading-relaxed text-text-soft">
          {lang === "zh"
            ? "评论系统(Giscus)还没接好 —— 等 4 个 ID 填进 lib/giscus.ts 就上线。"
            : "Comments (Giscus) not yet configured — drop in the 4 IDs in lib/giscus.ts to enable."}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-16 border-t border-border pt-10">
      <div className="mb-6 font-mono text-[10px] uppercase tracking-[0.22em] text-text-ghost">
        ▼// {lang === "zh" ? "评论" : "comments"}
      </div>
      <Giscus
        id={`comments-${lang}`}
        repo={GISCUS_CONFIG.repo}
        repoId={GISCUS_CONFIG.repoId}
        category={GISCUS_CONFIG.category}
        categoryId={GISCUS_CONFIG.categoryId}
        mapping={GISCUS_CONFIG.mapping}
        strict={GISCUS_CONFIG.strict}
        reactionsEnabled={GISCUS_CONFIG.reactionsEnabled}
        emitMetadata={GISCUS_CONFIG.emitMetadata}
        inputPosition={GISCUS_CONFIG.inputPosition}
        theme="light"
        lang={lang === "zh" ? "zh-CN" : "en"}
        loading={GISCUS_CONFIG.loading}
      />
    </div>
  );
}
