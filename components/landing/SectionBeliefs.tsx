"use client";

import { Reveal } from "./Reveal";

const beliefs = [
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
];

/**
 * Section 2 — three core beliefs. A three-up grid of square cards with
 * monospace numbering and a hard top border in accent for hover.
 */
export function SectionBeliefs() {
  return (
    <section className="border-b border-border bg-canvas-alt">
      <div className="mx-auto max-w-[1600px] px-6 py-28">
        <Reveal>
          <div className="mb-12 flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-ghost">
              ▼// 02
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-soft">
              the position
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mb-16 max-w-[920px] font-sans text-[clamp(2rem,4.5vw,3.75rem)] font-semibold leading-tight tracking-tight text-ink">
            Three beliefs that drive the design.
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {beliefs.map((b, i) => (
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
