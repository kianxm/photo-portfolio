export interface AlbumProps {
  id: string;
  albumName: string;
  logoSrc: string;
  description: string;
  buttonText: string;
  directory: string;
  fileName: string;
  count: number;
}

export const imageGalleries: AlbumProps[] = [
  {
    id: "africa",
    albumName: "Africa",
    logoSrc: "/AFRICA/AFRICA-3.jpg",
    description: "View Africa photos",
    buttonText: "Explore",
    directory: "/AFRICA",
    fileName: "AFRICA",
    count: 71,
  },
  {
    id: "las-vegas",
    albumName: "Las Vegas",
    logoSrc: "/VEGAS/VEGAS-4.jpg",
    description: "View Las Vegas photos",
    buttonText: "Discover",
    directory: "/VEGAS",
    fileName: "VEGAS",
    count: 15,
  },
  {
    id: "graduation",
    albumName: "Graduation",
    logoSrc: "/GRAD/GRAD-19.jpg",
    description: "View graduation photos",
    buttonText: "View More",
    directory: "/GRAD",
    fileName: "GRAD",
    count: 20,
  },
  {
    id: "commercial",
    albumName: "Commercial",
    logoSrc: "/GIGS/CROOK-12.jpg",
    description: "View commercial photos",
    buttonText: "Discover",
    directory: "/GIGS",
    fileName: "CROOK",
    count: 28,
  },
  {
    id: "concerts",
    albumName: "Concerts",
    logoSrc: "/TYO/TYO-1.jpg",
    description: "View concert photos",
    buttonText: "Explore",
    directory: "/TYO",
    fileName: "TYO",
    count: 6,
  },
];
