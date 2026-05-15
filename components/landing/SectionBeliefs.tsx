"use client";

import { Reveal } from "./Reveal";
import type { Lang } from "./Hero";

const t = {
  en: {
    num: "02",
    label: "the position",
    title: "Three beliefs that drive the design.",
    beliefs: [
      {
        n: "01",
        title: "Data analysis has no oracle.",
        body: "AI coding works because tests are the oracle. Data analysis doesn't have one. So we don't ask the AI to find the right answer — we let the organization specify one.",
      },
      {
        n: "02",
        title: "Consistency, not correctness.",
        body: "Business questions are under-determined; \"correct\" assumes a unique answer that doesn't exist. We deliver the same answer to the same question, every time — and make the answer easy to revise.",
      },
      {
        n: "03",
        title: "Bounded error ≠ unbounded hallucination.",
        body: "Every wrong answer has an address — which Intent, which alias, which causality edge. Fix it once at the address. The same shape of mistake doesn't come back next week.",
      },
    ],
  },
  zh: {
    num: "02",
    label: "立场",
    title: "驱动整个设计的三个核心信念。",
    beliefs: [
      {
        n: "01",
        title: "数据分析没有 oracle。",
        body: "AI 编程之所以能跑通,是因为测试就是 oracle。数据分析没有。所以我们不让 AI 找正确答案 —— 让组织来指定一个。",
      },
      {
        n: "02",
        title: "卖一致性,不卖正确性。",
        body: "业务问题是 under-determined 的,\"正确\"假设有唯一答案 —— 这个假设不成立。我们交付的是\"同一个问题永远得到同一个答案\",而且这个答案容易修改。",
      },
      {
        n: "03",
        title: "有界错误 ≠ 无界幻觉。",
        body: "每个错误都有地址 —— 哪个 Intent、哪个 alias、哪条因果。在那个地址修一次,下个礼拜不会再撞同样形状的错。",
      },
    ],
  },
};

export function SectionBeliefs({ lang }: { lang: Lang }) {
  const c = t[lang];
  return (
    <section className="border-b border-border bg-canvas-alt">
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

        <div className="grid gap-6 md:grid-cols-3">
          {c.beliefs.map((b, i) => (
            <Reveal key={b.n} delay={0.1 + i * 0.08}>
              <div className="group flex h-full flex-col border-t-2 border-ink bg-canvas p-8 transition-colors hover:border-accent">
                <div className="mb-8 font-mono text-xs uppercase tracking-[0.22em] text-text-ghost group-hover:text-accent">
                  ▼// {b.n}
                </div>
                <h3 className="mb-6 font-sans text-2xl font-semibold leading-tight tracking-tight text-ink">
                  {b.title}
                </h3>
                <p className="font-mono text-sm leading-relaxed text-text-soft">
                  {b.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
