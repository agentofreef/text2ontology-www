/**
 * Giscus configuration. Comments are backed by GitHub Discussions on the
 * `text2ontology-www` public repo — zero database, zero self-hosted auth.
 *
 * SETUP STEPS (one-time, ~5 minutes):
 *   1. github.com/agentofreef/text2ontology-www → Settings → Features →
 *      enable Discussions
 *   2. github.com/apps/giscus → Install → grant access only to
 *      text2ontology-www
 *   3. giscus.app/zh-CN → fill repo name → choose mapping "pathname" →
 *      create a Discussion category named "Comments" (format: Announcement,
 *      so only maintainer can open threads — giscus auto-opens them via the
 *      app) → copy the 4 IDs below
 *
 * Until the 4 IDs are filled in (i.e. while any value contains `__`), the
 * Comments component renders a placeholder strip instead of the widget.
 */
export const GISCUS_CONFIG = {
  repo: "agentofreef/text2ontology-www" as `${string}/${string}`,
  repoId: "__REPLACE_WITH_REPO_ID__",
  category: "Comments",
  categoryId: "__REPLACE_WITH_CATEGORY_ID__",
  mapping: "pathname" as const,
  strict: "0" as const,
  reactionsEnabled: "1" as const,
  emitMetadata: "0" as const,
  inputPosition: "top" as const,
  loading: "lazy" as const,
};

export function isGiscusConfigured(): boolean {
  return (
    !GISCUS_CONFIG.repoId.includes("__") &&
    !GISCUS_CONFIG.categoryId.includes("__")
  );
}
