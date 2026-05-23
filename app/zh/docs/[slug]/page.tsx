import { notFound } from "next/navigation";
import { loadDocument } from "@/lib/content";
import { DocsShell } from "@/components/site/DocsShell";
import { RoleGuide } from "@/components/site/RoleGuide";
import { findDoc, docsOrder } from "@/lib/docs-nav";
import { pageAlternates } from "@/lib/seo";

const LANG = "zh" as const;

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

export default async function DocsPageZh({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = findDoc(LANG, slug);
  if (!meta) notFound();
  const { html, toc } = loadDocument(LANG, "docs", slug);
  const belowContent =
    slug === "workflow" ? <RoleGuide key="role-guide" lang={LANG} /> : undefined;
  return (
    <DocsShell
      lang={LANG}
      basePath="/zh/docs"
      slug={slug}
      html={html}
      toc={toc}
      belowContent={belowContent}
    />
  );
}
