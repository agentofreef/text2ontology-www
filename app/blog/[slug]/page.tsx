import { notFound } from "next/navigation";
import { blogCatalog, loadAndRender } from "@/lib/content";
import { DocShell } from "@/components/site/DocShell";

export function generateStaticParams() {
  return blogCatalog.en.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = blogCatalog.en.find((e) => e.slug === slug);
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.subtitle,
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = blogCatalog.en.find((e) => e.slug === slug);
  if (!meta) notFound();
  const html = loadAndRender("en", "blog", slug);
  return (
    <DocShell
      sectionLabel={`blog / ${slug}`}
      backHref="/blog/"
      backLabel="All posts"
      title={meta.title}
      subtitle={meta.subtitle}
      html={html}
      lang="en"
    />
  );
}
