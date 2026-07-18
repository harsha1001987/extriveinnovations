"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import BxButton from "./brutalist/BxButton";

/* ══════════════════════════════════════════════════════════════════
   Part 2 — Navigation. Fixed floating pill, one state at all scroll
   positions. Logo (left, outside pill) · centered black pill of mono
   links · Request Demo pill button (right, outside). Mobile collapses to
   a single icon that opens a full-screen sharp-bordered overlay.
   `progress` is accepted for backwards compatibility and ignored.
   ══════════════════════════════════════════════════════════════════ */

const PRODUCTS = [
    { name: "BackEX", desc: "Passive back-support exosuit", href: "/products/backex" },
    { name: "ShoulderEX", desc: "Pneumatic overhead-task exosuit", href: "/products/shoulderex" },
    { name: "ErgoEX", desc: "Wearable ergonomics intelligence", href: "/products/ergoex" },
];

const LINKS = [
    { label: "About", href: "/#about" },
    { label: "Products", href: "/#products", dropdown: true },
    { label: "Traction", href: "/#traction" },
    { label: "ROI", href: "/roi-calculator" },
    { label: "Contact", href: "/contact?intent=demo" },
];

export default function Navbar() {
    const [productsOpen, setProductsOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const closeTimer = useRef(null);

    // Lock scroll while the mobile overlay is open.
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    const openDrop = () => { clearTimeout(closeTimer.current); setProductsOpen(true); };
    const closeDrop = () => { closeTimer.current = setTimeout(() => setProductsOpen(false), 120); };

    return (
        <header className="bxnav">
            <div className="bxnav-bar">
                <Link href="/" className="bxnav-logo">
                    Extrive <span>Innovations</span>
                </Link>

                {/* Centered pill (desktop) */}
                <nav className="bxnav-pill" aria-label="Primary">
                    {LINKS.map((l) =>
                        l.dropdown ? (
                            <div
                                key={l.label}
                                className="bxnav-dropwrap"
                                onMouseEnter={openDrop}
                                onMouseLeave={closeDrop}
                            >
                                <Link
                                    href={l.href}
                                    className="bxnav-link"
                                    aria-haspopup="true"
                                    aria-expanded={productsOpen}
                                    onClick={() => setProductsOpen((o) => !o)}
                                >
                                    {l.label}
                                    <span className="bxnav-caret" aria-hidden="true">▾</span>
                                </Link>
                                {productsOpen && (
                                    <div className="bxnav-drop" onMouseEnter={openDrop} onMouseLeave={closeDrop}>
                                        {PRODUCTS.map((p) => (
                                            <Link key={p.href} href={p.href} className="bxnav-drop-item">
                                                <span className="bxnav-drop-name">{p.name}</span>
                                                <span className="bxnav-drop-desc">{p.desc}</span>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link key={l.label} href={l.href} className="bxnav-link">
                                {l.label}
                            </Link>
                        )
                    )}
                </nav>

                <div className="bxnav-right">
                    <BxButton href="/contact?intent=demo" variant="primary" size="sm" pill>
                        Request Demo
                    </BxButton>
                </div>

                <button
                    className="bxnav-burger"
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((o) => !o)}
                >
                    <span className={`bxnav-burger-x ${menuOpen ? "on" : ""}`} aria-hidden="true">
                        <span /><span /><span />
                    </span>
                </button>
            </div>

            {/* Mobile full-screen overlay */}
            {menuOpen && (
                <div className="bxnav-overlay">
                    <nav className="bxnav-overlay-nav" aria-label="Mobile">
                        {LINKS.map((l) => (
                            <Link key={l.label} href={l.href} className="bxnav-overlay-link" onClick={() => setMenuOpen(false)}>
                                {l.label}
                            </Link>
                        ))}
                        <div className="bxnav-overlay-products">
                            <span className="bxnav-overlay-sub">Products</span>
                            {PRODUCTS.map((p) => (
                                <Link key={p.href} href={p.href} className="bxnav-overlay-plink" onClick={() => setMenuOpen(false)}>
                                    {p.name}
                                </Link>
                            ))}
                        </div>
                        <BxButton href="/contact?intent=demo" variant="primary" pill onClick={() => setMenuOpen(false)}>
                            Request Demo
                        </BxButton>
                    </nav>
                </div>
            )}

            <style dangerouslySetInnerHTML={{ __html: STYLES }} />
        </header>
    );
}

const STYLES = `
.bxnav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; pointer-events: none; }
.bxnav-bar {
    position: relative; display: flex; align-items: center; justify-content: space-between;
    max-width: 1400px; margin: 0 auto;
    padding: calc(18px + var(--bx-ticker-h, 0px)) clamp(16px, 4vw, 40px) 18px;
    transition: padding-top 300ms ease-in-out;
    pointer-events: none;
}
.bxnav-bar > * { pointer-events: auto; }

.bxnav-logo {
    font-family: var(--font-display); text-transform: uppercase; font-size: 0.95rem;
    letter-spacing: -0.02em; color: var(--text-primary); text-decoration: none; line-height: 1;
}
.bxnav-logo span { color: var(--accent); }

/* Centered pill */
.bxnav-pill {
    position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
    display: flex; align-items: center; gap: 4px;
    background: var(--bg-void); border: 1px solid var(--border); border-radius: 9999px;
    padding: 6px; box-shadow: 0 8px 30px rgba(0,0,0,0.5);
}
.bxnav-dropwrap { position: relative; }
.bxnav-link {
    display: inline-flex; align-items: center; gap: 5px;
    font-family: var(--font-mono); text-transform: uppercase; font-size: 12px; letter-spacing: 0.02em;
    color: var(--text-primary); text-decoration: none; padding: 9px 16px; border-radius: 9999px;
    transition: background 150ms ease-in-out, color 150ms ease-in-out;
}
.bxnav-link:hover, .bxnav-link:focus-visible { background: var(--text-primary); color: var(--accent-foreground); outline: none; }
.bxnav-caret { font-size: 9px; }

/* Dropdown */
.bxnav-drop {
    position: absolute; top: calc(100% + 12px); left: 50%; transform: translateX(-50%);
    min-width: 260px; background: var(--bg-void); border: 2px solid var(--border);
    display: flex; flex-direction: column; padding: 8px;
}
.bxnav-drop-item { display: flex; flex-direction: column; gap: 2px; padding: 12px 14px; text-decoration: none; transition: background 150ms ease-in-out; }
.bxnav-drop-item:hover { background: var(--accent); }
.bxnav-drop-item:hover .bxnav-drop-name, .bxnav-drop-item:hover .bxnav-drop-desc { color: var(--accent-foreground); }
.bxnav-drop-name { font-family: var(--font-mono); text-transform: uppercase; font-size: 13px; font-weight: 700; color: var(--text-primary); letter-spacing: 0.02em; }
.bxnav-drop-desc { font-family: var(--font-body); font-size: 12px; color: var(--text-secondary); }

.bxnav-right { display: flex; align-items: center; }

/* Burger (mobile) */
.bxnav-burger { display: none; width: 44px; height: 44px; background: var(--bg-void); border: 1px solid var(--border); border-radius: 9999px; cursor: pointer; align-items: center; justify-content: center; }
.bxnav-burger-x { position: relative; width: 18px; height: 12px; }
.bxnav-burger-x span { position: absolute; left: 0; width: 100%; height: 2px; background: var(--text-primary); transition: transform 200ms ease-in-out, opacity 150ms ease-in-out; }
.bxnav-burger-x span:nth-child(1) { top: 0; }
.bxnav-burger-x span:nth-child(2) { top: 5px; }
.bxnav-burger-x span:nth-child(3) { top: 10px; }
.bxnav-burger-x.on span:nth-child(1) { transform: translateY(5px) rotate(45deg); }
.bxnav-burger-x.on span:nth-child(2) { opacity: 0; }
.bxnav-burger-x.on span:nth-child(3) { transform: translateY(-5px) rotate(-45deg); }

/* Mobile overlay */
.bxnav-overlay { position: fixed; inset: 0; z-index: 99; background: var(--bg-void); pointer-events: auto; display: flex; align-items: center; justify-content: center; }
.bxnav-overlay-nav { display: flex; flex-direction: column; gap: 8px; width: min(88vw, 420px); border: 2px solid var(--border); padding: 28px; }
.bxnav-overlay-link { font-family: var(--font-display); text-transform: uppercase; font-size: clamp(1.8rem, 8vw, 2.6rem); letter-spacing: -0.03em; color: var(--text-primary); text-decoration: none; line-height: 1; padding: 6px 0; }
.bxnav-overlay-link:hover { color: var(--accent); }
.bxnav-overlay-products { border-top: 1px solid var(--border); margin-top: 14px; padding-top: 14px; display: flex; flex-direction: column; gap: 6px; }
.bxnav-overlay-sub { font-family: var(--font-mono); text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em; color: var(--text-secondary); }
.bxnav-overlay-plink { font-family: var(--font-mono); text-transform: uppercase; font-size: 15px; color: var(--text-primary); text-decoration: none; padding: 4px 0; }
.bxnav-overlay-plink:hover { color: var(--accent); }
.bxnav-overlay-nav .bx-btn { margin-top: 18px; }

@media (max-width: 860px) {
    .bxnav-pill, .bxnav-right { display: none; }
    .bxnav-burger { display: inline-flex; }
}
`;
