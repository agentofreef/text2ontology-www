# No One Builds an Ontology Alone

> The knowledge in an ontology never lives in one head. So building one was never meant to be one person's job. This is about text2ontology's public mechanism — what it shares, what it deliberately doesn't, and why "collaborative" isn't a feature but the precondition for an ontology surviving inside a real organization.

> *No man is an island, entire of itself; every man is a piece of the continent, a part of the main.*
> *— John Donne, Meditation XVII (1624)*

---

I built ontology alone for a long time.

At first there was nothing wrong with that. One object, one relationship, one trigger word, filled in by hand, one at a time. The system ran, the answers were right, and I thought I could walk this road to the end on my own.

I couldn't. The core concepts an organization actually analyzes come to about ten: order, customer, inventory, fulfillment, channel, cost. Behind each one sits a set of things only the person in that domain can pin down. Whether an order links to a refund, whether "amount" is tax-inclusive — the person who runs that part of the business settles it in a sentence, while I sit there guessing. Further in, whether an "early order" counts as already-shipped: supply-chain knows, I can only grope.

What I lacked wasn't time, it was knowledge, and the knowledge wasn't in my head. It was scattered across other people — in the supply-chain person's experience, in the growth person's instinct, in the way finance is particular about the word "cost." I sat in the middle, transcribing what they told me into ontology, and every pass lost a little.

## Break the web into points, give each point to one person

Once I'd hit that wall, the way out was actually clear.

An ontology is a web, and each point on it is an object: order, customer, fulfillment. My original mistake was wanting one person to build the whole web correctly. But the knowledge of the whole web was never in one head, so the thing was doomed from the start.

Try it differently. Ten points, ten people, each claiming just one — but claiming it all the way. Supply-chain takes "order" and "fulfillment," growth takes "customer" and "channel," finance takes "cost." No one faces the whole web anymore, only their own point, and the task narrows to a single sentence: get the point I'm responsible for absolutely right.

This solves two problems at once. One is workload — no one has to understand everything, only the slice they deal with every day. The other, often overlooked, is responsibility. When a point belongs to exactly one person, there's no grey zone of "whose job is this": whether it's right is one person's call, and one person's to answer for. The clarity of responsibility isn't legislated by a process document; it comes from the web being broken into points, each with a single owner.

This has an older name: Conway's Law — a system's structure ends up mirroring the structure of the organization that built it. Ontology is no exception. An organization's ontology can only be right if it grows into the shape of that organization's own division of labor.

## The one who writes it is the one responsible for it

Push "one point, one owner" a step further and you reach where responsibility lands.

Picture another division of labor: a dedicated ontology engineer builds the whole thing, while departments supply business definitions verbally. Sounds reasonable, until some answer turns out wrong — and then, where's the error? Did the engineer misread, or did the business side never explain it clearly? Neither side has proof, neither is really stalling, and the truth is stuck in the gap between them, where no one can point to it. This isn't a character flaw; it's that responsibility never had a clear home, and the chain broke between two people.

Make the person who claims the point the same person who's directly responsible for that business, and the gap disappears. Whoever writes "order" is the one who answers for orders every day; whether the ontology they build is accurate and whether they do their job well are the same thing. When something goes wrong, it lands on them directly. And to be clear: tracing it back isn't about blame, it's about being able to fix it — you know who to find, which version to read, which signature to ask about. The public mechanism stamps every release with its publisher and version precisely to keep that line connected.

So what this layer changes isn't really technical. publish and fork are tools; what they actually move is who is responsible for which piece of business truth. It's a redistribution of duties, a change in organizational structure, that just happens to be delivered through something shaped like git.

## Ontology can be shared, metrics can't

Once ten people have each gotten their own point right, the next question is circulation: does B's project rebuild the "order" A already built? This is what public solves. But before how it circulates, settle what circulates.

**What circulates is ontology, not metrics.** The two come apart along a simple test: change the scene — does it change?

What "order" looks like — its fields, what it links to, what "amount" means in the business — is the same across the whole organization. The order fulfillment sees and the order finance sees are the same table, the same fields; it doesn't shift with the scene. Something like that is worth building once and sharing with everyone.

A metric is not like that. Ask "what's the early-order rate," and what fulfillment wants and what finance wants aren't the same number; even the same person, watching channels this month and inventory next, will move the metric. The same question has different answers in different scenes, and each answer is right in its own scene. This isn't because people failed to align; it's that the question has no scene-independent standard answer to begin with.

Once that's clear, "unify the metric into a company-wide standard" falls apart. Even if you did unify it, you'd only be taking one scene's answer and forcing it onto all the others; force-fitting what can't be unified only distorts it. So a metric stays where it belongs — in the hands of the person and the scene that use it; while ontology, because it's the same across every scene, is the thing pulled out to be shared.

What the public catalog guarantees is that the "order" you pull is correct. What you compute on that order, and how, is your own business. The foundation is shared; everyone builds their own house on it.

## Putting git on top of ontology

With what-to-share settled, the rest is mechanism — and software engineering had a ready answer sixty years ago: git. Code, too, was once one person hugging one file and editing it, until git turned collaboration into infrastructure: publish, pull, track upstream, propose a merge.

public puts that same model, unchanged, on top of ontology:

| git | public ontology | what it does |
|---|---|---|
| `push` | publish | release an object you've built absolutely right to the public catalog — once, with attribution, with a version |
| `fork` | fork | someone pulls it down to use as needed, getting a read-only copy |
| upstream | lineage + "update available" | the upstream ships a new version, the downstream fork is notified automatically and can adopt it in one step |
| Pull Request | proposal | a downstream proposes its improvement back to the upstream, reviewed and merged by the owner |
| history | version | every release is an append-only version, with a diff and a note |

A few things are deliberate, because they decide whether this can be used safely inside a company. What gets published is only the human-authored semantic fields — object, property, relationship, explanation — with data-source config and connection credentials stripped before storage; you share "what an order looks like," not your database password, and not how you compute the early-order rate. A pulled copy is read-only; to change it, go back to your own source and change it there, then propose it upstream. And through all of this, the LLM touches not a single byte: this is the movement of already-authorized fields, not generation. People own the truth; the machine only carries it along a determined track.

## Cold start becomes a different problem

This rewrites cold start entirely.

A new project used to face an empty ontology, with the first useful answer weeks away. Now it faces a public catalog where every point has already been built right and verified by someone. Pull what this analysis needs — different scenes need different numbers of points — pull a ready, correct "order," and grow your own metrics on top of it.

And it compounds. Each additional correct public object raises the next person's starting line; the more projects fork it and the more proposals refine it, the sharper it gets. The compounding no longer happens inside one person's ontology, but across the whole organization's catalog.

This also answers a question I've been asked many times: will a big company just clone this into a feature? They will. publish, fork, proposal — these mechanisms are code, and anyone can copy them. What can't be copied is the content in your catalog — the ontology built absolutely right by people who know the business and verified against real questions — and the web of who answers for which point. git is open source; GitHub is not. What's never reproducible is not git itself, but the repositories and the people on top of it. An ontology's moat is in the same place.

## It's an internal GitHub, not a cross-company marketplace

One line has to be drawn here, or "public" gets worn out sooner or later.

The public here is public within one organization: across projects, teams, people — but not across companies. This isn't conservatism; it's what ontology is. An ontology grows tight against one organization's business. An e-commerce "order" and a SaaS "subscription" are two different ontologies; even if both say "customer," what sits underneath at two companies is entirely different business.

So fantasizing about a cross-company "ontology marketplace," downloading someone else's ontology like an npm package, misunderstands what an ontology is. An object's value comes precisely from how tightly it meshes with one organization's business; the moment you make it generic, it stops being precise, and stops being trustworthy. Where public actually helps is letting the ontologies scattered across one organization's people be published, reused, and recalibrated against each other. Inside that line it's pure gain; past it, it starts betraying the reason ontology exists.

## Coda

I built ontology alone for a long time. The moment this system truly came alive was the moment it no longer needed me to build it alone.

An ontology is never one clever person's work; it's an organization's consensus. No point on the web is an island — every point is a piece of the whole. One person can get one point absolutely right; getting the whole web absolutely right depends not on a smarter person, but on letting each point be built by the one hand that should answer for it. As for what each person computes on that correct web, and how — that's each person's own business, and was never meant to be unified.

What we set out to unify was only ever the web itself.

---

*Part of the [text2ontology](https://github.com/agentofreef/text2ontology) series. The arguments it draws on: the [Manifesto](/manifesto/) (why an ontology is the oracle), [Responsibility as Moat](/blog/responsibility-as-moat/) (how responsibility becomes margin), and [Business Ontology Engineer](/blog/business-ontology-engineer/) (who writes the ontology). Licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).*

AgentOfReef · 2026-06
