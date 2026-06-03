"use client";

import Image from "next/image";
import { m as motion } from "framer-motion";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { Photo } from "@/lib/albums";

const Lightbox = dynamic(() => import("./Lightbox"), { ssr: false });

type Props = { photos: Photo[]; albumName?: string };

export default function PhotoGrid({ photos, albumName }: Props) {
  const [active, setActive] = useState<number | null>(null);
  const tileRefs = useRef<Record<number, HTMLButtonElement | null>>({});
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const open = (i: number) => {
    openerRef.current = tileRefs.current[i] ?? null;
    setActive(i);
  };

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 md:gap-4 [column-fill:_balance]">
        {photos.map((p, i) => (
          <Tile
            key={p.src}
            photo={p}
            index={i}
            albumName={albumName}
            onOpen={() => open(i)}
            registerRef={(el) => (tileRefs.current[i] = el)}
          />
        ))}
      </div>

      {active !== null && (
        <Lightbox
          photos={photos}
          index={active}
          onClose={() => setActive(null)}
          onIndexChange={setActive}
          returnFocusRef={openerRef}
        />
      )}
    </>
  );
}

function Tile({
  photo,
  index,
  albumName,
  onOpen,
  registerRef,
}: {
  photo: Photo;
  index: number;
  albumName?: string;
  onOpen: () => void;
  registerRef: (el: HTMLButtonElement | null) => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const altText =
    photo.alt ??
    (albumName
      ? `${albumName} — photograph ${index + 1} by Kian Malakooti`
      : `Photograph ${index + 1} by Kian Malakooti`);

  return (
    <motion.button
      ref={registerRef}
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: Math.min(index * 0.04, 0.4),
      }}
      className="group relative mb-3 md:mb-4 block w-full break-inside-avoid overflow-hidden rounded-sm bg-paper cursor-zoom-in focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-bone"
      style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
      aria-label={`Open photograph ${String(index + 1).padStart(3, "0")}`}
    >
      {!loaded && <div className="absolute inset-0 skeleton" />}
      <Image
        src={photo.src}
        alt={altText}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        placeholder="blur"
        blurDataURL={photo.blurDataURL}
        loading={index < 6 ? "eager" : "lazy"}
        className="object-cover transition-all duration-700 group-hover:scale-[1.03]"
        onLoad={() => setLoaded(true)}
      />
      <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-500" />
      <div className="absolute bottom-2 right-3 text-[10px] uppercase tracking-[0.2em] text-bone/0 group-hover:text-bone/70 transition-colors duration-500 tabular-nums">
        {String(index + 1).padStart(3, "0")}
      </div>
    </motion.button>
  );
}
