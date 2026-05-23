import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";
import { blogCatalog } from "@/lib/content";
import { docsOrder } from "@/lib/docs-nav";
import { SITE_URL } from "@/lib/seo";

const CONTENT_ROOT = path.join(process.cwd(), "content");

/**
 * Static sitemap, prerendered to `out/sitemap.xml`. Every route in both
 * locales gets a row; lastModified for blog posts comes from the markdown
 * file mtime so RSS-style "this post changed" signals reach the index too.
 *
 * Static landing-page routes share the build timestamp — good enough until
 * a per-section frontmatter date schema lands.
 */
export const dynamic = "force-static";

function mtimeFor(rel: string): Date {
  try {
    return fs.statSync(path.join(CONTENT_ROOT, rel)).mtime;
  } catch {
    return new Date();
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const buildTime = new Date();
  const STATIC: { path: string; lastModified: Date; priority: number }[] = [
    { path: "/", lastModified: buildTime, priority: 1.0 },
    { path: "/manifesto/", lastModified: mtimeFor("en/manifesto/manifesto.md"), priority: 0.9 },
    { path: "/blog/", lastModified: buildTime, priority: 0.8 },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const r of STATIC) {
    const en = SITE_URL + r.path;
    const zh = SITE_URL + (r.path === "/" ? "/zh/" : "/zh" + r.path);
    entries.push({
      url: en,
      lastModified: r.lastModified,
      changeFrequency: "monthly",
      priority: r.priority,
      alternates: { languages: { en, "zh-CN": zh, "x-default": en } },
    });
    entries.push({
      url: zh,
      lastModified: r.lastModified,
      changeFrequency: "monthly",
      priority: r.priority,
      alternates: { languages: { en, "zh-CN": zh, "x-default": en } },
    });
  }

  for (const post of blogCatalog.en) {
    const en = `${SITE_URL}/blog/${post.slug}/`;
    const zh = `${SITE_URL}/zh/blog/${post.slug}/`;
    const lm = mtimeFor(`en/blog/${post.slug}.md`);
    entries.push({
      url: en,
      lastModified: lm,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { en, "zh-CN": zh, "x-default": en } },
    });
    entries.push({
      url: zh,
      lastModified: mtimeFor(`zh/blog/${post.slug}.md`),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { en, "zh-CN": zh, "x-default": en } },
    });
  }

  // Docs — the introduction page is the docs root (/docs/); every other page
  // is /docs/<slug>/. Both locales, lastModified from each markdown file's mtime.
  for (const slug of docsOrder("en")) {
    const sub = slug === "introduction" ? "/docs/" : `/docs/${slug}/`;
    const en = SITE_URL + sub;
    const zh = SITE_URL + "/zh" + sub;
    entries.push({
      url: en,
      lastModified: mtimeFor(`en/docs/${slug}.md`),
      changeFrequency: "monthly",
      priority: slug === "introduction" ? 0.7 : 0.6,
      alternates: { languages: { en, "zh-CN": zh, "x-default": en } },
    });
    entries.push({
      url: zh,
      lastModified: mtimeFor(`zh/docs/${slug}.md`),
      changeFrequency: "monthly",
      priority: slug === "introduction" ? 0.7 : 0.6,
      alternates: { languages: { en, "zh-CN": zh, "x-default": en } },
    });
  }

  return entries;
}
