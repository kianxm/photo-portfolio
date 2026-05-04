"use client";

import { m, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import type { Photo } from "@/lib/albums";

type Props = {
  hero: Photo;
};

export default function Hero({ hero }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] w-full overflow-hidden bg-ink"
    >
      <m.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src={hero.src}
          alt="featured photograph"
          fill
          priority
          quality={85}
          sizes="100vw"
          placeholder="blur"
          blurDataURL={hero.blurDataURL}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/10 to-ink" />
      </m.div>

      <m.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col justify-between px-6 py-8 md:px-10 md:py-10"
      >
        <header className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-bone/70">
          <span>shotbykian</span>
          <nav className="flex gap-4 md:gap-6">
            <a href="#work" className="underline-reveal">Work</a>
            <a href="#about" className="underline-reveal">About</a>
            <a
              href="https://www.instagram.com/shotbykian"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline underline-reveal"
            >
              Instagram
            </a>
          </nav>
        </header>

        <div className="max-w-5xl">
          <m.h1
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="font-display text-[clamp(3rem,11vw,11rem)] leading-[0.88] tracking-tight"
          >
            Kian
            <br />
            <span className="italic text-bone/85">Malakooti</span>
          </m.h1>

          <m.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
            className="mt-6 max-w-md text-balance text-sm md:text-base text-bone/70"
          >
            Photographs from places I&apos;ve been and people I&apos;ve met —
            documentary, commercial, and the quiet in-between.
          </m.p>
        </div>

        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-bone/60"
        >
          <span>Selected work, 2019 — 2025</span>
          <a href="#work" className="flex items-center gap-2 group">
            Scroll
            <span className="inline-block h-[1px] w-10 bg-bone/60 group-hover:w-16 transition-all duration-500" />
          </a>
        </m.div>
      </m.div>
    </section>
  );
}
