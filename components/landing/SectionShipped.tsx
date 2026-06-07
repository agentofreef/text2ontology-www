"use client";

import { Reveal } from "./Reveal";
import type { Lang } from "./Hero";

const t = {
  en: {
    num: "04",
    label: "shipped — v0.1",
    title: "What you can actually run today.",
    features: [
      {
        title: "Three agent modes",
        desc: "lakehouse (query) — ask questions. builder (modeling) — teach the agent your business via interview-driven OD creation. explore — co-draft a new Metric in conversation (emits a structured card, not SQL).",
      },
      {
        title: "Three-tier recall",
        desc: "EXACT → FUZZY → VEC, cascading. Every token finds its anchor or gets surfaced as a triage candidate.",
      },
      {
        title: "Thread Memory Ledger",
        desc: "Cross-turn structured memory. Once a token is bound to an OD or Intent in a thread, future turns inherit the binding — no repeated lookup, no token waste.",
      },
      {
        title: "Per-OD semantic_sql",
        desc: "One OD compiles into one canonical SQL fragment. Multi-physical-table JOINs hide behind the OD; users see business objects, not table layouts.",
      },
      {
        title: "Regression test suites",
        desc: "Build named question sets, run them against the live stack, compare outputs across runs — at /lakehouse-agent/dataset-testing.",
      },
      {
        title: "Self-contained stack",
        desc: "docker compose up — Postgres + pgvector + 6 Go services + Next.js frontend + GHCR images. No external dependencies to fire up the demo.",
      },
    ],
  },
  zh: {
    num: "04",
    label: "已 ship — v0.1",
    title: "今天你就能跑起来的东西。",
    features: [
      {
        title: "三种 Agent 模式",
        desc: "lakehouse(查询)—— 问问题。builder(建模)—— 访谈式构建 OD,把业务教给 Agent。explore(探索)—— 对话式草拟新口径,产出结构化卡片,不是 SQL。",
      },
      {
        title: "三层召回",
        desc: "EXACT → FUZZY → VEC,级联。每个 token 要么找到锚点,要么作为 triage 候选浮出来。",
      },
      {
        title: "线程记忆账本",
        desc: "跨轮结构化记忆。一旦某个 token 在线程里绑到了 OD 或 Intent,后续轮次直接继承 —— 不重复 lookup,不浪费 token。",
      },
      {
        title: "Per-OD semantic_sql",
        desc: "一个 OD 编译成一段 canonical SQL 片段。跨多张物理表的 JOIN 藏在 OD 后面;用户看到的是业务对象,不是表结构。",
      },
      {
        title: "回归测试套件",
        desc: "建命名的问题集,跑活体 stack,多次 run 输出对比 —— 在 /lakehouse-agent/dataset-testing。",
      },
      {
        title: "自包含 stack",
        desc: "docker compose up —— Postgres + pgvector + 6 个 Go 服务 + Next.js 前端 + GHCR 镜像。起 demo 不依赖任何外部服务。",
      },
    ],
  },
};

export function SectionShipped({ lang }: { lang: Lang }) {
  const c = t[lang];
  return (
    <section className="border-b border-border bg-canvas-alt">
      <div className="mx-auto max-w-[1600px] px-6 py-16 md:py-28">
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
          <h2 className="mb-10 max-w-[920px] font-sans text-[clamp(2rem,4.5vw,3.75rem)] font-semibold leading-tight tracking-tight text-ink md:mb-16">
            {c.title}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
          {c.features.map((f, i) => (
            <Reveal key={f.title} delay={0.05 + i * 0.04}>
              <div className="flex h-full flex-col bg-canvas p-8 transition-colors hover:bg-canvas-alt">
                <h3 className="mb-4 font-sans text-xl font-semibold leading-snug tracking-tight text-ink">
                  {f.title}
                </h3>
                <p className="font-mono text-xs leading-relaxed text-text-soft">
                  {f.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
