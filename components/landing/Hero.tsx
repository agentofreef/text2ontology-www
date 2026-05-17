"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { GithubIcon } from "@/components/site/icons";
import Link from "next/link";
import { OntologyMesh } from "./OntologyMesh";

export type Lang = "en" | "zh";

/**
 * Full-viewport hero. Three pieces:
 *   1. Background — slow-rotating wireframe ontology mesh (3D, R3F)
 *   2. Foreground text — large headline + sub-headline + CTAs
 *   3. Industrial chrome — top-left status block, bottom scroll indicator
 *
 * `lang` selects which copy table to render. Structure / motion / classes
 * are identical between locales — only strings differ.
 */
const t = {
  en: {
    titleLine1: "Ontology",
    titleLine2: "before query.",
    taglinePre: "Build the meaning ",
    taglineAccent: "before",
    taglinePost: " you analyze.",
    body: (
      <>
        LLM-driven analysis should not rely on the LLM freely generating
        executable queries (SQL / DAX / Pandas / any DSL). The LLM fills
        parameters into intent templates the{" "}
        <em className="not-italic text-ink">organization</em> maintains. A
        deterministic compiler does the rest.
      </>
    ),
    ctaManifesto: "Read the Manifesto →",
    ctaGithub: "GitHub",
    scrollHint: "// scroll to read",
    scrollContinue: "Continue",
  },
  zh: {
    titleLine1: "本体先",
    titleLine2: "于查询。",
    taglinePre: "在分析",
    taglineAccent: "之前",
    taglinePost: ",先建立意义。",
    body: (
      <>
        大语言模型驱动的分析,不应该依赖 LLM 自由生成可执行查询(SQL / DAX
        / Pandas / 任何 DSL)。LLM 往{" "}
        <em className="not-italic text-ink">组织</em>{" "}
        维护的意图模板里填参数,具体的可执行查询由 deterministic 编译器拼装。
      </>
    ),
    ctaManifesto: "阅读宣言 →",
    ctaGithub: "GitHub",
    scrollHint: "// 向下滚动阅读",
    scrollContinue: "继续",
  },
};

export function Hero({ lang }: { lang: Lang }) {
  const c = t[lang];
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden border-b-2 border-ink bg-canvas">
      {/* Top hairline + corner registration marks — industrial chrome. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-ink" />
      <div className="pointer-events-none absolute left-0 top-0 size-4 border-l-2 border-t-2 border-ink" />
      <div className="pointer-events-none absolute right-0 top-0 size-4 border-r-2 border-t-2 border-ink" />

      <OntologyMesh />

      <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-14 pt-28 md:pb-20 md:pt-32">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "linear" }}
          className="font-sans text-[clamp(3rem,9vw,8rem)] font-bold leading-[0.95] tracking-tight text-ink"
        >
          {c.titleLine1}
          <br />
          {c.titleLine2}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: "linear", delay: 0.4 }}
          className="my-7 h-0.5 w-16 origin-left bg-ink md:my-10"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "linear" }}
          className="max-w-[680px] font-sans text-xl text-text leading-relaxed md:text-2xl"
        >
          {c.taglinePre}
          <span className="text-accent">{c.taglineAccent}</span>
          {c.taglinePost}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7, ease: "linear" }}
          className="mt-6 max-w-[640px] font-mono text-sm leading-relaxed text-text-soft"
        >
          {c.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.9, ease: "linear" }}
          className="mt-8 flex flex-wrap items-center gap-3 md:mt-12"
        >
          <Link
            href={lang === "zh" ? "/zh/manifesto/" : "/manifesto/"}
            className="border-2 border-ink bg-ink px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-canvas hover:bg-accent hover:border-accent"
          >
            {c.ctaManifesto}
          </Link>
          <a
            href="https://github.com/agentofreef/text2ontology"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border-2 border-ink bg-canvas px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-canvas"
          >
            <GithubIcon className="size-3.5" />
            {c.ctaGithub}
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.2, ease: "linear" }}
        className="relative mx-auto w-full max-w-[1600px] px-6 pb-6"
      >
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-text-ghost">
          <span>{c.scrollHint}</span>
          <span className="flex items-center gap-2">
            <ArrowDown className="size-3" />
            {c.scrollContinue}
          </span>
        </div>
      </motion.div>
    </section>
  );
}
