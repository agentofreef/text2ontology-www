# Connecting a Data Source

> PBIX (the primary path), PBIT, Excel / CSV, Postgres, SQLite — and what happens after upload.

---

Go to **System → Data Sources** (`/settings/data-sources`) → "Add data source" (`/settings/data-sources/add`). Four kinds:

| Type | Entry | Notes |
|---|---|---|
| **Power BI file** | `add/pbi` | `.pbix` or `.pbit`, **the most common path** |
| **File** | `add/file` | Excel / CSV |
| **Postgres** | `add/postgres` | mirror an existing PG database |
| **SQLite** | `add/sqlite` | upload a SQLite file |

Every ingest goes through **collector-server** alone. Once done, collector points the project at its lakehouse schema, the data + ontology land, and the source flips to `ready`.

## PBIX (primary) vs. PBIT — the key difference

Both upload on the same page (`/settings/data-sources/add/pbi`); drag in a `.pbix` / `.pbit`. But the **backend takes two completely different paths**:

### `.pbix` — async job, no wizard

It carries compressed VertiPaq data decoded by a **heavy Python subprocess** (~7s, ~235MB peak per file). So the upload only **enqueues an async extract job and returns immediately** — there is **no wizard confirm step**. The job populates the ontology and flips the source to `ready` on its own. After upload you land back on the data-sources list and **track progress via the status badge**.

- Endpoint: `POST /connector/pbix/upload`
- collector defaults to 8 parallel decode slots + 8 job workers (`COLLECTOR_PBIX_CONCURRENCY` / `COLLECTOR_JOB_WORKERS`), 3g memory cap. Raise all three together (concurrency / memory / CPU) for more throughput.

### `.pbit` — synchronous parse, wizard confirm

It's a text `DataModelSchema`, parsed **inline**, then enters a **wizard confirm flow** (`/settings/data-sources/wizard?id=...`) where you confirm tables / relationships before landing.

- Endpoint: `POST /connector/pbit/upload`

> One-line memory: **PBIX = async job + status badge, no wizard; PBIT = sync parse + wizard confirm.**

## Other sources

- **File (Excel / CSV)**: `add/file`, upload directly.
- **Postgres**: `add/postgres`, mirror an existing PG database.
- **SQLite**: `add/sqlite`, upload a SQLite file.

## After it lands

The data is in, but the ontology is still a *draft*. Next, use **[Builder Mode](/docs/builder-mode/)** to walk the agent through your business so it builds the OD / Metric / Link — then activate it by hand.
