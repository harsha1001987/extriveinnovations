"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ══════════════════════════════════════════════════════════════════
   TRACTION — "Proof Reel" (cinematic six-slide slideshow).
   Full-bleed photo slides with Ken Burns drift, a bottom-left scrim, and
   a per-slide instrumentation layer (sponsor mark, status pill, headline,
   body, data-plate). Kept on the dark theme with the site's --accent.

   NOTE on assets: the three source photos in /textures (image.png,
   image2.png, image3.png) are the only versions available and are
   themselves low-resolution (~268×486). They are served at quality 95;
   crispness is limited by the source, not the pipeline.
   ══════════════════════════════════════════════════════════════════ */

const IMAGES = {
    a: "/textures/image.png",   // slides 1–2
    b: "/textures/image2.png",  // slides 3–4
    c: "/textures/image3.png",  // slides 5–6
};

const SLIDES = [
    {
        key: "lt",
        company: "L&T Construction",
        status: "Live · Expanding",
        headline: ["Commercial", "Rollout"],
        body: "Exosuits deployed with L&T pan-India, with the first official PO secured and scale-up to additional plants underway.",
        img: "a",
    },
    {
        key: "maruti",
        company: "Maruti Suzuki",
        status: "MoU Signed",
        headline: ["Approved", "Vendor"],
        body: "MSIL Nurture Programme winner. Direct procurement access. India's #1 automaker — MoU equals approved vendor status.",
        stat: { value: "₹5L", label: "Nurture Prize" },
        logo: { src: "/textures/Maruti.png", alt: "Maruti Suzuki", treatment: "invert" },
        img: "a",
    },
    {
        key: "boeing",
        company: "Boeing India",
        status: "Grant Received",
        headline: ["Aerospace", "Sector"],
        body: "Fortune 50 aerospace validation. Active safety conversation. Opens the aerospace MRO sector for ShoulderEX.",
        stat: { value: "₹10L", label: "BUILD Grant" },
        img: "b",
    },
    {
        key: "army",
        company: "Indian Army",
        status: "Pilot Complete",
        headline: ["Field", "Validation"],
        body: "BackEX has been validated in demanding field conditions, improving endurance and reducing physical strain during critical tasks, while helping build relationships with key defence stakeholders.",
        img: "b",
    },
    {
        key: "aic",
        company: "AIC Mahindra",
        status: "Incubated",
        headline: ["Mahindra Group", "Access"],
        body: "Incubated at AIC Mahindra University. Warm introduction across Mahindra Group manufacturing facilities in India.",
        logo: { src: "/textures/AIC.png", alt: "AIC Mahindra", treatment: "invert" },
        img: "c",
    },
    {
        key: "iith",
        company: "IIT Hyderabad",
        status: "WIP · CoE Applied",
        headline: ["Government", "Backed"],
        body: "Supported by iTIC, IIT Hyderabad, Extrive Innovations secured ₹35 lakhs in government-backed funding — ₹10 lakhs under NIDHI Prayas (DST) and ₹25 lakhs under Seed Support (SISF) to accelerate product development and validation.",
        stat: { value: "₹35L", label: "Gov. Funding" },
        logo: { src: "/textures/IITH.png", alt: "iTIC IIT Hyderabad", treatment: "white" },
        img: "c",
    },
];

const CYCLE_MS = 3000; // per-slide display duration (max 3s)
const IMG_KEYS = ["a", "b", "c"];

function CornerMark({ style }) {
    return (
        <svg width="7" height="7" viewBox="0 0 7 7" aria-hidden="true" style={{ position: "absolute", ...style }}>
            <path d="M3.5 0V7M0 3.5H7" stroke="var(--accent)" strokeWidth="1" />
        </svg>
    );
}

function DataPlate({ stat }) {
    return (
        <div className="pr-plate">
            <CornerMark style={{ top: -3.5, left: -3.5 }} />
            <CornerMark style={{ top: -3.5, right: -3.5 }} />
            <CornerMark style={{ bottom: -3.5, left: -3.5 }} />
            <CornerMark style={{ bottom: -3.5, right: -3.5 }} />
            <span className="pr-plate-label">{stat.label}</span>
            <span className="pr-plate-value">{stat.value}</span>
        </div>
    );
}

export default function TractionSection() {
    const [active, setActive] = useState(0);
    const [visible, setVisible] = useState(false);
    const [paused, setPaused] = useState(false);
    const [reduced, setReduced] = useState(false);

    const sectionRef = useRef(null);
    const fillRefs = useRef([]);
    const activeRef = useRef(0);
    const pausedRef = useRef(false);
    const elapsedRef = useRef(0);
    const resumeTimer = useRef(null);

    useEffect(() => { activeRef.current = active; }, [active]);
    useEffect(() => { pausedRef.current = paused; }, [paused]);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const apply = () => setReduced(mq.matches);
        apply();
        mq.addEventListener("change", apply);
        return () => mq.removeEventListener("change", apply);
    }, []);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.25 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        elapsedRef.current = 0;
        fillRefs.current.forEach((el, i) => {
            if (!el) return;
            el.style.transform = `scaleX(${i < active ? 1 : 0})`;
        });
        if (reduced) {
            const el = fillRefs.current[active];
            if (el) el.style.transform = "scaleX(1)";
        }
    }, [active, reduced]);

    useEffect(() => {
        if (!visible || reduced) return;
        let raf;
        let last = performance.now();
        const tick = (now) => {
            const dt = now - last;
            last = now;
            if (!pausedRef.current) {
                elapsedRef.current += dt;
                const p = Math.min(elapsedRef.current / CYCLE_MS, 1);
                const el = fillRefs.current[activeRef.current];
                if (el) el.style.transform = `scaleX(${p})`;
                if (elapsedRef.current >= CYCLE_MS) {
                    elapsedRef.current = 0;
                    setActive((a) => (a + 1) % SLIDES.length);
                }
            }
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [visible, reduced]);

    const goTo = (i) => {
        setActive(((i % SLIDES.length) + SLIDES.length) % SLIDES.length);
        elapsedRef.current = 0;
        setPaused(true);
        clearTimeout(resumeTimer.current);
        resumeTimer.current = setTimeout(() => setPaused(false), 1500);
    };
    const next = () => goTo(activeRef.current + 1);
    const prev = () => goTo(activeRef.current - 1);

    const onTouchStart = () => {
        setPaused(true);
        clearTimeout(resumeTimer.current);
        resumeTimer.current = setTimeout(() => setPaused(false), 4000);
    };

    useEffect(() => () => clearTimeout(resumeTimer.current), []);

    const slide = SLIDES[active];
    const activeImg = slide.img;

    return (
        <section
            id="traction"
            ref={sectionRef}
            className="pr-section"
            aria-roledescription="carousel"
            aria-label="Traction proof reel"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={onTouchStart}
        >
            <div className="pr-stage">
                {IMG_KEYS.map((k, idx) => (
                    <div key={k} className="pr-bg" style={{ opacity: activeImg === k ? 1 : 0 }} aria-hidden="true">
                        <div className={`pr-kb ${reduced ? "is-static" : ""}`}>
                            <Image
                                src={IMAGES[k]}
                                alt=""
                                fill
                                sizes="100vw"
                                quality={95}
                                priority={idx === 0}
                                loading={idx === 0 ? "eager" : "lazy"}
                                style={{ objectFit: "cover", objectPosition: "center 30%" }}
                            />
                        </div>
                    </div>
                ))}

                <div className="pr-scrim" aria-hidden="true" />
                <div className="pr-vignette" aria-hidden="true" />

                <div className="pr-eyebrow">
                    <span className="pr-eyebrow-mark" aria-hidden="true" />
                    Traction — Proof Reel
                </div>

                <div className="pr-content" key={active}>
                    {slide.logo && (
                        <img className={`pr-logo pr-logo--${slide.logo.treatment}`} src={slide.logo.src} alt={slide.logo.alt} />
                    )}

                    <div className="pr-idrow">
                        <span className="pr-pill">
                            <span className="pr-pill-dot" aria-hidden="true" />
                            {slide.status}
                        </span>
                        <span className="pr-partner">{slide.company}</span>
                    </div>

                    <h2 className="pr-headline">
                        {slide.headline[0]}{" "}
                        <span className="pr-accent">{slide.headline[1]}</span>
                    </h2>

                    {slide.stat && <DataPlate stat={slide.stat} />}

                    <p className="pr-body">{slide.body}</p>
                </div>

                <div className="pr-controls">
                    <button type="button" className="pr-arrow" onClick={prev} aria-label="Previous slide">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M15 5l-7 7 7 7" /></svg>
                    </button>

                    <div className="pr-counter">
                        <span className="pr-counter-now">{String(active + 1).padStart(2, "0")}</span>
                        <span className="pr-counter-sep">/</span>
                        <span className="pr-counter-total">{String(SLIDES.length).padStart(2, "0")}</span>
                    </div>

                    <div className="pr-segments" role="tablist" aria-label="Slides">
                        {SLIDES.map((s, i) => (
                            <button
                                key={s.key}
                                type="button"
                                role="tab"
                                aria-selected={i === active}
                                aria-label={`${s.company} — slide ${i + 1}`}
                                className={`pr-seg ${i === active ? "on" : ""}`}
                                onClick={() => goTo(i)}
                            >
                                <span className="pr-seg-fill" ref={(el) => (fillRefs.current[i] = el)} />
                            </button>
                        ))}
                    </div>

                    <button type="button" className="pr-arrow" onClick={next} aria-label="Next slide">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: STYLES }} />
        </section>
    );
}

const STYLES = `
.pr-section { position: relative; width: 100%; background: var(--bg-void); border-top: 2px solid var(--border); }

.pr-stage { position: relative; width: 100%; height: min(94vh, 900px); min-height: 620px; overflow: hidden; background: #050505; }

.pr-bg { position: absolute; inset: 0; z-index: 0; transition: opacity 720ms cubic-bezier(0.16, 1, 0.3, 1); will-change: opacity; }
.pr-kb { position: absolute; inset: 0; transform-origin: 60% 40%; animation: prKenBurns 9s linear infinite alternate; will-change: transform; }
.pr-kb.is-static { animation: none; transform: scale(1.04); }
@keyframes prKenBurns {
    0%   { transform: scale(1.02) translate(0, 0); }
    100% { transform: scale(1.1) translate(-2%, -1.4%); }
}

.pr-scrim { position: absolute; inset: 0; z-index: 1; pointer-events: none;
    background:
        linear-gradient(to top right, rgba(9,9,11,0.94) 0%, rgba(9,9,11,0.64) 34%, rgba(9,9,11,0.3) 58%, transparent 78%),
        linear-gradient(to top, rgba(9,9,11,0.55) 0%, transparent 42%);
}
.pr-vignette { position: absolute; inset: 0; z-index: 1; pointer-events: none;
    box-shadow: inset 0 0 200px 60px rgba(5,5,5,0.55);
    background: radial-gradient(120% 90% at 70% 30%, transparent 55%, rgba(5,5,5,0.4) 100%);
}

.pr-eyebrow { position: absolute; top: clamp(28px, 5vw, 52px); left: clamp(24px, 6vw, 80px); z-index: 3;
    display: flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: 10px; font-weight: 700;
    letter-spacing: 0.28em; text-transform: uppercase; color: rgba(250,250,250,0.75); }
.pr-eyebrow-mark { width: 5px; height: 5px; background: var(--accent); }

.pr-content { position: absolute; z-index: 3; left: clamp(24px, 6vw, 80px); bottom: clamp(96px, 15vh, 150px);
    max-width: min(560px, 74vw); display: flex; flex-direction: column; align-items: flex-start;
    animation: prContentIn 560ms cubic-bezier(0.16, 1, 0.3, 1); }
@keyframes prContentIn { 0% { opacity: 0; transform: translateY(16px); } 100% { opacity: 1; transform: translateY(0); } }

.pr-logo { height: 26px; max-width: 150px; width: auto; object-fit: contain; object-position: left center; margin-bottom: 22px; opacity: 0.9; }
.pr-logo--invert { filter: grayscale(1) invert(1) contrast(1.05); mix-blend-mode: screen; }
.pr-logo--white { filter: brightness(0) invert(1); opacity: 0.85; }

.pr-idrow { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; flex-wrap: wrap; }
.pr-pill { display: inline-flex; align-items: center; gap: 7px; font-family: var(--font-mono); font-size: 10px; font-weight: 700;
    letter-spacing: 0.08em; padding: 5px 11px; border: 1px solid var(--accent); color: var(--accent);
    background: rgba(255,77,0,0.1); text-transform: uppercase; border-radius: 9999px; }
.pr-pill-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
.pr-partner { font-family: var(--font-mono); font-size: 12px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(250,250,250,0.72); }

.pr-headline { font-family: var(--font-display); font-weight: 400; font-size: clamp(2.4rem, 6vw, 4.4rem);
    line-height: 0.9; letter-spacing: -0.04em; text-transform: uppercase; color: var(--text-primary); margin: 0 0 22px;
    text-shadow: 0 2px 30px rgba(0,0,0,0.5); }
.pr-accent { color: var(--accent); }

.pr-plate { position: relative; display: inline-flex; flex-direction: column; gap: 4px; padding: 16px 22px; margin-bottom: 24px;
    border: 1px solid var(--border);
    background: linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px) 0 0 / 20px 20px,
        linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px) 0 0 / 20px 20px, rgba(9,9,11,0.55);
    backdrop-filter: blur(6px); }
.pr-plate-label { font-family: var(--font-mono); font-size: 9px; font-weight: 700; letter-spacing: 0.26em; text-transform: uppercase; color: rgba(250,250,250,0.6); }
.pr-plate-value { font-family: var(--font-mono); font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 700; letter-spacing: 0.01em; line-height: 1; color: var(--accent); }

.pr-body { font-family: var(--font-body); font-weight: 400; font-size: clamp(0.9rem, 1.15vw, 1.02rem); line-height: 1.65; color: rgba(250,250,250,0.82); max-width: 500px; margin: 0; }

.pr-controls { position: absolute; z-index: 4; left: clamp(24px, 6vw, 80px); right: clamp(24px, 6vw, 80px); bottom: clamp(28px, 5vh, 46px);
    display: flex; align-items: center; gap: 18px; }
.pr-arrow { display: flex; align-items: center; justify-content: center; width: 34px; height: 34px; flex-shrink: 0;
    background: transparent; border: 1px solid var(--border); color: var(--accent); cursor: pointer;
    transition: border-color 200ms ease, background 200ms ease, color 200ms ease; }
.pr-arrow:hover { border-color: var(--accent); background: rgba(255,77,0,0.08); }
.pr-counter { display: flex; align-items: baseline; gap: 4px; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.08em; flex-shrink: 0; min-width: 62px; }
.pr-counter-now { color: var(--text-primary); font-weight: 700; }
.pr-counter-sep { color: rgba(250,250,250,0.4); }
.pr-counter-total { color: rgba(250,250,250,0.5); }

.pr-segments { display: flex; gap: 8px; flex: 1; min-width: 0; }
.pr-seg { position: relative; flex: 1; height: 24px; display: flex; align-items: center; background: transparent; border: none; padding: 0; cursor: pointer; }
.pr-seg::before { content: ""; position: absolute; left: 0; right: 0; top: 50%; margin-top: -1px; height: 2px; background: rgba(255,255,255,0.18); }
.pr-seg.on::before { background: rgba(255,255,255,0.28); }
.pr-seg-fill { position: absolute; left: 0; right: 0; top: 50%; margin-top: -1px; height: 2px; background: var(--accent); transform: scaleX(0); transform-origin: left center; will-change: transform; }

@media (max-width: 768px) {
    .pr-stage { height: min(92vh, 760px); min-height: 560px; }
    .pr-content { bottom: clamp(104px, 18vh, 150px); max-width: 86vw; }
    .pr-headline { font-size: clamp(2.1rem, 11vw, 3rem); }
    .pr-counter { min-width: 54px; font-size: 11px; }
    .pr-arrow { width: 30px; height: 30px; }
    .pr-controls { gap: 12px; }
}
@media (max-width: 520px) { .pr-arrow { display: none; } }

@media (prefers-reduced-motion: reduce) {
    .pr-kb { animation: none; transform: scale(1.04); }
    .pr-bg { transition: none; }
    .pr-content { animation: none; }
}
`;
