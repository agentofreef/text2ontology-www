"use client";

import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/site/icons";
import Link from "next/link";
import { Reveal } from "./Reveal";

/**
 * Final section — CTA + Quick Start code block. Mimics a terminal so the
 * "this is for real engineers" tone lands.
 */
export function SectionStart() {
  return (
    <section className="border-b border-border bg-canvas">
      <div className="mx-auto max-w-[1600px] px-6 py-28">
        <Reveal>
          <div className="mb-12 flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-ghost">
              ▼// 05
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-soft">
              start
            </span>
          </div>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <Reveal delay={0.05}>
            <h2 className="max-w-[600px] font-sans text-[clamp(2rem,4.5vw,3.75rem)] font-semibold leading-tight tracking-tight text-ink">
              Self-contained.
              <br />
              docker compose up.
              <br />
              <span className="text-accent">No external services.</span>
            </h2>

            <p className="mt-8 max-w-[520px] font-mono text-sm leading-relaxed text-text-soft">
              Postgres with pgvector, the 6 Go services, the Next.js frontend
              — all bundled. Schema auto-applies on first start. Default admin
              is{" "}
              <code className="bg-canvas-alt px-1 py-0.5 text-text">
                admin / admin
              </code>{" "}
              for local trial — rotate before exposing the instance beyond
              localhost.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="https://github.com/agentofreef/text2ontology"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border-2 border-ink bg-ink px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-canvas hover:bg-accent hover:border-accent"
              >
                <GithubIcon className="size-3.5" />
                GitHub
                <ArrowUpRight className="size-3" />
              </a>
              <Link
                href="/docs/"
                className="border-2 border-ink bg-canvas px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-canvas"
              >
                Read the Docs →
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="overflow-hidden border-2 border-ink bg-ink">
              <div className="flex items-center justify-between border-b border-border-strong/30 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-text-ghost">
                <span>// quick-start.sh</span>
                <span>bash</span>
              </div>
              <pre className="overflow-x-auto px-4 py-5 font-mono text-xs leading-relaxed text-canvas">
                <code>
                  <span className="text-text-ghost"># 1. clone</span>
                  {"\n"}git clone https://github.com/agentofreef/text2ontology
                  {"\n"}cd text2ontology{"\n"}
                  {"\n"}
                  <span className="text-text-ghost"># 2. configure (defaults
                    work; rotate secrets before deploy)</span>
                  {"\n"}cp .env.shared.example .env.shared
                  {"\n"}
                  {"\n"}
                  <span className="text-text-ghost"># 3. start everything
                    (schema auto-applies, ~1-3 min first time)</span>
                  {"\n"}docker compose --env-file .env.shared{" "}
                  <span className="text-accent">up -d</span>
                  {"\n"}
                  {"\n"}
                  <span className="text-text-ghost"># 4. verify all 7
                    services are healthy</span>
                  {"\n"}for p in 18080 18090 18092 18093 18094 18095 18096; do
                  {"\n"}{"  "}curl -fsS localhost:$p/healthz
                  {"\n"}done
                  {"\n"}
                  {"\n"}
                  <span className="text-text-ghost"># 5. open</span>
                  {"\n"}open http://localhost:18080
                </code>
              </pre>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
