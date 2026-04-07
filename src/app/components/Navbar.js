"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    return (
        <>
            <nav
                className="fixed top-0 left-0 w-full z-[100] px-6 md:px-10 py-4 md:py-4 flex items-center border-b border-white/5"
                style={{
                    background: "var(--navbar-bg)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                }}
            >
                {/* Brand */}
                <Link href="/" className="relative group flex items-center outline-none">
                    <h1
                        className="relative z-10 text-xl md:text-2xl font-bold tracking-wider transition-colors duration-500"
                        style={{
                            fontFamily: "var(--font-heading)",
                            color: "var(--text-primary)",
                        }}
                    >
                        E<span style={{ color: "var(--accent)" }}>x</span>trive Innovations
                    </h1>
                </Link>

                {/* Desktop Nav Links */}
                <div className="ml-auto hidden md:flex items-center gap-10">
                    <NavItem href="/#about" label="About" />
                    <NavDropdown />
                    <NavItem href="/#traction" label="Traction" />
                    <NavItem href="/roi-calculator" label="ROI Calculator" />
                    <NavItem href="/contact" label="Contact" />

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="relative w-8 h-8 flex items-center justify-center rounded-sm transition-colors duration-200"
                        style={{
                            color: "var(--text-secondary)",
                        }}
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? (
                            /* Sun icon */
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="5" />
                                <line x1="12" y1="1" x2="12" y2="3" />
                                <line x1="12" y1="21" x2="12" y2="23" />
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                <line x1="1" y1="12" x2="3" y2="12" />
                                <line x1="21" y1="12" x2="23" y2="12" />
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                            </svg>
                        ) : (
                            /* Moon icon */
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Hamburger Button */}
                <button
                    className="ml-auto md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] z-[110] relative"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle navigation menu"
                >
                    <span
                        className={`block w-6 h-[2px] rounded-full transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`}
                        style={{ background: "var(--text-primary)" }}
                    />
                    <span
                        className={`block w-6 h-[2px] rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0 scale-0" : ""}`}
                        style={{ background: "var(--text-primary)" }}
                    />
                    <span
                        className={`block w-6 h-[2px] rounded-full transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
                        style={{ background: "var(--text-primary)" }}
                    />
                </button>
            </nav>

            {/* ═══════════════ MOBILE SLIDE-OUT MENU ═══════════════ */}
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[95] md:hidden transition-opacity duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={() => setMobileOpen(false)}
            />

            {/* Menu Panel */}
            <div
                className={`fixed top-0 right-0 w-[280px] h-full backdrop-blur-xl z-[98] md:hidden flex flex-col pt-24 px-8 transition-transform duration-400 ease-out ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
                style={{
                    background: "var(--background)",
                    borderLeft: "1px solid var(--border)",
                }}
            >
                {/* Nav Links */}
                <div className="flex flex-col gap-2">
                    <MobileNavItem href="/#about" label="About" onClick={() => setMobileOpen(false)} />
                    <MobileNavItem href="/#products" label="Products" onClick={() => setMobileOpen(false)} />
                    <MobileNavItem href="/ProductsPage" label="BackEX" sub onClick={() => setMobileOpen(false)} />
                    <MobileNavItem href="/#ergoex" label="ErgoEX" sub onClick={() => setMobileOpen(false)} />
                    <MobileNavItem href="/#ergoex" label="ShoulderEX" sub onClick={() => setMobileOpen(false)} />
                    <MobileNavItem href="/#traction" label="Traction" onClick={() => setMobileOpen(false)} />
                    <MobileNavItem href="/roi-calculator" label="ROI Calculator" onClick={() => setMobileOpen(false)} />
                    <MobileNavItem href="/contact" label="Contact" onClick={() => setMobileOpen(false)} />
                </div>

                {/* Theme toggle in mobile */}
                <button
                    onClick={toggleTheme}
                    className="mt-8 flex items-center gap-3 py-3 pl-2 transition-colors duration-200"
                    style={{ color: "var(--text-secondary)" }}
                >
                    {theme === "dark" ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="5" />
                            <line x1="12" y1="1" x2="12" y2="3" />
                            <line x1="12" y1="21" x2="12" y2="23" />
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                            <line x1="1" y1="12" x2="3" y2="12" />
                            <line x1="21" y1="12" x2="23" y2="12" />
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                        </svg>
                    ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                    )}
                    <span style={{ fontSize: "14px", fontFamily: "var(--font-heading)", fontWeight: 400 }}>
                        {theme === "dark" ? "Light Mode" : "Dark Mode"}
                    </span>
                </button>

                {/* Bottom Accent */}
                <div className="mt-auto mb-10">
                    <div className="h-[1px] w-full mb-6" style={{ background: "var(--border)" }} />
                    <p className="text-xs tracking-wide" style={{ color: "var(--text-muted)" }}>
                        © 2026 E<span style={{ color: "var(--accent)" }}>x</span>trive Innovations
                    </p>
                </div>
            </div>
        </>
    );
}

/* ═══════════════ MOBILE NAV ITEM ═══════════════ */
function MobileNavItem({ href, label, sub, onClick }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`group relative block py-3 ${sub ? "pl-6" : "pl-2"} font-medium transition-all duration-300`}
            style={{ color: "var(--text-secondary)" }}
        >
            {sub && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-[1px]" style={{ background: "var(--border)" }} />
            )}
            <span className={`relative z-10 ${sub ? "text-sm" : "text-base"} transition-colors duration-300 group-hover:text-[var(--text-primary)]`}>
                {label}
            </span>
            <span className="absolute bottom-0 left-0 w-full h-[1px]" style={{ background: "var(--border)" }} />
            <span className="absolute bottom-0 left-0 w-full h-[1px] scale-x-0 origin-left transition-transform duration-200 ease-out group-hover:scale-x-100" style={{ background: "var(--text-muted)" }} />
        </Link>
    );
}

/* ═══════════════ NAV ITEM SUB-COMPONENT ═══════════════ */
function NavItem({ href, label }) {
    return (
        <Link
            href={href}
            className="nav-link relative group py-2"
        >
            <span className="relative z-10">
                {label}
            </span>
        </Link>
    );
}

/* ═══════════════ NAV DROPDOWN SUB-COMPONENT ═══════════════ */
function NavDropdown() {
    return (
        <div className="relative group py-2">
            <Link href="/#products" className="nav-link relative outline-none flex items-center gap-1">
                <span className="relative z-10">
                    Products
                </span>
                <svg className="w-3.5 h-3.5 mt-[1px] opacity-50 group-hover:opacity-80 transition-all duration-200 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </Link>

            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                <div
                    className="flex flex-col w-48 backdrop-blur-xl rounded-sm overflow-hidden"
                    style={{
                        background: "var(--background)",
                        border: "1px solid var(--border)",
                        boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
                    }}
                >
                    <DropdownItem href="/ProductsPage#backex" label="BackEX" />
                    <DropdownItem href="/#ergoex" label="ErgoEX" />
                    <DropdownItem href="/#ergoex" label="ShoulderEX" />
                    <div className="h-[1px] w-full pointer-events-none" style={{ background: "var(--border)" }} />
                </div>
            </div>
        </div>
    );
}

/* ═══════════════ DROPDOWN ITEM SUB-COMPONENT ═══════════════ */
function DropdownItem({ href, label }) {
    return (
        <Link
            href={href}
            className="relative px-5 py-3 text-sm font-normal transition-colors group/item outline-none overflow-hidden"
            style={{
                fontFamily: "var(--font-heading)",
                fontSize: "13px",
                letterSpacing: "0.02em",
                color: "var(--text-secondary)",
            }}
        >
            <span className="absolute left-0 top-0 bottom-0 w-[1px] scale-y-0 origin-center transition-transform duration-200 group-hover/item:scale-y-100" style={{ background: "var(--text-muted)" }} />
            <span className="relative z-10 inline-block transition-transform duration-200 group-hover/item:translate-x-1">
                {label}
            </span>
        </Link>
    );
}