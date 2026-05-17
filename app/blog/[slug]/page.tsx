import { notFound } from "next/navigation";
import { blogCatalog, loadDocument } from "@/lib/content";
import { DocShell } from "@/components/site/DocShell";
import { EmbeddedVideo } from "@/components/landing/EmbeddedVideo";
import { pageAlternates } from "@/lib/seo";

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
    alternates: pageAlternates({ enPath: `/blog/${slug}`, lang: "en" }),
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
  const { html, toc } = loadDocument("en", "blog", slug);
  const topSlot =
    slug === "design-philosophy" ? <EmbeddedVideo lang="en" /> : undefined;
  return (
    <DocShell
      sectionLabel={`blog / ${slug}`}
      backHref="/blog/"
      backLabel="All posts"
      title={meta.title}
      subtitle={meta.subtitle}
      html={html}
      toc={toc}
      lang="en"
      topSlot={topSlot}
    />
  );
}
