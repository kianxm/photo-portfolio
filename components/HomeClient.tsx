"use client";

import { useEffect, useState } from "react";
import Hero from "./Hero";
import AlbumIndex from "./AlbumIndex";
import About from "./About";
import Footer from "./Footer";
import Preloader from "./Preloader";
import type { Album, Photo } from "@/lib/albums";

type Props = {
  albums: Album[];
  hero: Photo;
  prime: string[];
};

export default function HomeClient({ albums, hero, prime }: Props) {
  const [loading, setLoading] = useState(true);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      window.scrollTo(0, 0);
      // free memory after the fade-out completes
      const t = setTimeout(() => setRemoved(true), 1200);
      return () => clearTimeout(t);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <>
      <main aria-hidden={loading || undefined}>
        <Hero hero={hero} />
        <AlbumIndex albums={albums} />
        <About />
        <Footer />
      </main>

      {!removed && (
        <Preloader
          prime={prime}
          fadeOut={!loading}
          onDone={() => setLoading(false)}
        />
      )}
    </>
  );
}
