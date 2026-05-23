# Production Deployment

> Hardened single-ingress topology, strong secrets, TLS, and locking down the public port.

---

`docker-compose.yml` *is* the single, hardened, single-ingress topology — only the gateway publishes `28080`; Postgres, the 6 Go services, and the whole observability stack are internal-only. Non-root containers, per-service CPU/memory/PID limits, HTTP timeouts + DB connection-pool caps, graceful shutdown, panic-recover middleware, least-privilege DB roles, and a one-shot `db-migrate` runner are all built in.

## Set strong secrets and enable fail-closed

Before exposing it beyond localhost, copy the env template:

```bash
cp .env.example .env
```

`.env` is auto-read by docker compose. Set every secret to a strong value and turn on enforcement:

| Variable | Purpose |
|---|---|
| `POSTGRES_PASSWORD` | Postgres superuser + every scoped-role password (use hex) |
| `ADMIN_PASSWORD` | initial `admin` web login |
| `AUTH_TOKEN_SECRET` | HMAC key for user session tokens (≥ 32 chars) |
| `INTERNAL_TOKEN` | service-to-service auth token |
| `GRAFANA_ADMIN_PASSWORD` | Grafana admin login |
| `REQUIRE_STRONG_SECRETS=true` | makes services **fail-closed (refuse to start)** on any weak/placeholder secret |

Generate strong values with `openssl rand -hex 32`. With `REQUIRE_STRONG_SECRETS=true`, any leftover `change_me` / `admin` makes the services refuse to start — a misconfigured deploy **fails loudly** instead of running insecure.

```bash
docker compose up -d                              # pulls prebuilt :latest images
curl -fsS http://localhost:28080/healthz          # -> ok
```

## Operating notes

- **TLS** — the gateway serves plain HTTP on `28080`; terminate TLS at a reverse proxy in front (or add a TLS `server {}` to `services/gateway/nginx.conf`).
- **Restrict the public port** — edit the gateway `ports:` in `docker-compose.yml` (e.g. `127.0.0.1:28080:8080` to keep it off the LAN behind your own TLS proxy).
- **Images** — users pull prebuilt images; maintainers build locally with `make build`; CI publishes multi-arch (amd64 + arm64) `:latest` to `ghcr.io/agentofreef/text2ontology-*` on every push to `main`.

## Observability

Observability UIs bind to `127.0.0.1` only: Jaeger `:16686`, Prometheus `:9090`, Grafana `:3000` (default login `admin` + `GRAFANA_ADMIN_PASSWORD`). They are not exposed publicly — for local inspection.
