"use client";

import { useReducedMotion } from "framer-motion";

/* ══════════════════════════════════════════════════════════════════
   Hero — Single Continuous Cinematic Composition
   Left (~52 %): typography, heavily faded gradient
   Right (~48 %): Worker wearing BackEx exosuit, monumental scale
   ══════════════════════════════════════════════════════════════════ */

export default function Hero() {
    const reduced = useReducedMotion();

    const scrollToAbout = (e) => {
        e.preventDefault();
        const el = document.getElementById("about");
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section id="hero" className="xh">
            {/* ── 1. Shared environmental layers ── */}
            <div className="xh-env" aria-hidden="true">
                <div className="xh-env-light" />
                <div className="xh-env-texture" />
                <div className="xh-env-lines" />
            </div>

            {/* ── 2 & 3. Worker Image & Black Gradient Overlay ── */}
            <div className="xh-worker" aria-hidden="true">
                <div
                    className="xh-worker-img"
                    role="img"
                    aria-label="Industrial worker wearing BackEx exosuit"
                />
                <div className="xh-worker-gradient"></div>
            </div>

            {/* ── 4. Typography (Left Side) ── */}
            <div className="xh-canvas">
                <div className="xh-left">
                    <span className="xh-meta" aria-label="System status">
                        SYSTEM ACTIVE &nbsp;•&nbsp; INDIA &nbsp;•&nbsp; 2026
                    </span>

                    <h1 className="xh-h1">
                        <span className="xh-line">Empowering Motion</span>
                        <span className="xh-line xh-accent">Enhancing Lives.</span>
                    </h1>

                    <p className="xh-body">
                        Extrive Innovations engineers passive industrial exoskeletons
                        that reduce musculoskeletal load, improve operator safety, and
                        increase throughput across manufacturing, logistics, construction,
                        and defence operations.
                    </p>

                    <a
                        href="#about"
                        className="xh-cta"
                        onClick={scrollToAbout}
                    >
                        Learn More
                    </a>
                </div>

                {/* Right half is intentionally empty to maintain the split-screen CSS grid and keep left content perfectly aligned */}
                <div className="xh-right"></div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: STYLES }} />
        </section>
    );
}

/* ═══════════════════════════════════════════════════════════════════
   Scoped styles
   ═══════════════════════════════════════════════════════════════════ */

const STYLES = `
/* ── Section ────────────────────────────────────────────────── */
.xh {
    position: relative;
    min-height: 100vh;
    background: var(--bg-void);
    overflow: hidden;
}

/* ── 1. Environmental background (three quiet layers) ──────── */
.xh-env {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
}

/* Ambient light — large soft orange pool, off-center toward the
   right half where the worker stands. Drifts imperceptibly. */
.xh-env-light {
    position: absolute;
    inset: -16%;
    background: radial-gradient(
        55% 50% at 72% 30%,
        rgba(255, 118, 51, 0.11)  0%,
        rgba(228, 106, 47, 0.065) 22%,
        rgba(158,  78, 40, 0.028) 44%,
        rgba(86,   48, 27, 0.008) 64%,
        rgba(9,     9, 11, 0)     82%
    );
    will-change: transform;
    animation: xhDrift 36s ease-in-out infinite;
}
@keyframes xhDrift {
    0%   { transform: translate3d(0, 0, 0); }
    50%  { transform: translate3d(-10px, 7px, 0); }
    100% { transform: translate3d(0, 0, 0); }
}

/* Brushed anodized-aluminium texture */
.xh-env-texture {
    position: absolute;
    inset: 0;
    background-image:
        repeating-linear-gradient(90deg,
            rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px,
            transparent 1px, transparent 3px),
        repeating-linear-gradient(90deg,
            rgba(255,255,255,0.009) 0px, rgba(255,255,255,0.009) 1px,
            transparent 1px, transparent 2px);
}

/* Construction reference lines */
.xh-env-lines {
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(90deg, rgba(190,195,205,0.055), rgba(190,195,205,0.055)),
        linear-gradient(90deg, rgba(190,195,205,0.04),  rgba(190,195,205,0.04)),
        linear-gradient(0deg,  rgba(190,195,205,0.035), rgba(190,195,205,0.035));
    background-repeat: no-repeat;
    background-size: 1px 100%, 1px 100%, 100% 1px;
    background-position: 7% 0, 52% 0, 0 72%;
}

/* ── 2 & 3. Worker Image Layer ─────────────────────────────── */
.xh-worker {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    overflow: hidden;
}

/* Monumental scale, extending beyond viewport, pushed right.
   A tight cinematic crop: head cropped just above the viewport, the exosuit
   buckle near centre, the back and arms filling the right half. The studio
   background of the source photo is faded seamlessly into the page void with
   a radial mask (soft-edge vignette centred on the worker) so no hard
   rectangle seam is visible — the figure appears embedded in the environment
   rather than pasted on top of it. */
.xh-worker-img {
    position: absolute;
    inset: 0;
    background-image: url('/textures/BackEX.png');
    background-repeat: no-repeat;
    background-size: auto 245%;
    background-position: 100% 46%;
    filter: contrast(1.15) brightness(1.05) saturate(1.05);
    -webkit-mask-image: radial-gradient(
        78% 82% at 70% 46%,
        #000 55%,
        rgba(0, 0, 0, 0.5) 74%,
        transparent 92%
    );
    mask-image: radial-gradient(
        78% 82% at 70% 46%,
        #000 55%,
        rgba(0, 0, 0, 0.5) 74%,
        transparent 92%
    );
}

/* Heavy black gradient to gradually disappear the image towards the left,
   leaving only a very faint (~5-10%) continuation of the silhouette. */
.xh-worker-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        to right,
        rgba(9, 9, 11, 1.0) 0%,
        rgba(9, 9, 11, 0.99) 30%,
        rgba(9, 9, 11, 0.88) 46%,
        rgba(9, 9, 11, 0.55) 60%,
        rgba(9, 9, 11, 0.18) 78%,
        rgba(9, 9, 11, 0.0) 100%
    );
}

/* ── 4. Canvas — split grid ────────────────────────────────── */
.xh-canvas {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: 52fr 48fr;
    min-height: 100vh;
    max-width: 1500px;
    margin: 0 auto;
    padding: 0 clamp(20px, 4vw, 56px);
}

/* ── Left half (Typography) ────────────────────────────────── */
.xh-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: clamp(120px, 16vh, 200px) 0 clamp(60px, 10vh, 120px);
    padding-right: clamp(24px, 4vw, 72px);
}

/* Metadata label */
.xh-meta {
    display: block;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    font-weight: 400;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-secondary);
    opacity: 0.55;
    margin-bottom: clamp(24px, 3.5vh, 40px);
    line-height: 1;
}

/* Headline */
.xh-h1 {
    font-family: var(--font-archivo-flex, var(--font-display));
    font-weight: 700;
    text-transform: uppercase;
    font-size: clamp(2.6rem, 5.6vw, 6.4rem);
    line-height: 0.92;
    letter-spacing: -0.035em;
    color: var(--text-primary);
    margin: 0;
}
.xh-line {
    display: block;
}
.xh-line + .xh-line {
    margin-top: 0.06em;
}
.xh-accent {
    color: var(--accent);
}

/* Value proposition */
.xh-body {
    max-width: 620px;
    margin: 24px 0 0;
    font-family: var(--font-body);
    font-weight: 400;
    font-size: clamp(0.95rem, 1.15vw, 1.1rem);
    line-height: 1.65;
    color: var(--text-secondary);
    letter-spacing: 0.005em;
}

/* CTA */
.xh-cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    align-self: flex-start;
    height: 52px;
    padding: 0 36px;
    margin-top: 36px;
    border: 1px solid rgba(255,255,255,0.25);
    border-radius: 0;
    background: transparent;
    color: var(--text-primary);
    font-family: var(--font-mono);
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    transition:
        border-color 400ms ease,
        background-color 400ms ease,
        color 400ms ease;
}
.xh-cta:hover {
    border-color: var(--accent);
    background: rgba(255, 77, 0, 0.08);
    color: var(--text-primary);
}
.xh-cta:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
}

/* Right half container — kept for maintaining grid structure */
.xh-right {
    pointer-events: none;
}

/* ── Responsive ────────────────────────────────────────────── */
@media (max-width: 900px) {
    .xh-canvas {
        grid-template-columns: 1fr;
        min-height: auto;
    }
    .xh-left {
        padding-right: 0;
        padding-bottom: clamp(40px, 8vh, 80px);
        min-height: 100vh;
    }
    .xh-worker-img {
        background-size: auto 118%;
        background-position: 68% 18%;
        opacity: 0.55;
    }
    .xh-worker-gradient {
        background: linear-gradient(
            to top,
            rgba(9, 9, 11, 1) 0%,
            rgba(9, 9, 11, 0.85) 32%,
            rgba(9, 9, 11, 0.45) 62%,
            rgba(9, 9, 11, 0.12) 100%
        );
    }
    .xh-h1 {
        font-size: clamp(2.2rem, 9vw, 4rem);
    }
    .xh-env-light {
        background: radial-gradient(
            70% 50% at 50% 35%,
            rgba(255, 118, 51, 0.09)  0%,
            rgba(228, 106, 47, 0.05)  25%,
            rgba(158,  78, 40, 0.02)  50%,
            rgba(9,     9, 11, 0)     75%
        );
    }
}

@media (max-width: 480px) {
    .xh-h1 {
        font-size: clamp(1.9rem, 10vw, 3rem);
    }
    .xh-meta {
        font-size: 0.62rem;
    }
    .xh-worker-img {
        background-position: 72% 16%;
    }
}

/* ── Reduced motion ────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
    .xh-env-light {
        animation: none;
    }
    .xh-cta:hover {
        transition: none;
    }
}
}
`;
