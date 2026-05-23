"use client";

import { useState } from "react";
import { Briefcase, Wrench } from "lucide-react";
import type { DocLang } from "@/lib/docs-nav";
import { cn } from "@/lib/cn";

/**
 * Interactive role guide for the Setup & Collaboration page. A two-way toggle
 * (business person / technical person) reveals what each role has to figure
 * out, and how the technical side supports the business side. Industrial
 * styling to match the docs shell — square edges, hard borders, mono labels.
 */

type Role = "business" | "tech";

interface Item {
  lead: string;
  body: string;
}

const content: Record<
  DocLang,
  {
    heading: string;
    sub: string;
    tabs: Record<Role, string>;
    blurb: Record<Role, string>;
    items: Record<Role, Item[]>;
  }
> = {
  en: {
    heading: "Who figures out what",
    sub: "Step 2 is a conversation. Toggle the role to see what it owns.",
    tabs: { business: "Business person", tech: "Technical person" },
    blurb: {
      business:
        "You own meaning. None of this requires SQL — it requires writing down the consensus that currently lives only in people's heads.",
      tech:
        "You own the data plumbing. Your job is to make the business person's meaning executable — and to push back when a definition is missing.",
    },
    items: {
      business: [
        {
          lead: "What this scenario actually analyzes",
          body: "Which questions do you need answered that you can't get today? Write them down — they become your question set.",
        },
        {
          lead: "Which business concepts exist",
          body: "Think in business objects, not tables: Order, Customer, Product, Profitability… each becomes an ontology (OD).",
        },
        {
          lead: "Each concept's dimensions",
          body: "What do you slice by? An Order has quantity, geo, order date, status… these become the OD's properties.",
        },
        {
          lead: "How concepts relate",
          body: "Order ↔ Customer (who placed it), etc. These become Links.",
        },
        {
          lead: "What each concept and dimension MEANS",
          body: "In plain language: \"early order\" = which status? \"core customer\" = which field? where is the Q1 cut-off? At runtime these descriptions act as the Agent's prompt.",
        },
        {
          lead: "What counts as a correct answer",
          body: "For a class of question, what should it return under your organization's consensus? That's the ground-truth standard for the question set.",
        },
      ],
      tech: [
        {
          lead: "Connect the data source",
          body: "PBIX / PBIT / Excel / Postgres / SQLite via collector-server, until the source reads `ready`.",
        },
        {
          lead: "Turn each concept into a table + semantic_sql",
          body: "Each OD maps to one table described by one `semantic_sql` (the \"describe SQL\"), which may span many physical tables.",
        },
        {
          lead: "Map dimensions and relationships",
          body: "Dimensions → columns; relationships → primary/foreign keys (the join keys behind Links).",
        },
        {
          lead: "Flag semantics-free columns as Machine Code",
          body: "Machine codes, timestamps, phone numbers carry no business meaning — mark them so they don't pollute recall.",
        },
        {
          lead: "Fill in the descriptions the business side wrote",
          body: "Put the natural-language meaning onto each OD and column. \"Column names tell the machine; descriptions tell the AI.\"",
        },
        {
          lead: "Run the question set and walk the debug loop",
          body: "Load it, run it, read the tokenization first, then OD → description → table / SQL / keys.",
        },
        {
          lead: "When the OD is wrong or the numbers are off, go back to business",
          body: "Don't guess. A wrong OD usually means a vague description; wrong numbers usually mean a caliber or join issue — confirm the definition with the business side.",
        },
      ],
    },
  },
  zh: {
    heading: "谁该搞清楚什么",
    sub: "第 2 步是一次对话。切换角色,看各自负责什么。",
    tabs: { business: "业务人员", tech: "技术人员" },
    blurb: {
      business:
        "你负责『意义』。这些都不需要写 SQL——需要的是把当前只活在人脑子里的共识写下来。",
      tech:
        "你负责『数据管道』。你的活是把业务人员的意义变得可执行——并在定义缺失时把问题推回去。",
    },
    items: {
      business: [
        {
          lead: "这个场景到底要分析什么",
          body: "你想从 AI 分析里得到什么是今天得不到的?把这些问题写下来——它们就是你的问题集。",
        },
        {
          lead: "有哪些业务概念",
          body: "以业务对象去想,而不是照搬表:订单、客户、产品、盈利……每一个会变成一个本体(OD)。",
        },
        {
          lead: "每个概念有哪些维度",
          body: "你按什么切分?订单有 数量、地区、下单日期、状态……这些会变成 OD 的属性。",
        },
        {
          lead: "概念之间什么关系",
          body: "订单 ↔ 客户(谁下的)等等。这些会变成 Link。",
        },
        {
          lead: "每个概念和维度到底是什么意思",
          body: "用大白话:『早单』= 哪个状态?『核心客户』= 哪个字段?Q1 截止点在哪?运行时,这些描述就相当于 Agent 的提示词。",
        },
        {
          lead: "什么算正确答案",
          body: "对一类提问,组织共识下应该得到什么?这就是问题集的事实标准。",
        },
      ],
      tech: [
        {
          lead: "连接数据源",
          body: "PBIX / PBIT / Excel / Postgres / SQLite,经 collector-server,直到数据源状态变 `ready`。",
        },
        {
          lead: "把每个概念落成一张表 + semantic_sql",
          body: "每个 OD 对应一张表,由一条 `semantic_sql`(描述 SQL)描述,这条 SQL 可以横跨多张物理表。",
        },
        {
          lead: "映射维度和关系",
          body: "维度 → 列;关系 → 主外键(Link 背后的 join key)。",
        },
        {
          lead: "给无语义列标 Machine Code",
          body: "机器码、时间戳、手机号不承载业务含义——标上,避免污染召回。",
        },
        {
          lead: "把业务人员写的描述填进去",
          body: "把自然语言含义填到每个 OD 和列上。『列名告诉机器,描述告诉 AI』。",
        },
        {
          lead: "灌问题集、跑、走调试循环",
          body: "灌进去、跑起来,先读分词,再 OD → 描述 → 表 / SQL / 主外键。",
        },
        {
          lead: "OD 选错或数不对时,回去找业务",
          body: "别自己猜。OD 错通常是描述含糊;数不对通常是口径或连接问题——回去和业务确认定义。",
        },
      ],
    },
  },
};

export function RoleGuide({ lang }: { lang: DocLang }) {
  const [role, setRole] = useState<Role>("business");
  const c = content[lang];
  const Icon = role === "business" ? Briefcase : Wrench;

  return (
    <section className="mt-14 border-2 border-ink">
      <div className="border-b-2 border-ink bg-canvas-alt px-5 py-4">
        <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.22em] text-text-ghost">
          ▼// {lang === "zh" ? "角色指南" : "role guide"}
        </div>
        <h3 className="font-sans text-xl font-semibold tracking-tight text-ink">
          {c.heading}
        </h3>
        <p className="mt-1 font-mono text-xs text-text-soft">{c.sub}</p>
      </div>

      {/* Toggle */}
      <div className="flex border-b-2 border-ink">
        {(["business", "tech"] as Role[]).map((r) => {
          const active = r === role;
          const TabIcon = r === "business" ? Briefcase : Wrench;
          return (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 px-4 py-3 font-mono text-xs uppercase tracking-[0.14em] transition-colors",
                r === "business" ? "border-r-2 border-ink" : "",
                active
                  ? "bg-ink text-canvas"
                  : "bg-canvas text-text-soft hover:bg-canvas-alt hover:text-ink",
              )}
            >
              <TabIcon className="size-3.5" />
              {c.tabs[r]}
            </button>
          );
        })}
      </div>

      <div className="px-5 py-6">
        <div className="mb-6 flex items-start gap-3 border-l-2 border-accent bg-canvas-alt px-4 py-3">
          <Icon className="mt-0.5 size-4 shrink-0 text-accent" />
          <p className="font-mono text-[13px] leading-relaxed text-text">
            {c.blurb[role]}
          </p>
        </div>

        <ol className="space-y-4">
          {c.items[role].map((item, i) => (
            <li key={i} className="flex gap-4">
              <span className="shrink-0 font-mono text-sm font-bold text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="font-sans text-[15px] font-semibold text-ink">
                  {item.lead}
                </div>
                <p className="mt-0.5 font-mono text-[13px] leading-relaxed text-text-soft">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
