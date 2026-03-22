import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "N4Cluster — Infrastructure for Local Commerce";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #040d1c 0%, #0f2040 40%, #162d58 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Background accent */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "400px",
            background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #1a4fd6, #2563eb)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 16px rgba(37,99,235,0.4)",
            }}
          >
            <span style={{ color: "white", fontWeight: 700, fontSize: "14px", letterSpacing: "0.1em" }}>
              N4
            </span>
          </div>
          <span style={{ color: "white", fontWeight: 700, fontSize: "28px", letterSpacing: "-0.02em" }}>
            N4Cluster
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            color: "white",
            fontSize: "56px",
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            textAlign: "center",
            margin: "0 0 20px",
            maxWidth: "900px",
          }}
        >
          Infrastructure for Local Commerce
        </h1>

        {/* Subheadline */}
        <p
          style={{
            color: "rgba(148, 163, 184, 1)",
            fontSize: "22px",
            textAlign: "center",
            maxWidth: "700px",
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          Merchant-first ordering, orchestration, and AI-assisted growth in one platform.
        </p>

        {/* Sub-brands */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "36px",
          }}
        >
          {[
            { name: "N4Sync", color: "#14b8a6" },
            { name: "N4Logic", color: "#f59e0b" },
          ].map((brand) => (
            <div
              key={brand.name}
              style={{
                background: brand.color + "20",
                border: `1px solid ${brand.color}40`,
                borderRadius: "8px",
                padding: "8px 16px",
                color: brand.color,
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              {brand.name}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
