export interface ImageScrollGalleryProps {
  logoSrc: string;
  description: string;
  images: { left: string; right: string }[];
  buttonText: string;
}

// Define the data for multiple image galleries
export const imageGalleries: ImageScrollGalleryProps[] = [
  {
    logoSrc: "/me.jpg",
    description:
      "Visited Africa in both 2019 and 2024, discovering new cultures and ideas.",
    buttonText: "Explore",
    images: [
      { left: "/AFRICA/AFRICA-1.jpg", right: "/AFRICA/AFRICA-2.jpg" },
      { left: "/AFRICA/AFRICA-3.jpg", right: "/AFRICA/AFRICA-4.jpg" },
      { left: "/AFRICA/AFRICA-5.jpg", right: "/AFRICA/AFRICA-6.jpg" },
    ],
  },
  {
    logoSrc: "/me.jpg",
    description:
      "Explored Europe's iconic landmarks and vibrant cultures in 2021.",
    buttonText: "Discover",
    images: [
      { left: "/VEGAS/VEGAS-1.jpg", right: "/VEGAS/VEGAS-2.jpg" },
      { left: "/VEGAS/VEGAS-3.jpg", right: "/VEGAS/VEGAS-4.jpg" },
      { left: "/VEGAS/VEGAS-5.jpg", right: "/VEGAS/VEGAS-6.jpg" },
    ],
  },
  {
    logoSrc: "/asia.jpg",
    description:
      "Journeyed through Asia, embracing its rich history and landscapes in 2022.",
    buttonText: "View More",
    images: [
      { left: "/ASIA/ASIA-1.jpg", right: "/ASIA/ASIA-2.jpg" },
      { left: "/ASIA/ASIA-3.jpg", right: "/ASIA/ASIA-4.jpg" },
      { left: "/ASIA/ASIA-5.jpg", right: "/ASIA/ASIA-6.jpg" },
    ],
  },
];
