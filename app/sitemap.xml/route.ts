import { albums } from "@/lib/albums";
import { AUTHOR, SITE_URL } from "@/lib/site";

// Hand-rolled so we can include <image:image> entries (Next 14's
// MetadataRoute.Sitemap has no image support). Image sitemaps help Google
// Images discover the full-resolution originals, not just /_next/image URLs.
export const dynamic = "force-static";

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export function GET() {
  const home = `  <url>
    <loc>${SITE_URL}/</loc>
  </url>`;

  const albumEntries = albums.map((a) => {
    const images = a.photos
      .map(
        (p) => `    <image:image>
      <image:loc>${esc(`${SITE_URL}${p.src}`)}</image:loc>
    </image:image>`,
      )
      .join("\n");
    return `  <url>
    <loc>${SITE_URL}/album/${a.id}</loc>
${images}
  </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Photographs by ${esc(AUTHOR)} -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${[home, ...albumEntries].join("\n")}
</urlset>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
