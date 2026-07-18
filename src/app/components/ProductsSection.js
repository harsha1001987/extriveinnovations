"use client";

import Link from "next/link";
import HardFlipCard from "./brutalist/HardFlipCard";
import MassiveNumber from "./brutalist/MassiveNumber";
import { PRODUCT_LIST } from "./productsData";

/* ══════════════════════════════════════════════════════════════════
   Part 7.1 — Homepage Products. HardFlipCard grid, one per product, with
   sequenced MassiveNumbers (01/02/03), stage pill, and an arrow reveal on
   the hard color flip. v1 uses the color-flip + arrow (no image-behind
   reveal) for consistency across all three products.
   ══════════════════════════════════════════════════════════════════ */
export default function ProductsSection() {
    return (
        <section id="products" className="ps-section">
            <div className="ps-inner">
                <header className="ps-head">
                    <div className="ps-eyebrow">
                        <span className="bx-sq" aria-hidden="true" />
                        Products
                    </div>
                    <h2 className="ps-title">
                        A product stack for<br />
                        <span className="ps-accent">industrial augmentation.</span>
                    </h2>
                </header>

                <div className="ps-grid bx-grid-hair">
                    {PRODUCT_LIST.map((p) => (
                        <HardFlipCard
                            as={Link}
                            href={`/products/${p.slug}`}
                            key={p.slug}
                            className="bx-flip--seamless ps-card"
                        >
                            <MassiveNumber size="clamp(5rem, 10vw, 8rem)" className="ps-card-num">
                                {p.indexNum}
                            </MassiveNumber>
                            <div className="ps-card-body">
                                <span className="bx-tag ps-card-stage">
                                    <span className="bx-tag-dot" />
                                    {p.stage}
                                </span>
                                <h3 className="ps-card-name">{p.name}</h3>
                                <p className="ps-card-desc">{p.tagline}</p>
                                <span className="ps-card-cta">
                                    Explore More
                                    <span className="ps-card-arrow" aria-hidden="true">→</span>
                                </span>
                            </div>
                        </HardFlipCard>
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: STYLES }} />
        </section>
    );
}

const STYLES = `
.ps-section { background: var(--bg-void); border-top: 2px solid var(--border); }
.ps-inner { max-width: 1400px; margin: 0 auto; padding: clamp(72px, 10vw, 130px) clamp(16px, 4vw, 48px); }
.ps-head { margin-bottom: clamp(44px, 6vw, 72px); }
.ps-eyebrow { display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-mono); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.1em; color: var(--accent); margin-bottom: 24px; }
.ps-title { font-family: var(--font-display); text-transform: uppercase; font-size: clamp(2.5rem, 8vw, 6rem); line-height: 0.88; letter-spacing: -0.04em; color: var(--text-primary); margin: 0; }
.ps-accent { color: var(--accent); }

.ps-grid { grid-template-columns: repeat(3, 1fr); border: 2px solid var(--border); }
.ps-card { position: relative; overflow: hidden; min-height: 420px; padding: clamp(28px, 2.6vw, 44px); display: flex; text-decoration: none; }
.ps-card-num { position: absolute; top: -6px; right: 6px; }
.ps-card-body { position: relative; z-index: 1; display: flex; flex-direction: column; width: 100%; }
.ps-card-stage { align-self: flex-start; margin-bottom: 28px; }
.bx-flip:hover .ps-card-stage, .bx-flip:focus-within .ps-card-stage { border-color: rgba(0,0,0,0.5); color: var(--accent-foreground); }
.bx-flip:hover .ps-card-stage .bx-tag-dot, .bx-flip:focus-within .ps-card-stage .bx-tag-dot { background: var(--accent-foreground); }
.ps-card-name { font-family: var(--font-display); text-transform: uppercase; font-size: clamp(2rem, 4vw, 3.2rem); line-height: 0.9; letter-spacing: -0.03em; margin: 0 0 16px; color: inherit; }
.ps-card-desc { font-family: var(--font-body); font-size: 0.95rem; line-height: 1.6; color: var(--text-secondary); margin: 0 0 32px; }
.bx-flip:hover .ps-card-desc, .bx-flip:focus-within .ps-card-desc { color: var(--accent-foreground); }
.ps-card-cta { margin-top: auto; font-family: var(--font-mono); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.06em; color: var(--accent); display: inline-flex; align-items: center; gap: 10px; }
.bx-flip:hover .ps-card-cta, .bx-flip:focus-within .ps-card-cta { color: var(--accent-foreground); }
.ps-card-arrow { display: inline-block; opacity: 0; transform: translateX(-6px); transition: opacity 160ms ease-in-out, transform 200ms ease-in-out; }
.bx-flip:hover .ps-card-arrow, .bx-flip:focus-within .ps-card-arrow { opacity: 1; transform: translateX(0); }

@media (max-width: 900px) { .ps-grid { grid-template-columns: 1fr; } .ps-card { min-height: 300px; } }
`;
