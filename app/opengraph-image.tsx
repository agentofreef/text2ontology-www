import { ImageResponse } from "next/og";

/**
 * Site-wide default OG image — Next 16 generates this as a static 1200x630 PNG
 * at build time via Satori, picked up by `og:image` on every page that doesn't
 * declare its own. Industrial palette: ink background, white wordmark,
 * accent-orange tagline.
 *
 * Note: Satori uses inline-style font fallback chains; we rely on the host's
 * sans-serif default for the wordmark so we don't have to ship a font file.
 */
export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "text2ontology — Ontology before query";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0a",
          color: "#fafafa",
          padding: 64,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#a3a3a3",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <span>▼//</span>
          <span>text2ontology</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              fontSize: 180,
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: -4,
            }}
          >
            Ontology
          </div>
          <div
            style={{
              fontSize: 180,
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: -4,
              display: "flex",
              alignItems: "center",
            }}
          >
            before query
            <span style={{ color: "#FF4500", marginLeft: 4 }}>.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#a3a3a3",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <span>// LLM fills parameters — the organization owns meaning</span>
          <span style={{ color: "#FF4500" }}>text2ontology.com</span>
        </div>
      </div>
    ),
    size,
  );
}
