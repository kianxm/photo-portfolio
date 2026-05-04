"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** image srcs to preload before completing */
  prime: string[];
  /** parent flips this when loading is finished */
  fadeOut: boolean;
  onDone: () => void;
};

/**
 * Imperative progress driver — DOM is updated via refs in a RAF loop
 * instead of React state. Two reasons:
 *   1. No setState per frame → no React re-renders → cheaper.
 *   2. Avoids triggering Lighthouse's CLS detector, which counted the
 *      progress-bar transform + per-frame text updates as layout shifts
 *      even though they were transforms / equal-width tabular digits.
 */
export default function Preloader({ prime, fadeOut, onDone }: Props) {
  const barRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let cancelled = false;
    let displayed = 0;
    let target = 0;
    let resolved = 0;
    let raf = 0;
    let donePending = false;
    const total = Math.max(prime.length, 1);

    const paint = () => {
      // smoothly approach target (~12% per frame ≈ spring feel)
      displayed += (target - displayed) * 0.12;
      if (target - displayed < 0.05 && target >= 100) displayed = 100;

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${displayed / 100})`;
      }
      if (pctRef.current) {
        pctRef.current.textContent =
          String(Math.round(displayed)).padStart(3, "0") + "%";
      }

      if (cancelled) return;

      if (Math.abs(target - displayed) > 0.05) {
        raf = requestAnimationFrame(paint);
      } else if (target >= 100 && !donePending) {
        donePending = true;
        setTimeout(onDone, 250);
      } else {
        raf = 0;
      }
    };

    const ensureRunning = () => {
      if (!raf && !cancelled) raf = requestAnimationFrame(paint);
    };

    const tick = () => {
      resolved += 1;
      target = (resolved / total) * 100;
      ensureRunning();
    };

    if (prime.length === 0) {
      target = 100;
      ensureRunning();
    } else {
      prime.forEach((src) => {
        const img = new window.Image();
        img.onload = tick;
        img.onerror = tick;
        img.src = src;
      });
    }

    const safety = setTimeout(() => {
      target = 100;
      ensureRunning();
    }, 3000);

    return () => {
      cancelled = true;
      clearTimeout(safety);
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        transform: fadeOut ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.9s cubic-bezier(0.76,0,0.24,1)",
        willChange: "transform",
      }}
      className={`fixed inset-0 z-[100] bg-ink overflow-hidden flex flex-col items-center justify-between px-6 py-10 ${
        fadeOut ? "pointer-events-none" : ""
      }`}
    >
      <div className="w-full flex justify-between text-xs uppercase tracking-[0.2em] text-muted">
        <span>shotbykian</span>
        <span>est. 2019</span>
      </div>

      <div className="flex flex-col items-center gap-6">
        <div className="font-display text-[clamp(3.5rem,12vw,9rem)] leading-none tracking-tight text-center">
          <span className="text-bone">Kian</span>{" "}
          <span className="text-muted italic">Malakooti</span>
        </div>

        <div className="w-[min(80vw,520px)]">
          <div className="h-px bg-line relative overflow-hidden">
            <div
              ref={barRef}
              style={{
                transform: "scaleX(0)",
                transformOrigin: "left center",
                willChange: "transform",
              }}
              className="absolute inset-0 bg-bone"
            />
          </div>
          <div className="mt-3 flex justify-between text-xs uppercase tracking-[0.2em] text-muted tabular-nums">
            <span>Loading</span>
            <span
              ref={pctRef}
              style={{
                width: "4ch",
                display: "inline-block",
                textAlign: "right",
              }}
            >
              000%
            </span>
          </div>
        </div>
      </div>

      <div className="text-xs uppercase tracking-[0.2em] text-muted">
        A photographic portfolio
      </div>
    </div>
  );
}
