"use client";

import { Reveal } from "./Reveal";

/**
 * Section 1 — "the problem". Big monospace prose, two columns at lg+, single
 * column on mobile. Pulls directly from the manifesto's framing.
 */
export function SectionProblem() {
  return (
    <section className="border-b border-border bg-canvas">
      <div className="mx-auto max-w-[1600px] px-6 py-28">
        <Reveal>
          <div className="mb-12 flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-ghost">
              ▼// 01
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-soft">
              the problem
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="cli-prefix max-w-[920px] font-sans text-[clamp(2rem,4.5vw,3.75rem)] font-semibold leading-tight tracking-tight text-ink">
            Schema doesn&apos;t know what your business <em className="not-italic text-accent">means</em>.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <Reveal delay={0.1}>
            <p className="font-mono text-base leading-relaxed text-text-soft">
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
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="font-mono text-base leading-relaxed text-text-soft">
              It doesn&apos;t know the Q1 cut-off is the 14th, not the 15th. It
              doesn&apos;t know which customers got misclassified after the
              2025 migration. Those things live in people&apos;s heads, in
              audit history, in exception lists nobody wrote down — and an LLM
              staring at columns alone can&apos;t recover them.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-20 max-w-[1100px] border-l-2 border-accent bg-canvas-alt px-8 py-10">
            <p className="font-sans text-2xl font-medium leading-snug text-ink md:text-3xl">
              The shape of this project is the inverse of the usual pitch:{" "}
              <span className="text-accent">
                the organization slowly accumulates a curated ontology, and the
                AI just reads it.
              </span>{" "}
              Not auto-learning.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
