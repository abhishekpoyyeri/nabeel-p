"use client";

import { useEffect, useRef, useState } from "react";
import {
  USE_IMAGE_FRAMES,
  FRAME_COUNT,
  framePath,
  drawProceduralFrame,
} from "@/lib/frameSequence";

/** Annotation cards that toggle on as the sequence scrubs past their range. */
const ANNOTATIONS = [
  {
    id: "biomed",
    value: "Biomedical",
    label: "Passionate learner",
    show: 0.18,
    hide: 0.5,
    pos: "left-[6%] top-[28%]",
  },
  {
    id: "healthtech",
    value: "HealthTech",
    label: "Curious explorer",
    show: 0.34,
    hide: 0.7,
    pos: "right-[7%] top-[34%]",
  },
  {
    id: "guidance",
    value: "Guidance",
    label: "Student consultant",
    show: 0.55,
    hide: 0.92,
    pos: "left-[10%] bottom-[20%]",
  },
] as const;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const tickingRef = useRef(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const sizeRef = useRef({ w: 0, h: 0, zoom: 1 });

  const [progress, setProgress] = useState(0); // preload %
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState<string[]>([]);
  const visibleKeyRef = useRef("");

  // ── Preload ──────────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    if (USE_IMAGE_FRAMES) {
      let done = 0;
      const imgs: HTMLImageElement[] = [];
      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        img.src = framePath(i);
        img.onload = img.onerror = () => {
          if (cancelled) return;
          done++;
          setProgress(Math.round((done / FRAME_COUNT) * 100));
          if (done === FRAME_COUNT) setLoaded(true);
        };
        imgs[i] = img;
      }
      imagesRef.current = imgs;
    } else {
      // Procedural mode: nothing to fetch, but warm up the bar so the intro
      // reads as a real "preparing sequence" rather than a flash.
      let p = 0;
      const id = setInterval(() => {
        if (cancelled) return;
        p += 8 + Math.round(Math.random() * 10);
        if (p >= 100) {
          p = 100;
          setProgress(100);
          setLoaded(true);
          clearInterval(id);
        } else {
          setProgress(p);
        }
      }, 45);
      return () => {
        cancelled = true;
        clearInterval(id);
      };
    }

    return () => {
      cancelled = true;
    };
  }, []);

  // ── Canvas sizing (DPR-aware) ──────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      const zoom = w < 768 ? 1.3 : 1;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w, h, zoom };
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // ── Render one frame for a given scroll progress (0..1) ────────────────────
  const render = (p: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const { w, h, zoom } = sizeRef.current;
    const frame = Math.min(FRAME_COUNT - 1, Math.floor(p * FRAME_COUNT));

    if (USE_IMAGE_FRAMES) {
      const img = imagesRef.current[frame];
      if (img && img.complete && img.naturalWidth) {
        // cover-fit, centered
        const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight) * zoom;
        const dw = img.naturalWidth * scale;
        const dh = img.naturalHeight * scale;
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
      }
    } else {
      drawProceduralFrame(ctx, w, h, frame, zoom);
    }

    // Fade the title overlay out as the sequence plays in.
    if (overlayRef.current) {
      overlayRef.current.style.opacity = String(Math.max(0, 1 - p * 2.2));
    }

    // Toggle annotation cards — only setState when the visible set changes.
    const next = ANNOTATIONS.filter((a) => p >= a.show && p < a.hide).map(
      (a) => a.id
    );
    const key = next.join(",");
    if (key !== visibleKeyRef.current) {
      visibleKeyRef.current = key;
      setVisible(next);
    }
  };

  // ── Scroll handler: RAF + ticking guard, passive listener ──────────────────
  useEffect(() => {
    if (!loaded) return;

    const onScrollTick = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / scrollable));
      render(p);
    };

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        onScrollTick();
        tickingRef.current = false;
      });
    };

    onScrollTick(); // initial paint
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-[400vh] scroll-animation"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {/* Ghost wordmark + title overlay */}
        <div
          ref={overlayRef}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent accent-glow" />
            Biomedical · Student Consultant
          </span>
          <h1 className="ghost-text text-[16vw] font-black leading-[0.82] tracking-tighter md:text-[14vw]">
            AHAMED
            <br />
            NABEEL
          </h1>
          <p className="mt-4 text-sm font-medium uppercase tracking-[0.4em] text-accent md:text-base">
            Med-Tech Explorer
          </p>
          <p className="mt-8 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted">
            Scroll to begin
            <span className="block h-10 w-px animate-pulse bg-gradient-to-b from-accent to-transparent" />
          </p>
        </div>

        {/* Annotation cards */}
        {ANNOTATIONS.map((a) => (
          <div
            key={a.id}
            className={`pointer-events-none absolute ${a.pos} max-w-[180px] transition-all duration-500 ${
              visible.includes(a.id)
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <div className="glass rounded-2xl px-5 py-4">
              <div className="text-3xl font-black tracking-tighter text-accent">
                {a.value}
              </div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted">
                {a.label}
              </div>
            </div>
          </div>
        ))}

        {/* Loading overlay */}
        {!loaded && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background">
            <div className="text-xs uppercase tracking-[0.4em] text-muted">
              Preparing sequence
            </div>
            <div className="mt-5 h-px w-56 overflow-hidden bg-white/10">
              <div
                className="h-full bg-accent transition-[width] duration-150 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-3 font-mono text-xs text-accent">
              {progress}%
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
