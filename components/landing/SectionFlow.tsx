"use client";

import { Reveal } from "./Reveal";
import type { Lang } from "./Hero";

const t = {
  en: {
    num: "03",
    label: "the runtime",
    title: "What happens when someone asks a question.",
    stepWord: "step",
    closing: (
      <>
        <span className="text-accent">Every step has an address.</span>{" "}
        When an answer is wrong, you know which step to look at — the
        tokenization, the recall, the intent, the parameters, the compiled
        SQL — and where to fix it so the same shape of mistake doesn&apos;t
        come back next week.
      </>
    ),
    steps: [
      {
        label: "QUESTION",
        sub: "natural language",
        body: "User asks one sentence. Plain words, no SQL.",
      },
      {
        label: "TOKEN",
        sub: "LLM tokenization",
        body: "The LLM splits the question into business tokens before recall begins.",
      },
      {
        label: "RECALL",
        sub: "EXACT · FUZZY · VEC",
        body: "Three tiers cascading. Each token finds its anchor in the ontology.",
      },
      {
        label: "INTENT",
        sub: "fill parameters",
        body: "LLM picks one Intent from the recalled context. Supplies parameters.",
      },
      {
        label: "SQL",
        sub: "deterministic compiler",
        body: "Engine compiles {intent, params} into Postgres SQL. Single source of truth.",
      },
      {
        label: "ANSWER",
        sub: "auditable, fixable",
        body: "Result returns with provenance. Wrong? Fix the Intent — every future query inherits.",
      },
    ],
  },
  zh: {
    num: "03",
    label: "运行时",
    title: "用户问一句话,系统做了什么。",
    stepWord: "步",
    closing: (
      <>
        <span className="text-accent">每一步都有地址。</span>{" "}
        答案错了的时候,你知道**应该看哪一步** —— 分词、召回、意图、参数、编译出来的 SQL —— **以及在哪儿改它**,让同样形状的错误下个礼拜不再撞。
      </>
    ),
    steps: [
      {
        label: "QUESTION",
        sub: "自然语言",
        body: "用户问一句话。人话,不写 SQL。",
      },
      {
        label: "TOKEN",
        sub: "LLM 分词",
        body: "大语言模型把问题切成业务 token,作为后续召回的输入。",
      },
      {
        label: "RECALL",
        sub: "EXACT · FUZZY · VEC",
        body: "三层级联。每个 token 在本体里找到自己的锚点。",
      },
      {
        label: "INTENT",
        sub: "填参数",
        body: "LLM 从召回上下文里选一个 Intent,填参数。",
      },
      {
        label: "SQL",
        sub: "deterministic 编译器",
        body: "引擎把 {intent, params} 编译成 Postgres SQL。单一真理来源。",
      },
      {
        label: "ANSWER",
        sub: "可审计、可修复",
        body: "结果带 provenance 返回。错了?改 Intent —— 所有未来查询都跟着改对。",
      },
    ],
  },
};

export function SectionFlow({ lang }: { lang: Lang }) {
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
          <h2 className="mb-16 max-w-[920px] font-sans text-[clamp(2rem,4.5vw,3.75rem)] font-semibold leading-tight tracking-tight text-ink">
            {c.title}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {c.steps.map((s, i) => (
            <Reveal key={s.label} delay={0.05 + i * 0.04}>
              <div className="flex h-full flex-col bg-canvas p-6 hover:bg-canvas-alt">
                <div className="mb-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-text-ghost">
                  <span className="inline-block size-1.5 bg-accent" />
                  {c.stepWord} {i + 1}
                </div>
                <div className="mb-2 font-mono text-base font-semibold tracking-[0.12em] text-ink">
                  {s.label}
                </div>
                <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-text-soft">
                  {s.sub}
                </div>
                <p className="mt-auto font-mono text-xs leading-relaxed text-text-soft">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <p className="mt-12 max-w-[820px] font-mono text-sm leading-relaxed text-text-soft">
            {c.closing}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
