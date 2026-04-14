"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "Is BackEX powered or passive?",
        answer: "BackEX is a fully passive exosuit. It uses elastic elements to store energy during forward bending and release it during return, without motors, electronics, batteries, or charging."
    },
    {
        question: "What problem is BackEX designed to solve?",
        answer: "BackEX is designed to reduce lower-back strain during repetitive bending, lifting, and forward-leaning industrial tasks. It is intended for environments where musculoskeletal load is persistent and injury risk compounds over time."
    },
    {
        question: "What kind of strain reduction has been observed?",
        answer: "BackEX has demonstrated a 20–46% reduction in back muscle strain, validated using an FDA-approved EMG device. This makes it a practical intervention for teams focused on ergonomics, injury prevention, and sustained worker performance."
    },
    {
        question: "Which industries or environments is it suited for?",
        answer: "BackEX is suited for physically demanding environments such as construction, manufacturing, logistics, and defence-related field use — especially where workers repeatedly bend, lift, or sustain load through the lower back."
    },
    {
        question: "Does it require charging, maintenance-heavy infrastructure, or technical setup?",
        answer: "No. BackEX does not require charging or powered infrastructure. Because it is passive, deployment is operationally simpler than powered systems and better suited for real industrial settings that need reliability and low friction."
    },
    {
        question: "Is BackEX already deployed or only in testing?",
        answer: "BackEX is already deployed in real-world contexts, including with L&T Construction and the Indian Army. It is not just a concept or lab-stage system."
    },
    {
        question: "How does a pilot typically begin?",
        answer: "A pilot typically starts with a conversation around the target workflow, worker profile, and deployment environment. From there, the team can define pilot scope, evaluation criteria, and the operational conditions needed to test BackEX in context."
    }
];

export default function BackExFaq() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section style={{ padding: "100px 24px 120px", background: "var(--background)", borderTop: "1px solid var(--border)" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                
                {/* ═══════════════ INTRO ═══════════════ */}
                <div style={{ textAlign: "center", marginBottom: "64px" }}>
                    <div
                        style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "10px",
                            fontWeight: 600,
                            letterSpacing: "0.2em",
                            color: "var(--text-muted)",
                            textTransform: "uppercase",
                            marginBottom: "24px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "12px",
                        }}
                    >
                        <div style={{ width: "30px", height: "1px", background: "var(--border)" }} />
                        <span style={{ color: "var(--accent)" }}>FAQ</span>
                        <div style={{ width: "30px", height: "1px", background: "var(--border)" }} />
                    </div>

                    <h2
                        style={{
                            fontFamily: "var(--font-heading)",
                            fontWeight: 700,
                            fontSize: "clamp(2rem, 4vw, 2.8rem)",
                            color: "var(--text-primary)",
                            lineHeight: 1.1,
                            letterSpacing: "-0.01em",
                            marginBottom: "16px",
                        }}
                    >
                        Questions that matter before deployment.
                    </h2>

                    <p
                        style={{
                            fontFamily: "var(--font-heading)",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: 1.7,
                            color: "var(--text-secondary)",
                            maxWidth: "540px",
                            margin: "0 auto",
                        }}
                    >
                        A few direct answers to the questions that typically come up when teams evaluate BackEX for real-world use.
                    </p>
                </div>

                {/* ═══════════════ ACCORDION ROWS ═══════════════ */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {faqs.map((faq, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div
                                key={idx}
                                style={{
                                    border: "1px solid var(--border)",
                                    borderRadius: "8px", // Slight rounding to match visual inspo, but still sharp
                                    background: isOpen ? "var(--surface-hover)" : "var(--surface)",
                                    overflow: "hidden",
                                    transition: "background 0.3s ease",
                                }}
                            >
                                <button
                                    onClick={() => toggleFaq(idx)}
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        padding: "24px 32px",
                                        background: "transparent",
                                        border: "none",
                                        cursor: "pointer",
                                        textAlign: "left",
                                        fontFamily: "var(--font-heading)",
                                    }}
                                    className="group"
                                >
                                    <span
                                        style={{
                                            fontWeight: 600,
                                            fontSize: "1.1rem",
                                            color: isOpen ? "var(--accent)" : "var(--text-primary)",
                                            transition: "color 0.2s ease",
                                        }}
                                    >
                                        {faq.question}
                                    </span>
                                    <ChevronDown
                                        style={{
                                            color: isOpen ? "var(--accent)" : "var(--text-secondary)",
                                            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                                            transition: "all 0.3s ease",
                                        }}
                                        size={20}
                                    />
                                </button>
                                
                                <div
                                    style={{
                                        maxHeight: isOpen ? "500px" : "0",
                                        opacity: isOpen ? 1 : 0,
                                        overflow: "hidden",
                                        transition: "all 0.3s ease-in-out",
                                        padding: isOpen ? "0 32px 28px 32px" : "0 32px",
                                    }}
                                >
                                    <p
                                        style={{
                                            fontFamily: "var(--font-body)",
                                            fontSize: "15px",
                                            lineHeight: 1.7,
                                            color: "var(--text-secondary)",
                                            margin: 0,
                                            borderTop: "1px solid var(--border)",
                                            paddingTop: "24px",
                                        }}
                                    >
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
