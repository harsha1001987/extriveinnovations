"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

// Import your existing sections (Adjust the file paths if needed based on your folder structure)
import RequestDemoSection from "../components/RequestDemoSection";
import GetInTouch from "../components/Contact"; // Assuming this is saved in Contact.js
import Navbar from "../components/Navbar";
import BackExModel from "../components/BackExModel";

export default function ExosuitProductPage() {
    return (
        <div className="bg-[#0a0a0a] text-gray-200 min-h-screen font-sans selection:bg-orange-500/30">

            {/* ═══════════════ NAVBAR ═══════════════ */}
            <Navbar />

            {/* =========================================
          SECTION 1: HERO INTRODUCTION
          ========================================= */}
            <section className="relative min-h-[100vh] flex flex-col justify-center px-6 lg:px-16 overflow-hidden pt-20">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none
          bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.07),transparent_60%)]" />

                <div className="relative z-10 max-w-7xl">
                    <h1 className="text-5xl md:text-7xl lg:text-[85px] font-bold tracking-tighter leading-[0.9] uppercase text-white">
                        Engineering the <br />
                        future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">human strength.</span>
                    </h1>

                    <p className="mt-10 max-w-2xl text-lg md:text-xl font-light tracking-wide text-gray-400 leading-relaxed">
                        Deploying next-generation industrial exosuits and AI-powered ergonomic systems.
                        Built to eradicate workplace strain, amplify endurance, and elevate human performance
                        at an industrial scale.
                    </p>

                    <a href="#demo" className="mt-16 group relative inline-flex items-center gap-4 px-8 py-4 bg-transparent 
            border border-white/20 text-white font-medium tracking-widest uppercase text-sm cursor-pointer
            transition-all duration-500 hover:-translate-y-1 hover:border-orange-500/60 hover:bg-orange-500/5">
                        <span>Explore Product Systems</span>
                        <ArrowRight className="w-4 h-4 text-orange-500 group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                </div>
            </section>

            {/* =========================================
          SECTION 2: PRODUCT LINE OVERVIEW
          ========================================= */}
            <section className="border-t border-white/10 relative z-20 bg-[#0a0a0a]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
                    <ProductColumn
                        title="BackEX"
                        target="#backex"
                        description="Ultra-light passive exosuit. 46% strain reduction. Zero batteries."
                    />
                    <ProductColumn
                        title="ShoulderEX"
                        target="#shoulderex"
                        description="Overhead support architecture. 35% shoulder fatigue reduction."
                    />
                    <ProductColumn
                        title="ForceX"
                        target="#forcex"
                        description="Powered exoskeleton system. Amplified strength and extreme endurance."
                    />
                    <ProductColumn
                        title="ErgoEX"
                        target="#ergoex"
                        description="AI ergonomics intelligence. Detect strain patterns and pinpoint pain zones."
                    />
                </div>
            </section>

            {/* =========================================
          SECTION 3: BACKEX DEEP REVEAL
          ========================================= */}
            <section id="backex" className="relative py-32 lg:py-48 px-6 lg:px-16 overflow-hidden border-t border-white/10 pt-32">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

                    <div className="lg:col-span-5 relative group">
                        {/* ORANGE GRADIENT COMING FROM TOP LEFT REMOVED HERE */}

                        <BackExModel />

                        <div className="absolute inset-0 border border-white/10 z-20 pointer-events-none" />

                        {/* TWO ORANGE LINES AT TOP LEFT REMOVED HERE */}
                    </div>

                    <div className="lg:col-span-7 flex flex-col justify-center">

                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-[2px] w-8 bg-orange-500" />
                            <span className="text-orange-500 font-bold tracking-[0.2em] uppercase text-xs">
                                Flagship System // 01
                            </span>
                        </div>

                        <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight uppercase text-white mb-8">
                            Redefining back support <br className="hidden lg:block" /> in heavy industry.
                        </h2>

                        <div className="space-y-6 text-gray-400 font-light text-lg leading-relaxed max-w-2xl">
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 mt-16 pt-16 border-t border-white/10">
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

                        <div className="mt-20">
                            {/* Changed from <button> to <a> so it links to the demo form below */}
                            <a href="#demo" className="group relative inline-flex items-center justify-center px-10 py-5 bg-[#111] 
                border border-white/10 text-white font-medium tracking-widest uppercase text-sm
                transition-all duration-500 hover:-translate-y-1 hover:border-orange-500 hover:shadow-[0_0_30px_-5px_rgba(249,115,22,0.2)]">
                                Request Industrial Pilot
                            </a>
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================
          SECTION 4: REQUEST DEMO
          ========================================= */}
            <RequestDemoSection />

            {/* =========================================
          SECTION 5: CONTACT
          ========================================= */}
            <GetInTouch />

        </div>
    );
}

// Sub-component for Section 2 Columns
function ProductColumn({ title, description, target }) {
    return (
        <a href={target} className="group relative flex flex-col justify-end min-h-[400px] p-10 lg:p-14 overflow-hidden cursor-pointer outline-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.08),transparent_60%)] 
        opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-2">
                <h3 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4">
                    {title}
                </h3>
                <p className="text-gray-500 text-sm font-light tracking-wide leading-relaxed max-w-[250px] group-hover:text-gray-300 transition-colors duration-500">
                    {description}
                </p>

                <div className="mt-8 flex items-center">
                    <div className="h-[1px] w-0 bg-orange-500 group-hover:w-full transition-all duration-700 ease-out" />
                    <ChevronRight className="w-4 h-4 text-orange-500 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 delay-100" />
                </div>
            </div>
        </a>
    );
}

// Sub-component for Section 3 Features
function FeatureItem({ number, title, text }) {
    return (
        <div className="relative">
            <div className="flex items-baseline gap-3 mb-3">
                <span className="text-orange-500/50 font-mono text-sm">{number}</span>
                <h4 className="text-white font-semibold tracking-wide">{title}</h4>
            </div>
            <p className="text-gray-400 text-sm font-light leading-relaxed pl-7 border-l border-white/10">
                {text}
            </p>
        </div>
    );
}