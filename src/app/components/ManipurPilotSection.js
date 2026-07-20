"use client";

/* ══════════════════════════════════════════════════════════════════
   Field proof — Manipur pilot footage. Sits directly under About,
   brutalist system: flat type, one accent, hairline media frame,
   no decorative boxing.
   ══════════════════════════════════════════════════════════════════ */

export default function ManipurPilotSection() {
    return (
        <section className="mp-section">
            <div className="mp-inner">
                <div className="mp-eyebrow">
                    <span className="bx-sq" aria-hidden="true" />
                    Field Pilot
                </div>
                <h2 className="mp-title">
                    BackEX in the <span className="mp-accent">field.</span>
                </h2>
                <p className="mp-lede">
                    BackEX proved itself in demanding operational conditions, navigating
                    tough terrain alongside soldiers and logistics personnel.
                </p>

                <div className="mp-media" data-cursor="media">
                    <video
                        src="/textures/manipur.mp4"
                        controls
                        muted
                        poster="/textures/poster.png"
                        className="mp-video"
                    />
                    <div className="mp-tag">
                        <span className="mp-tag-dot" aria-hidden="true" />
                        Manipur Field Pilot · BackEX
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: STYLES }} />
        </section>
    );
}

const STYLES = `
.mp-section { background: var(--bg-void); }
.mp-inner { max-width: 1400px; margin: 0 auto; padding: clamp(48px, 6vw, 90px) clamp(16px, 4vw, 48px) clamp(72px, 10vw, 130px); }

.mp-eyebrow { display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-mono); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.1em; color: var(--accent); margin-bottom: 22px; }
.mp-title { font-family: var(--font-display); text-transform: uppercase; font-size: clamp(2.2rem, 6vw, 4.5rem); line-height: 0.9; letter-spacing: -0.04em; color: var(--text-primary); margin: 0 0 20px; }
.mp-accent { color: var(--accent); }
.mp-lede { font-family: var(--font-body); font-size: clamp(1rem, 1.4vw, 1.2rem); line-height: 1.65; color: var(--text-secondary); max-width: 620px; margin: 0 0 clamp(36px, 5vw, 56px); }

.mp-media { position: relative; width: 100%; padding-top: 52%; background: #050505; overflow: hidden; }
.mp-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.mp-tag { position: absolute; bottom: 20px; left: 20px; display: inline-flex; align-items: center; gap: 10px; padding: 8px 14px; background: rgba(0,0,0,0.75); font-family: var(--font-mono); text-transform: uppercase; font-size: 0.68rem; letter-spacing: 0.1em; color: #fff; pointer-events: none; }
.mp-tag-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); }

@media (max-width: 620px) {
    .mp-media { padding-top: 75%; }
}
`;
