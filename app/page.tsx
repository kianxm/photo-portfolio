"use client";

import React from "react";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import ImageScrollGallery from "@/components/ImageScrollGallery";
import { ReactLenis } from "lenis/react";
import GallerySwitch from "@/components/GallerySwitch";
import { usePreloader } from "@/hooks/usePreloader";

const Home: React.FC = () => {
  const { loading, preloaderComplete, handlePreloaderComplete } =
    usePreloader();

  return (
    <ReactLenis root>
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      <Hero />
      {!loading && preloaderComplete && (
        <>
          <GallerySwitch />
          {/* <ImageScrollGallery /> */}
        </>
      )}
    </ReactLenis>
  );
};

export default Home;
