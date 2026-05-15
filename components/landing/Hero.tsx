"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { GithubIcon } from "@/components/site/icons";
import Link from "next/link";
import { OntologyMesh } from "./OntologyMesh";

/**
 * Full-viewport hero. Three pieces:
 *   1. Background — slow-rotating wireframe ontology mesh (3D, R3F)
 *   2. Foreground text — large headline + sub-headline + CTAs
 *   3. Industrial chrome — top-left status block, bottom scroll indicator
 *
 * Industrial rules respected: square borders, monospace labels, no shadows,
 * linear motion. Framer Motion is constrained to fade + lift, not spring.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden border-b-2 border-ink bg-canvas">
      {/* Top hairline + corner registration marks — industrial chrome. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-ink" />
      <div className="pointer-events-none absolute left-0 top-0 size-4 border-l-2 border-t-2 border-ink" />
      <div className="pointer-events-none absolute right-0 top-0 size-4 border-r-2 border-t-2 border-ink" />

      <OntologyMesh />

      <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-20 pt-32">
        {/* Eyebrow status block — sits above the title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "linear" }}
          className="mb-8 flex items-center gap-3"
        >
          <span className="status-block">// A Reference Implementation</span>
          <span className="status-block status-block-accent">v0.1 · OSS</span>
        </motion.div>

        {/* Title — Space Grotesk, very large, square */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "linear" }}
          className="font-sans text-[clamp(3rem,9vw,8rem)] font-bold leading-[0.95] tracking-tight text-ink"
        >
          Ontology
          <br />
          before query.
        </motion.h1>

        {/* Two-rule divider, industrial */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: "linear", delay: 0.4 }}
          className="my-10 h-0.5 w-16 origin-left bg-ink"
        />

        {/* Sub-headline — JetBrains Mono, mid weight */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "linear" }}
          className="max-w-[680px] font-sans text-xl text-text leading-relaxed md:text-2xl"
        >
          Build the meaning <span className="text-accent">before</span> you analyze.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7, ease: "linear" }}
          className="mt-6 max-w-[640px] font-mono text-sm leading-relaxed text-text-soft"
        >
          LLM-driven analysis should not rely on the LLM freely generating
          executable queries (SQL / DAX / Pandas / any DSL). The LLM fills
          parameters into intent templates the{" "}
          <em className="not-italic text-ink">organization</em> maintains. A
          deterministic compiler does the rest.
        </motion.p>

        {/* CTAs — square buttons, hard borders */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.9, ease: "linear" }}
          className="mt-12 flex flex-wrap items-center gap-3"
        >
          <Link
            href="/manifesto/"
            className="border-2 border-ink bg-ink px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-canvas hover:bg-accent hover:border-accent"
          >
            Read the Manifesto →
          </Link>
          <a
            href="https://github.com/agentofreef/text2ontology"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border-2 border-ink bg-canvas px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-canvas"
          >
            <GithubIcon className="size-3.5" />
            GitHub
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator — industrial monospace tick at the bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.2, ease: "linear" }}
        className="relative mx-auto w-full max-w-[1600px] px-6 pb-6"
      >
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-text-ghost">
          <span>// scroll to read</span>
          <span className="flex items-center gap-2">
            <ArrowDown className="size-3" />
            Continue
          </span>
        </div>
      </motion.div>
    </section>
  );
}
