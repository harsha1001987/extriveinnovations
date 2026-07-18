"use client";

import { useEffect, useRef, useState } from "react";
import HardFlipCard from "./brutalist/HardFlipCard";

/* ══════════════════════════════════════════════════════════════════
   Part 6 — About. Core concept kept: 3-phase toggle (STRAIN / SUPPORT /
   AUGMENTATION), body silhouette that redraws per phase, node-hover
   diagnostics, auto-cycle w/ hover-pause, industry grid. Restyled to the
   brutalist system: sharp segmented control (hard accent fill), flat
   line-art (no glow), instant sharp HUD, ONE accent — phases differ by
   opacity/pattern, not hue. Industry grid = HardFlipCards.
   ══════════════════════════════════════════════════════════════════ */

const NODE_DATA = {
    cervical: { title: "Cervical & Upper Thoracic", desc: "Tension and postural fatigue from sustained awkward angles.", suit: "ShoulderEX" },
    shoulder: { title: "Deltoid & Rotator Cuff", desc: "High micro-tear risk from repetitive overhead lifting and static holds.", suit: "ShoulderEX" },
    lumbar: { title: "Lumbar L5-S1 Compression", desc: "Extreme disc pressure and erector spinae strain from heavy lifting.", suit: "BackEX" },
    hip: { title: "Pelvic & Lower-Back Linkage", desc: "Kinetic chain breakdown causing radiating lower-back fatigue.", suit: "BackEX" },
};

const INDUSTRIES = [
    { name: "Manufacturing", desc: "Repetitive-motion strain reduction on assembly lines." },
    { name: "Logistics", desc: "Lift-assist and postural intelligence for warehouse operations." },
    { name: "Construction", desc: "Overhead task support and fatigue monitoring on-site." },
    { name: "Defence", desc: "Load-carriage augmentation and movement intelligence." },
];

const PHASES = [
    { label: "Strain", text: "That same strain — sustained and unaddressed — limits workforce potential." },
    { label: "Support", text: "Extrive delivers structural support through wearable robotics." },
    { label: "Augmentation", text: "Assistive hardware meets ergonomics intelligence." },
];

const BODY = (
    <g stroke="var(--text-secondary)" strokeWidth="2" fill="none">
        <ellipse cx="100" cy="42" rx="22" ry="26" />
        <line x1="100" y1="68" x2="100" y2="180" />
        <line x1="100" y1="90" x2="55" y2="145" />
        <line x1="100" y1="90" x2="145" y2="145" />
        <line x1="100" y1="180" x2="65" y2="290" />
        <line x1="100" y1="180" x2="135" y2="290" />
    </g>
);

const NODE_POS = {
    cervical: { cx: 100, cy: 90 },
    shoulderL: { cx: 75, cy: 120, data: "shoulder" },
    shoulderR: { cx: 125, cy: 120, data: "shoulder" },
    lumbar: { cx: 100, cy: 145 },
    hip: { cx: 100, cy: 180 },
};

export default function AboutSection() {
    const [active, setActive] = useState(0);
    const [visible, setVisible] = useState(false);
    const [hovered, setHovered] = useState(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVisible(true); },
            { threshold: 0.15 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    // Auto-cycle phases; pause while inspecting a node. Respect reduced-motion.
    useEffect(() => {
        if (!visible || hovered) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const id = setInterval(() => setActive((p) => (p + 1) % PHASES.length), 4000);
        return () => clearInterval(id);
    }, [visible, hovered]);

    const Node = ({ id }) => {
        const pos = NODE_POS[id];
        const dataKey = pos.data || id;
        const data = NODE_DATA[dataKey];
        const on = hovered?.key === dataKey;
        // Phase-driven look — same hue, different opacity/size/motion.
        const r = active === 0 ? 12 : active === 1 ? 6 : 7;
        const op = active === 0 ? 0.5 : 0.85;
        return (
            <g>
                <circle
                    cx={pos.cx} cy={pos.cy} r={r} fill="var(--accent)" opacity={on ? 1 : op}
                    className={active === 0 ? "ab-pulse" : ""}
                    data-cursor="node"
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => setHovered({ key: dataKey, ...data, cx: pos.cx, cy: pos.cy })}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setHovered((p) => (p?.key === dataKey ? null : { key: dataKey, ...data, cx: pos.cx, cy: pos.cy }))}
                />
                {on && <circle cx={pos.cx} cy={pos.cy} r={r + 6} fill="none" stroke="var(--accent)" strokeWidth="1.5" />}
            </g>
        );
    };

    const phase = PHASES[active];

    return (
        <section id="about" ref={sectionRef} className="ab-section">
            <div className="ab-inner">
                <div className="ab-eyebrow">
                    <span className="bx-sq" aria-hidden="true" />
                    About Extrive
                </div>
                <h2 className="ab-title">
                    Engineering the future of<br />
                    <span className="ab-accent">human augmentation.</span>
                </h2>
                <p className="ab-intro">
                    Extrive Innovations develops wearable exosuits and ergonomics-intelligence
                    systems for industries where physical work is essential — reducing strain,
                    enhancing safety, and improving human performance from the factory floor to
                    the front line.
                </p>

                {/* Phase visual */}
                <div className="ab-stage" onMouseLeave={() => setHovered(null)}>
                    {/* Segmented control */}
                    <div className="ab-seg" role="tablist" aria-label="Transformation phase">
                        {PHASES.map((p, i) => (
                            <button
                                key={p.label}
                                role="tab"
                                aria-selected={i === active}
                                className={`ab-seg-btn ${i === active ? "on" : ""}`}
                                onClick={() => setActive(i)}
                            >
                                {p.label}
                            </button>
                        ))}
                    </div>

                    <p className="ab-hint" aria-hidden="true">[ Hover the body nodes for diagnostics &amp; solutions ]</p>

                    <div className="ab-visual">
                        <svg viewBox="0 0 200 320" className="ab-svg" key={active}>
                            {/* body — dimmed a touch in the augmentation phase */}
                            <g opacity={active === 2 ? 0.5 : 1}>{BODY}</g>

                            {/* SUPPORT — accent suit wireframe */}
                            {active === 1 && (
                                <g stroke="var(--accent)" strokeWidth="2" fill="none">
                                    <path d="M78 75 Q100 65 122 75 L130 140 Q100 150 70 140 Z" />
                                    <path d="M70 140 L60 175 Q100 185 140 175 L130 140" />
                                </g>
                            )}
                            {/* AUGMENTATION — accent data flow */}
                            {active === 2 && (
                                <g stroke="var(--accent)" strokeWidth="2" className="ab-flow">
                                    <line x1="100" y1="42" x2="100" y2="90" />
                                    <line x1="100" y1="90" x2="100" y2="145" />
                                    <line x1="100" y1="145" x2="100" y2="180" />
                                </g>
                            )}

                            <Node id="cervical" />
                            <Node id="shoulderL" />
                            <Node id="shoulderR" />
                            <Node id="lumbar" />
                            <Node id="hip" />
                        </svg>

                        {/* Sharp diagnostic HUD — instant, mono, accent left rule */}
                        {hovered && (
                            <div className="ab-hud">
                                <div className="ab-hud-tag">Node · Diagnostic</div>
                                <div className="ab-hud-title">{hovered.title}</div>
                                <p className="ab-hud-desc">{hovered.desc}</p>
                                <div className="ab-hud-deploy">Deploy · {hovered.suit}</div>
                            </div>
                        )}
                    </div>

                    <p className="ab-phase-text" key={`t${active}`}>{phase.text}</p>
                </div>

                {/* Industry grid — HardFlipCards */}
                <div className="ab-ind-grid bx-grid-hair">
                    {INDUSTRIES.map((ind) => (
                        <HardFlipCard key={ind.name} className="bx-flip--seamless ab-ind">
                            <h4 className="ab-ind-name">{ind.name}</h4>
                            <p className="ab-ind-desc">{ind.desc}</p>
                        </HardFlipCard>
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: STYLES }} />
        </section>
    );
}

const STYLES = `
.ab-section { background: var(--bg-void); border-top: 2px solid var(--border); }
.ab-inner { max-width: 1200px; margin: 0 auto; padding: clamp(72px, 10vw, 130px) clamp(16px, 4vw, 48px); text-align: center; }

.ab-eyebrow { display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-mono); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.1em; color: var(--accent); margin-bottom: 24px; }
.ab-title { font-family: var(--font-display); text-transform: uppercase; font-size: clamp(2.2rem, 6.5vw, 5rem); line-height: 0.9; letter-spacing: -0.04em; color: var(--text-primary); margin: 0 0 28px; }
.ab-accent { color: var(--accent); }
.ab-intro { font-family: var(--font-body); font-size: clamp(1.05rem, 1.6vw, 1.3rem); line-height: 1.7; color: var(--text-secondary); max-width: 760px; margin: 0 auto clamp(48px, 7vw, 80px); }

/* Segmented control */
.ab-seg { display: inline-flex; border: 2px solid var(--border); margin-bottom: 22px; }
.ab-seg-btn { font-family: var(--font-mono); text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.06em; font-weight: 700; color: var(--text-secondary); background: transparent; border: none; border-right: 2px solid var(--border); padding: 12px 20px; cursor: pointer; transition: background 150ms ease-in-out, color 150ms ease-in-out; }
.ab-seg-btn:last-child { border-right: none; }
.ab-seg-btn:hover { color: var(--text-primary); }
.ab-seg-btn.on { background: var(--accent); color: var(--accent-foreground); }

.ab-hint { font-family: var(--font-mono); text-transform: uppercase; font-size: 0.62rem; letter-spacing: 0.14em; color: var(--text-secondary); margin: 0 0 24px; }

.ab-visual { position: relative; display: flex; justify-content: center; min-height: 300px; }
.ab-svg { width: 150px; height: 240px; }
.ab-pulse { animation: abPulse 2s ease-in-out infinite; }
@keyframes abPulse { 0%,100% { opacity: 0.35; } 50% { opacity: 0.6; } }
.ab-flow line { stroke-dasharray: 6 5; animation: abFlow 1.4s linear infinite; }
@keyframes abFlow { to { stroke-dashoffset: -22; } }

/* Sharp HUD */
.ab-hud { position: absolute; top: 4%; right: 2%; width: 240px; text-align: left; background: var(--bg-void); border: 2px solid var(--border); border-left: 3px solid var(--accent); padding: 16px 18px; z-index: 5; }
.ab-hud-tag { font-family: var(--font-mono); text-transform: uppercase; font-size: 0.58rem; letter-spacing: 0.16em; color: var(--accent); margin-bottom: 10px; }
.ab-hud-title { font-family: var(--font-display); text-transform: uppercase; font-size: 0.9rem; letter-spacing: -0.01em; color: var(--text-primary); margin-bottom: 8px; line-height: 1; }
.ab-hud-desc { font-family: var(--font-body); font-size: 0.78rem; line-height: 1.5; color: var(--text-secondary); margin: 0 0 14px; }
.ab-hud-deploy { display: inline-block; font-family: var(--font-mono); text-transform: uppercase; font-size: 0.62rem; letter-spacing: 0.1em; color: var(--accent); border: 1px solid var(--accent); padding: 5px 10px; }

.ab-phase-text { font-family: var(--font-body); font-size: 1rem; line-height: 1.6; color: var(--text-primary); max-width: 460px; margin: 28px auto 0; }

/* Industry grid */
.ab-ind-grid { grid-template-columns: repeat(4, 1fr); border: 2px solid var(--border); margin-top: clamp(56px, 8vw, 96px); text-align: left; }
.ab-ind { padding: clamp(24px, 2.4vw, 36px); min-height: 180px; display: flex; flex-direction: column; }
.ab-ind-name { font-family: var(--font-display); text-transform: uppercase; font-size: clamp(1.1rem, 2vw, 1.5rem); letter-spacing: -0.02em; margin: 0 0 12px; color: inherit; }
.ab-ind-desc { font-family: var(--font-body); font-size: 0.9rem; line-height: 1.55; color: var(--text-secondary); margin: 0; }
.bx-flip:hover .ab-ind-desc, .bx-flip:focus-within .ab-ind-desc { color: var(--accent-foreground); }

@media (max-width: 820px) {
    .ab-hud { position: static; width: 100%; max-width: 320px; margin: 20px auto 0; }
    .ab-visual { flex-direction: column; align-items: center; }
    .ab-ind-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 480px) {
    .ab-ind-grid { grid-template-columns: 1fr; }
    .ab-seg { flex-wrap: wrap; }
}
`;
