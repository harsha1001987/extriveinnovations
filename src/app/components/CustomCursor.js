"use client";

import { useEffect, useRef } from "react";

/**
 * Precision custom cursor.
 * - Desktop only (hover: hover & pointer: fine).
 * - Two layers: solid dot tracks 1:1, ring lerps for refined trail.
 * - State classes are flipped via element.closest() — kept restrained,
 *   no glow, no scaling gimmicks.
 */
export default function CustomCursor() {
  const wrapRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;

    const wrap = wrapRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!wrap || !dot || !ring) return;

    document.documentElement.classList.add("has-custom-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let dx = mx;
    let dy = my;
    let rx = mx;
    let ry = my;
    let raf = 0;
    let visible = false;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dx = mx;
      dy = my;
      if (!visible) {
        visible = true;
        wrap.classList.add("is-visible");
      }
    };

    const onLeave = () => {
      visible = false;
      wrap.classList.remove("is-visible");
    };

    const onDown = () => wrap.classList.add("is-down");
    const onUp = () => wrap.classList.remove("is-down");

    const STATE_CLASSES = [
      "is-link",
      "is-hidden",
      "is-product",
      "is-founder",
      "is-media",
      "is-node",
    ];

    const setState = (cls) => {
      let changed = false;
      STATE_CLASSES.forEach((c) => {
        if (c === cls) {
          if (!wrap.classList.contains(c)) {
            wrap.classList.add(c);
            changed = true;
          }
        } else if (wrap.classList.contains(c)) {
          wrap.classList.remove(c);
          changed = true;
        }
      });
      return changed;
    };

    const resolveState = (target) => {
      if (!(target instanceof Element)) return null;
      // Form / media controls — get out of the way.
      if (
        target.closest(
          "input, textarea, select, [contenteditable=''], [contenteditable='true']"
        )
      )
        return "is-hidden";
      // Section-aware states (most specific first).
      if (target.closest('[data-cursor="node"]')) return "is-node";
      if (target.closest('[data-cursor="media"], video')) return "is-media";
      if (target.closest('[data-cursor="product"]')) return "is-product";
      if (target.closest('[data-cursor="founder"]')) return "is-founder";
      if (target.closest('a, button, [role="button"]')) return "is-link";
      return null;
    };

    const onOver = (e) => {
      setState(resolveState(e.target));
    };

    const tick = () => {
      // Ring lerps; dot is exact.
      rx += (dx - rx) * 0.18;
      ry += (dy - ry) * 0.18;
      dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div ref={wrapRef} className="custom-cursor" aria-hidden="true">
      <div ref={ringRef} className="custom-cursor-ring" />
      <div ref={dotRef} className="custom-cursor-dot" />
    </div>
  );
}
