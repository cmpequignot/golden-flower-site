"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/*
  A record sleeve with real thickness (front, back and four edge faces in a
  preserve-3d box) that rotates toward the mouse. Pointer tracking is done on
  the window so the sleeve reacts as the cursor approaches, and the tilt is
  eased frame by frame for a bit of weight. Falls back to the CSS rest pose
  (still 3D, just static) without JS, on touch, and for reduced motion.
*/

/**
 * Rest pose — a slight 3/4 turn so the sleeve reads as an object, not a flat
 * image. Also hard-coded as the box's CSS transform so the pose is right before
 * (and without) JS; keep the two in sync.
 */
const REST_X = -3.5;
const REST_Y = 6;
/** Extra degrees the pointer can add on top of the rest pose. */
const MAX_TILT = 12;
/** Distance (in half-widths from center) where pointer influence reaches zero. */
const FALLOFF = 2.4;
/** Per-frame easing toward the target tilt. */
const EASE = 0.12;

type Props = {
  src: string;
  alt: string;
  className?: string;
};

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

export default function AlbumArt3D({ src, alt, className }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const box = boxRef.current;
    if (!root || !box) return;

    // Tilt is a pointer affordance: skip it on touch and when motion is reduced.
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    const target = { x: 0, y: 0, gx: 50, gy: 50, k: 0 };
    const current = { ...target };
    let raf = 0;

    const draw = () => {
      box.style.transform =
        `rotateX(${(REST_X + current.y).toFixed(3)}deg) ` +
        `rotateY(${(REST_Y + current.x).toFixed(3)}deg) ` +
        `scale(${(1 + current.k * 0.015).toFixed(4)})`;
      root.style.setProperty("--gx", `${current.gx.toFixed(2)}%`);
      root.style.setProperty("--gy", `${current.gy.toFixed(2)}%`);
      root.style.setProperty("--lift", current.k.toFixed(3));
      root.style.setProperty("--shadow-x", `${(-current.x * 0.9).toFixed(2)}px`);
      root.style.setProperty("--shadow-y", `${(current.y * 0.6).toFixed(2)}px`);
    };

    const tick = () => {
      let settled = true;
      for (const key of ["x", "y", "gx", "gy", "k"] as const) {
        const delta = target[key] - current[key];
        if (Math.abs(delta) > 0.001) settled = false;
        current[key] += delta * EASE;
      }
      draw();
      raf = settled ? 0 : requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const nx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const ny = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      // Full influence over the sleeve itself, fading out as the cursor leaves.
      const distance = Math.max(Math.abs(nx), Math.abs(ny));
      const k = clamp((FALLOFF - distance) / (FALLOFF - 1), 0, 1);

      target.k = k;
      target.x = clamp(nx, -1, 1) * MAX_TILT * k;
      target.y = -clamp(ny, -1, 1) * MAX_TILT * k;
      target.gx = clamp(50 + nx * 50, -20, 120);
      target.gy = clamp(50 + ny * 50, -20, 120);
      wake();
    };

    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      target.k = 0;
      target.gx = 50;
      target.gy = 50;
      wake();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("blur", onLeave);
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", onLeave);
      document.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Cardboard is opaque: without hidden backfaces you see the inside of the
  // sleeve (mirrored) through the cover once an edge turns away.
  const opaque = "[backface-visibility:hidden]";

  return (
    <div
      ref={rootRef}
      className={`[--depth:14px] [--gx:50%] [--gy:50%] [--lift:0] [--shadow-x:0px] [--shadow-y:0px] [perspective:1200px] sm:[--depth:22px] ${className ?? ""}`}
    >
      <div
        ref={boxRef}
        className="relative aspect-square w-full [transform-style:preserve-3d] [transform:rotateX(-3.5deg)_rotateY(6deg)] [will-change:transform]"
      >
        {/* Contact shadow, cast behind the sleeve and nudged opposite the tilt */}
        <div
          aria-hidden
          className="absolute inset-x-[4%] bottom-[-7%] h-[14%] rounded-[50%] bg-ink/35 blur-2xl"
          style={{
            transform:
              "translate3d(var(--shadow-x), var(--shadow-y), calc(var(--depth) * -4))",
            opacity: "calc(0.55 + var(--lift) * 0.35)",
          }}
        />

        {/* Back of the sleeve */}
        <div
          aria-hidden
          className={`absolute inset-0 rounded-[3px] bg-gradient-to-br from-paper-alt to-line ${opaque}`}
          style={{ transform: "translateZ(calc(var(--depth) / -2))" }}
        />

        {/* Spine (left edge) — the folded side, so it catches the least light */}
        <div
          aria-hidden
          className={`absolute inset-y-0 left-0 w-[var(--depth)] bg-gradient-to-b from-[#e3dbcc] via-[#cdc3b0] to-[#b3a894] ${opaque}`}
          style={{ transform: "translateX(calc(var(--depth) / -2)) rotateY(-90deg)" }}
        />

        {/* Opening (right edge) — darker still, the gap the record slides into */}
        <div
          aria-hidden
          className={`absolute inset-y-0 right-0 w-[var(--depth)] bg-gradient-to-l from-[#9a8f7c] via-[#c6bca9] to-[#e0d8c9] ${opaque}`}
          style={{ transform: "translateX(calc(var(--depth) / 2)) rotateY(90deg)" }}
        />

        {/* Top and bottom edges */}
        <div
          aria-hidden
          className={`absolute inset-x-0 top-0 h-[var(--depth)] bg-gradient-to-r from-[#ded5c4] via-[#eae3d6] to-[#c4baa6] ${opaque}`}
          style={{ transform: "translateY(calc(var(--depth) / -2)) rotateX(90deg)" }}
        />
        <div
          aria-hidden
          className={`absolute inset-x-0 bottom-0 h-[var(--depth)] bg-gradient-to-r from-[#b8ad99] via-[#cec4b1] to-[#a1967f] ${opaque}`}
          style={{ transform: "translateY(calc(var(--depth) / 2)) rotateX(-90deg)" }}
        />

        {/* Front cover */}
        <div
          className={`absolute inset-0 overflow-hidden rounded-[3px] border border-line shadow-lg ${opaque}`}
          style={{ transform: "translateZ(calc(var(--depth) / 2))" }}
        >
          <Image
            src={src}
            alt={alt}
            width={1400}
            height={1400}
            sizes="(max-width: 768px) 90vw, 448px"
            className="h-full w-full object-cover"
          />

          {/* Lighting: the sleeve shades away from the cursor… */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(130% 130% at var(--gx) var(--gy), rgba(255,255,255,0.3) 0%, rgba(23,48,60,0) 45%, rgba(23,48,60,0.15) 100%)",
            }}
          />
          {/* …and a laminate sheen slides across it */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-[-30%] mix-blend-soft-light"
            style={{
              background:
                "linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.9) 50%, transparent 62%)",
              transform: "translateX(calc((var(--gx) - 50%) * 0.9))",
              opacity: "calc(0.25 + var(--lift) * 0.6)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
