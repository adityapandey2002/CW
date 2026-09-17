import { ImageResponse } from "next/og";
import { SITE } from "@/lib/constants";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "72px 84px",
          background: "linear-gradient(115deg, #ff6a2b 0%, #e11d8a 55%, #6a3de8 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 84,
              height: 84,
              borderRadius: 22,
              background: "#ffffff",
              color: "#0b1c3d",
              fontSize: 36,
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            CW
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.02em" }}>
              {SITE.name}
            </div>
            <div style={{ fontSize: 20, fontWeight: 600, opacity: 0.85, marginTop: 2 }}>
              E-Commerce Growth Agency · India
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            {SITE.hero}
          </div>
          <div style={{ fontSize: 30, fontWeight: 500, opacity: 0.95, marginTop: 24 }}>
            Amazon · Flipkart · Meesho — strategy, PPC &amp; cataloging, end-to-end.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span
            style={{
              display: "flex",
              padding: "10px 26px",
              borderRadius: 999,
              border: "2px solid rgba(255,255,255,0.45)",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            {SITE.tagline}
          </span>
          <span style={{ fontSize: 22, fontWeight: 600, opacity: 0.9 }}>Get a free audit →</span>
        </div>
      </div>
    ),
    size
  );
}
