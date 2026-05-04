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
  { albumId: "africa", src: "/AFRICA/AFRICA-68.jpg" },
  { albumId: "las-vegas", src: "/VEGAS/VEGAS-13.jpg" },
  { albumId: "commercial", src: "/GIGS/CROOK-12.jpg" },
];

function dayIndex(): number {
  // Days since UTC epoch — same on every render within the same day
  return Math.floor(Date.now() / (1000 * 60 * 60 * 24));
}

function pickHero(): Photo {
  const candidates = HERO_POOL.map((c) => findPhoto(c.albumId, c.src)).filter(
    (p): p is Photo => Boolean(p)
  );
  if (candidates.length === 0) return albums[0].photos[0];
  return candidates[dayIndex() % candidates.length];
}

// re-render daily (otherwise SSG locks the hero on the day of build)
export const revalidate = 60 * 60 * 24;

export default function Home() {
  const hero = pickHero();
  // Only prime the LCP element. Album covers are below the fold and lazy-load.
  const prime = [hero.src];
  return <HomeClient albums={albums} hero={hero} prime={prime} />;
}
