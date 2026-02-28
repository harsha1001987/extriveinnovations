"use client";

import { useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════════════════════════════
   Industry Grid items
   ═══════════════════════════════════════════════════════════════════ */
const INDUSTRIES = [
    {
        name: "Manufacturing",
        desc: "Repetitive motion strain reduction on assembly lines.",
        icon: (
            <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" className="industry-icon">
                <rect x="4" y="18" width="10" height="10" rx="1" />
                <rect x="18" y="12" width="10" height="16" rx="1" />
                <line x1="9" y1="18" x2="9" y2="10" /><line x1="9" y1="10" x2="23" y2="10" /><line x1="23" y1="10" x2="23" y2="12" />
            </svg>
        ),
    },
    {
        name: "Logistics",
        desc: "Lift-assist and postural intelligence for warehouse operations.",
        icon: (
            <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" className="industry-icon">
                <rect x="6" y="8" width="14" height="10" rx="1" />
                <rect x="10" y="18" width="6" height="8" rx="1" />
                <line x1="6" y1="22" x2="26" y2="22" />
                <circle cx="8" cy="26" r="2" /><circle cx="24" cy="26" r="2" />
                <line x1="20" y1="13" x2="26" y2="13" /><line x1="26" y1="13" x2="26" y2="22" />
            </svg>
        ),
    },
    {
        name: "Construction",
        desc: "Overhead task support and fatigue monitoring on-site.",
        icon: (
            <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" className="industry-icon">
                <path d="M8 28 L16 6 L24 28" />
                <line x1="10" y1="22" x2="22" y2="22" />
                <line x1="16" y1="6" x2="16" y2="2" />
                <line x1="12" y1="2" x2="20" y2="2" />
            </svg>
        ),
    },
    {
        name: "Defence",
        desc: "Load carriage augmentation and movement intelligence.",
        icon: (
            <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" className="industry-icon">
                <path d="M16 4 L26 10 L26 20 L16 28 L6 20 L6 10 Z" />
                <line x1="16" y1="12" x2="16" y2="20" />
                <line x1="12" y1="16" x2="20" y2="16" />
            </svg>
        ),
    },
];

/* ═══════════════════════════════════════════════════════════════════
   Diagnostics Data for Hover Interactions
   ═══════════════════════════════════════════════════════════════════ */
const NODE_DATA = {
    cervical: { title: "Cervical & Upper Thoracic", desc: "Tension and postural fatigue from sustained awkward angles.", suit: "ShoulderEX" },
    shoulder: { title: "Deltoid & Rotator Cuff", desc: "High micro-tear risk from repetitive overhead lifting and static holds.", suit: "ShoulderEX" },
    lumbar: { title: "Lumbar L5-S1 Compression", desc: "Extreme disc pressure and erector spinae strain from heavy lifting.", suit: "BackEX" },
    hip: { title: "Pelvic & Lower Back Linkage", desc: "Kinetic chain breakdown causing radiating lower back fatigue.", suit: "BackEX" },
};

export default function AboutSection() {
    const [activePhase, setActivePhase] = useState(0);
    const [sectionVisible, setSectionVisible] = useState(false);
    const [hoveredNode, setHoveredNode] = useState(null);
    const sectionRef = useRef(null);
    const intervalRef = useRef(null);

    // Intersection Observer — trigger when section scrolls into view
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setSectionVisible(true);
            },
            { threshold: 0.15 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    // Auto-cycle phases once visible, PAUSE if user is hovering over a node
    useEffect(() => {
        if (!sectionVisible || hoveredNode) return;
        intervalRef.current = setInterval(() => {
            setActivePhase((p) => (p + 1) % 3);
        }, 4000);
        return () => clearInterval(intervalRef.current);
    }, [sectionVisible, hoveredNode]);

    // Helper component for interactive nodes to keep SVG code clean
    const InteractiveNode = ({ cx, cy, r, baseFill, opacity, className, data }) => (
        <circle
            cx={cx} cy={cy} r={r}
            fill={baseFill}
            opacity={hoveredNode?.title === data.title ? 1 : opacity}
            className={`${className} hover-node`}
            onMouseEnter={() => setHoveredNode(data)}
            onMouseLeave={() => setHoveredNode(null)}
            style={{
                cursor: 'crosshair',
                transition: 'all 0.3s ease',
                transformOrigin: `${cx}px ${cy}px`,
                transform: hoveredNode?.title === data.title ? 'scale(1.5)' : 'scale(1)'
            }}
        />
    );

    // Move PHASES inside component to access state/functions
    const PHASES = [
        {
            label: "STRAIN",
            color: "#ff3b3b",
            text: "Sustained physical strain limits workforce potential.",
            svg: (
                <svg viewBox="0 0 200 320" fill="none" className="phase-svg">
                    {/* Body silhouette */}
                    <ellipse cx="100" cy="42" rx="22" ry="26" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                    <line x1="100" y1="68" x2="100" y2="180" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                    <line x1="100" y1="90" x2="55" y2="145" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                    <line x1="100" y1="90" x2="145" y2="145" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                    <line x1="100" y1="180" x2="65" y2="290" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                    <line x1="100" y1="180" x2="135" y2="290" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                    
                    {/* Interactive Strain Zones */}
                    <InteractiveNode cx="100" cy="90" r="12" baseFill="rgba(255,59,59,0.5)" opacity={0.5} className="strain-pulse" data={NODE_DATA.cervical} />
                    <InteractiveNode cx="75" cy="120" r="10" baseFill="rgba(255,59,59,0.5)" opacity={0.5} className="strain-pulse delay-2" data={NODE_DATA.shoulder} />
                    <InteractiveNode cx="125" cy="120" r="10" baseFill="rgba(255,59,59,0.5)" opacity={0.5} className="strain-pulse delay-2" data={NODE_DATA.shoulder} />
                    <InteractiveNode cx="100" cy="145" r="14" baseFill="rgba(255,59,59,0.5)" opacity={0.5} className="strain-pulse delay-1" data={NODE_DATA.lumbar} />
                    <InteractiveNode cx="100" cy="180" r="12" baseFill="rgba(255,59,59,0.5)" opacity={0.5} className="strain-pulse delay-1" data={NODE_DATA.hip} />
                </svg>
            ),
        },
        {
            label: "SUPPORT",
            color: "#e86a00",
            text: "Extrive delivers structural support through wearable robotics.",
            svg: (
                <svg viewBox="0 0 200 320" fill="none" className="phase-svg">
                    <ellipse cx="100" cy="42" rx="22" ry="26" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                    <line x1="100" y1="68" x2="100" y2="180" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                    <line x1="100" y1="90" x2="55" y2="145" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                    <line x1="100" y1="90" x2="145" y2="145" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                    <line x1="100" y1="180" x2="65" y2="290" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                    <line x1="100" y1="180" x2="135" y2="290" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                    
                    <path d="M78 75 Q100 65 122 75 L130 140 Q100 150 70 140 Z" stroke="#e86a00" strokeWidth="1.2" fill="none" className="suit-draw" />
                    <path d="M70 140 L60 175 Q100 185 140 175 L130 140" stroke="#e86a00" strokeWidth="1.2" fill="none" className="suit-draw delay-1" />
                    
                    {/* Interactive Support Nodes */}
                    <InteractiveNode cx="100" cy="90" r="6" baseFill="#e86a00" opacity={0.8} className="" data={NODE_DATA.cervical} />
                    <InteractiveNode cx="75" cy="120" r="5" baseFill="#e86a00" opacity={0.8} className="" data={NODE_DATA.shoulder} />
                    <InteractiveNode cx="125" cy="120" r="5" baseFill="#e86a00" opacity={0.8} className="" data={NODE_DATA.shoulder} />
                    <InteractiveNode cx="100" cy="145" r="6" baseFill="#e86a00" opacity={0.8} className="" data={NODE_DATA.lumbar} />
                    <InteractiveNode cx="100" cy="180" r="6" baseFill="#e86a00" opacity={0.8} className="" data={NODE_DATA.hip} />
                </svg>
            ),
        },
        {
            label: "AUGMENTATION",
            color: "#4da6ff",
            text: "Assistive hardware meets ergonomics intelligence.",
            svg: (
                <svg viewBox="0 0 200 320" fill="none" className="phase-svg">
                    <ellipse cx="100" cy="42" rx="22" ry="26" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
                    <line x1="100" y1="68" x2="100" y2="180" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
                    <line x1="100" y1="90" x2="55" y2="145" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
                    <line x1="100" y1="90" x2="145" y2="145" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
                    <line x1="100" y1="180" x2="65" y2="290" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
                    <line x1="100" y1="180" x2="135" y2="290" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
                    
                    <path d="M78 75 Q100 65 122 75 L130 140 Q100 150 70 140 Z" stroke="#4da6ff" strokeWidth="1" fill="none" opacity="0.4" />
                    <path d="M70 140 L60 175 Q100 185 140 175 L130 140" stroke="#4da6ff" strokeWidth="1" fill="none" opacity="0.4" />
                    
                    <line x1="100" y1="42" x2="100" y2="90" stroke="#4da6ff" strokeWidth="1.5" className="data-flow" />
                    <line x1="100" y1="90" x2="100" y2="145" stroke="#4da6ff" strokeWidth="1.5" className="data-flow delay-1" />
                    
                    {/* Interactive Smart Nodes */}
                    <InteractiveNode cx="100" cy="90" r="7" baseFill="#4da6ff" opacity={0.7} className="node-glow delay-1" data={NODE_DATA.cervical} />
                    <InteractiveNode cx="75" cy="120" r="6" baseFill="#4da6ff" opacity={0.6} className="node-glow delay-2" data={NODE_DATA.shoulder} />
                    <InteractiveNode cx="125" cy="120" r="6" baseFill="#4da6ff" opacity={0.6} className="node-glow delay-2" data={NODE_DATA.shoulder} />
                    <InteractiveNode cx="100" cy="145" r="7" baseFill="#4da6ff" opacity={0.7} className="node-glow delay-1" data={NODE_DATA.lumbar} />
                    <InteractiveNode cx="100" cy="180" r="7" baseFill="#4da6ff" opacity={0.6} className="node-glow delay-2" data={NODE_DATA.hip} />
                </svg>
            ),
        },
    ];

    const phase = PHASES[activePhase];

    return (
        <section
            ref={sectionRef}
            id="about"
            className="about-section"
        >
            <div className="about-divider" />

            <div className="about-container">

                <span className={`about-label ${sectionVisible ? "fade-up-in" : "pre-fade"}`}>
                    ABOUT EXTRIVE
                </span>

                <h2 className={`about-headline headline-glow ${sectionVisible ? "fade-up-in d1" : "pre-fade"}`}>
                    Engineering the Future of Industrial Human Augmentation
                </h2>

                <p className={`about-intro ${sectionVisible ? "fade-up-in d2" : "pre-fade"}`}>
                    Extrive Innovations develops wearable exosuits and ergonomics
                    intelligence systems for industries where physical work is essential.
                    <br /><br />
                    From manufacturing floors and logistics hubs to construction sites
                    and defence environments, our technology reduces strain, enhances
                    safety, and improves human performance.
                </p>

                {/* ─── 3-Phase Animated Transformation ─── */}
                <div className={`phase-container ${sectionVisible ? "fade-up-in d3" : "pre-fade"}`} style={{ position: 'relative' }}>
                    
                    {/* Instructional text for interaction */}
                    <div style={{
                        textAlign: 'center',
                        fontSize: '0.75rem',
                        letterSpacing: '2px',
                        color: phase.color,
                        marginBottom: '1rem',
                        fontFamily: 'monospace',
                        textTransform: 'uppercase',
                        opacity: 0.8,
                        transition: 'color 0.4s ease'
                    }}>
                        [ HOVER ON BODY NODES FOR DIAGNOSTICS & SOLUTIONS ]
                    </div>

                    {/* Phase indicator dots */}
                    <div className="phase-indicators">
                        {PHASES.map((p, i) => (
                            <button
                                key={p.label}
                                className={`phase-dot ${i === activePhase ? "active" : ""}`}
                                onClick={() => setActivePhase(i)}
                                style={{ "--dot-color": p.color }}
                            >
                                <span className="phase-dot-label">{p.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* SVG + text */}
                    <div className="phase-visual" style={{ position: 'relative' }}>
                        <div className="phase-svg-wrap" key={activePhase}>
                            {phase.svg}
                        </div>
                        
                        {/* ─── Sci-Fi Telemetry HUD (Displays on Hover) ─── */}
                        {hoveredNode && (
                            <div style={{
                                position: 'absolute',
                                top: '10%',
                                right: '10%',
                                width: '220px',
                                padding: '16px',
                                background: 'rgba(10, 10, 12, 0.85)',
                                backdropFilter: 'blur(8px)',
                                border: `1px solid ${phase.color}`,
                                borderRadius: '4px',
                                boxShadow: `0 0 20px ${phase.color}30, inset 0 0 10px ${phase.color}10`,
                                color: '#fff',
                                zIndex: 10,
                                textAlign: 'left',
                                animation: 'fadeIn 0.2s ease-out'
                            }}>
                                <div style={{ fontSize: '0.65rem', color: phase.color, letterSpacing: '2px', marginBottom: '8px', fontFamily: 'monospace' }}>
                                    STRAIN DETECTED //
                                </div>
                                <h4 style={{ margin: '0 0 6px 0', fontSize: '1rem', fontWeight: '600', textTransform: 'uppercase' }}>
                                    {hoveredNode.title}
                                </h4>
                                <p style={{ margin: '0 0 16px 0', fontSize: '0.8rem', color: '#a0a0a5', lineHeight: '1.4' }}>
                                    {hoveredNode.desc}
                                </p>
                                <div style={{
                                    display: 'inline-block',
                                    padding: '6px 10px',
                                    background: `${phase.color}15`,
                                    border: `1px solid ${phase.color}50`,
                                    color: phase.color,
                                    fontSize: '0.75rem',
                                    fontWeight: 'bold',
                                    letterSpacing: '1px'
                                }}>
                                    DEPLOY: {hoveredNode.suit}
                                </div>
                            </div>
                        )}

                        <p className="phase-text" style={{ color: phase.color }} key={`t-${activePhase}`}>
                            {phase.text}
                        </p>
                    </div>
                </div>

                <div className={`explain-block ${sectionVisible ? "fade-up-in d4" : "pre-fade"}`}>
                    <h3 className="explain-headline">
                        Built for High-Demand Environments
                    </h3>
                    <p className="explain-text">
                        Our systems are designed for industries where performance and
                        endurance matter most. By integrating intelligent software with
                        assistive hardware, Extrive enables workers to operate more safely,
                        more efficiently, and with reduced long-term physical impact.
                    </p>

                    <div className="industry-grid">
                        {INDUSTRIES.map((ind) => (
                            <div className="industry-card" key={ind.name}>
                                <div className="industry-icon-wrap">{ind.icon}</div>
                                <h4 className="industry-name">{ind.name}</h4>
                                <p className="industry-desc">{ind.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <p className={`category-line headline-glow ${sectionVisible ? "fade-up-in d5" : "pre-fade"}`}>
                    Extrive is defining a new category of industrial human
                    augmentation technologies.
                </p>

            </div>
        </section>
    );
}