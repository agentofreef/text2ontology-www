"use client";

import { Reveal } from "./Reveal";
import type { Lang } from "./Hero";

const t = {
  en: {
    num: "01",
    label: "the problem",
    titlePre: "Schema doesn't know what your business ",
    titleAccent: "means",
    titlePost: ".",
    body1: (
      <>
        <code className="bg-canvas-alt px-1 py-0.5 text-text">
          INFORMATION_SCHEMA.COLUMNS
        </code>{" "}
        doesn&apos;t know that &quot;early order&quot; is{" "}
        <code className="bg-canvas-alt px-1 py-0.5 text-text">
          status=&apos;CONFIRMED&apos;
        </code>{" "}
        in your company and{" "}
        <code className="bg-canvas-alt px-1 py-0.5 text-text">
          IN (&apos;CONFIRMED&apos;, &apos;SHIPPED&apos;)
        </code>{" "}
        in someone else&apos;s.
      </>
    ),
    body2: (
      <>
        It doesn&apos;t know the Q1 cut-off is the 14th, not the 15th. It
        doesn&apos;t know which customers got misclassified after the 2025
        migration. Those things live in people&apos;s heads, in audit history,
        in exception lists nobody wrote down — and an LLM staring at columns
        alone can&apos;t recover them.
      </>
    ),
    quote: (
      <>
        The shape of this project is the inverse of the usual pitch:{" "}
        <span className="text-accent">
          the organization slowly accumulates a curated ontology, and the AI
          just reads it.
        </span>{" "}
        Not auto-learning.
      </>
    ),
  },
  zh: {
    num: "01",
    label: "问题",
    titlePre: "Schema 不知道你的业务",
    titleAccent: "是什么意思",
    titlePost: "。",
    body1: (
      <>
        <code className="bg-canvas-alt px-1 py-0.5 text-text">
          INFORMATION_SCHEMA.COLUMNS
        </code>{" "}
        里没有&quot;早单是{" "}
        <code className="bg-canvas-alt px-1 py-0.5 text-text">
          status=&apos;CONFIRMED&apos;
        </code>
        而不是{" "}
        <code className="bg-canvas-alt px-1 py-0.5 text-text">
          status=&apos;SHIPPED&apos;
        </code>
        &quot;这种信息。
      </>
    ),
    body2: (
      <>
        没有&quot;Q1 截止日是 3 月 14
        日不是 15 日&quot;。没有&quot;这个客户在 2025
        迁移之后被错分类了&quot;。这些活在业务人员脑子里、活在审计历史里、活在没人写下来的 exception
        list 里 —— LLM 光看列是捞不出来的。
      </>
    ),
    quote: (
      <>
        这套项目的形态是反过来的:
        <span className="text-accent">
          是组织自己花时间沉淀出一套 curated ontology,AI 只是读它
        </span>
        。不是 auto-learning。
      </>
    ),
  },
};

export function SectionProblem({ lang }: { lang: Lang }) {
  const c = t[lang];
  return (
    <section className="border-b border-border bg-canvas">
      <div className="mx-auto max-w-[1600px] px-6 py-28">
        <Reveal>
          <div className="mb-12 flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-ghost">
              ▼// {c.num}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-soft">
              {c.label}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="cli-prefix max-w-[920px] font-sans text-[clamp(2rem,4.5vw,3.75rem)] font-semibold leading-tight tracking-tight text-ink">
            {c.titlePre}
            <em className="not-italic text-accent">{c.titleAccent}</em>
            {c.titlePost}
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <Reveal delay={0.1}>
            <p className="font-mono text-base leading-relaxed text-text-soft">
              {c.body1}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="font-mono text-base leading-relaxed text-text-soft">
              {c.body2}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-20 max-w-[1100px] border-l-2 border-accent bg-canvas-alt px-8 py-10">
            <p className="font-sans text-2xl font-medium leading-snug text-ink md:text-3xl">
              {c.quote}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
