import { notFound } from "next/navigation";
import { blogCatalog, loadDocument } from "@/lib/content";
import { DocShell } from "@/components/site/DocShell";
import { EmbeddedVideo } from "@/components/landing/EmbeddedVideo";
import { pageAlternates } from "@/lib/seo";

export function generateStaticParams() {
  return blogCatalog.zh.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = blogCatalog.zh.find((e) => e.slug === slug);
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.subtitle,
    alternates: pageAlternates({ enPath: `/blog/${slug}`, lang: "zh" }),
  };
}

export default async function BlogPostZh({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = blogCatalog.zh.find((e) => e.slug === slug);
  if (!meta) notFound();
  const { html, toc } = loadDocument("zh", "blog", slug);
  const topSlot =
    slug === "design-philosophy" ? <EmbeddedVideo lang="zh" /> : undefined;
  return (
    <DocShell
      sectionLabel={`博客 / ${slug}`}
      backHref="/zh/blog/"
      backLabel="返回博客列表"
      title={meta.title}
      subtitle={meta.subtitle}
      html={html}
      toc={toc}
      lang="zh"
      topSlot={topSlot}
    />
  );
}
