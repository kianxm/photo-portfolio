import type { MetadataRoute } from "next";
import { albums } from "@/lib/albums";

const BASE = "https://shotbykian.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: BASE,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...albums.map((a) => ({
      url: `${BASE}/album/${a.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
