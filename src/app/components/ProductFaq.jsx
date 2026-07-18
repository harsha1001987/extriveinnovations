"use client";

import { useState } from "react";

/* ══════════════════════════════════════════════════════════════════
   ProductFaq — redesigned accordion. Same content, new look: sharp
   bordered rows in the site's data-panel language — monospace query
   index, an orange live left-rule + corner registration marks on the
   open row, and a rotating plus/minus glyph instead of a soft chevron.
   ══════════════════════════════════════════════════════════════════ */
export default function ProductFaq({ faqs = [], productName = "the system" }) {
    const [open, setOpen] = useState(0);

    return (
        <section className="pfaq">
            <div className="pfaq-shell">
                <header className="pfaq-head">
                    <div className="pfaq-eyebrow">
                        <span className="pfaq-dash" aria-hidden="true" />
                        FAQ
                    </div>
                    <h2 className="pfaq-title">Questions that matter before deployment.</h2>
                    <p className="pfaq-lede">
                        A few direct answers to the questions that typically come up when
                        teams evaluate {productName} for real-world use.
                    </p>
                </header>

                <div className="pfaq-list">
                    {faqs.map((f, i) => {
                        const isOpen = open === i;
                        return (
                            <div key={i} className={`pfaq-item ${isOpen ? "on" : ""}`}>
                                {isOpen && (
                                    <>
                                        <span className="pfaq-corner tl" aria-hidden="true" />
                                        <span className="pfaq-corner br" aria-hidden="true" />
                                    </>
                                )}
                                <button
                                    type="button"
                                    className="pfaq-q"
                                    aria-expanded={isOpen}
                                    onClick={() => setOpen(isOpen ? -1 : i)}
                                >
                                    <span className="pfaq-num">
                                        Q{String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span className="pfaq-qtext">{f.question}</span>
                                    <span className={`pfaq-glyph ${isOpen ? "on" : ""}`} aria-hidden="true">
                                        <span className="pfaq-glyph-h" />
                                        <span className="pfaq-glyph-v" />
                                    </span>
                                </button>
                                <div
                                    className="pfaq-a-wrap"
                                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                                >
                                    <div className="pfaq-a-inner">
                                        <p className="pfaq-a">{f.answer}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .pfaq { padding: 100px 24px 120px; background: transparent; }
                .pfaq-shell { max-width: 820px; margin: 0 auto; }

                .pfaq-head { text-align: center; margin-bottom: 56px; }
                .pfaq-eyebrow {
                    display: inline-flex; align-items: center; gap: 10px;
                    font-family: var(--font-mono, ui-monospace, monospace);
                    font-size: 10px; font-weight: 700; letter-spacing: 0.28em;
                    text-transform: uppercase; color: #ff6b00; margin-bottom: 20px;
                }
                .pfaq-dash { width: 22px; height: 1px; background: #ff6b00; }
                .pfaq-title {
                    font-family: var(--font-heading); font-weight: 700;
                    font-size: clamp(1.8rem, 4vw, 2.6rem); line-height: 1.1;
                    letter-spacing: -0.015em; color: #f7f7f7; margin: 0 0 16px;
                }
                .pfaq-lede {
                    font-family: var(--font-body); font-size: 15px; line-height: 1.7;
                    color: rgba(247,247,247,0.62); max-width: 520px; margin: 0 auto;
                }

                .pfaq-list { display: flex; flex-direction: column; gap: 10px; }
                .pfaq-item {
                    position: relative;
                    border: 1px solid rgba(255,255,255,0.12);
                    background: rgba(255,255,255,0.02);
                    transition: background 260ms ease, border-color 260ms ease;
                }
                .pfaq-item.on {
                    background: rgba(255,255,255,0.04);
                    border-color: rgba(255,107,0,0.4);
                }
                /* live left rule on open */
                .pfaq-item.on::before {
                    content: ""; position: absolute; left: -1px; top: -1px; bottom: -1px;
                    width: 2px; background: #ff6b00;
                }
                .pfaq-corner {
                    position: absolute; width: 8px; height: 8px; pointer-events: none;
                    border: solid #ff6b00; border-width: 0;
                }
                .pfaq-corner.tl { top: 5px; left: 5px; border-top-width: 1px; border-left-width: 1px; }
                .pfaq-corner.br { bottom: 5px; right: 5px; border-bottom-width: 1px; border-right-width: 1px; }

                .pfaq-q {
                    width: 100%; display: flex; align-items: center; gap: 18px;
                    padding: 22px 28px; background: transparent; border: none;
                    cursor: pointer; text-align: left; font-family: var(--font-heading);
                }
                .pfaq-num {
                    font-family: var(--font-mono, ui-monospace, monospace);
                    font-size: 12px; font-weight: 600; letter-spacing: 0.06em;
                    color: #ff6b00; flex-shrink: 0; opacity: 0.8;
                }
                .pfaq-qtext {
                    flex: 1; font-weight: 600; font-size: 1.05rem; line-height: 1.35;
                    color: #f2f2f2; transition: color 200ms ease;
                }
                .pfaq-item.on .pfaq-qtext { color: #ffffff; }

                /* plus → minus glyph */
                .pfaq-glyph { position: relative; width: 14px; height: 14px; flex-shrink: 0; }
                .pfaq-glyph-h, .pfaq-glyph-v {
                    position: absolute; background: #ff6b00; border-radius: 1px;
                    transition: transform 300ms cubic-bezier(0.16,1,0.3,1), opacity 300ms ease;
                }
                .pfaq-glyph-h { top: 6.5px; left: 0; width: 14px; height: 1.5px; }
                .pfaq-glyph-v { left: 6.5px; top: 0; width: 1.5px; height: 14px; }
                .pfaq-glyph.on .pfaq-glyph-v { transform: scaleY(0); opacity: 0; }

                .pfaq-a-wrap {
                    display: grid; grid-template-rows: 0fr;
                    transition: grid-template-rows 320ms cubic-bezier(0.16,1,0.3,1);
                }
                .pfaq-a-inner { overflow: hidden; }
                .pfaq-a {
                    font-family: var(--font-body); font-size: 15px; line-height: 1.75;
                    color: rgba(247,247,247,0.68); margin: 0 28px 24px 64px;
                    padding-top: 4px; border-top: 1px solid rgba(255,255,255,0.08);
                }
                @media (max-width: 560px) {
                    .pfaq-q { padding: 18px 18px; gap: 12px; }
                    .pfaq-a { margin-left: 18px; margin-right: 18px; }
                    .pfaq-qtext { font-size: 0.98rem; }
                }
            `}} />
        </section>
    );
}
