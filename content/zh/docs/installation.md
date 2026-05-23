# 安装与首次启动

> 一条命令拉起整套栈,登录、配置 LLM、创建项目。

---

## 前置条件

Docker(带 `docker compose` v2+)。

## 启动整套栈

两条命令把整套栈拉起来——schema、最小权限 DB 角色、可观测栈全自动接好。本地试用默认登录 `admin / admin`。

```bash
# 1. 克隆
git clone https://github.com/agentofreef/text2ontology
cd text2ontology

# 2. 起整套栈(拉 GHCR 预构建镜像 + 应用 schema,首次约 1–3 分钟)
docker compose up -d

# 3. 验证(网关是唯一公开入口)
curl -fsS http://localhost:28080/healthz   # -> ok

# 4. 打开
open http://localhost:28080
```

不需要 `.env`,不需要任何 flag——每个密钥在 `docker-compose.yml` 里都有安全的开发默认值。

> **状态提示**:这套栈起来后 UI 是空的——**直到你接入数据**。空 UI 是正常的。

常用生命周期命令:

```bash
docker compose logs -f gateway
docker compose down            # 停止,保留数据库卷
docker compose down -v         # 停止并清空数据库卷(慎用)
git pull && docker compose pull && docker compose up -d   # 更新到最新镜像
```

Makefile 里也有等价封装:`make up` / `make down` / `make health` / `make logs SVC=agent-server` / `make db-psql`。

## 部署了什么(架构速览)

8 个镜像(网关 + 前端 + 6 个 Go 服务)+ Postgres + 可观测栈。**只有网关对外暴露端口 `28080`**,其余只在 Docker 内网可达。

```
                  浏览器
                    │
            ┌───────▼────────┐
            │  gateway :28080 │  nginx,唯一公开入口,按路径反代
            └───────┬────────┘
   ┌─────────┬──────┼───────┬──────────────┐
   ▼         ▼      ▼       ▼              ▼
frontend  backend  agent   recall     collector
:8080    -api      -server -server    -server
Next.js  :8090     :8092   :8093      :8096
         本体CRUD  AI Agent 三级召回   数据接入
                    │       │
                    ▼       ▼
         lakehouse-sql-server :8094   mcp-tools-server :8095
         SmartQuery 引擎(本体→SQL)   MCP 网关
                    │
                    ▼
            Postgres + pgvector(单一事实来源)
```

各服务职责(端口均为**内网**端口):

- **gateway** `:28080`(公开)—— nginx,唯一外部入口,按路径反代
- **frontend** `:8080` —— Next.js 静态导出
- **backend-api** `:8090` —— `ont_*` / `lakehouse_*` 的 CRUD、鉴权、项目、导入导出
- **agent-server** `:8092` —— Lakehouse Agent SSE(湖仓/构建)、标注、数据集测试
- **recall-server** `:8093` —— EXACT + 向量 + 指标召回
- **lakehouse-sql-server** `:8094` —— SmartQuery 引擎(确定性「本体 → SQL」)。**LLM 永远看不到表,也看不到 JOIN。**
- **mcp-tools-server** `:8095` —— 给 Claude Code 等外部客户端的 MCP 工具网关
- **collector-server** `:8096` —— **唯一的数据接入入口**

底座 `pgvector/pgvector:pg16`;一个 one-shot 的 `db-migrate` 容器在启动时自动建 schema、建最小权限角色、跑迁移。可观测栈(Jaeger `:16686` / Prometheus `:9090` / Grafana `:3000`)的 UI 只绑定 `127.0.0.1`。

## 首次配置三步

### 第 1 步:登录

打开 `http://localhost:28080`,用 `admin / admin`(本地默认)登录。生产环境用你在 `.env` 里设的 `ADMIN_PASSWORD`。

### 第 2 步:配置 LLM 模型(用 Agent 的前提)

进入 **系统 → LLM 配置**(`/settings/llm-config`),至少加一个 **chat 模型** 并**激活到 chat 角色**:

- 厂商(Claude / OpenAI / DeepSeek / Qwen)+ base URL + API Key + 模型名
- **API Key 存在数据库里,按角色在运行时加载——改完不用改 env、不用重启容器。**

建议**同时配一个 embedding 模型**(`bge-large-zh` 这类 1024 维嵌入),否则三级召回里的「向量语义匹配(VEC)」那一层不生效,只能靠 EXACT/FUZZY。

### 第 3 步:创建项目

侧边栏左上角是**项目切换器**。点开 → 「新建项目」会进入 `/setup-wizard`。每个项目是一套独立的本体 + 数据 + 权限边界(所有 `ont_*` / `lakehouse_*` 表都带 `project_id`)。

下一步:**[接入数据源](/zh/docs/data-sources/)**。
