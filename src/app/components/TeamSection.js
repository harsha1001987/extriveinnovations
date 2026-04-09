"use client";

export default function TeamSection() {
    return (
        <section
            id="team"
            style={{
                background: "transparent",
                padding: "80px 24px 120px", // consistent rhythm
            }}
        >
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
                
                {/* ═══════════════ INTRO ═══════════════ */}
                <div style={{ marginBottom: "80px" }}>
                    <div
                        style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "10px",
                            fontWeight: 500,
                            letterSpacing: "0.2em",
                            color: "var(--text-muted)",
                            textTransform: "uppercase",
                            marginBottom: "24px",
                        }}
                    >
                        The Team
                    </div>

                    <h2
                        style={{
                            fontFamily: "var(--font-heading)",
                            fontWeight: 700,
                            fontSize: "clamp(2.5rem, 5vw, 4rem)",
                            color: "var(--text-primary)",
                            lineHeight: 1.05,
                            letterSpacing: "-0.02em",
                            maxWidth: "480px", // tighter width for tension
                            margin: "0 0 24px 0",
                        }}
                    >
                        Two founders. <br />
                        One <span style={{ color: "var(--accent)" }}>obsession.</span>
                    </h2>

                    <p
                        style={{
                            fontFamily: "var(--font-heading)",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: 1.7,
                            color: "var(--text-secondary)",
                            maxWidth: "440px", // tighter width for tension
                        }}
                    >
                        They have shipped hardware to a Fortune 50 aerospace company, won India&apos;s largest carmaker&apos;s innovation programme, and generated paid revenue from India&apos;s largest contractor — before finishing undergraduate degrees.
                    </p>
                </div>

                {/* ═══════════════ FOUNDER PROFILES ═══════════════ */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }} className="team-grid">
                    
                    {/* Founder 1 */}
                    <div
                        data-cursor="founder"
                        className="founder-card"
                        style={{
                            position: "relative",
                            background: "var(--surface)",
                            border: "1px solid var(--border)",
                            padding: "60px 48px",
                            overflow: "hidden",
                        }}
                    >
                        {/* Faint oversized index */}
                        <span
                            aria-hidden="true"
                            style={{
                                position: "absolute",
                                top: "50%",
                                right: "-2%",
                                transform: "translateY(-50%)",
                                fontFamily: "var(--font-heading)",
                                fontSize: "clamp(12rem, 16vw, 15rem)",
                                fontWeight: 700,
                                color: "var(--text-primary)",
                                opacity: 0.025,
                                lineHeight: 1,
                                pointerEvents: "none",
                                userSelect: "none",
                            }}
                        >
                            01
                        </span>

                        <div style={{ position: "relative", zIndex: 10 }}>
                            <div style={{ width: "24px", height: "1px", background: "var(--accent)", marginBottom: "32px", opacity: 0.7 }} />
                            <div
                                style={{
                                    fontFamily: "var(--font-heading)",
                                    fontSize: "10px",
                                    fontWeight: 600,
                                    letterSpacing: "0.15em",
                                    color: "var(--accent)",
                                    textTransform: "uppercase",
                                    marginBottom: "16px",
                                }}
                            >
                                Co-Founder &amp; CEO
                            </div>
                            <h3
                                style={{
                                    fontFamily: "var(--font-heading)",
                                    fontWeight: 700,
                                    fontSize: "1.8rem",
                                    color: "var(--text-primary)",
                                    marginBottom: "24px",
                                    letterSpacing: "-0.01em",
                                }}
                            >
                                Abhishek Pratap
                            </h3>
                            <p
                                style={{
                                    fontFamily: "var(--font-heading)",
                                    fontWeight: 400,
                                    fontSize: "14px",
                                    lineHeight: 1.7,
                                    color: "var(--text-secondary)",
                                }}
                            >
                                B.Tech Electronics &amp; Communication, Mahindra University. Full-time enterprise sales and hardware product strategy. Owns all external relationships — Maruti Suzuki, L&amp;T, Boeing India, Mahindra Group, Indian Army. Built and shipped BackEX from first principles. Led every pilot, investor conversation, and grant application.
                            </p>
                        </div>
                    </div>

                    {/* Founder 2 */}
                    <div
                        data-cursor="founder"
                        className="founder-card"
                        style={{
                            position: "relative",
                            background: "var(--surface)",
                            border: "1px solid var(--border)",
                            padding: "60px 48px",
                            overflow: "hidden",
                        }}
                    >
                        {/* Faint oversized index */}
                        <span
                            aria-hidden="true"
                            style={{
                                position: "absolute",
                                top: "50%",
                                right: "-2%",
                                transform: "translateY(-50%)",
                                fontFamily: "var(--font-heading)",
                                fontSize: "clamp(12rem, 16vw, 15rem)",
                                fontWeight: 700,
                                color: "var(--text-primary)",
                                opacity: 0.025,
                                lineHeight: 1,
                                pointerEvents: "none",
                                userSelect: "none",
                            }}
                        >
                            02
                        </span>

                        <div style={{ position: "relative", zIndex: 10 }}>
                            <div style={{ width: "24px", height: "1px", background: "var(--accent)", marginBottom: "32px", opacity: 0.7 }} />
                            <div
                                style={{
                                    fontFamily: "var(--font-heading)",
                                    fontSize: "10px",
                                    fontWeight: 600,
                                    letterSpacing: "0.15em",
                                    color: "var(--accent)",
                                    textTransform: "uppercase",
                                    marginBottom: "16px",
                                }}
                            >
                                Co-Founder &amp; CTO
                            </div>
                            <h3
                                style={{
                                    fontFamily: "var(--font-heading)",
                                    fontWeight: 700,
                                    fontSize: "1.8rem",
                                    color: "var(--text-primary)",
                                    marginBottom: "24px",
                                    letterSpacing: "-0.01em",
                                }}
                            >
                                Yashaswi Matla
                            </h3>
                            <p
                                style={{
                                    fontFamily: "var(--font-heading)",
                                    fontWeight: 400,
                                    fontSize: "14px",
                                    lineHeight: 1.7,
                                    color: "var(--text-secondary)",
                                }}
                            >
                                B.Tech Computer Science, Mahindra University. Full-time product engineering. Owns ErgoScan AI, ErgoEX firmware, cloud dashboard, and all software architecture. Built ErgoScan&apos;s RULA/REBA AI and the ErgoEX real-time data pipeline from scratch. Technical foundation for the data moat.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
