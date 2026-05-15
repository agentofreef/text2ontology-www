"use client";

import { Reveal } from "./Reveal";

const steps = [
  {
    label: "QUESTION",
    sub: "natural language",
    body: "User asks one sentence. Plain words, no SQL.",
  },
  {
    label: "TOKEN",
    sub: "forced tokenization",
    body: "Every question is split into tokens. Deterministic, server-side, no LLM.",
  },
  {
    label: "RECALL",
    sub: "EXACT · FUZZY · VEC",
    body: "Three tiers cascading. Each token finds its OD / Intent / Keyword anchor.",
  },
  {
    label: "INTENT",
    sub: "fill parameters",
    body: "LLM picks one Intent. Supplies parameters. Cannot freely write SQL.",
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
];

/**
 * Section 3 — the runtime flow. Six labeled tiles in a horizontal scroll on
 * narrow viewports, a six-up grid on wide ones. Industrial: square tiles,
 * monospace labels, accent dot to separate label and sub-label.
 */
export function SectionFlow() {
  return (
    <section className="border-b border-border bg-canvas">
      <div className="mx-auto max-w-[1600px] px-6 py-28">
        <Reveal>
          <div className="mb-12 flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-ghost">
              ▼// 03
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-soft">
              the runtime
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mb-16 max-w-[920px] font-sans text-[clamp(2rem,4.5vw,3.75rem)] font-semibold leading-tight tracking-tight text-ink">
            What happens when someone asks a question.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {steps.map((s, i) => (
            <Reveal key={s.label} delay={0.05 + i * 0.04}>
              <div className="flex h-full flex-col bg-canvas p-6 hover:bg-canvas-alt">
                <div className="mb-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-text-ghost">
                  <span className="inline-block size-1.5 bg-accent" />
                  step {i + 1}
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
            <span className="text-accent">Tokenization and recall are
              deterministic backend code, not LLM calls.</span>{" "}
            The LLM is a constrained executor — it picks from recall context,
            fills parameters, calls tools. It does not invent. It does not
            improvise.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
