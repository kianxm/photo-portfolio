import HomeClient from "@/components/HomeClient";
import { albums, findPhoto } from "@/lib/albums";
import type { Photo } from "@/lib/albums";

// Curated hero pool — strongest landscape-oriented frames.
// Daily rotation gives returning visitors something new without being jumpy.
const HERO_POOL: Array<{ albumId: string; src: string }> = [
  { albumId: "africa", src: "/AFRICA/AFRICA-13.jpg" },
  { albumId: "africa", src: "/AFRICA/AFRICA-3.jpg" },
  { albumId: "africa", src: "/AFRICA/AFRICA-18.jpg" },
  { albumId: "africa", src: "/AFRICA/AFRICA-50.jpg" },
  { albumId: "africa", src: "/AFRICA/AFRICA-69.jpg" },
  { albumId: "las-vegas", src: "/VEGAS/VEGAS-13.jpg" },
  { albumId: "roadtrip", src: "/OREGON/OREGON-27.jpg" },
];

function dayIndex(): number {
  // Days since UTC epoch — same on every render within the same day
  return Math.floor(Date.now() / (1000 * 60 * 60 * 24));
}

function pickHero(): Photo {
  const candidates = HERO_POOL.map((c) => findPhoto(c.albumId, c.src)).filter(
    (p): p is Photo => Boolean(p),
  );
  if (candidates.length === 0) return albums[0].photos[0];
  return candidates[dayIndex() % candidates.length];
}

// re-render daily (otherwise SSG locks the hero on the day of build)
export const revalidate = 60 * 60 * 24;

const BASE = "https://shotbykian.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${BASE}/#website`,
      url: BASE,
      name: "shotbykian",
      description: "Photography by Kian Malakooti",
      inLanguage: "en-US",
      publisher: { "@id": `${BASE}/#person` },
    },
    {
      "@type": ["Person", "ProfessionalService"],
      "@id": `${BASE}/#person`,
      name: "Kian Malakooti",
      alternateName: "shotbykian",
      url: BASE,
      image: `${BASE}/me.jpg`,
      jobTitle: "Photographer",
      description:
        "Documentary, travel, and commercial photographer working between places and people.",
      knowsAbout: [
        "Documentary photography",
        "Travel photography",
        "Commercial photography",
        "Portrait photography",
        "Concert photography",
      ],
      sameAs: [
        "https://www.instagram.com/shotbykian",
        "https://www.linkedin.com/in/kianmalakooti",
      ],
    },
    {
      "@type": "CollectionPage",
      "@id": `${BASE}/#work`,
      url: BASE,
      name: "Selected albums",
      isPartOf: { "@id": `${BASE}/#website` },
      about: { "@id": `${BASE}/#person` },
      hasPart: albums.map((a) => ({
        "@type": "ImageGallery",
        "@id": `${BASE}/album/${a.id}`,
        url: `${BASE}/album/${a.id}`,
        name: a.name,
        description: a.blurb,
      })),
    },
  ],
};

export default function Home() {
  const hero = pickHero();
  // Only prime the LCP element. Album covers are below the fold and lazy-load.
  const prime = [hero.src];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient albums={albums} hero={hero} prime={prime} />
    </>
  );
}
