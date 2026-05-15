import { notFound } from "next/navigation";
import { blogCatalog, loadAndRender } from "@/lib/content";
import { DocShell } from "@/components/site/DocShell";

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
  const html = loadAndRender("zh", "blog", slug);
  return (
    <DocShell
      sectionLabel={`博客 / ${slug}`}
      backHref="/zh/blog/"
      backLabel="返回博客列表"
      title={meta.title}
      subtitle={meta.subtitle}
      html={html}
      lang="zh"
    />
  );
}
