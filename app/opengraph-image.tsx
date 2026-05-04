import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "shotbykian — photographs by Kian Malakooti";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BASE = "https://shotbykian.com";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0a0a0a",
          color: "#f0eee8",
          position: "relative",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${BASE}/AFRICA/AFRICA-13.jpg`}
          width={1200}
          height={630}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.55,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.95) 100%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 64,
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              opacity: 0.7,
            }}
          >
            shotbykian
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                fontSize: 160,
                lineHeight: 1,
                fontWeight: 700,
                letterSpacing: -3,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span>Kian</span>
              <span>Malakooti</span>
            </div>
            <div
              style={{
                fontSize: 24,
                opacity: 0.7,
                marginTop: 12,
              }}
            >
              Photographs from places I&apos;ve been and people I&apos;ve met.
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
