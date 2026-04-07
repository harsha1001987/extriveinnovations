"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ContactCTA() {
    return (
        <section
            style={{
                background: "transparent",
                padding: "80px 24px 140px",
            }}
        >
            <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
                
                <h2
                    style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 700,
                        fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                        color: "var(--text-primary)",
                        lineHeight: 1.05,
                        letterSpacing: "-0.02em",
                        marginBottom: "24px",
                    }}
                >
                    Ready to protect your <span style={{ color: "var(--accent)" }}>workforce?</span>
                </h2>

                <p
                    style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: 1.7,
                        color: "var(--text-secondary)",
                        maxWidth: "600px",
                        margin: "0 auto 64px auto",
                    }}
                >
                    Whether you&apos;re an enterprise EHS manager, a defence procurement officer, an investor, or a researcher — let&apos;s start a conversation.
                </p>

                {/* Unified CTA Sequence */}
                <div 
                    style={{ 
                        margin: "0 auto",
                        maxWidth: "840px",
                        background: "var(--surface)", 
                        border: "1px solid var(--border)",
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        overflow: "hidden"
                    }}
                >
                    {/* Top Accent Strip */}
                    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "2px", background: "var(--accent)" }} />
                    
                    <div className="flex flex-col md:flex-row w-full">
                        {/* Intents Section */}
                        <div className="flex-1 px-10 py-12 flex flex-col justify-center border-b md:border-b-0 md:border-r" style={{ borderColor: "var(--border)" }}>
                            <div className="flex flex-col gap-4 text-left justify-center h-full pl-6 border-l" style={{ borderColor: "rgba(232,106,0,0.3)" }}>
                                <div className="group cursor-default">
                                    <span style={{ fontFamily: "var(--font-heading)", fontSize: "16px", fontWeight: 400, color: "var(--text-primary)", letterSpacing: "0.02em" }}>Request a pilot program</span>
                                </div>
                                
                                <div style={{ fontFamily: "var(--font-heading)", fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>or</div>
                                
                                <div className="group cursor-default">
                                    <span style={{ fontFamily: "var(--font-heading)", fontSize: "16px", fontWeight: 400, color: "var(--text-primary)", letterSpacing: "0.02em" }}>Connect for partnership</span>
                                </div>
                                
                                <div style={{ fontFamily: "var(--font-heading)", fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>or</div>
                                
                                <div className="group cursor-default">
                                    <span style={{ fontFamily: "var(--font-heading)", fontSize: "16px", fontWeight: 400, color: "var(--text-primary)", letterSpacing: "0.02em" }}>Join our engineering team</span>
                                </div>
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="flex-1 px-10 py-12 flex flex-col items-center justify-center relative overflow-hidden" style={{ background: "var(--surface-hover)" }}>
                            {/* Subtle background radial for tension */}
                            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "200px", height: "200px", background: "rgba(232,106,0,0.05)", filter: "blur(40px)", borderRadius: "50%", pointerEvents: "none" }} />
                            
                            <div style={{ marginBottom: "24px", width: "48px", height: "48px", borderRadius: "50%", border: "1px solid rgba(232,106,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(232,106,0,0.08)", zIndex: 10 }}>
                                <ArrowRight color="#e86a00" size={20} />
                            </div>
                            
                            <Link
                                href="/contact"
                                className="group w-full max-w-[280px] text-center relative z-10"
                                style={{
                                    display: "block",
                                    background: "var(--accent)",
                                    color: "white",
                                    fontFamily: "var(--font-heading)",
                                    fontWeight: 600,
                                    fontSize: "13px",
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                    padding: "18px 24px",
                                    borderRadius: "2px",
                                    textDecoration: "none",
                                    transition: "background 0.2s ease",
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = "#cf5e00"}
                                onMouseLeave={(e) => e.currentTarget.style.background = "var(--accent)"}
                            >
                                Start Conversation
                            </Link>

                            <span style={{ marginTop: "16px", fontSize: "10px", fontFamily: "var(--font-heading)", letterSpacing: "0.2em", color: "var(--text-muted)", textTransform: "uppercase", zIndex: 10 }}>
                                Gateway &gt; Contact
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
