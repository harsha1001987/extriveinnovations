"use client";

import { useTheme } from "./ThemeProvider";

export default function ManipurPilotSection() {
    const { theme } = useTheme();

    return (
        <section
            style={{
                background: "transparent",
                padding: "80px 24px 120px",
            }}
        >
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", marginBottom: "60px", alignItems: "start" }} className="team-grid">
                    {/* Left Column */}
                    <div>
                        <div
                            style={{
                                fontFamily: "var(--font-heading)",
                                fontSize: "10px",
                                fontWeight: 500,
                                letterSpacing: "0.2em",
                                color: "var(--accent)",
                                textTransform: "uppercase",
                                marginBottom: "24px",
                            }}
                        >
                            Manipur Pilot · 2024
                        </div>

                        <h2
                            style={{
                                fontFamily: "var(--font-heading)",
                                fontWeight: 700,
                                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                                color: "var(--text-primary)",
                                lineHeight: 1.05,
                                letterSpacing: "-0.02em",
                                marginBottom: "24px",
                            }}
                        >
                            BackEX in the<br />field.
                        </h2>

                        <p
                            style={{
                                fontFamily: "var(--font-heading)",
                                fontWeight: 400,
                                fontSize: "16px",
                                lineHeight: 1.7,
                                color: "var(--text-secondary)",
                                maxWidth: "480px",
                            }}
                        >
                            Our Manipur pilot captured BackEX in real operational conditions — high-altitude terrain, working alongside soldiers and logistics personnel. Watch the technology work where it matters most.
                        </p>
                    </div>

                    {/* Right Column - Metrics */}
                    <div 
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "0",
                            border: "1px solid var(--border)",
                            background: "var(--surface)",
                        }}
                    >
                        {/* Metric 1 */}
                        <div style={{ padding: "32px", borderRight: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
                            <div style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "8px" }}>
                                ₹49K
                            </div>
                            <div style={{ fontFamily: "var(--font-heading)", fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.02em" }}>
                                Indian Army paid pilot value
                            </div>
                        </div>

                        {/* Metric 2 */}
                        <div style={{ padding: "32px", borderBottom: "1px solid var(--border)" }}>
                            <div style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "8px" }}>
                                90%<span style={{ color: "var(--accent)" }}>+</span>
                            </div>
                            <div style={{ fontFamily: "var(--font-heading)", fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.02em" }}>
                                Adoption rate in this trial
                            </div>
                        </div>

                        {/* Metric 3 */}
                        <div style={{ padding: "32px", borderRight: "1px solid var(--border)" }}>
                            <div style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "8px" }}>
                                10K<span style={{ color: "var(--accent)" }}>+</span>
                            </div>
                            <div style={{ fontFamily: "var(--font-heading)", fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.02em" }}>
                                Altitude ft — operational conditions
                            </div>
                        </div>

                        {/* Metric 4 */}
                        <div style={{ padding: "32px" }}>
                            <div style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "8px" }}>
                                0W
                            </div>
                            <div style={{ fontFamily: "var(--font-heading)", fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.02em" }}>
                                Power required — fully passive
                            </div>
                        </div>
                    </div>
                </div>

                {/* Video Container */}
                <div 
                    style={{
                        position: "relative",
                        width: "100%",
                        paddingTop: "42.25%", // Cinematic aspect ratio roughly 21:9
                        background: "#050505",
                        border: "1px solid var(--border)",
                        borderRadius: "2px",
                        overflow: "hidden"
                    }}
                >
                    <video 
                        src="/textures/manipur.mp4" 
                        controls
                        muted
                        poster="/textures/poster.png"
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover"
                        }}
                    />
                    
                    {/* Placeholder content if video is empty/fails */}
                    <div 
                        style={{ 
                            position: "absolute", 
                            bottom: "24px", 
                            left: "24px", 
                            padding: "8px 16px",
                            background: "rgba(0,0,0,0.8)",
                            border: "1px solid rgba(232,106,0,0.4)",
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            pointerEvents: "none",
                        }}
                    >
                        <span style={{ color: "var(--accent)", fontSize: "10px", fontFamily: "monospace" }}>▶</span>
                        <span style={{ fontFamily: "var(--font-heading)", fontSize: "10px", color: "white", letterSpacing: "0.15em", textTransform: "uppercase" }}>Manipur Field Pilot · BackEX</span>
                    </div>
                </div>

            </div>
        </section>
    );
}
