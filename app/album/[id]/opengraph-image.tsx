import { ImageResponse } from "next/og";
import { albums, getAlbum } from "@/lib/albums";

export const runtime = "nodejs";
export const alt = "shotbykian album";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateImageMetadata({ params }: { params: { id: string } }) {
  const album = getAlbum(params.id);
  return [{ id: "default", contentType, size, alt: album?.name ?? alt }];
}

export function generateStaticParams() {
  return albums.map((a) => ({ id: a.id }));
}

const BASE = "https://shotbykian.com";

export default async function Image({ params }: { params: { id: string } }) {
  const album = getAlbum(params.id);
  if (!album) {
    return new ImageResponse(<div>Not found</div>, size);
  }

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
          src={`${BASE}${album.cover}`}
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
                fontSize: 18,
                letterSpacing: 4,
                textTransform: "uppercase",
                opacity: 0.6,
              }}
            >
              Album · {album.year}
            </div>
            <div
              style={{
                fontSize: 140,
                lineHeight: 1,
                fontWeight: 700,
                letterSpacing: -2,
              }}
            >
              {album.name}
            </div>
            <div
              style={{
                fontSize: 22,
                opacity: 0.7,
                marginTop: 8,
                maxWidth: 800,
              }}
            >
              {album.blurb}
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
