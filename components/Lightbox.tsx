"use client";

import { AnimatePresence, m, type PanInfo } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import type { Photo } from "@/lib/albums";

type Props = {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
  /** element that opened the lightbox; focus returns here on close */
  returnFocusRef?: React.RefObject<HTMLElement>;
};

const SWIPE_THRESHOLD = 80;

export default function Lightbox({
  photos,
  index,
  onClose,
  onIndexChange,
  returnFocusRef,
}: Props) {
  const open = index !== null;
  const photo = open ? photos[index] : null;
  const dialogRef = useRef<HTMLDivElement>(null);

  const next = useCallback(() => {
    if (index === null) return;
    onIndexChange((index + 1) % photos.length);
  }, [index, photos.length, onIndexChange]);

  const prev = useCallback(() => {
    if (index === null) return;
    onIndexChange((index - 1 + photos.length) % photos.length);
  }, [index, photos.length, onIndexChange]);

  // keyboard, scroll lock, focus management
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "Tab") {
        // focus trap — keep focus inside dialog
        const root = dialogRef.current;
        if (!root) return;
        const focusable = root.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // initial focus
    requestAnimationFrame(() => dialogRef.current?.focus());
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, next, prev]);

  // restore focus on close
  useEffect(() => {
    if (!open) returnFocusRef?.current?.focus();
  }, [open, returnFocusRef]);

  // preload neighbors (n+1, n-1) so navigation is instant
  useEffect(() => {
    if (index === null) return;
    const ahead = photos[(index + 1) % photos.length];
    const behind = photos[(index - 1 + photos.length) % photos.length];
    [ahead, behind].forEach((p) => {
      if (!p) return;
      const img = new window.Image();
      // request the same optimized URL Next will use for the lightbox
      img.src = `/_next/image?url=${encodeURIComponent(p.src)}&w=3840&q=90`;
    });
  }, [index, photos]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) next();
    else if (info.offset.x > SWIPE_THRESHOLD) prev();
  };

  return (
    <AnimatePresence>
      {open && photo && (
        <m.div
          key="lightbox"
          ref={dialogRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label={`Photograph ${index! + 1} of ${photos.length}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[120] bg-ink/95 backdrop-blur-md flex flex-col outline-none"
          onClick={onClose}
        >
          <div
            className="flex items-center justify-between px-5 py-4 md:px-8 md:py-6 text-xs uppercase tracking-[0.25em] text-bone/70"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="tabular-nums" aria-live="polite">
              {String(index! + 1).padStart(2, "0")}
              <span className="mx-2 text-muted">/</span>
              {String(photos.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="group flex items-center gap-3 hover:text-bone transition-colors focus-visible:text-bone focus-visible:outline-none"
              aria-label="Close lightbox"
            >
              <span aria-hidden="true">Close</span>
              <span className="relative inline-block w-5 h-5" aria-hidden="true">
                <span className="absolute inset-0 m-auto h-px w-5 bg-current rotate-45" />
                <span className="absolute inset-0 m-auto h-px w-5 bg-current -rotate-45" />
              </span>
            </button>
          </div>

          <div
            className="relative flex-1 flex items-center justify-center px-4 md:px-16 select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <NavButton dir="prev" onClick={prev} />
            <NavButton dir="next" onClick={next} />

            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={photo.src}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={onDragEnd}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full h-full max-w-7xl flex items-center justify-center cursor-grab active:cursor-grabbing"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt ?? ""}
                  width={photo.width}
                  height={photo.height}
                  sizes="100vw"
                  quality={90}
                  placeholder="blur"
                  blurDataURL={photo.blurDataURL}
                  priority
                  className="max-h-[85vh] max-w-full w-auto h-auto object-contain select-none"
                  draggable={false}
                />
              </m.div>
            </AnimatePresence>
          </div>

          {photo.exif && (
            <div
              className="px-5 md:px-10 pb-3 flex justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <ExifBar exif={photo.exif} />
            </div>
          )}

          <div
            className="px-4 md:px-8 pb-4 md:pb-6"
            onClick={(e) => e.stopPropagation()}
          >
            <ThumbStrip
              photos={photos}
              activeIndex={index!}
              onSelect={onIndexChange}
            />
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

function ExifBar({ exif }: { exif: NonNullable<Photo["exif"]> }) {
  const parts: string[] = [];
  if (exif.camera) parts.push(exif.camera);
  if (exif.lens) parts.push(exif.lens);
  if (exif.focal) parts.push(exif.focal);
  if (exif.aperture) parts.push(exif.aperture);
  if (exif.shutter) parts.push(exif.shutter);
  if (exif.iso) parts.push(`ISO ${exif.iso}`);
  if (parts.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] md:text-xs uppercase tracking-[0.2em] text-bone/50">
      {parts.map((p, i) => (
        <span key={i} className="flex items-center gap-3">
          {i > 0 && <span className="text-muted/60">·</span>}
          <span>{p}</span>
        </span>
      ))}
    </div>
  );
}

function NavButton({
  dir,
  onClick,
}: {
  dir: "prev" | "next";
  onClick: () => void;
}) {
  const isPrev = dir === "prev";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? "Previous photo" : "Next photo"}
      className={`absolute top-1/2 -translate-y-1/2 z-10 hidden md:flex h-12 w-12 items-center justify-center rounded-full border border-line/60 text-bone/80 hover:text-bone hover:border-bone/60 hover:bg-paper/40 focus-visible:text-bone focus-visible:border-bone focus-visible:outline-none transition-all duration-300 ${
        isPrev ? "left-4" : "right-4"
      }`}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
        className={isPrev ? "rotate-180" : ""}
      >
        <path
          d="M1 7H13M13 7L8 2M13 7L8 12"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function ThumbStrip({
  photos,
  activeIndex,
  onSelect,
}: {
  photos: Photo[];
  activeIndex: number;
  onSelect: (i: number) => void;
}) {
  const win = 4;
  const start = Math.max(
    0,
    Math.min(activeIndex - win, photos.length - (2 * win + 1))
  );
  const end = Math.min(photos.length, start + 2 * win + 1);
  const slice = photos.slice(start, end);

  return (
    <div className="flex items-center justify-center gap-2 overflow-hidden">
      {slice.map((p, i) => {
        const realIndex = start + i;
        const isActive = realIndex === activeIndex;
        return (
          <button
            key={p.src}
            type="button"
            onClick={() => onSelect(realIndex)}
            className={`relative h-14 w-20 md:h-16 md:w-24 overflow-hidden rounded-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-bone ${
              isActive
                ? "ring-1 ring-bone opacity-100"
                : "opacity-40 hover:opacity-80"
            }`}
            aria-label={`Show photo ${realIndex + 1}`}
            aria-current={isActive ? "true" : undefined}
          >
            <Image
              src={p.src}
              alt=""
              fill
              sizes="100px"
              placeholder="blur"
              blurDataURL={p.blurDataURL}
              className="object-cover"
            />
          </button>
        );
      })}
    </div>
  );
}
