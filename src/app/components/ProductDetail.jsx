"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ProductViewer from "./ProductViewer";
import ProductFaq from "./ProductFaq";
import HardFlipCard from "./brutalist/HardFlipCard";
import MassiveNumber from "./brutalist/MassiveNumber";
import BxButton from "./brutalist/BxButton";

/* ══════════════════════════════════════════════════════════════════
   Part 7.2 — Product detail template (brutalist, dark throughout). Feature
   grid uses HardFlipCards (not the sticky-scroll variant) for consistency
   with Problem/Products/Contact. Deployment proof uses photo-background cards.
   ══════════════════════════════════════════════════════════════════ */
export default function ProductDetail({ data }) {
    const comingSoon = !!data.comingSoon;

    return (
        <div className="pd-root">
            <Navbar />

            {/* HERO */}
            <section className="pd-hero">
                <div className="pd-eyebrow">
                    <span className="bx-sq" aria-hidden="true" />
                    {data.eyebrow}
                </div>
                <h1 className="pd-title">
                    {data.nameLead}<span className="pd-title-accent">{data.nameAccent}</span>
                </h1>
                <p className="pd-tagline">{data.tagline}</p>
                <div className="pd-stage">
                    <span className="bx-tag bx-tag--live"><span className="bx-tag-dot" />{data.stage}</span>
                </div>
            </section>

            {comingSoon ? (
                <section className="pd-soon">
                    <HardFlipCard className="pd-soon-card">
                        <h2 className="pd-soon-title">Detail page in progress.</h2>
                        <p className="pd-soon-body">{data.summary}</p>
                        <div className="pd-soon-actions">
                            <BxButton href="/contact?intent=demo" variant="primary" pill>Request early access →</BxButton>
                            <BxButton href="/#products" variant="outline">Back to products</BxButton>
                        </div>
                    </HardFlipCard>
                </section>
            ) : (
                <>
                    {/* DEEP REVEAL */}
                    <section className="pd-reveal">
                        <div className="pd-viewer-col">
                            <ProductViewer src={data.viewer.src} />
                        </div>
                        <div className="pd-copy-col">
                            <div className="pd-eyebrow"><span className="bx-sq" aria-hidden="true" />{data.eyebrow}</div>
                            <h2 className="pd-headline">{data.headline[0]}<br />{data.headline[1]}</h2>
                            <div className="pd-paras">
                                {data.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                            </div>
                        </div>
                    </section>

                    {/* FEATURES — HardFlipCard grid */}
                    <section className="pd-features">
                        <div className="pd-section-label"><span className="bx-sq" aria-hidden="true" />Engineering</div>
                        <div className="pd-feature-grid bx-grid-hair">
                            {data.features.map((f) => (
                                <HardFlipCard key={f.number} className="bx-flip--seamless pd-feature">
                                    <MassiveNumber size="clamp(4rem, 8vw, 6.5rem)" className="pd-feature-num">{f.number}</MassiveNumber>
                                    <div className="pd-feature-body">
                                        <h4 className="pd-feature-title">{f.title}</h4>
                                        <p className="pd-feature-text">{f.text}</p>
                                    </div>
                                </HardFlipCard>
                            ))}
                        </div>
                    </section>

                    {/* SPECS — massive stat callouts */}
                    <section className="pd-specs">
                        <div className="pd-section-label"><span className="bx-sq" aria-hidden="true" />Key Specifications</div>
                        <div className="pd-specs-grid bx-grid-hair">
                            {data.specs.map((s) => (
                                <div key={s.label} className="pd-spec">
                                    <span className="pd-spec-value">{s.value}</span>
                                    <span className="pd-spec-label">{s.label}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* DEPLOYMENT PROOF — BrutalistServiceRow */}
                    {data.deployments?.length > 0 && (
                        <section className="pd-proof">
                            <div className="pd-section-label"><span className="bx-sq" aria-hidden="true" />Deployed &amp; Validated</div>
                            <div className="pd-proof-grid">
                                {data.deployments.map((d) => (
                                    <article key={d.key} className="pd-dcard">
                                        {d.img && (
                                            <div className="pd-dcard-media" aria-hidden="true">
                                                <Image
                                                    src={d.img}
                                                    alt=""
                                                    fill
                                                    sizes="(max-width: 860px) 100vw, 50vw"
                                                    quality={90}
                                                    style={{ objectFit: "cover", objectPosition: "center 30%" }}
                                                />
                                            </div>
                                        )}
                                        <div className="pd-dcard-scrim" aria-hidden="true" />
                                        <div className="pd-dcard-body">
                                            <span className={`pd-dcard-status pd-dcard-status--${d.statusType || "green"}`}>
                                                <span className="pd-dcard-dot" aria-hidden="true" />
                                                {d.status}
                                            </span>
                                            <h3 className="pd-dcard-title">{d.company}</h3>
                                            {d.body && <p className="pd-dcard-text">{d.body}</p>}
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.faqs?.length > 0 && <ProductFaq faqs={data.faqs} productName={data.name} />}

                    {/* CLOSING CTA — simplified single CTA */}
                    <section className="pd-cta">
                        <h2 className="pd-cta-title">Deploy {data.name} <span className="pd-title-accent">on your floor.</span></h2>
                        <BxButton href={`/contact?intent=pilot`} variant="primary" size="lg" pill>Start a pilot →</BxButton>
                    </section>
                </>
            )}

            <Footer />
            <style dangerouslySetInnerHTML={{ __html: STYLES }} />
        </div>
    );
}

const STYLES = `
.pd-root { background: var(--bg-void); color: var(--text-primary); min-height: 100vh; }

.pd-hero { max-width: 1400px; margin: 0 auto; padding: 180px clamp(16px, 4vw, 48px) clamp(40px, 6vw, 72px); text-align: center; display: flex; flex-direction: column; align-items: center; }
.pd-eyebrow, .pd-section-label { display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-mono); text-transform: uppercase; font-size: 0.78rem; letter-spacing: 0.12em; color: var(--accent); margin-bottom: 22px; }
.pd-title { font-family: var(--font-display); text-transform: uppercase; font-size: clamp(3rem, 12vw, 9rem); line-height: 0.86; letter-spacing: -0.045em; color: var(--text-primary); margin: 0; }
.pd-title-accent { color: var(--accent); }
.pd-tagline { font-family: var(--font-body); font-size: clamp(1.05rem, 1.7vw, 1.35rem); line-height: 1.6; color: var(--text-secondary); max-width: 640px; margin: 26px 0 0; }
.pd-stage { margin-top: 26px; }

/* Coming soon */
.pd-soon { max-width: 900px; margin: 0 auto; padding: 20px clamp(16px, 4vw, 48px) 100px; }
.pd-soon-card { padding: clamp(36px, 5vw, 64px); text-align: center; }
.pd-soon-title { font-family: var(--font-display); text-transform: uppercase; font-size: clamp(1.8rem, 4vw, 2.6rem); letter-spacing: -0.03em; margin: 0 0 18px; color: inherit; }
.pd-soon-body { font-family: var(--font-body); font-size: 1rem; line-height: 1.7; color: var(--text-secondary); max-width: 620px; margin: 0 auto 32px; }
.bx-flip:hover .pd-soon-body { color: var(--accent-foreground); }
.pd-soon-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

/* Deep reveal */
.pd-reveal { max-width: 1400px; margin: 0 auto; padding: clamp(40px, 6vw, 80px) clamp(16px, 4vw, 48px); display: grid; grid-template-columns: 5fr 7fr; gap: clamp(32px, 5vw, 72px); align-items: center; }
.pd-viewer-col { width: 100%; }
.pd-headline { font-family: var(--font-display); text-transform: uppercase; font-size: clamp(2rem, 4.5vw, 3.6rem); line-height: 0.9; letter-spacing: -0.035em; color: var(--text-primary); margin: 0 0 28px; }
.pd-paras { display: flex; flex-direction: column; gap: 18px; max-width: 640px; }
.pd-paras p { margin: 0; font-family: var(--font-body); font-size: clamp(1rem, 1.3vw, 1.15rem); line-height: 1.7; color: var(--text-secondary); }

/* Features */
.pd-features { max-width: 1400px; margin: 0 auto; padding: clamp(48px, 6vw, 80px) clamp(16px, 4vw, 48px); }
.pd-feature-grid { grid-template-columns: repeat(2, 1fr); }
.pd-feature { position: relative; overflow: hidden; padding: clamp(28px, 3vw, 44px); min-height: 220px; }
.pd-feature-num { position: absolute; top: -6px; right: 8px; }
.pd-feature-body { position: relative; z-index: 1; }
.pd-feature-title { font-family: var(--font-display); text-transform: uppercase; font-size: clamp(1.2rem, 2.2vw, 1.7rem); letter-spacing: -0.02em; margin: 0 0 14px; color: inherit; }
.pd-feature-text { font-family: var(--font-body); font-size: 0.95rem; line-height: 1.6; color: var(--text-secondary); margin: 0; }
.bx-flip:hover .pd-feature-text, .bx-flip:focus-within .pd-feature-text { color: var(--accent-foreground); }

/* Specs */
.pd-specs { max-width: 1400px; margin: 0 auto; padding: clamp(48px, 6vw, 80px) clamp(16px, 4vw, 48px); }
.pd-specs-grid { grid-template-columns: repeat(4, 1fr); }
.pd-spec { background: var(--bg-void); padding: clamp(28px, 3vw, 44px); display: flex; flex-direction: column; gap: 10px; }
.pd-spec-value { font-family: var(--font-display); text-transform: uppercase; font-size: clamp(1.8rem, 3.4vw, 2.8rem); line-height: 0.9; letter-spacing: -0.03em; color: var(--accent); }
.pd-spec-label { font-family: var(--font-mono); text-transform: uppercase; font-size: 0.7rem; letter-spacing: 0.1em; color: var(--text-secondary); }

/* Proof — deployment cards with the field photo as the background */
.pd-proof { max-width: 1400px; margin: 0 auto; padding: clamp(48px, 6vw, 80px) clamp(16px, 4vw, 48px); }
.pd-proof-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: clamp(16px, 2vw, 24px); }

.pd-dcard { position: relative; display: flex; overflow: hidden; min-height: clamp(300px, 34vw, 420px);
    border: 1px solid var(--border); background: #050505; transition: border-color 240ms ease; }
.pd-dcard:hover { border-color: var(--border-hover); }
.pd-dcard-media { position: absolute; inset: 0; z-index: 0; transition: transform 640ms cubic-bezier(0.16, 1, 0.3, 1); will-change: transform; }
.pd-dcard:hover .pd-dcard-media { transform: scale(1.045); }
.pd-dcard-scrim { position: absolute; inset: 0; z-index: 1; pointer-events: none;
    background: linear-gradient(to top, rgba(9,9,11,0.96) 0%, rgba(9,9,11,0.74) 30%, rgba(9,9,11,0.3) 62%, rgba(9,9,11,0.12) 100%); }

.pd-dcard-body { position: relative; z-index: 2; margin-top: auto; width: 100%;
    padding: clamp(20px, 3vw, 32px); display: flex; flex-direction: column; align-items: flex-start; gap: 14px; }
.pd-dcard-status { display: inline-flex; align-items: center; gap: 7px; font-family: var(--font-mono);
    font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    padding: 5px 11px; border-radius: 9999px; border: 1px solid transparent; }
.pd-dcard-status--green { color: #4ade80; border-color: rgba(74,222,128,0.5); background: rgba(74,222,128,0.1); }
.pd-dcard-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor;
    box-shadow: 0 0 8px currentColor; animation: pdDotPulse 2.4s ease-in-out infinite; }
@keyframes pdDotPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
.pd-dcard-title { font-family: var(--font-display); text-transform: uppercase; font-size: clamp(1.5rem, 2.6vw, 2.2rem);
    line-height: 0.95; letter-spacing: -0.03em; color: var(--text-primary); margin: 0; }
.pd-dcard-text { font-family: var(--font-body); font-size: clamp(0.85rem, 1vw, 0.95rem); line-height: 1.6;
    color: rgba(250,250,250,0.8); margin: 0; max-width: 46ch; }

@media (prefers-reduced-motion: reduce) {
    .pd-dcard-media, .pd-dcard:hover .pd-dcard-media { transition: none; transform: none; }
    .pd-dcard-dot { animation: none; }
}

/* CTA */
.pd-cta { text-align: center; padding: clamp(64px, 10vw, 130px) clamp(16px, 4vw, 48px); display: flex; flex-direction: column; align-items: center; gap: clamp(28px, 4vw, 44px); }
.pd-cta-title { font-family: var(--font-display); text-transform: uppercase; font-size: clamp(2rem, 6vw, 4.5rem); line-height: 0.9; letter-spacing: -0.04em; margin: 0; max-width: 16ch; color: var(--text-primary); }

@media (max-width: 960px) {
    .pd-reveal { grid-template-columns: 1fr; }
    .pd-viewer-col { max-width: 420px; margin: 0 auto; }
    .pd-specs-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
    .pd-feature-grid { grid-template-columns: 1fr; }
    .pd-hero { padding-top: 140px; }
}
`;
