"use client";

import React, { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";
import GallerySwitch from "@/components/GallerySwitch";
import ZoomParallax from "@/components/ZoomParallax";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import { AnimatePresence } from "framer-motion";

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 2000);
    })();
  }, []);

  return (
    <ReactLenis root>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      {!isLoading && (
        <>
          <ZoomParallax />
          <GallerySwitch />
          <Footer />
        </>
      )}
    </ReactLenis>
  );
};

export default Home;
