import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

export type Lang = "en" | "zh";
export type Section = "manifesto" | "docs" | "blog";

const CONTENT_ROOT = path.join(process.cwd(), "content");

marked.setOptions({
  gfm: true,
  breaks: false,
});

export function readMarkdown(lang: Lang, section: Section, slug: string): string {
  const file = path.join(CONTENT_ROOT, lang, section, `${slug}.md`);
  return fs.readFileSync(file, "utf8");
}

export function renderMarkdown(md: string): string {
  return marked.parse(md, { async: false }) as string;
}

export function loadAndRender(lang: Lang, section: Section, slug: string): string {
  return renderMarkdown(readMarkdown(lang, section, slug));
}

export function listSlugs(lang: Lang, section: Section): string[] {
  const dir = path.join(CONTENT_ROOT, lang, section);
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export interface DocMeta {
  slug: string;
  title: string;
  subtitle: string;
}

export const docsCatalog: Record<Lang, DocMeta[]> = {
  en: [],
  zh: [],
};

export const blogCatalog: Record<Lang, DocMeta[]> = {
  en: [
    {
      slug: "design-philosophy",
      title: "Design Philosophy",
      subtitle: "Architecture deep dive: three-layer ontology lifecycle, two-level query architecture, recall in depth.",
    },
    {
      slug: "responsibility-as-moat",
      title: "Responsibility as Moat",
      subtitle: "Why AI enterprise services' real moat is who carries the responsibility, not who has the bigger model.",
    },
    {
      slug: "ai-agentic-illusion",
      title: "The AI Agentic Illusion",
      subtitle: "Five layers of why \"AI Agentic Data Analyst\" as a product category is the wrong shape.",
    },
    {
      slug: "business-ontology-engineer",
      title: "Business Ontology Engineer",
      subtitle: "A new role that is emerging — what it does, why it isn't an existing job, where it lands first.",
    },
  ],
  zh: [
    {
      slug: "design-philosophy",
      title: "设计哲学",
      subtitle: "架构深度文:三层本体生命周期、两层查询架构、召回机制深度拆解。",
    },
    {
      slug: "responsibility-as-moat",
      title: "责任即利润率",
      subtitle: "为什么 AI 企业服务的真正护城河是谁承担责任,而不是谁的模型更大。",
    },
    {
      slug: "ai-agentic-illusion",
      title: "AI Agentic 错觉",
      subtitle: "为什么 \"AI Agentic Data Analyst\" 这个产品类目从概念框架开始就是错的 —— 五层拆解。",
    },
    {
      slug: "business-ontology-engineer",
      title: "业务本体工程师",
      subtitle: "一个即将出现的新职业 —— 它在干什么、为什么不是任何现有 title、会在哪种公司里先出现。",
    },
  ],
};
