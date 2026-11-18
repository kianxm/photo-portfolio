import manifest from "./album-images.json";

export type Exif = {
  camera?: string;
  lens?: string;
  aperture?: string;
  shutter?: string;
  iso?: number;
  focal?: string;
  takenAt?: string;
};

export type Photo = {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
  alt?: string;
  exif?: Exif;
};

export type Album = {
  id: string;
  name: string;
  blurb: string;
  year: string;
  cover: string;
  /** <title> text for search results — more descriptive than `name`. */
  seoTitle: string;
  /** Meta description, ~150 chars. */
  seoDescription: string;
  photos: Photo[];
};

const META: Record<string, Omit<Album, "photos">> = {
  africa: {
    id: "africa",
    name: "Africa",
    blurb: "Two trips, five years apart — landscapes, people, and the in-between.",
    year: "2019 / 2024",
    cover: "/AFRICA/AFRICA-3.jpg",
    seoTitle: "Africa — Travel & Documentary Photography",
    seoDescription:
      "Travel and documentary photographs from East Africa by Kian Malakooti: landscapes, people, and the in-between from two trips five years apart (2019 and 2024).",
  },
  "las-vegas": {
    id: "las-vegas",
    name: "Las Vegas",
    blurb: "Neon, glass, and the desert at the edges of the strip.",
    year: "2024",
    cover: "/VEGAS/VEGAS-4.jpg",
    seoTitle: "Las Vegas Photography — Neon, Glass & Desert",
    seoDescription:
      "Las Vegas photographed by Kian Malakooti: neon, glass, and the desert at the edges of the Strip.",
  },
  roadtrip: {
    id: "roadtrip",
    name: "Road Trip",
    blurb: "Northern California up to Oregon — friends, the open road, and everything between.",
    year: "2025",
    cover: "/OREGON/OREGON-24.jpg",
    seoTitle: "Road Trip — Northern California to Oregon Photography",
    seoDescription:
      "A road trip from Northern California up to Oregon, photographed by Kian Malakooti: friends, the open road, and everything between.",
  },
  graduation: {
    id: "graduation",
    name: "Graduation",
    blurb: "Caps, gowns, and the people behind them.",
    year: "2024",
    cover: "/GRAD/GRAD-19.jpg",
    seoTitle: "Graduation Portrait Photography",
    seoDescription:
      "Graduation portraits by Kian Malakooti: caps, gowns, and the people behind them.",
  },
  commercial: {
    id: "commercial",
    name: "Commercial",
    blurb: "Brand and product work for clients.",
    year: "2023 — 2025",
    cover: "/GIGS/CROOK-12.jpg",
    seoTitle: "Commercial, Brand & Product Photography",
    seoDescription:
      "Commercial photography by Kian Malakooti: brand and product work for clients, 2023–2025.",
  },
  concerts: {
    id: "concerts",
    name: "Concerts",
    blurb: "Live shows, stage light, and the crowd.",
    year: "2024",
    cover: "/TYO/TYO-1.jpg",
    seoTitle: "Concert & Live Music Photography",
    seoDescription:
      "Concert photography by Kian Malakooti: live shows, stage lighting, performers, and the crowd.",
  },
};

const PHOTOS = manifest as Record<string, Photo[]>;

export const albums: Album[] = Object.values(META).map((m) => ({
  ...m,
  photos: PHOTOS[m.id] ?? [],
}));

export function getAlbum(id: string): Album | undefined {
  const m = META[id];
  if (!m) return undefined;
  return { ...m, photos: PHOTOS[id] ?? [] };
}

export function findPhoto(albumId: string, src: string): Photo | undefined {
  return (PHOTOS[albumId] ?? []).find((p) => p.src === src);
}
