# Step 2 · Ontology Modeling

> Map business concepts to data: each concept is an OD, its dimensions are properties, its relationships are Links — with one semantic table behind each.

---

This is the core of the whole setup, and the place where **business and technical people sit down together.** The questions to answer are plain:

> In this scenario, which **business concepts** do you actually want to analyze? What **data** describes them? What **dimensions** does each concept have? What **relationships** exist between concepts?

> **⚠️ For now, build the ontology by hand.** Builder mode is **not yet reliable** — it can draft, but it often needs heavy rework. **The recommended path is to define ODs / semantic_sql / properties / Links / descriptions manually on the Ontology page** (`/ontology/lakehouse-objects`), and to query manually to verify. Treat Builder as an optional "draft assistant", not something to rely on for one-click modeling.

**▶ Demo** — Step 2: define the `EARLY_ORDER` object from SQL (~60s)

<div class="doc-video">
<video controls preload="metadata" playsinline src="/demos/05-object-create.mp4"></video>
</div>

**▶ Demo** — Step 2: create a Link, connecting `EARLY_ORDER` ↔ `MTM` (1:N, ~38s)

<div class="doc-video">
<video controls preload="metadata" playsinline src="/demos/06-link-create.mp4"></video>
</div>

## How business concepts map into the system

Translate that business language into the system's objects:

| Business language | System object | At the data layer |
|---|---|---|
| A business concept | An **ontology (OD)** | One table |
| A dimension of the concept | A **Property** of the OD | A column of the table |
| A relationship between concepts | A **Link** | A primary/foreign key (join key) between tables |

In other words: **each ontology is a business concept, an OD's properties are that concept's dimensions, and the relationship between ODs is the connection between concepts.**

## Behind each OD is a "semantic table"

At the data layer, **each ontology (concept) maps to one table.** Think of that table as a traditional-BI **semantic layer** — each semantic layer corresponds to one SQL statement, and that statement is the OD's **`semantic_sql` (the "describe SQL")**: you use it to **describe the data behind the OD**.

- The OD's table → the OD itself
- The table's columns → the OD's properties
- The PK/FK relationship between tables → the Link between ODs

> One OD has **exactly one** `semantic_sql`, and that SQL may reference any number of physical tables. Physical tables are an implementation detail; the OD is the business encapsulation.

## Judge each column for meaning (Machine Code)

After writing the semantic_sql and wiring relationships, go **column by column: does this column carry meaning?**

- **Has meaning** → leave it (it can be understood as a dimension / keyword).
- **No meaning** → e.g. machine codes, timestamps, phone numbers, assorted machine encodings that carry no business meaning → **check the `Machine Code` option.**

Columns marked Machine Code won't be recalled / interpreted as meaningful dimensions, which keeps noise out.

## Describe ODs and columns in natural language (= the runtime prompt)

Once data is connected, relationships are wired, and machine-code columns are flagged, one key step remains: **describe, in natural language, what each OD and each of its columns actually means.**

- Just write it plainly: what business object this OD represents, what dimension this column is, any caliber caveats.
- At runtime, **these descriptions act as the prompt fed to the Agent.** "Column names tell the machine; descriptions tell the AI" — the name doesn't matter, the meaning does.

At this point data preparation is essentially done. When you have **multiple business concepts**, remember to wire the relationships (Links) between their tables.

## How to "cut" ontologies: the concept-fusion strategy

"Ontology" is admittedly an abstract concept. When modeling, **understand which ontologies exist in business terms** — don't just copy physical tables one-for-one.

A practical principle: **if possible, fuse a database's related concepts into a single ontology (examine one dimension as a whole).**

> Take "**profitability**" as a concept. It has **gross margin** and **net margin**. The best strategy is to put them in the **same ontology** and examine them together — not to split into two from the start.

When *do* you split into two ontologies? **When a single statistical caliber can't cover them.** If a user's question involves **both gross profit and net profit** and their caliber can't be unified in one ontology, then model them as two ontologies.

> Rule of thumb: **try to fuse first; split only when calibers conflict.** Over-splitting fragments the OD network, multiplies Links, and makes recall harder.

## How to build: manual first, Builder as assistant only

**Build manually — it's recommended.** On **Data Assets → Ontology** (`/ontology/lakehouse-objects`), define ODs by hand, write the `semantic_sql`, set properties, wire Links, and fill in the natural-language descriptions. This path is the most controllable and, today, the **most reliable**.

**Builder mode is currently unreliable** — use it only when you already know what you want to build and want help drafting a first cut:

- Open **Agent → Lakehouse Agent**, switch to **builder mode**, and walk it through the above in plain language.
- It's **interview-driven**: a **≥3-turn interview gate** before it starts proposing.
- Everything it produces is a **draft (`mark=false`)** and **must be reviewed and activated by a human, item by item.** **Read it before activating — it gets things wrong often, so don't accept its output wholesale.**

## Three hard invariants (enforced at activation)

1. **OD necessity** — with no active OD, the query tool refuses to run.
2. **OD 1:1 semantic_sql** — every active OD has exactly one SQL definition.
3. **No island OD** — multiple active ODs must connect via active Links; no islands.

Once modeled and activated, move to **[Step 3 · Question Sets](/docs/question-sets/)**.
