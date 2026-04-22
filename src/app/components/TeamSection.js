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
                               I don’t separate technology from business. A great solution means nothing if it doesn’t reach people, and a business without a real solution won’t last.

I work at that intersection—understanding the problem, building the tech, and making it work in the real world, at scale.

That’s how Extrive started: from a real problem, a refusal to accept the status quo, and the belief that the right technology can make a difference. From construction sites to factories to the Indian Army—I’m just getting started.
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
                               I’ve always been driven to build things that matter. Real-world problems are everywhere—in routines, systems, and overlooked spaces—and I’m constantly asking how they can be improved.

Extrive Innovations was born from that mindset: to create technology not for novelty, but for real impact. What drives me most is solving the right problems—the ones that improve lives consistently and at scale.

Still building. Still learning. Always working toward a better tomorrow.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
