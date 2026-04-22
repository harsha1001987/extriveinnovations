"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const products = [
    {
        index: "01",
        title: "BackEX",
        stage: "STAGE 1 — DEPLOYED ",
        description: "A 0.7 kg passive elastic back-support exosuit. Elastic bands run parallel to the erector spinae — storing energy on forward bend, releasing on return. No batteries. No motors. No charging. Demonstrated 20–46% reduction in back muscle strain, validated with an FDA-approved EMG device. Currently deployed with L&T Construction and Indian Army.",
        linkUrl: "/ProductsPage",
    },
    {
        index: "02",
        title: "ShoulderEX",
        stage: "STAGE 2 — PRODUCTION READY · OCT 2026",
        description: "A pneumatic overhead task exosuit for the highest-strain environments — automotive assembly, aerospace MRO, and construction overhead work. Reduces shoulder and trapezius load during sustained overhead operations. The highest per-unit value product in our portfolio with the clearest ROI case for automotive OEMs.",
        linkUrl: "/contact", // As requested, single product page is BackEX. Keeping ShoulderEX link to contact for inquiries.
    },
    {
        index: "03",
        title: "ErgoEX",
        stage: "STAGE 3 — IN DEVELOPMENT · AI INTELLIGENCE LAYER",
        description: "ErgoEX is a wearable, multi-IMU–based intelligence system that continuously monitors body posture, movement, and load dynamics in real time. It analyzes musculoskeletal strain patterns and predicts fatigue-driven injury risk using adaptive algorithms, delivering actionable ergonomic insights to improve worker safety, productivity, and long-term health.",
        linkUrl: "/contact",
    },
];

export default function ProductsSection() {
    return (
        <section
            id="products"
            style={{
                background: "transparent",
                padding: "40px 24px 120px",
            }}
        >
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
                
                {/* ═══════════════ INTRO ═══════════════ */}
                <div style={{ marginBottom: "64px" }}>
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
                        Products
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
                            marginBottom: "24px",
                        }}
                    >
                        A product stack for industrial augmentation.
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
                        Extrive is building across deployed exosuits, next-generation assistive systems, and the intelligence layer that connects them — creating a portfolio designed for real industrial environments, not isolated demos.
                    </p>
                </div>

                {/* ═══════════════ PRODUCT ROWS ═══════════════ */}
                <div style={{ borderTop: "1px solid var(--border)" }}>
                    {products.map((product, i) => (
                        <ProductRow
                            key={product.title}
                            {...product}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProductRow({ index, title, stage, description, linkUrl }) {
    return (
        <div
            data-cursor="product"
            className="product-row"
            style={{
                position: "relative",
                padding: "64px 0",
                borderBottom: "1px solid var(--border)",
                overflow: "hidden",
            }}
        >
            {/* Faint oversized index */}
            <span
                aria-hidden="true"
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(8rem, 16vw, 12rem)",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    opacity: 0.02,
                    lineHeight: 1,
                    pointerEvents: "none",
                    userSelect: "none",
                }}
            >
                {index}
            </span>

            <div 
                style={{ 
                    position: "relative", 
                    zIndex: 10,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    gap: "40px",
                    flexWrap: "wrap",
                }}
            >
                <div style={{ flex: "1 1 min(100%, 600px)", maxWidth: "650px" }}>
                    {/* Stage badge */}
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            padding: "6px 14px",
                            border: "1px solid rgba(232,106,0,0.3)",
                            background: "rgba(232,106,0,0.05)",
                            borderRadius: "2px",
                            marginBottom: "20px",
                        }}
                    >
                        <div style={{ width: "4px", height: "4px", background: "var(--accent)", borderRadius: "50%", marginRight: "8px" }} />
                        <span
                            style={{
                                fontFamily: "var(--font-heading)",
                                fontSize: "10px",
                                fontWeight: 600,
                                letterSpacing: "0.14em",
                                color: "var(--text-primary)",
                                textTransform: "uppercase",
                            }}
                        >
                            {stage}
                        </span>
                    </div>

                    {/* Product name */}
                    <h3
                        style={{
                            fontFamily: "var(--font-heading)",
                            fontWeight: 700,
                            fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                            color: "var(--text-primary)",
                            lineHeight: 1.1,
                            letterSpacing: "-0.01em",
                            marginBottom: "16px",
                        }}
                    >
                        {title}
                    </h3>

                    {/* Description */}
                    <p
                        style={{
                            fontFamily: "var(--font-heading)",
                            fontWeight: 400,
                            fontSize: "15px",
                            lineHeight: 1.75,
                            color: "var(--text-secondary)",
                        }}
                    >
                        {description}
                    </p>
                </div>

                {/* Explore More CTA */}
                <div style={{ flexShrink: 0 }}>
                    <Link
                        href={linkUrl}
                        className="group"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "12px 24px",
                            border: "1px solid var(--border)",
                            background: "var(--surface)",
                            color: "var(--text-primary)",
                            fontFamily: "var(--font-heading)",
                            fontSize: "12px",
                            fontWeight: 600,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            textDecoration: "none",
                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "var(--accent)";
                            e.currentTarget.style.color = "var(--accent)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "var(--border)";
                            e.currentTarget.style.color = "var(--text-primary)";
                        }}
                    >
                        Explore More
                        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
