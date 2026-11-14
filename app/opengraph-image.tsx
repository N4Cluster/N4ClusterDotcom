import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "N4Cluster. Stop paying 30% to sell your own food.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const svg = await readFile(join(process.cwd(), "public/brand/n4cluster-mark.svg"));
  const mark = `data:image/svg+xml;base64,${svg.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#F7F3EA",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          padding: "60px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "40px" }}>
          <img src={mark} width={90} height={100} alt="" />
          <span style={{ color: "#0F1A3A", fontWeight: 800, fontSize: "56px", letterSpacing: "-0.02em" }}>
            N4Cluster
          </span>
        </div>
        <div
          style={{
            color: "#0F1A3A",
            fontSize: "64px",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            textAlign: "center",
            maxWidth: "980px",
          }}
        >
          Stop paying 30% to sell your own food.
        </div>
      </div>
    ),
    { ...size },
  );
}
