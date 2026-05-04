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
  photos: Photo[];
};

const META: Record<string, Omit<Album, "photos">> = {
  africa: {
    id: "africa",
    name: "Africa",
    blurb: "Two trips, five years apart — landscapes, people, and the in-between.",
    year: "2019 / 2024",
    cover: "/AFRICA/AFRICA-3.jpg",
  },
  "las-vegas": {
    id: "las-vegas",
    name: "Las Vegas",
    blurb: "Neon, glass, and the desert at the edges of the strip.",
    year: "2024",
    cover: "/VEGAS/VEGAS-4.jpg",
  },
  graduation: {
    id: "graduation",
    name: "Graduation",
    blurb: "Caps, gowns, and the people behind them.",
    year: "2024",
    cover: "/GRAD/GRAD-19.jpg",
  },
  commercial: {
    id: "commercial",
    name: "Commercial",
    blurb: "Brand and product work for clients.",
    year: "2023 — 2025",
    cover: "/GIGS/CROOK-12.jpg",
  },
  concerts: {
    id: "concerts",
    name: "Concerts",
    blurb: "Live shows, stage light, and the crowd.",
    year: "2024",
    cover: "/TYO/TYO-1.jpg",
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
