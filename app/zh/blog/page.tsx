import { blogCatalog } from "@/lib/content";
import { IndexShell } from "@/components/site/IndexShell";
import { EmbeddedVideo } from "@/components/landing/EmbeddedVideo";
import { pageAlternates } from "@/lib/seo";

export const metadata = {
  title: "博客",
  description: "关于 AI / 数据 / 本体的长文 —— 商业 thesis、对主流 Agentic Data Analyst 的反驳、即将出现的业务本体工程师角色。",
  alternates: pageAlternates({ enPath: "/blog", lang: "zh" }),
};

export default function BlogIndexZh() {
  return (
    <IndexShell
      sectionLabel="博客"
      title="博客"
      lede="关于 AI / 数据 / 本体的长文。不是产品更新 —— 底层论证。所有内容 CC-BY 4.0。"
      entries={blogCatalog.zh}
      basePath="/zh/blog"
      backHref="/zh/"
      backLabel="返回首页"
      topSlot={<EmbeddedVideo lang="zh" variant="architecture" />}
    />
  );
}
