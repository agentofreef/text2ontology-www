"use client";

import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/site/icons";
import Link from "next/link";
import { Reveal } from "./Reveal";
import type { Lang } from "./Hero";

const t = {
  en: {
    num: "05",
    label: "start",
    titleA: "Quick start.",
    titleB: "Five commands.",
    titleC: "Five minutes.",
    body: (
      <>
        Schema auto-applies on first start. Default admin is{" "}
        <code className="bg-canvas-alt px-1 py-0.5 text-text">
          admin / admin
        </code>{" "}
        for local trial — rotate before exposing the instance beyond
        localhost.
      </>
    ),
    ctaGithub: "GitHub",
    ctaDocs: "Read the Docs →",
    filename: "// quick-start.sh",
    comments: {
      clone: "# 1. clone",
      config: "# 2. configure (defaults work; rotate secrets before deploy)",
      start: "# 3. start everything (schema auto-applies, ~1-3 min first time)",
      health: "# 4. verify all 7 services are healthy",
      open: "# 5. open",
    },
  },
  zh: {
    num: "05",
    label: "开始",
    titleA: "快速开始。",
    titleB: "五条命令。",
    titleC: "五分钟。",
    body: (
      <>
        Schema 首次启动自动 apply。默认管理员账号{" "}
        <code className="bg-canvas-alt px-1 py-0.5 text-text">
          admin / admin
        </code>{" "}
        仅供本地试用 —— 暴露到 localhost 之外前请轮换密码。
      </>
    ),
    ctaGithub: "GitHub",
    ctaDocs: "阅读文档 →",
    filename: "// quick-start.sh",
    comments: {
      clone: "# 1. 克隆",
      config: "# 2. 配置(默认值能跑通;部署前轮换密钥)",
      start: "# 3. 启动全套(schema 自动 apply,首次 1-3 分钟)",
      health: "# 4. 验证 7 个服务都健康",
      open: "# 5. 打开",
    },
  },
};

export function SectionStart({ lang }: { lang: Lang }) {
  const c = t[lang];
  return (
    <section className="border-b border-border bg-canvas">
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

        <div className="grid gap-8 md:gap-12 lg:grid-cols-2 lg:items-start">
          <Reveal delay={0.05}>
            <h2 className="max-w-[600px] font-sans text-[clamp(2rem,4.5vw,3.75rem)] font-semibold leading-tight tracking-tight text-ink">
              {c.titleA}
              <br />
              {c.titleB}
              <br />
              <span className="text-accent">{c.titleC}</span>
            </h2>

            <p className="mt-8 max-w-[520px] font-mono text-sm leading-relaxed text-text-soft">
              {c.body}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="https://github.com/agentofreef/text2ontology"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border-2 border-ink bg-ink px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-canvas hover:bg-accent hover:border-accent"
              >
                <GithubIcon className="size-3.5" />
                {c.ctaGithub}
                <ArrowUpRight className="size-3" />
              </a>
              <Link
                href={lang === "zh" ? "/zh/docs/" : "/docs/"}
                className="border-2 border-ink bg-canvas px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-ink hover:bg-ink hover:text-canvas"
              >
                {c.ctaDocs}
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="overflow-hidden border-2 border-ink bg-ink">
              <div className="flex items-center justify-between border-b border-border-strong/30 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-text-ghost">
                <span>{c.filename}</span>
                <span>bash</span>
              </div>
              <pre className="overflow-x-auto px-4 py-5 font-mono text-xs leading-relaxed text-canvas">
                <code>
                  <span className="text-text-ghost">{c.comments.clone}</span>
                  {"\n"}git clone https://github.com/agentofreef/text2ontology
                  {"\n"}cd text2ontology{"\n"}
                  {"\n"}
                  <span className="text-text-ghost">{c.comments.config}</span>
                  {"\n"}cp .env.shared.example .env.shared
                  {"\n"}
                  {"\n"}
                  <span className="text-text-ghost">{c.comments.start}</span>
                  {"\n"}docker compose --env-file .env.shared{" "}
                  <span className="text-accent">up -d</span>
                  {"\n"}
                  {"\n"}
                  <span className="text-text-ghost">{c.comments.health}</span>
                  {"\n"}for p in 18080 18090 18092 18093 18094 18095 18096; do
                  {"\n"}{"  "}curl -fsS localhost:$p/healthz
                  {"\n"}done
                  {"\n"}
                  {"\n"}
                  <span className="text-text-ghost">{c.comments.open}</span>
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
