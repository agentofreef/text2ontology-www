# 纠错飞轮

> 每个错误都有地址。去哪打开它、修一次、不再见到同一个错。

---

答错时,不要重试或换 prompt——去**对应的地址**修一次。相关页面都在侧边栏。

## 现象 → 去哪修

| 现象 | 去哪修 | 页面 |
|---|---|---|
| 分词不对 / 系统没看懂某个词 | **关键词分诊**:补缺失关键词、纠正错别名、调整指标优先级 | `知识工程 → 关键词分诊`(`/ontology/lakehouse-keyword-triage`) |
| 现有指标都覆盖不了某个分析维度 | **指标**:新建一个全新指标(度量 / 过滤 / 自动分组 / 透视) | `知识工程 → 指标`(`/ontology/lakehouse-metric-intents`) |
| 关键词本身要增删改 | **关键词** | `知识工程 → 关键词`(`/ontology/lakehouse-keywords`) |
| 想看「这句话被怎么分词、召回到了什么」 | **Token 召回**:复现召回过程,定位是哪一层(EXACT/FUZZY/VEC)、哪个 keyword | `Agent → Token 召回`(`/ontology/lakehouse-agent/token-recall`) |
| 给某次 Agent 的 token 决策打标注 | **标注** | `Agent → 标注`(`/ontology/lakehouse-agent/annotations`) |
| AI 在对话里习得的事实(OL) | **习得知识** | `Agent → 习得知识`(`/ontology/lakehouse-agent/knowledge-learned`) |
| 想批量回归测试一组问题、版本间对比 | **数据集测试**:命名测试套件,后台跑,看 run 间 diff | `Agent → 数据集测试`(`/ontology/lakehouse-agent/dataset-testing`) |

## 这是和传统 BI 最大的不同

你要 **curate(策展)、annotate(标注)、activate(激活)**。它不会十五分钟开箱即用。

但代价换来的是:**一旦一个答案被修对,它就保持对**——因为错误有地址,修在那里,同一类错误下周不会再回来。这是传统 BI 给不了的东西。

## 两条最常用的纠错路径

引用 README 的原话:

> - **关键词分诊页**是你修分词的地方——确保 LLM 看到的词,和你团队用的词是一致的。
> - **指标页**是当现有指标都覆盖不了某个分析维度时,你新增一个的地方。

## 其它工具页

- **对话历史**(`/ontology/lakehouse-agent/history`)
- **数据飞轮**(`/ontology/lakehouse-agent/flywheel`)
- SQL 组里的 **Ontology SQL**(`/ontology/sql-passthrough`)和 **Lakehouse SQL**(`/ontology/lakehouse-sql`)给进阶用户。

完整界面地图见 **[界面参考](/zh/docs/interface-reference/)**。
