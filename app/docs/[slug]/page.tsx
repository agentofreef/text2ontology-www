import { notFound } from "next/navigation";
import { loadDocument } from "@/lib/content";
import { DocsShell } from "@/components/site/DocsShell";
import { findDoc, docsOrder } from "@/lib/docs-nav";
import { pageAlternates } from "@/lib/seo";

const LANG = "en" as const;

export function generateStaticParams() {
  return docsOrder(LANG)
    .filter((slug) => slug !== "introduction")
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = findDoc(LANG, slug);
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.subtitle,
    alternates: pageAlternates({ enPath: `/docs/${slug}`, lang: LANG }),
  };
}

export default async function DocsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = findDoc(LANG, slug);
  if (!meta) notFound();
  const { html, toc } = loadDocument(LANG, "docs", slug);
  return (
    <DocsShell lang={LANG} basePath="/docs" slug={slug} html={html} toc={toc} />
  );
}
