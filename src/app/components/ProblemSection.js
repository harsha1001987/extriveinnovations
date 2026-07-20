"use client";

import HardFlipCard from "./brutalist/HardFlipCard";
import MassiveNumber from "./brutalist/MassiveNumber";

/* ══════════════════════════════════════════════════════════════════
   Part 5 — Problem. Bordered hairline-grid of HardFlipCards (each hard-
   flips to orange on hover, numeral included). A flat line-art "before"
   diagnostic silhouette carries over as the supporting visual.
   ══════════════════════════════════════════════════════════════════ */
const PROBLEMS = [
    {
        index: "01",
        title: "Musculoskeletal crisis",
        body: "Lower back disorders are the single largest cause of occupational disability in India. In construction, 38% of work injuries are MSDs; in automotive assembly, 62% of workers report chronic back pain by year five.",
        signal: "₹4–6% GDP lost annually to work-related MSDs",
        icon: (
            <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="16" cy="9" r="3.2" />
                <line x1="16" y1="12.5" x2="16" y2="22" />
                <line x1="16" y1="15" x2="10" y2="19" />
                <line x1="16" y1="15" x2="22" y2="19" />
                <line x1="16" y1="22" x2="11" y2="28" />
                <line x1="16" y1="22" x2="21" y2="28" />
            </svg>
        ),
    },
    {
        index: "02",
        title: "The soldier's burden",
        body: "Indian Army soldiers carry 20–25 kg loads on inclines above 30° at altitudes over 10,000 ft. MSK injuries account for ~25% of medical discharges — one million duty days lost per year.",
        signal: "~1 million duty days lost annually to MSK injuries",
        icon: (
            <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 26 L16 6 L27 26 Z" />
                <line x1="10" y1="20" x2="22" y2="20" />
                <line x1="14" y1="14" x2="18" y2="14" />
            </svg>
        ),
    },
    {
        index: "03",
        title: "No indigenous solution",
        body: "Western exosuits price in USD. At Indian wage economics, a ₹2 lakh exosuit has a 40-year payback. No foreign system is designed for Indian anthropometrics. No Indian company builds this — until now.",
        signal: "Zero Indian exosuit companies exist before Extrive",
        icon: (
            <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="16" cy="16" r="11" />
                <line x1="16" y1="5" x2="16" y2="27" />
                <path d="M5 16 Q 16 8 27 16" />
                <path d="M5 16 Q 16 24 27 16" />
            </svg>
        ),
    },
    {
        index: "04",
        title: "Zero real-time health data",
        body: "There is no real-time monitoring of MSK strain in Indian industrial or defence environments. EHS managers operate blind — injuries are reported after they happen, never predicted before.",
        signal: "No Indian worker ergonomic dataset exists",
        icon: (
            <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="3,17 9,17 12,10 16,24 20,13 23,17 29,17" />
            </svg>
        ),
    },
];

/* Flat line-art silhouette, strain zones marked (hard strokes, no glow). */
const ZONES = [
    { cx: 100, cy: 90, r: 11 },
    { cx: 75, cy: 120, r: 10 },
    { cx: 125, cy: 120, r: 10 },
    { cx: 100, cy: 145, r: 13 },
    { cx: 100, cy: 180, r: 12 },
];

function StrainSilhouette() {
    return (
        <svg viewBox="0 0 200 320" className="pb-body-svg" aria-hidden="true">
            <g stroke="var(--silhouette-stroke)" strokeWidth="2" fill="none">
                <ellipse cx="100" cy="42" rx="22" ry="26" />
                <line x1="100" y1="68" x2="100" y2="180" />
                <line x1="100" y1="90" x2="55" y2="145" />
                <line x1="100" y1="90" x2="145" y2="145" />
                <line x1="100" y1="180" x2="65" y2="290" />
                <line x1="100" y1="180" x2="135" y2="290" />
            </g>
            {ZONES.map((z, i) => (
                <g key={i}>
                    <circle cx={z.cx} cy={z.cy} r={z.r + 5} fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.4" />
                    <circle cx={z.cx} cy={z.cy} r={z.r} fill="var(--accent)" opacity="0.55" className="pb-zone" />
                </g>
            ))}
        </svg>
    );
}

export default function ProblemSection() {
    return (
        <section id="problem" className="pb-section">
            <div className="pb-inner">
                <header className="pb-head">
                    <div className="pb-eyebrow">
                        <span className="bx-sq" aria-hidden="true" />
                        The Problem
                    </div>
                    <h2 className="pb-title">
                        India&apos;s workers carry<br />
                        the weight <span className="pb-title-accent">alone.</span>
                    </h2>
                    <p className="pb-lede">
                        500 million blue-collar workers. Zero occupational health technology
                        designed for them. The cost is injuries, lost productivity, and
                        shortened lives.
                    </p>
                </header>

                <div className="pb-layout">
                    {/* Supporting visual — "before" strain diagnostic */}
                    <div className="pb-body-panel">
                        <div className="pb-body-label">
                            <span className="bx-sq" aria-hidden="true" />
                            Unaddressed Strain
                        </div>
                        <StrainSilhouette />
                        <p className="pb-body-caption">Where it hurts — before augmentation.</p>
                    </div>

                    {/* HardFlipCard grid */}
                    <div className="pb-grid bx-grid-hair">
                        {PROBLEMS.map((p) => (
                            <HardFlipCard key={p.index} className="bx-flip--seamless pb-card">
                               
                                <div className="pb-card-body">
                                    <span className="bx-flip-icon pb-card-icon">
                                        <span style={{ width: 26, height: 26 }}>{p.icon}</span>
                                    </span>
                                    <h3 className="pb-card-title">{p.title}</h3>
                                    <p className="pb-card-text">{p.body}</p>
                                    <span className="pb-card-signal">{p.signal}</span>
                                </div>
                            </HardFlipCard>
                        ))}
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: STYLES }} />
        </section>
    );
}

const STYLES = `
.pb-section { background: var(--bg-void); }
.pb-inner { max-width: 1400px; margin: 0 auto; padding: clamp(72px, 10vw, 130px) clamp(16px, 4vw, 48px); }

.pb-head { max-width: 900px; margin-bottom: clamp(48px, 7vw, 84px); }
.pb-eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    font-family: var(--font-mono); text-transform: uppercase; font-size: 0.8rem;
    letter-spacing: 0.1em; color: var(--accent); margin-bottom: 26px;
}
.pb-title {
    font-family: var(--font-display); text-transform: uppercase;
    font-size: clamp(2.5rem, 8vw, 6rem); line-height: 0.88; letter-spacing: -0.04em;
    color: var(--text-primary); margin: 0 0 28px;
}
.pb-title-accent { color: var(--accent); }
.pb-lede { font-family: var(--font-body); font-size: clamp(1.05rem, 1.6vw, 1.35rem); line-height: 1.6; color: var(--text-secondary); max-width: 640px; margin: 0; }

.pb-layout { display: grid; grid-template-columns: 300px 1fr; gap: 24px; }

/* Silhouette panel */
.pb-body-panel { background: var(--bg-void); border: 2px solid var(--border); display: flex; flex-direction: column; align-items: center; padding: 28px 22px; }
.pb-body-label {
    align-self: flex-start; display: inline-flex; align-items: center; gap: 8px;
    font-family: var(--font-mono); text-transform: uppercase; font-size: 0.7rem;
    letter-spacing: 0.12em; color: var(--text-secondary); margin-bottom: 18px;
}
.pb-body-svg { width: 100%; max-width: 190px; height: auto; aspect-ratio: 200/320; }
.pb-body-caption { font-family: var(--font-mono); text-transform: uppercase; font-size: 0.62rem; letter-spacing: 0.06em; color: var(--accent); text-align: center; margin: 18px 0 0; }

/* Card grid (2x2) */
.pb-grid { grid-template-columns: repeat(2, 1fr); }
.pb-card { position: relative; overflow: hidden; padding: clamp(28px, 3vw, 44px); min-height: 300px; display: flex; }
.pb-card-num { position: absolute; top: -8px; right: 8px; }
.pb-card-body { position: relative; z-index: 1; display: flex; flex-direction: column; height: 100%; }
.pb-card-icon { margin-bottom: 24px; border: none; }
.pb-card-title { font-family: var(--font-display); text-transform: uppercase; font-size: clamp(1.3rem, 2.4vw, 1.9rem); line-height: 0.95; letter-spacing: -0.03em; margin: 0 0 16px; color: inherit; }
.pb-card-text { font-family: var(--font-body); font-size: 0.95rem; line-height: 1.6; color: var(--text-secondary); margin: 0 0 20px; }
.bx-flip:hover .pb-card-text, .bx-flip:focus-within .pb-card-text { color: var(--accent-foreground); }
.pb-card-signal { margin-top: auto; font-family: var(--font-mono); text-transform: uppercase; font-size: 0.72rem; letter-spacing: 0.02em; color: var(--accent); padding-top: 16px; }
.bx-flip:hover .pb-card-signal, .bx-flip:focus-within .pb-card-signal { color: var(--accent-foreground); }

@media (max-width: 900px) {
    .pb-layout { grid-template-columns: 1fr; }
    .pb-body-panel { flex-direction: row; justify-content: center; gap: 24px; }
    .pb-body-svg { max-width: 130px; }
}
@media (max-width: 620px) {
    .pb-grid { grid-template-columns: 1fr; }
    .pb-body-panel { flex-direction: column; }
}
`;
