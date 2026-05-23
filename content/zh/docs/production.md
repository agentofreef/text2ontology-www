# 生产部署

> 硬化的单入口拓扑、强密钥、TLS,以及锁死公开端口。

---

`docker-compose.yml` 就是那唯一的、已经硬化的、单入口拓扑——只有网关发布 `28080`,Postgres / 6 个 Go 服务 / 整个可观测栈都只在内网。非 root 容器、每服务 CPU/内存/PID 限额、HTTP 超时 + DB 连接池上限、优雅关停、panic-recover 中间件、最小权限 DB 角色、one-shot `db-migrate` 全部内置。

## 设强密钥并开启 fail-closed

对外暴露前,先复制 env 模板:

```bash
cp .env.example .env
```

`.env` 会被 docker compose 自动读取。把每个密钥设为强值,并打开强制校验:

| 变量 | 用途 |
|---|---|
| `POSTGRES_PASSWORD` | Postgres 超级用户 + 每个最小权限角色的密码(用 hex) |
| `ADMIN_PASSWORD` | 初始 `admin` 网页登录密码 |
| `AUTH_TOKEN_SECRET` | 用户会话 token 的 HMAC 密钥(≥ 32 字符) |
| `INTERNAL_TOKEN` | 服务间鉴权 token |
| `GRAFANA_ADMIN_PASSWORD` | Grafana 管理员密码 |
| `REQUIRE_STRONG_SECRETS=true` | 任何弱/占位密钥都会让服务 **fail-closed(拒绝启动)** |

用 `openssl rand -hex 32` 生成强值。开了 `REQUIRE_STRONG_SECRETS=true` 后,任何残留的 `change_me` / `admin` 都会让服务拒启——配错的部署会**大声失败**而不是悄悄裸奔。

```bash
docker compose up -d                              # 拉取预构建 :latest 镜像
curl -fsS http://localhost:28080/healthz          # -> ok
```

## 运维要点

- **TLS**:网关在 `28080` 上是明文 HTTP,在它前面用反代终止 TLS(或在 `services/gateway/nginx.conf` 加 TLS server 块)。
- **限制公开端口**:改 compose 里网关的 `ports:`(例如 `127.0.0.1:28080:8080`,把它挡在 LAN 之外,放在自己的 TLS 反代后)。
- **镜像**:用户拉预构建镜像;维护者用 `make build` 本地构建;CI 在每次 push 到 `main` 时发布多架构(amd64+arm64)`:latest` 到 `ghcr.io/agentofreef/text2ontology-*`。

## 可观测

可观测栈 UI 默认只绑定 `127.0.0.1`:Jaeger `:16686`、Prometheus `:9090`、Grafana `:3000`(默认登录 `admin` + `GRAFANA_ADMIN_PASSWORD`)。它们不对外暴露,本地排查用。
