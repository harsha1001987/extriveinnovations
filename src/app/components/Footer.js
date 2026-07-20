import Link from "next/link";

/* Shared footer — the closing "hyperlinks" section. Brutalist: big
   wordmark, mono uppercase link columns, sharp 2px top rule. */
const COLUMNS = [
    {
        heading: "Products",
        links: [
            { label: "BackEX", href: "/products/backex" },
            { label: "ShoulderEX", href: "/products/shoulderex" },
            { label: "ErgoEX", href: "/products/ergoex" },
        ],
    },
    {
        heading: "Company",
        links: [
            { label: "About", href: "/#about" },
            { label: "Traction", href: "/#traction" },
            { label: "ROI Calculator", href: "/roi-calculator" },
            { label: "Contact", href: "/contact" },
        ],
    },
    {
        heading: "Connect",
        links: [
            { label: "Request a Demo", href: "/contact?intent=demo" },
            { label: "Start a Pilot", href: "/contact?intent=pilot" },
            { label: "info@extriveinnovations.com", href: "mailto:info@extriveinnovations.com" },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="bxfoot">
            <div className="bxfoot-inner">
                <div className="bxfoot-brand">
                    <Link href="/" className="bxfoot-word">
                        Extrive<span>®</span>
                    </Link>
                    <p className="bxfoot-tag">
                        Wearable robotics &amp; ergonomics intelligence — engineered in India
                        for the world&apos;s toughest manual environments.
                    </p>
                </div>

                <div className="bxfoot-cols">
                    {COLUMNS.map((col) => (
                        <nav key={col.heading} className="bxfoot-col" aria-label={col.heading}>
                            <span className="bxfoot-head">{col.heading}</span>
                            {col.links.map((l) => (
                                <Link key={l.label} href={l.href} className="bxfoot-link">
                                    {l.label}
                                </Link>
                            ))}
                        </nav>
                    ))}
                </div>
            </div>

            <div className="bxfoot-bar">
                <span>© {new Date().getFullYear()} Extrive Innovations Pvt. Ltd.</span>
                <span>Made in India — Empowering Motion, Enhancing Lives.</span>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .bxfoot { background: var(--bg-void); }
                .bxfoot-inner {
                    max-width: 1400px; margin: 0 auto; padding: clamp(56px, 8vw, 96px) clamp(16px, 4vw, 48px) clamp(40px, 5vw, 64px);
                    display: grid; grid-template-columns: 1.2fr 2fr; gap: clamp(40px, 6vw, 80px);
                }
                .bxfoot-word {
                    font-family: var(--font-display); text-transform: uppercase;
                    font-size: clamp(2.4rem, 6vw, 4.5rem); line-height: 0.9; letter-spacing: -0.04em;
                    color: var(--text-primary); text-decoration: none; display: inline-block;
                }
                .bxfoot-word span { color: var(--accent); font-size: 0.4em; vertical-align: super; }
                .bxfoot-tag { font-family: var(--font-body); font-size: 0.95rem; line-height: 1.6; color: var(--text-secondary); max-width: 360px; margin: 20px 0 0; }

                .bxfoot-cols { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
                .bxfoot-col { display: flex; flex-direction: column; gap: 12px; }
                .bxfoot-head { font-family: var(--font-mono); text-transform: uppercase; font-size: 0.72rem; letter-spacing: 0.14em; color: var(--accent); margin-bottom: 6px; }
                .bxfoot-link { font-family: var(--font-mono); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.02em; color: var(--text-secondary); text-decoration: none; transition: color 150ms ease-in-out; }
                .bxfoot-link:hover { color: var(--text-primary); }

                .bxfoot-bar {
                    max-width: 1400px; margin: 0 auto; padding: 22px clamp(16px, 4vw, 48px);
                    border-top: 1px solid var(--border); display: flex; justify-content: space-between;
                    gap: 16px; flex-wrap: wrap;
                    font-family: var(--font-mono); text-transform: uppercase; font-size: 0.68rem;
                    letter-spacing: 0.06em; color: var(--text-secondary);
                }
                @media (max-width: 780px) {
                    .bxfoot-inner { grid-template-columns: 1fr; }
                    .bxfoot-cols { grid-template-columns: 1fr 1fr; }
                }
                @media (max-width: 460px) {
                    .bxfoot-cols { grid-template-columns: 1fr; }
                }
            `}} />
        </footer>
    );
}
