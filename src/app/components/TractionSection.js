"use client";

const metrics = [
    {
        company: "L&T CONSTRUCTION",
        badge: "Live · Expanding",
        badgeType: "green",
        prefix: "",
        value: "Commercial",
        unit: "Rollout",
        body: "Exosuits deployed with L&T pan-India, with the first official PO secured and scale-up to additional plants underway."
    },
    {
        company: "MARUTI SUZUKI",
        badge: "MoU Signed",
        badgeType: "orange",
        prefix: "₹",
        value: "5",
        unit: "L",
        body: "MSIL Nurture Programme winner. Direct procurement access. India's #1 automaker — MoU equals approved vendor status."
    },
    {
        company: "BOEING INDIA",
        badge: "Grant Received",
        badgeType: "green",
        prefix: "₹",
        value: "10",
        unit: "L",
        body: "Fortune 50 aerospace validation. Active safety conversation. Opens the aerospace MRO sector for ShoulderEX."
    },
    {
        company: "INDIAN ARMY",
        badge: "Pilot Complete",
        badgeType: "green",
        prefix: "",
        value: "Field",
        unit: "Validation",
        body: "BackeX has been validated in demanding field conditions, improving endurance and reducing physical strain during critical tasks, while helping build relationships with key defence stakeholders."
    },
    {
        company: "AIC MAHINDRA",
        badge: "Incubated",
        badgeType: "green",
        prefix: "",
        value: "8",
        unit: "plants",
        body: "Incubated at AIC Mahindra University. Warm introduction across 8 Mahindra Group manufacturing facilities in India."
    },
    {
        company: "IIT HYDERABAD",
        badge: "WIN CoE Applied",
        badgeType: "orange",
        prefix: "₹",
        value: "35",
        unit: "L",
        body: "Supported by iTIC, IIT Hyderabad, Extrive Innovations secured ₹35 lakhs in government-backed funding.This includes ₹10 lakhs under NIDHI Prayas (DST) and ₹25 lakhs under Seed Support (SISF) to accelerate product development and validation."


    }
];

export default function TractionSection() {
    return (
        <section
            id="traction"
            style={{
                background: "transparent",
                padding: "100px 24px 140px",
            }}
        >
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                
                {/* ═══════════════ INTRO ═══════════════ */}
                <div style={{ marginBottom: "64px" }}>
                    <div
                        style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "10px",
                            fontWeight: 600,
                            letterSpacing: "0.2em",
                            color: "var(--text-muted)",
                            textTransform: "uppercase",
                            marginBottom: "24px",
                        }}
                    >
                        Traction
                    </div>

                    <h2
                        style={{
                            fontFamily: "var(--font-heading)",
                            fontWeight: 700,
                            fontSize: "clamp(2rem, 4vw, 3rem)",
                            color: "var(--text-primary)",
                            lineHeight: 1.1,
                            letterSpacing: "-0.01em",
                            maxWidth: "700px",
                            marginBottom: "20px",
                        }}
                    >
                        Early validation across industry.
                    </h2>

                    <p
                        style={{
                            fontFamily: "var(--font-heading)",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: 1.7,
                            color: "var(--text-secondary)",
                            maxWidth: "600px",
                        }}
                    >
                        Before institutional scale, Extrive has already shown commercial demand, research credibility, and deployment signal across industry, defence, and manufacturing.
                    </p>
                </div>

                {/* ═══════════════ CARDS GRID ═══════════════ */}
                <div 
                    style={{ 
                        border: "1px solid var(--border)",
                        display: "grid", 
                        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                        background: "transparent"
                    }} 
                >
                    {metrics.map((item, idx) => (
                        <div
                            key={idx}
                            style={{
                                padding: "40px",
                                borderBottom: idx < metrics.length - (typeof window !== "undefined" && window.innerWidth >= 1060 ? 3 : (typeof window !== "undefined" && window.innerWidth >= 700 ? 2 : 1)) ? "1px solid var(--border)" : "none",
                                borderRight: (idx % 3 !== 2 && typeof window !== "undefined" && window.innerWidth >= 1060) || (idx % 2 === 0 && typeof window !== "undefined" && window.innerWidth >= 700 && window.innerWidth < 1060) ? "1px solid var(--border)" : "none",
                                background: "var(--surface)",
                                display: "flex",
                                flexDirection: "column",
                            }}
                            className="traction-card"
                        >
                            {/* Company Name */}
                            <div
                                style={{
                                    fontFamily: "var(--font-heading)",
                                    fontWeight: 700,
                                    fontSize: "12px",
                                    color: "var(--text-primary)",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.1em",
                                    marginBottom: "12px",
                                }}
                            >
                                {item.company}
                            </div>

                            {/* Status Badge */}
                            <div style={{ marginBottom: "28px" }}>
                                <span
                                    style={{
                                        display: "inline-block",
                                        fontFamily: "var(--font-heading)",
                                        fontSize: "10px",
                                        fontWeight: 600,
                                        letterSpacing: "0.08em",
                                        color: item.badgeType === "green" ? "#2dd4bf" : "var(--accent)", // teal-400 or orange
                                        background: item.badgeType === "green" ? "rgba(45, 212, 191, 0.08)" : "var(--badge-bg)",
                                        padding: "4px 10px",
                                    }}
                                >
                                    {item.badge}
                                </span>
                            </div>

                            {/* Main Metric */}
                            <div
                                style={{
                                    fontFamily: "var(--font-heading)",
                                    fontWeight: 700,
                                    fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                                    color: "var(--text-primary)",
                                    letterSpacing: "-0.02em",
                                    lineHeight: 1,
                                    marginBottom: "16px",
                                }}
                            >
                                {item.prefix}{item.value} <span style={{ color: "var(--accent)" }}>{item.unit}</span>
                            </div>

                            {/* Explanatory Body */}
                            <p
                                style={{
                                    fontFamily: "var(--font-body)",
                                    fontWeight: 400,
                                    fontSize: "14px",
                                    lineHeight: 1.6,
                                    color: "var(--text-secondary)",
                                }}
                            >
                                {item.body}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            {/* Embedded CSS for reliable grid borders based on typical media queries since inline JS window checks can be janky during SSR/hydration */}
            <style dangerouslySetInnerHTML={{__html: `
                .traction-card {
                    border-bottom: 1px solid var(--border) !important;
                    border-right: none !important;
                }
                @media (min-width: 768px) {
                    .traction-card {
                        border-right: 1px solid var(--border) !important;
                    }
                    .traction-card:nth-child(2n) {
                        border-right: none !important;
                    }
                    .traction-card:nth-last-child(-n+2) {
                        border-bottom: none !important;
                    }
                }
                @media (min-width: 1024px) {
                    .traction-card {
                        border-right: 1px solid var(--border) !important;
                        border-bottom: 1px solid var(--border) !important;
                    }
                    .traction-card:nth-child(2n) {
                        border-right: 1px solid var(--border) !important;
                    }
                    .traction-card:nth-child(3n) {
                        border-right: none !important;
                    }
                    .traction-card:nth-last-child(-n+3) {
                        border-bottom: none !important;
                    }
                }
            `}} />
        </section>
    );
}
