"use client";

import Image from "next/image";
import { m as motion } from "framer-motion";
import type { Album } from "@/lib/albums";
import { findPhoto } from "@/lib/albums";
import TransitionLink from "./TransitionLink";

type Props = { albums: Album[] };

export default function AlbumIndex({ albums }: Props) {
  return (
    <section id="work" className="bg-ink px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 md:mb-20 flex flex-col gap-3">
          <span className="text-xs uppercase tracking-[0.25em] text-muted">
            01 — Work
          </span>
          <h2 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95]">
            Selected <span className="italic text-muted">albums</span>
          </h2>
          <p className="max-w-xl text-bone/60 text-pretty mt-2">
            Five collections spanning travel, live music, portrait, and
            commercial work. Click an album to view the full set.
          </p>
        </header>

        <ul className="hairline-top divide-y divide-line border-t border-line">
          {albums.map((album, i) => (
            <AlbumRow key={album.id} album={album} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function AlbumRow({ album, index }: { album: Album; index: number }) {
  const cover = findPhoto(album.id, album.cover) ?? album.photos[0];

  return (
    <li className="group relative">
      <TransitionLink
        href={`/album/${album.id}`}
        className="grid grid-cols-12 items-center gap-6 py-6 md:py-8 transition-colors duration-500"
      >
        <span className="col-span-2 md:col-span-1 text-xs tabular-nums text-muted">
          0{index + 1}
        </span>

        <div className="col-span-7 md:col-span-5 flex flex-col gap-1">
          <span
            className="font-display text-3xl md:text-5xl leading-none transition-transform duration-500 group-hover:translate-x-2"
            style={{ viewTransitionName: `album-title-${album.id}` }}
          >
            {album.name}
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-muted">
            {album.photos.length} photographs · {album.year}
          </span>
        </div>

        <p className="hidden md:block col-span-4 text-sm text-bone/60 text-pretty">
          {album.blurb}
        </p>

        <span className="col-span-3 md:col-span-2 flex items-center justify-end gap-3 text-xs uppercase tracking-[0.2em] text-bone/70">
          <span className="hidden md:inline transition-transform duration-500 group-hover:-translate-x-1">
            View
          </span>
          <span className="inline-block h-[1px] w-6 bg-bone/40 transition-all duration-500 group-hover:w-12 group-hover:bg-bone" />
        </span>

        {/* hover preview */}
        {cover && (
          <motion.div
            initial={false}
            className="pointer-events-none absolute right-[18%] top-1/2 -translate-y-1/2 hidden lg:block w-[260px] h-[180px] overflow-hidden rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 shadow-2xl"
          >
            <Image
              src={cover.src}
              alt={album.name}
              fill
              sizes="260px"
              placeholder="blur"
              blurDataURL={cover.blurDataURL}
              className="object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
            />
          </motion.div>
        )}
      </TransitionLink>
    </li>
  );
}
