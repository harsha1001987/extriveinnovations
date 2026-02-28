"use client";
import Link from "next/link";

const products = [
    {
        title: "BackEX",
        description: "Reduces lower-back strain up to 46% while improving lifting comfort and productivity. Ultra-light passive exosuit — no batteries, no motors.",
        status: "LIVE",
        statusColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
        delay: "delay-0",
    },
    {
        title: "ShoulderEX",
        description: "Up to 35% reduction in shoulder fatigue during overhead work. Lightweight passive support built for long-duration elevation tasks.",
        status: "Q4 2026",
        statusColor: "text-orange-400 bg-orange-400/10 border-orange-400/20",
        delay: "delay-100",
    },
    {
        title: "ForceX",
        description: "A powered exoskeleton engineered to amplify strength and endurance while reducing physical stress in demanding environments.",
        status: "PROTOTYPE",
        statusColor: "text-blue-400 bg-blue-400/10 border-blue-400/20",
        delay: "delay-200",
    },
    {
        title: "ErgoEX",
        description: "AI ergonomics platform that tracks strain patterns, identifies pain points, and delivers actionable workplace insights.",
        status: "BETA",
        statusColor: "text-purple-400 bg-purple-400/10 border-purple-400/20",
        delay: "delay-300",
    },
];

export default function ProductsSection() {
    return (
        <section
            id="products"
            className="relative bg-black text-white py-32 px-6 overflow-hidden"
        >
            {/* Ambient glow - Kept exactly as you had it */}
            <div className="absolute top-0 left-0 w-full h-64 pointer-events-none
        bg-[radial-gradient(circle_at_50%_-20%,rgba(255,120,0,0.25),transparent_70%)]" />

            <div className="relative max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Our{" "}
                        <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
                            Products
                        </span>
                    </h2>
                </div>

                {/* Switched to a CSS Grid for structured cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <ProductCard key={index} {...product} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProductCard({ title, description, status, statusColor, delay }) {
    return (
        <Link href="/ProductsPage" className={`group relative flex flex-col justify-between p-8 rounded-2xl 
      bg-white/[0.02] border border-white/10 backdrop-blur-sm overflow-hidden 
      transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.04] 
      hover:border-orange-500/50 hover:shadow-[0_0_30px_-5px_rgba(255,120,0,0.3)]
      ${delay}`}
        >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent 
        opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Sweeping Scanner Effect (Micro-interaction) */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent 
        -translate-y-[150%] group-hover:translate-y-[150%] transition-transform duration-[1.5s] ease-in-out pointer-events-none" />

            <div className="relative z-10">
                {/* Header: Title and Status Badge */}
                <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-bold tracking-wide text-white group-hover:text-orange-400 transition-colors duration-300">
                        {title}
                    </h3>
                    <span className={`text-[10px] font-bold tracking-widest uppercase py-1 px-3 rounded-full border ${statusColor} 
            group-hover:animate-pulse`}>
                        {status}
                    </span>
                </div>

                {/* Tech-inspired separator */}
                <div className="flex items-center gap-2 mb-6">
                    <div className="h-[2px] w-8 bg-orange-500/40 group-hover:w-16 group-hover:bg-orange-500 transition-all duration-500" />
                    <div className="h-[4px] w-[4px] rounded-full bg-orange-500/40 group-hover:bg-orange-500 transition-colors duration-500" />
                </div>

                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {description}
                </p>
            </div>

            {/* Action Button that appears on hover */}
            <div className="relative z-10 mt-8 pt-6 border-t border-white/5 flex items-center justify-between overflow-hidden">
                <span className="text-sm font-semibold text-orange-500 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    Explore Specs
                </span>
                <svg
                    className="w-5 h-5 text-orange-500 transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </div>
        </Link>
    );
}