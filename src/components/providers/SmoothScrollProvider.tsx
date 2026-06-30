"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Wraps the app in physics-based smooth scroll (Lenis).
 *
 * Lenis drives a single rAF loop; our canvas frame-sequence hero reads
 * `window` scroll position inside its own passive scroll listener, so no
 * explicit bridge is needed — Lenis updates the real scroll position and
 * the hero reacts to it.
 *
 * Safari/iOS is sensitive: keep `lerp` a touch higher and let touch use
 * native scrolling (syncTouch off) to avoid stutter.
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return; // respect users who opt out of motion
    }

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
      syncTouch: false, // native touch scroll on mobile = no Safari stutter
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
