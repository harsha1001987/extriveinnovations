"use client";

import Image from "next/image";

/* ═══════════════════════════════════════════════════════════════════
   Partners — logos in /public/textures/
   ═══════════════════════════════════════════════════════════════════ */

const PARTNERS = [
    { name: "AIC Mahindra", logo: "/textures/AIC.png" },
    { name: "Boeing", logo: "/textures/Boeing.png" },
    { name: "Maruti Suzuki", logo: "/textures/Maruti.png" },
    { name: "NIDHI Prayas", logo: "/textures/nidhi.png" },
    { name: "Startup India", logo: "/textures/startupIndia.png" },
];

/* ═══════════════════════════════════════════════════════════════════
   Recognition — Dark Industrial Marquee
   ═══════════════════════════════════════════════════════════════════ */

export default function RecognitionSection() {
    // Triplicate the array so the continuous scroll never runs out of content
    const logos = [...PARTNERS, ...PARTNERS, ...PARTNERS];

    return (
        <section className="relative bg-[#0a0a0a] py-28 overflow-hidden border-y border-white/5">
            
            {/* ── Background Effects (Architectural Grid + Orange Glow) ── */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.06),transparent_60%)] pointer-events-none" />

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes marquee-scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.3333%); } 
                }
                .animate-marquee {
                    animation: marquee-scroll 25s linear infinite;
                    will-change: transform;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}} />

            {/* ── Heading ── */}
            <div className="relative z-10 text-center mb-20 px-6">
                <div className="flex items-center justify-center gap-4 mb-4 opacity-80">
                    <div className="h-[1px] w-8 md:w-16 bg-gradient-to-r from-transparent to-orange-500" />
                    <span className="text-orange-500 font-bold tracking-[0.2em] uppercase text-xs md:text-sm">
                        Strategic Partners
                    </span>
                    <div className="h-[1px] w-8 md:w-16 bg-gradient-to-l from-transparent to-orange-500" />
                </div>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-wide text-white">
                    Deployed across industry pioneers.
                </h2>
            </div>

            {/* ── Conveyor Track Wrapper ── */}
            <div className="relative w-full flex items-center overflow-hidden z-10">
                
                {/* ── Edge Fade Masks ── */}
                <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-20 pointer-events-none" />

                {/* ── The Scrolling Track ── */}
                <div className="flex animate-marquee items-center gap-16 md:gap-32 w-max px-8">
                    {logos.map((p, i) => (
                        <div 
                            key={`${p.name}-${i}`} 
                            className="group flex-shrink-0 flex items-center justify-center transition-all duration-500 cursor-default"
                        >
                            {/* Container with subtle permanent glow that brightens on hover */}
                            <div className="relative p-6 rounded-2xl transition-all duration-500 
                                bg-white/[0.01] border border-white/[0.03] shadow-[0_0_25px_rgba(249,115,22,0.05)]
                                group-hover:bg-white/[0.03] group-hover:shadow-[0_0_50px_rgba(249,115,22,0.15)] group-hover:border-orange-500/10">
                                <Image
                                    src={p.logo}
                                    alt={p.name}
                                    width={200}
                                    height={80}
                                    style={{ objectFit: "contain" }}
                                    /* Logos are now bright and full color by default */
                                    className="h-14 md:h-16 w-auto opacity-95 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105" 
                                />
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}