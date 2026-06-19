#!/usr/bin/env node
/**
 * Generate RSS 2.0 feeds at build time, one per locale.
 *
 * Reads:    content/{en,zh}/blog/*.md
 * Writes:   public/rss.xml  +  public/zh/rss.xml
 *
 * Static export copies `public/` into `out/` verbatim, so /rss.xml and
 * /zh/rss.xml ship as plain files that any RSS reader can poll.
 *
 * Item order is taken from blogCatalog in lib/content.ts — kept in sync by
 * hand here so this script stays plain ESM with no TS / next runtime deps.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(__filename), "..");
const SITE = "https://text2ontology.com";
const AUTHOR_NAME = "AgentOfReef";
const AUTHOR_EMAIL = "redeemer@vip.163.com";

// Slug order must match blogCatalog in lib/content.ts.
const SLUGS = [
  "ontology-as-law",
  "no-one-builds-an-ontology-alone",
  "design-philosophy",
  "responsibility-as-moat",
  "ai-agentic-illusion",
  "business-ontology-engineer",
];

const TITLES = {
  en: {
    "ontology-as-law": "Ontology Is Law",
    "no-one-builds-an-ontology-alone": "No One Builds an Ontology Alone",
    "design-philosophy": "Design Philosophy",
    "responsibility-as-moat": "Responsibility as Moat",
    "ai-agentic-illusion": "The AI Agentic Illusion",
    "business-ontology-engineer": "Business Ontology Engineer",
  },
  zh: {
    "ontology-as-law": "本体即法律",
    "no-one-builds-an-ontology-alone": "没有人能独自建成一座本体",
    "design-philosophy": "设计哲学",
    "responsibility-as-moat": "责任即利润率",
    "ai-agentic-illusion": "AI Agentic 错觉",
    "business-ontology-engineer": "业务本体工程师",
  },
};

const FEED_META = {
  en: {
    title: "text2ontology — Blog",
    description:
      "Long-form thinking on AI / data / ontology. Architecture, commercial thesis, critique of mainstream Agentic Data Analyst.",
    language: "en-us",
    pathPrefix: "/blog",
  },
  zh: {
    title: "text2ontology — 博客",
    description:
      "关于 AI / 数据 / 本体的长文。架构、商业 thesis、对主流 Agentic Data Analyst 的反驳。",
    language: "zh-cn",
    pathPrefix: "/zh/blog",
  },
};

/** Strip markdown formatting to plain text for <description>. */
function plainExcerpt(md, limit = 320) {
  const stripped = md
    // strip front-matter
    .replace(/^---[\s\S]*?---\s*/m, "")
    // strip code fences
    .replace(/```[\s\S]*?```/g, "")
    // strip headings
    .replace(/^#{1,6}\s+.*$/gm, "")
    // strip blockquotes
    .replace(/^>\s?/gm, "")
    // strip emphasis / bold
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    // strip inline code
    .replace(/`([^`]+)`/g, "$1")
    // strip links [text](url) -> text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    // tables / hr / images — drop entire lines
    .replace(/^\|.*$/gm, "")
    .replace(/^-{3,}$/gm, "")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    // collapse whitespace
    .replace(/\s+/g, " ")
    .trim();
  return stripped.length > limit ? stripped.slice(0, limit) + "…" : stripped;
}

function xmlEscape(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildFeed(lang) {
  const meta = FEED_META[lang];
  const now = new Date().toUTCString();
  const items = SLUGS.map((slug) => {
    const file = path.join(ROOT, "content", lang, "blog", `${slug}.md`);
    const md = fs.readFileSync(file, "utf8");
    const link = `${SITE}${meta.pathPrefix}/${slug}/`;
    const title = TITLES[lang][slug];
    const description = plainExcerpt(md);
    // Use file mtime as pubDate. Good-enough proxy until a frontmatter
    // date field is added per post.
    const pubDate = new Date(fs.statSync(file).mtime).toUTCString();
    return `    <item>
      <title>${xmlEscape(title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${xmlEscape(description)}</description>
    </item>`;
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(meta.title)}</title>
    <link>${SITE}${meta.pathPrefix}/</link>
    <atom:link href="${SITE}${lang === "zh" ? "/zh/rss.xml" : "/rss.xml"}" rel="self" type="application/rss+xml" />
    <description>${xmlEscape(meta.description)}</description>
    <language>${meta.language}</language>
    <lastBuildDate>${now}</lastBuildDate>
    <managingEditor>${AUTHOR_EMAIL} (${AUTHOR_NAME})</managingEditor>
    <webMaster>${AUTHOR_EMAIL} (${AUTHOR_NAME})</webMaster>
${items}
  </channel>
</rss>
`;
}

function write(rel, content) {
  const full = path.join(ROOT, "public", rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content);
  console.log(`  ✓ wrote public/${rel} (${Buffer.byteLength(content)} bytes)`);
}

console.log("Generating RSS feeds…");
write("rss.xml", buildFeed("en"));
write("zh/rss.xml", buildFeed("zh"));
console.log("Done.");
