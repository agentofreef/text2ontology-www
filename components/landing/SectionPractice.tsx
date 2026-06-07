"use client";

import { Reveal } from "./Reveal";
import type { Lang } from "./Hero";

/**
 * "In practice" — the closing section. Where the runtime flow (03) and the
 * shipped surface (04) become a story: one coherent pipeline that is also a
 * loop. Ingest → legislate → ask → test, with a feedback edge from test back
 * to legislate (find drift → retune the metric). The two authored ends —
 * legislate (write the oracle) and test (run the oracle) — are inked; the
 * throughput steps are outlined. The thesis line underneath: full-stack isn't
 * more features, it's keeping both ends instead of outsourcing them.
 *
 * The diagram is hand-drawn inline SVG (square corners, hard 2px ink borders,
 * accent dotted feedback) so it matches the design system exactly, no lib.
 */
const t = {
  en: {
    num: "06",
    label: "in practice",
    title: "From a CSV to an answer someone signed.",
    box: {
      ingest: ["ingest", "collector"],
      legislate: ["legislate", "ontology + metric"],
      ask: ["ask", "lakehouse query"],
      test: ["test", "question sets"],
    },
    feedback: "drift found → retune the metric",
    closing: (
      <>
        <span className="text-accent">Full-stack isn&apos;t more features.</span>{" "}
        It&apos;s keeping the two ends everyone else outsources: writing the
        oracle (the Metric), and running it (the question set). One system, one
        vocabulary, one unbroken chain of responsibility — and a loop that
        tightens every time you correct it.
      </>
    ),
  },
  zh: {
    num: "06",
    label: "实战",
    title: "从一个 CSV,到一张签了字的答案。",
    box: {
      ingest: ["录入", "collector"],
      legislate: ["立法", "本体 + 口径"],
      ask: ["提问", "lakehouse 查询"],
      test: ["测试", "问题集"],
    },
    feedback: "发现偏差 → 回头微调口径",
    closing: (
      <>
        <span className="text-accent">全栈不是功能更多,</span>{" "}
        是把别人都外包掉的两端收回来:写裁判(口径),和跑裁判(问题集)。一套系统、一套词汇、一条不断的责任链
        —— 而且是一个每被你纠正一次、就收紧一分的环。
      </>
    ),
  },
};

export function SectionPractice({ lang }: { lang: Lang }) {
  const c = t[lang];
  const B = c.box;
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

        <Reveal delay={0.1}>
          <div className="border-2 border-ink bg-canvas p-5 md:p-10">
            <svg
              viewBox="0 0 1060 300"
              role="img"
              aria-label={`${B.ingest[0]} → ${B.legislate[0]} → ${B.ask[0]} → ${B.test[0]}, ${c.feedback}`}
              className="block h-auto w-full"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <defs>
                <marker id="p-ah" markerWidth="9" markerHeight="9" refX="7" refY="4" orient="auto">
                  <path d="M0,0 L8,4 L0,8 Z" fill="#0a0a0a" />
                </marker>
                <marker id="p-ahA" markerWidth="9" markerHeight="9" refX="7" refY="4" orient="auto">
                  <path d="M0,0 L8,4 L0,8 Z" fill="#ff4500" />
                </marker>
              </defs>

              {/* box 1 · ingest (outlined) */}
              <rect x="20" y="150" width="210" height="94" fill="#fafafa" stroke="#0a0a0a" strokeWidth="2" />
              <text x="125" y="190" textAnchor="middle" fontSize="19" fontWeight="700" fill="#0a0a0a">{B.ingest[0]}</text>
              <text x="125" y="215" textAnchor="middle" fontSize="12.5" fill="#525252">{B.ingest[1]}</text>

              {/* box 2 · legislate (inked end) */}
              <rect x="298" y="150" width="210" height="94" fill="#0a0a0a" stroke="#0a0a0a" strokeWidth="2" />
              <text x="403" y="190" textAnchor="middle" fontSize="19" fontWeight="700" fill="#fafafa">{B.legislate[0]}</text>
              <text x="403" y="215" textAnchor="middle" fontSize="12.5" fill="#bdbdbd">{B.legislate[1]}</text>

              {/* box 3 · ask (outlined) */}
              <rect x="576" y="150" width="210" height="94" fill="#fafafa" stroke="#0a0a0a" strokeWidth="2" />
              <text x="681" y="190" textAnchor="middle" fontSize="19" fontWeight="700" fill="#0a0a0a">{B.ask[0]}</text>
              <text x="681" y="215" textAnchor="middle" fontSize="12.5" fill="#525252">{B.ask[1]}</text>

              {/* box 4 · test (inked end) */}
              <rect x="854" y="150" width="186" height="94" fill="#0a0a0a" stroke="#0a0a0a" strokeWidth="2" />
              <text x="947" y="190" textAnchor="middle" fontSize="19" fontWeight="700" fill="#fafafa">{B.test[0]}</text>
              <text x="947" y="215" textAnchor="middle" fontSize="12.5" fill="#bdbdbd">{B.test[1]}</text>

              {/* forward arrows */}
              <line x1="230" y1="197" x2="292" y2="197" stroke="#0a0a0a" strokeWidth="2" markerEnd="url(#p-ah)" />
              <line x1="508" y1="197" x2="570" y2="197" stroke="#0a0a0a" strokeWidth="2" markerEnd="url(#p-ah)" />
              <line x1="786" y1="197" x2="848" y2="197" stroke="#0a0a0a" strokeWidth="2" markerEnd="url(#p-ah)" />

              {/* feedback: test → legislate */}
              <path d="M947,150 C947,40 403,40 403,148" fill="none" stroke="#ff4500" strokeWidth="2" strokeDasharray="3 5" markerEnd="url(#p-ahA)" />
              <text x="675" y="32" textAnchor="middle" fontSize="14" fontWeight="700" fill="#ff4500">{c.feedback}</text>
            </svg>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-12 max-w-[820px] font-mono text-sm leading-relaxed text-text-soft">
            {c.closing}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
