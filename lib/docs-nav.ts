/**
 * Docs navigation model — the GitBook-style left-tree structure, page titles,
 * reading order, and prev/next neighbours.
 *
 * This module is PURE DATA (no `node:fs`, no `marked`) so it is safe to import
 * from the client `DocsShell` component. The actual markdown bodies are read +
 * rendered server-side via `lib/content.ts` (`loadDocument`). Keep the two in
 * sync: every slug listed in `docsGroups` must have a matching markdown file at
 * `content/<lang>/docs/<slug>.md`.
 */

export type DocLang = "en" | "zh";

export interface DocPage {
  slug: string;
  title: string;
  subtitle: string;
}

export interface DocGroup {
  label: string;
  slugs: string[];
}

/** Per-page title + subtitle, used for the sidebar, breadcrumb, metadata, and prev/next cards. */
export const docsPages: Record<DocLang, DocPage[]> = {
  en: [
    {
      slug: "introduction",
      title: "Introduction",
      subtitle:
        "What text2ontology is, the problem it solves, and the one belief that explains every design decision.",
    },
    {
      slug: "core-concepts",
      title: "Core Concepts",
      subtitle:
        "Ontology, OD, Metric, Keyword, the two agent modes, three-tier recall, and the three hard invariants.",
    },
    {
      slug: "installation",
      title: "Installation & First Boot",
      subtitle:
        "Bring the whole stack up with one command, sign in, configure an LLM, and create a project.",
    },
    {
      slug: "data-sources",
      title: "Connecting a Data Source",
      subtitle:
        "PBIX (the primary path), PBIT, Excel / CSV, Postgres, SQLite — and what happens after upload.",
    },
    {
      slug: "builder-mode",
      title: "Builder Mode: Model Your Business",
      subtitle:
        "Walk the agent through your business in plain language, review the draft ontology, and activate it.",
    },
    {
      slug: "query-mode",
      title: "Query Mode: Ask Questions",
      subtitle:
        "How a question flows to an answer, the reachability gate, and why the AI never fabricates a number.",
    },
    {
      slug: "correction-flywheel",
      title: "The Correction Flywheel",
      subtitle:
        "Every wrong answer has an address. Where to open it, fix it once, and stop seeing the same error.",
    },
    {
      slug: "interface-reference",
      title: "Interface Reference",
      subtitle: "A map of the sidebar — every page and what it is for.",
    },
    {
      slug: "production",
      title: "Production Deployment",
      subtitle:
        "Hardened single-ingress topology, strong secrets, TLS, and locking down the public port.",
    },
    {
      slug: "faq",
      title: "Before You Start",
      subtitle:
        "Honest expectations: this is not black-box magic, and four questions worth sitting with first.",
    },
  ],
  zh: [
    {
      slug: "introduction",
      title: "介绍",
      subtitle: "text2ontology 是什么、解决什么问题,以及那条解释一切设计的核心信念。",
    },
    {
      slug: "core-concepts",
      title: "核心概念",
      subtitle: "本体、OD、指标、关键词、两个 Agent 模式、三级召回,以及三条硬不变量。",
    },
    {
      slug: "installation",
      title: "安装与首次启动",
      subtitle: "一条命令拉起整套栈,登录、配置 LLM、创建项目。",
    },
    {
      slug: "data-sources",
      title: "接入数据源",
      subtitle: "PBIX(主路径)、PBIT、Excel / CSV、Postgres、SQLite——以及上传之后发生了什么。",
    },
    {
      slug: "builder-mode",
      title: "Builder 模式:为业务建模",
      subtitle: "用大白话把业务讲给 Agent,审阅草稿本体,激活它。",
    },
    {
      slug: "query-mode",
      title: "查询模式:提问",
      subtitle: "一次提问如何走到答案、任务可达器,以及为什么 AI 从不编造数字。",
    },
    {
      slug: "correction-flywheel",
      title: "纠错飞轮",
      subtitle: "每个错误都有地址。去哪打开它、修一次、不再见到同一个错。",
    },
    {
      slug: "interface-reference",
      title: "界面参考",
      subtitle: "侧边栏地图——每个页面是干什么的。",
    },
    {
      slug: "production",
      title: "生产部署",
      subtitle: "硬化的单入口拓扑、强密钥、TLS,以及锁死公开端口。",
    },
    {
      slug: "faq",
      title: "开始之前",
      subtitle: "诚实的预期:这不是黑盒魔法,以及上手前值得先想清楚的四个问题。",
    },
  ],
};

/** The sidebar tree — ordered groups of slugs. Reading order is derived from this. */
export const docsGroups: Record<DocLang, DocGroup[]> = {
  en: [
    { label: "Getting Started", slugs: ["introduction", "core-concepts", "installation"] },
    {
      label: "Using text2ontology",
      slugs: ["data-sources", "builder-mode", "query-mode", "correction-flywheel"],
    },
    { label: "Reference", slugs: ["interface-reference", "production", "faq"] },
  ],
  zh: [
    { label: "开始", slugs: ["introduction", "core-concepts", "installation"] },
    {
      label: "使用",
      slugs: ["data-sources", "builder-mode", "query-mode", "correction-flywheel"],
    },
    { label: "参考", slugs: ["interface-reference", "production", "faq"] },
  ],
};

/** Flat reading order (group order, then slug order within each group). */
export function docsOrder(lang: DocLang): string[] {
  return docsGroups[lang].flatMap((g) => g.slugs);
}

/** Resolve a slug to its title + subtitle. */
export function findDoc(lang: DocLang, slug: string): DocPage | undefined {
  return docsPages[lang].find((p) => p.slug === slug);
}

/** The group label a slug belongs to (for the breadcrumb). */
export function groupLabelFor(lang: DocLang, slug: string): string | undefined {
  return docsGroups[lang].find((g) => g.slugs.includes(slug))?.label;
}

/**
 * URL for a doc page. The first page (`introduction`) is the docs root, so it
 * lives at `${basePath}/`; every other page is `${basePath}/${slug}/`.
 * `basePath` is `/docs` (en) or `/zh/docs` (zh).
 */
export function docHref(basePath: string, slug: string): string {
  return slug === "introduction" ? `${basePath}/` : `${basePath}/${slug}/`;
}

/** Previous / next page in reading order, for the footer nav cards. */
export function docNeighbors(
  lang: DocLang,
  slug: string,
): { prev?: DocPage; next?: DocPage } {
  const order = docsOrder(lang);
  const i = order.indexOf(slug);
  if (i === -1) return {};
  const prevSlug = i > 0 ? order[i - 1] : undefined;
  const nextSlug = i < order.length - 1 ? order[i + 1] : undefined;
  return {
    prev: prevSlug ? findDoc(lang, prevSlug) : undefined,
    next: nextSlug ? findDoc(lang, nextSlug) : undefined,
  };
}
