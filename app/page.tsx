"use client";

import React, { useState } from "react";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import ImageScrollGallery from "@/components/ImageScrollGallery";
import { ReactLenis } from "lenis/react";
import GallerySwitch from "@/components/GallerySwitch";

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [preloaderComplete, setPreloaderComplete] = useState(true);

  const handlePreloaderComplete = () => {
    setLoading(false);
    setTimeout(() => {
      setPreloaderComplete(true); // Allow animations to load after the preloader finishes
    }, 500); // Add a small delay for smoother transition
  };

  return (
    <ReactLenis root>
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      <Hero />
      {!loading && preloaderComplete && (
        <>
          <GallerySwitch />
          <ImageScrollGallery />
        </>
      )}
    </ReactLenis>
  );
};

export default Home;
