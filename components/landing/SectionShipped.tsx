"use client";

import { Reveal } from "./Reveal";

const features = [
  {
    title: "Two agent modes",
    desc: "lakehouse (query) — for asking questions. builder (modeling) — for teaching the agent your business through interview-driven OD creation.",
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
];

/**
 * Section 4 — what's in v0.1 today. Six tiles, two rows, hard borders.
 */
export function SectionShipped() {
  return (
    <section className="border-b border-border bg-canvas-alt">
      <div className="mx-auto max-w-[1600px] px-6 py-28">
        <Reveal>
          <div className="mb-12 flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-ghost">
              ▼// 04
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-soft">
              shipped — v0.1
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mb-16 max-w-[920px] font-sans text-[clamp(2rem,4.5vw,3.75rem)] font-semibold leading-tight tracking-tight text-ink">
            What you can actually run today.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
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
