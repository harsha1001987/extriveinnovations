"use client";

import Link from "next/link";

export default function Navbar() {
    return (
        <nav
            className="fixed top-0 left-0 w-full z-[100] px-6 md:px-10 py-4 md:py-4 flex items-center border-b border-white/5"
            style={{
                background: "rgba(0, 0, 0, 0.4)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
            }}
        >
            {/* Brand with Micro-interactions */}
            <Link href="/" className="relative group flex items-center outline-none">

                {/* Core Text */}
                <h1
                    className="relative z-10 text-2xl font-bold tracking-wider text-[#E3C49B] transition-colors duration-500 group-hover:text-white"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    Extrive Innovations
                </h1>

                {/* 1. Underlying Glow (Expands and brightens on hover) */}
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[160%] bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.3),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />

                {/* 2. Text Glow (Simulates light bloom on the letters) */}
                <span
                    className="absolute inset-0 z-0 text-orange-400 blur-[8px] opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none flex items-center"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    <span className="text-2xl font-bold tracking-wider">Extrive Innovations</span>
                </span>

            </Link>

            {/* Nav Links with Hover Micro-interactions */}
            <div className="ml-auto hidden md:flex items-center gap-12 text-base">
                <NavItem href="/#about" label="About" />
                
                {/* Replaced static Product link with Dropdown */}
                <NavDropdown />
                
                <NavItem href="/roi-calculator" label="ROI Calculator" />
            </div>
        </nav>
    );
}

/* ═══════════════ NAV ITEM SUB-COMPONENT ═══════════════ */
function NavItem({ href, label }) {
    return (
        <Link href={href} className="relative group text-gray-300 font-medium transition-colors cursor-pointer py-2">

            {/* 1. The Light Source (Top edge line that expands) */}
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-orange-500 rounded-full group-hover:w-[120%] transition-all duration-300 ease-out" />

            {/* 2. The Spotlight Beam (Orange gradient shining down) */}
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-16 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.35),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* 3. The Text */}
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                {label}
            </span>

            {/* 4. Text Glow (Simulates light bloom on the letters) */}
            <span className="absolute top-0 left-0 z-0 text-orange-400 blur-[4px] opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none">
                {label}
            </span>

        </Link>
    );
}

/* ═══════════════ NAV DROPDOWN SUB-COMPONENT ═══════════════ */
function NavDropdown() {
    return (
        <div className="relative group text-gray-300 font-medium cursor-pointer py-2">
            
            {/* The Trigger (Looks exactly like a NavItem) */}
            <Link href="/ProductsPage" className="relative outline-none flex items-center gap-1">
                {/* Top Spotlight Effects */}
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-orange-500 rounded-full group-hover:w-[120%] transition-all duration-300 ease-out" />
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-16 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.35),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                    Products
                </span>
                
                {/* Chevron icon indicating a dropdown */}
                <svg className="w-4 h-4 mt-[2px] opacity-70 group-hover:opacity-100 group-hover:text-orange-400 transition-all duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>

                <span className="absolute top-0 left-0 z-0 text-orange-400 blur-[4px] opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none">
                    Products
                </span>
            </Link>

            {/* The Dropdown Menu */}
            {/* pt-6 acts as an invisible bridge so hover isn't lost when moving mouse down */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                <div className="flex flex-col w-48 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(249,115,22,0.1)]">
                    
                    <DropdownItem href="/ProductsPage#backex" label="BackEX" />
                    <DropdownItem href="/#ergoex" label="ErgoEX" />
                    <DropdownItem href="/#ergoex" label="ShoulderEX" />

                    {/* Bottom subtle glow inside the menu */}
                    <div className="h-1 w-full bg-gradient-to-r from-transparent via-orange-500/30 to-transparent pointer-events-none" />
                </div>
            </div>
        </div>
    );
}

/* ═══════════════ DROPDOWN ITEM SUB-COMPONENT ═══════════════ */
function DropdownItem({ href, label }) {
    return (
        <Link href={href} className="relative px-5 py-3 text-sm text-gray-400 font-medium transition-colors hover:text-white hover:bg-white/[0.04] group/item outline-none overflow-hidden">
            
            {/* Mechanical left edge accent line */}
            <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-orange-500 scale-y-0 origin-center transition-transform duration-300 group-hover/item:scale-y-100" />
            
            {/* Ambient hover glow behind text */}
            <span className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover/item:opacity-100 pointer-events-none" />

            {/* Text nudge micro-interaction */}
            <span className="relative z-10 inline-block transition-transform duration-300 group-hover/item:translate-x-1">
                {label}
            </span>

        </Link>
    );
}