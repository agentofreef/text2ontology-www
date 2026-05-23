# Interface Reference

> A map of the sidebar — every page and what it is for.

---

After you sign in and select a project, the sidebar groups as follows (with no project selected, only the System group shows).

```
text2ontology
[project switcher]  ← top-left: switch / new / delete project

Data Assets
  · Lakehouse       /ontology/lakehouse
  · Ontology        /ontology/lakehouse-objects   (OD list + property graph, merged view)

Knowledge Engineering
  · Keywords        /ontology/lakehouse-keywords
  · Keyword Triage  /ontology/lakehouse-keyword-triage
  · Metrics         /ontology/lakehouse-metric-intents

Agent
  · Lakehouse Agent /ontology/lakehouse-agent          ← main chat (lakehouse / builder)
  · Chat History    /ontology/lakehouse-agent/history
  · Annotations     /ontology/lakehouse-agent/annotations
  · Token Recall    /ontology/lakehouse-agent/token-recall
  · Learned Knowledge /ontology/lakehouse-agent/knowledge-learned
  · Dataset Testing /ontology/lakehouse-agent/dataset-testing
  · Data Flywheel   /ontology/lakehouse-agent/flywheel

SQL
  · Ontology SQL    /ontology/sql-passthrough
  · Lakehouse SQL   /ontology/lakehouse-sql

System
  · Data Sources    /settings/data-sources
  · LLM Config      /settings/llm-config
  · MCP Keys        /settings/mcp-keys
  · Preferences     /settings/preferences
  · User Management /settings/users   (admin only)
```

## Group by group

### Data Assets

- **Lakehouse** — view the physical data you ingested.
- **Ontology** — OD list + property graph (merged into one split view). Where you view / manage ODs and Properties.

### Knowledge Engineering (the correction battleground)

- **Keywords** — CRUD on keywords.
- **Keyword Triage** — fix tokenization: add missing words, fix aliases, adjust metric priority.
- **Metrics** — create / edit metrics (measure, filters, auto-group-by, pivot).

### Agent

- **Lakehouse Agent** — the main chat page; both lakehouse (query) and builder (modeling) modes live here.
- Sub-pages: Chat History, Annotations, Token Recall, Learned Knowledge, Dataset Testing, Data Flywheel.

### SQL (advanced)

- **Ontology SQL** — ontology semantic SQL.
- **Lakehouse SQL** — query the lakehouse directly.

### System

- **Data Sources / LLM Config / MCP Keys / Preferences**, plus **User Management** (admin only).

> Note: the ER Diagram (`/ontology/er-diagram`) and Prompt Engineering (`/settings/prompt-config`) pages still exist but are hidden from the sidebar. All routes live under the `/lakehouse` base path + a locale segment.
