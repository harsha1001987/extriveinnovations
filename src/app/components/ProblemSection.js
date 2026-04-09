"use client";

const PROBLEMS = [
    {
        index: "01",
        title: "Musculoskeletal crisis",
        body: "Lower back disorders are the single largest cause of occupational disability in India. In construction, 38% of all work injuries are MSDs. In automotive assembly, 62% of workers report chronic back pain by year five.",
        signal: "₹4–6% GDP lost annually to work-related MSDs",
        icon: (
            <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2">
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
        body: "Indian Army soldiers carry 20–25 kg loads on steep inclines above 30° at altitudes exceeding 10,000 feet. MSK injuries account for ~25% of all medical discharges — one million duty days lost per year.",
        signal: "~1 million duty days lost annually to MSK injuries",
        icon: (
            <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M5 26 L16 6 L27 26 Z" />
                <line x1="10" y1="20" x2="22" y2="20" />
                <line x1="14" y1="14" x2="18" y2="14" />
            </svg>
        ),
    },
    {
        index: "03",
        title: "No indigenous solution",
        body: "Western exosuit companies price in USD. At Indian wage economics, a ₹2 lakh exosuit has a 40-year payback period. No foreign system is designed for Indian anthropometrics. No Indian company builds this — until now.",
        signal: "Zero Indian exosuit companies exist before Extrive",
        icon: (
            <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2">
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
        body: "There is no real-time monitoring of MSK strain in Indian industrial or defence environments. EHS managers operate blind. Injuries are reported after they happen, never predicted before they do.",
        signal: "No Indian worker ergonomic dataset exists",
        icon: (
            <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2">
                <polyline points="3,17 9,17 12,10 16,24 20,13 23,17 29,17" />
            </svg>
        ),
    },
];

export default function ProblemSection() {
    return (
        <section
            id="problem"
            style={{
                background: "transparent",
                padding: "120px 24px 100px",
            }}
        >
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                {/* ═══════════════ INTRO ═══════════════ */}
                <div style={{ marginBottom: "72px", maxWidth: "780px" }}>
                    <div
                        style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "10px",
                            fontWeight: 600,
                            letterSpacing: "0.2em",
                            color: "var(--accent)",
                            textTransform: "uppercase",
                            marginBottom: "28px",
                        }}
                    >
                        The Problem
                    </div>

                    <h2
                        style={{
                            fontFamily: "var(--font-heading)",
                            fontWeight: 700,
                            fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
                            color: "var(--text-primary)",
                            lineHeight: 1.05,
                            letterSpacing: "-0.015em",
                            marginBottom: "28px",
                        }}
                    >
                        India&apos;s workers carry<br />
                        the weight{" "}
                        <span
                            style={{
                                fontStyle: "italic",
                                color: "var(--accent)",
                                fontWeight: 700,
                            }}
                        >
                            alone.
                        </span>
                    </h2>

                    <p
                        style={{
                            fontFamily: "var(--font-heading)",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: 1.7,
                            color: "var(--text-secondary)",
                            maxWidth: "620px",
                        }}
                    >
                        500 million blue-collar workers. Zero occupational health
                        technology designed for them. The cost is injuries, lost
                        productivity, and shortened lives.
                    </p>
                </div>

                {/* ═══════════════ 2x2 PROBLEM GRID ═══════════════ */}
                <div
                    className="problem-grid"
                    style={{
                        border: "1px solid var(--border)",
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        background: "transparent",
                    }}
                >
                    {PROBLEMS.map((p) => (
                        <ProblemBlock key={p.index} {...p} />
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .problem-card {
                    border-bottom: 1px solid var(--border);
                    border-right: 1px solid var(--border);
                }
                .problem-card:nth-child(2n) {
                    border-right: none;
                }
                .problem-card:nth-last-child(-n+2) {
                    border-bottom: none;
                }
                @media (max-width: 768px) {
                    .problem-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .problem-card {
                        border-right: none !important;
                        border-bottom: 1px solid var(--border) !important;
                    }
                    .problem-card:last-child {
                        border-bottom: none !important;
                    }
                }
                .problem-card-signal::before {
                    content: "";
                    display: block;
                    height: 1px;
                    width: 100%;
                    background: var(--border);
                    margin-bottom: 18px;
                }
            `}} />
        </section>
    );
}

function ProblemBlock({ index, title, body, signal, icon }) {
    return (
        <div
            data-cursor="product"
            className="problem-card"
            style={{
                position: "relative",
                padding: "44px 44px 40px",
                background: "var(--surface)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
            }}
        >
            {/* Faint oversized numeral */}
            <span
                aria-hidden="true"
                style={{
                    position: "absolute",
                    top: "32px",
                    right: "32px",
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(4rem, 7vw, 5.5rem)",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    opacity: 0.05,
                    lineHeight: 1,
                    pointerEvents: "none",
                    userSelect: "none",
                    letterSpacing: "-0.02em",
                }}
            >
                {index}
            </span>

            {/* Icon mark */}
            <div
                style={{
                    width: "36px",
                    height: "36px",
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent)",
                    marginBottom: "32px",
                    background: "transparent",
                }}
            >
                <div style={{ width: "20px", height: "20px" }}>{icon}</div>
            </div>

            {/* Title */}
            <h3
                style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    fontSize: "1.5rem",
                    lineHeight: 1.2,
                    letterSpacing: "-0.01em",
                    color: "var(--text-primary)",
                    marginBottom: "16px",
                }}
            >
                {title}
            </h3>

            {/* Body */}
            <p
                style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: 1.7,
                    color: "var(--text-secondary)",
                    marginBottom: "32px",
                    maxWidth: "440px",
                }}
            >
                {body}
            </p>

            {/* Signal line */}
            <div
                className="problem-card-signal"
                style={{
                    marginTop: "auto",
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                    color: "var(--accent)",
                    lineHeight: 1.5,
                }}
            >
                {signal}
            </div>
        </div>
    );
}
