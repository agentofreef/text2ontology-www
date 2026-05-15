import { loadAndRender } from "@/lib/content";
import { DocShell } from "@/components/site/DocShell";

export const metadata = {
  title: "宣言 —— 本体先于查询",
  description:
    "整套 thesis:LLM 驱动的数据分析应该往组织维护的 intent 模板里填参数。为什么本体先于查询、为什么有界错误、为什么 Resolution 而不是 Discovery。",
};

export default function ManifestoPageZh() {
  const html = loadAndRender("zh", "manifesto", "manifesto");
  return (
    <DocShell
      sectionLabel="宣言"
      backHref="/zh/"
      backLabel="返回首页"
      title="本体先于查询"
      subtitle="整套 thesis。为什么 LLM 驱动的数据分析应该往组织维护的 intent 模板里填参数 —— 以及这样换来什么。"
      html={html}
    />
  );
}
