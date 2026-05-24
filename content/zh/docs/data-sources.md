# 接入数据源

> PBIX(主路径)、PBIT、Excel / CSV、Postgres、SQLite——以及上传之后发生了什么。

---

进入 **系统 → 数据源**(`/settings/data-sources`)→ 「添加数据源」(`/settings/data-sources/add`),有 4 类:

| 类型 | 入口 | 说明 |
|---|---|---|
| **Power BI 文件** | `add/pbi` | `.pbix` 或 `.pbit`,**最常用的接入路径** |
| **文件** | `add/file` | Excel / CSV |
| **Postgres** | `add/postgres` | 镜像一个现有 PG 库 |
| **SQLite** | `add/sqlite` | 上传 SQLite 文件 |

所有接入都只经过 **collector-server** 这一个入口。接好之后,collector 会把项目指向它的 lakehouse schema,数据 + 本体落库,数据源状态变 `ready`。

**▶ 演示** —— 第 1 步:新建项目 → 向导 → 选 .pbix(约 24 秒)

<div class="doc-video">
<video controls preload="metadata" playsinline src="/demos/04-data-upload.mp4"></video>
</div>

## PBIX(主路径)与 PBIT 的关键区别

两者都在同一个上传页(`/settings/data-sources/add/pbi`),拖拽 `.pbix` / `.pbit` 即可,但**后端走两条完全不同的路**:

### `.pbix` —— 异步任务,无向导

里面是压缩的 VertiPaq 数据,需要一个**较重的 Python 子进程**解码(每个文件约 7 秒、峰值约 235MB)。所以上传只是**入队一个异步抽取任务并立即返回**——**没有向导确认步骤**。任务自己把本体填好、把数据源翻成 `ready`。上传后页面跳回数据源列表,**用状态徽章追踪进度**。

- 后端接口:`POST /connector/pbix/upload`
- collector 默认 8 个并发解码槽 + 8 个任务 worker(`COLLECTOR_PBIX_CONCURRENCY` / `COLLECTOR_JOB_WORKERS`),内存上限默认 3g。要更高吞吐就三个一起调大(并发 / 内存 / CPU)。

### `.pbit` —— 同步解析,走向导

是文本形式的 `DataModelSchema`,**就地解析**,然后进入**向导确认流程**(`/settings/data-sources/wizard?id=...`),你在向导里确认表 / 关系再落库。

- 后端接口:`POST /connector/pbit/upload`

> 一句话记忆:**PBIX = 异步任务 + 状态徽章,无向导;PBIT = 同步解析 + 向导确认。**

## 其它数据源

- **文件(Excel / CSV)**:`add/file` 直接上传。
- **Postgres**:`add/postgres`,镜像一个现有的 PG 库。
- **SQLite**:`add/sqlite`,上传 SQLite 文件。

## 接好之后

数据进来了,但本体还是「草稿级」的——下一步用 **[Builder 模式](/zh/docs/builder-mode/)** 把你的业务讲给 Agent,让它把 OD / 指标 / Link 建出来,再人工激活。
