"use client";

import Navbar from "../components/Navbar";
import BackExModel from "../components/BackExModel";
import BackExFaq from "../components/BackExFaq";

export default function BackExPage() {
    return (
        <div style={{ background: "var(--background)", color: "var(--foreground)", minHeight: "100vh" }} className="font-sans selection:bg-orange-500/30">

            {/* ═══════════════ NAVBAR ═══════════════ */}
            <Navbar />

            {/* =========================================
          SECTION 1: HERO INTRODUCTION
          ========================================= */}
            <section className="relative flex flex-col justify-center px-6 lg:px-16 overflow-hidden pt-40 pb-20">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none
          bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.07),transparent_60%)]" />

                <div className="relative z-10 max-w-7xl mx-auto text-center flex flex-col items-center">
                    <h1 className="text-5xl md:text-7xl lg:text-[85px] font-bold tracking-tighter leading-[0.9] uppercase"
                        style={{ color: "var(--text-primary)" }}>
                        Back<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">EX</span>
                    </h1>

                    <p className="mt-8 max-w-2xl text-lg md:text-xl font-light tracking-wide leading-relaxed"
                       style={{ color: "var(--text-secondary)" }}>
                        A passive, zero-power exosuit engineered to eradicate lumbar strain and protect the industrial spine. 
                    </p>
                </div>
            </section>

            {/* =========================================
          SECTION 2: BACKEX DEEP REVEAL
          ========================================= */}
            <section id="backex" className="relative py-20 lg:py-32 px-6 lg:px-16 overflow-hidden"
                     style={{ borderTop: "1px solid var(--border)" }}>
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

                    <div className="lg:col-span-5 relative group">
                        <BackExModel />
                        <div className="absolute inset-0 z-20 pointer-events-none" style={{ border: "1px solid var(--border)" }} />
                    </div>

                    <div className="lg:col-span-7 flex flex-col justify-center">

                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-[2px] w-8 bg-orange-500" />
                            <span className="text-orange-500 font-bold tracking-[0.2em] uppercase text-xs">
                                Flagship System // 01
                            </span>
                        </div>

                        <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight uppercase mb-8"
                            style={{ color: "var(--text-primary)" }}>
                            Redefining back support <br className="hidden lg:block" /> in heavy industry.
                        </h2>

                        <div className="space-y-6 font-light text-lg leading-relaxed max-w-2xl"
                             style={{ color: "var(--text-secondary)" }}>
                            <p>
                                The BackEX system is not an accessory; it is structural reinforcement for the human body.
                                Engineered to seamlessly integrate with natural biomechanics, it drastically reduces the physical
                                toll of repetitive lifting, bending, and static holding.
                            </p>
                            <p>
                                By offloading weight from the lumbar spine and transferring it to the thighs, BackEX empowers
                                workers to operate with greater safety and efficiency, without restricting their range of motion.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 mt-16 pt-16"
                             style={{ borderTop: "1px solid var(--border)" }}>
                            <FeatureItem
                                number="01"
                                title="Biomechanical Relief"
                                text="Reduces lower back muscle strain by up to 46%, driving a 12% boost in productivity and a 40% improvement in lifting comfort."
                            />
                            <FeatureItem
                                number="02"
                                title="Ultra-Light Architecture"
                                text="Weighs just 700 grams (1.5 lbs). Engineered from aerospace-grade materials for invisible, non-restrictive support."
                            />
                            <FeatureItem
                                number="03"
                                title="Passive Independence"
                                text="100% mechanical assistance. Zero motors. Zero batteries. Zero downtime or charging cycles required on the floor."
                            />
                            <FeatureItem
                                number="04"
                                title="Endurance Engineered"
                                text="Fully customizable, modular fit designed specifically for uncompromising comfort across continuous, long-duration shifts."
                            />
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================
          SECTION 3: FAQ
          ========================================= */}
            <BackExFaq />

            {/* Footer */}
            <footer style={{ borderTop: "1px solid var(--border)", padding: "40px 24px", textAlign: "center" }}>
                <p style={{ color: "var(--text-muted)", fontSize: "13px", letterSpacing: "0.05em" }}>
                    © {new Date().getFullYear()} <span style={{ color: "var(--accent)" }}>Extrive</span> Innovations. All rights reserved.
                </p>
            </footer>

        </div>
    );
}

// Sub-component for Section Features
function FeatureItem({ number, title, text }) {
    return (
        <div className="relative">
            <div className="flex items-baseline gap-3 mb-3">
                <span className="text-orange-500/50 font-mono text-sm">{number}</span>
                <h4 className="font-semibold tracking-wide" style={{ color: "var(--text-primary)" }}>{title}</h4>
            </div>
            <p className="text-sm font-light leading-relaxed pl-7" style={{ color: "var(--text-secondary)", borderLeft: "1px solid var(--border)" }}>
                {text}
            </p>
        </div>
    );
}