"use client";

import { useEffect, useRef } from "react";

export default function ParticleField() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let rafId;
    let particles = [];
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const count = w < 768 ? 35 : 80;
      particles = [];
      for (let i = 0; i < count; i++) {
        const centerBias = Math.pow(Math.random(), 0.55);
        const angle = Math.random() * Math.PI * 2;
        const radius = centerBias * Math.min(w, h) * 0.55;
        const orange = Math.random() < 0.1;
        const size = 0.5 + Math.random() * 1.5;
        // Depth: smaller particles drift slower (feel farther away)
        const depthSpeed = 0.12 + (size / 2) * 0.16;
        particles.push({
          x: w / 2 + Math.cos(angle) * radius,
          y: h / 2 + Math.sin(angle) * radius,
          vx: (Math.random() - 0.5) * depthSpeed,
          vy: (Math.random() - 0.5) * depthSpeed,
          size,
          baseOpacity: orange
            ? 0.10 + Math.random() * 0.05   // max 0.15
            : 0.05 + Math.random() * 0.07,  // max 0.12
          orange,
        });
      }
    };

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const maxDist = Math.hypot(cx, cy);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = w + 20;
        else if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        else if (p.y > h + 20) p.y = -20;

        const mdx = p.x - mouseRef.current.x;
        const mdy = p.y - mouseRef.current.y;
        const mdist = Math.hypot(mdx, mdy);
        if (mdist < 120 && mdist > 0.01) {
          const force = (1 - mdist / 120) * 0.12;
          p.x += (mdx / mdist) * force;
          p.y += (mdy / mdist) * force;
        }

        const distFromCenter = Math.hypot(p.x - cx, p.y - cy);
        const edgeFade = 1 - Math.min(1, distFromCenter / maxDist) * 0.75;
        const opacity = p.baseOpacity * edgeFade;

        if (p.orange) {
          ctx.shadowColor = "rgba(255,106,0,0.6)";
          ctx.shadowBlur = 2;
          ctx.fillStyle = `rgba(255,106,0,${opacity})`;
        } else {
          ctx.shadowBlur = 0;
          ctx.fillStyle = `rgba(255,255,255,${opacity})`;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      rafId = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const onLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    const onResize = () => {
      resize();
      init();
    };

    resize();
    init();
    draw();

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 5 }}
    />
  );
}
