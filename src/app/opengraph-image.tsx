import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Vectra — We craft immersive experiences";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Shown when the site is shared as a link. Rendered once at build time.
export default async function OpengraphImage() {
  const [syneBold, icon] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/Syne-Bold.woff")),
    readFile(join(process.cwd(), "src/app/icon.png"), "base64"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "radial-gradient(circle at 85% 20%, #2a2214 0%, #050505 55%)",
          color: "#f0e6d3",
          fontFamily: "Syne",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <img src={`data:image/png;base64,${icon}`} width={72} height={72} alt="" />
          <div style={{ display: "flex", fontSize: 36, letterSpacing: "-0.01em" }}>
            VECTRA<span style={{ color: "#c9a84c" }}>.</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 96, lineHeight: 0.95, letterSpacing: "-0.02em" }}>
          <span>We craft</span>
          <span style={{ color: "#c9a84c" }}>immersive</span>
          <span>experiences</span>
        </div>
        <div style={{ display: "flex", fontSize: 22, letterSpacing: "0.3em", color: "#8a837c", textTransform: "uppercase" }}>
          Design · Development · 3D
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Syne", data: syneBold, style: "normal", weight: 700 }],
    }
  );
}
