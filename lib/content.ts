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

export interface TocItem {
  level: number;
  text: string;
  id: string;
}

/** Strip the handful of inline markdown markers a heading might carry. */
function plainText(s: string): string {
  return s.replace(/[*_`]/g, "").trim();
}

/** Build a URL-safe, mostly-readable anchor id from heading text (keeps CJK). */
function slugify(text: string): string {
  return (
    plainText(text)
      .toLowerCase()
      .replace(/[^\w一-鿿]+/g, "-")
      .replace(/^-+|-+$/g, "") || "section"
  );
}

/** Pull an ordered h2/h3 outline out of a markdown document. */
export function extractToc(md: string): TocItem[] {
  const seen = new Map<string, number>();
  const items: TocItem[] = [];
  for (const token of marked.lexer(md)) {
    if (token.type !== "heading" || (token.depth !== 2 && token.depth !== 3)) {
      continue;
    }
    let id = slugify(token.text);
    const n = seen.get(id) ?? 0;
    seen.set(id, n + 1);
    if (n > 0) id = `${id}-${n}`;
    items.push({ level: token.depth, text: plainText(token.text), id });
  }
  return items;
}

/** Inject the extracted anchor ids back onto the rendered h2/h3 tags, in order. */
function injectHeadingIds(html: string, toc: TocItem[]): string {
  let i = 0;
  return html.replace(/<h([23])>/g, (whole, level: string) => {
    const item = toc[i];
    i += 1;
    return item && String(item.level) === level
      ? `<h${level} id="${item.id}">`
      : whole;
  });
}

/**
 * The essay/manifesto markdown files are standalone-readable: they open with
 * `# Title`, an optional `> dek` blockquote, and a `---` rule. On the web,
 * DocShell already renders the title + subtitle from the catalog, so this
 * drops that opening block to avoid showing the title twice. The files stay
 * portable — only the web render skips the redundant header.
 */
function stripDocHeader(md: string): string {
  const lines = md.split("\n");
  let i = 0;
  const skipBlank = () => {
    while (i < lines.length && lines[i].trim() === "") i += 1;
  };
  skipBlank();
  if (i >= lines.length || !/^#\s/.test(lines[i])) return md;
  i += 1; // the H1 title
  skipBlank();
  while (i < lines.length && /^>/.test(lines[i])) i += 1; // optional dek
  skipBlank();
  if (i < lines.length && /^-{3,}\s*$/.test(lines[i])) i += 1; // optional rule
  return lines.slice(i).join("\n");
}

/**
 * Wrap every `<table>` in a horizontal-scroll div so wide tables don't blow
 * out the page on narrow viewports. The wrapper carries `data-table-wrap`
 * so Prose can style it without grepping for a class string.
 */
function wrapTables(html: string): string {
  return html.replace(
    /(<table[\s\S]*?<\/table>)/g,
    '<div data-table-wrap>$1</div>',
  );
}

export function renderMarkdown(md: string): string {
  const body = stripDocHeader(md);
  const html = marked.parse(body, { async: false }) as string;
  return wrapTables(injectHeadingIds(html, extractToc(body)));
}

export function loadAndRender(lang: Lang, section: Section, slug: string): string {
  return renderMarkdown(readMarkdown(lang, section, slug));
}

/** Load a document and its table-of-contents in one pass. */
export function loadDocument(
  lang: Lang,
  section: Section,
  slug: string,
): { html: string; toc: TocItem[] } {
  const md = readMarkdown(lang, section, slug);
  return { html: renderMarkdown(md), toc: extractToc(md) };
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
  /** Short tag shown above the title (e.g., "war story", "thesis"). Replaces the auto-number. */
  kicker?: string;
  /** One-line metadata strip (e.g., "2026-05 · 4500 words · 12 min"). */
  meta?: string;
  /** When true, the entry is pulled to the top of the index and rendered full-width. */
  featured?: boolean;
}

export const docsCatalog: Record<Lang, DocMeta[]> = {
  en: [],
  zh: [],
};

export const blogCatalog: Record<Lang, DocMeta[]> = {
  en: [
    {
      slug: "governance-is-full-stack",
      title: "Governance Is a Full-Stack Property",
      subtitle: "Two claims: why full-stack is necessary (\"every error has an address\" is a property of the whole chain, not a feature of the query layer), and why it beats Text-to-SQL and BI tools — by owning the two ends everyone else outsources: writing the oracle, and running it.",
      kicker: "thesis",
      featured: true,
    },
    {
      slug: "design-philosophy",
      title: "Design Philosophy",
      subtitle: "Architecture deep dive: three-layer ontology lifecycle, two-level query architecture, recall in depth.",
      kicker: "thesis",
    },
    {
      slug: "responsibility-as-moat",
      title: "Responsibility as Moat",
      subtitle: "Why AI enterprise services' real moat is who carries the responsibility, not who has the bigger model.",
      kicker: "thesis",
    },
    {
      slug: "ai-agentic-illusion",
      title: "The AI Agentic Illusion",
      subtitle: "Five layers of why \"AI Agentic Data Analyst\" as a product category is the wrong shape.",
      kicker: "thesis",
    },
    {
      slug: "business-ontology-engineer",
      title: "Business Ontology Engineer",
      subtitle: "A new role that is emerging — what it does, why it isn't an existing job, where it lands first.",
      kicker: "thesis",
    },
  ],
  zh: [
    {
      slug: "governance-is-full-stack",
      title: "治理是一种全栈属性",
      subtitle: "两个论点:为什么全栈是必要的(\"每个错都有地址\"是整条链的属性,不是查询层的功能),以及为什么它赢过 Text-to-SQL 和 BI 工具——靠把别人都外包掉的两端收回来:写裁判,和跑裁判。",
      kicker: "thesis",
      featured: true,
    },
    {
      slug: "design-philosophy",
      title: "设计哲学",
      subtitle: "架构深度文:三层本体生命周期、两层查询架构、召回机制深度拆解。",
      kicker: "thesis",
    },
    {
      slug: "responsibility-as-moat",
      title: "责任即利润率",
      subtitle: "为什么 AI 企业服务的真正护城河是谁承担责任,而不是谁的模型更大。",
      kicker: "thesis",
    },
    {
      slug: "ai-agentic-illusion",
      title: "AI Agentic 错觉",
      subtitle: "为什么 \"AI Agentic Data Analyst\" 这个产品类目从概念框架开始就是错的 —— 五层拆解。",
      kicker: "thesis",
    },
    {
      slug: "business-ontology-engineer",
      title: "业务本体工程师",
      subtitle: "一个即将出现的新职业 —— 它在干什么、为什么不是任何现有 title、会在哪种公司里先出现。",
      kicker: "thesis",
    },
  ],
};
