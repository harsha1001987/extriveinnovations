"use client";

import Link from "next/link";
import { Play, CheckCircle, Users } from "lucide-react";
import HardFlipCard from "./brutalist/HardFlipCard";
import IgniteText from "./brutalist/IgniteText";

/* ══════════════════════════════════════════════════════════════════
   Part 9 — Contact. Three HardFlipCards + a giant closing CTA beat.
   ══════════════════════════════════════════════════════════════════ */
const PATHWAYS = [
    {
        Icon: Play,
        title: "Request a demo",
        body: "See BackEX and ErgoEX live. We come to your facility and demonstrate on your own workers.",
        cta: "Book now",
        href: "/contact?intent=demo",
    },
    {
        Icon: CheckCircle,
        title: "Start a pilot",
        body: "Deploy BackEX with 10–50 of your workers for 4 weeks. Full ErgoEX monitoring. Data-backed results report.",
        cta: "Apply for pilot",
        href: "/contact?intent=pilot",
    },
    {
        Icon: Users,
        title: "Work with us",
        body: "Investors, research partners, faculty collaborators, or enterprise procurement — we want to hear from you.",
        cta: "Get in touch",
        href: "/contact?intent=partnership",
    },
];

export default function ContactSection() {
    return (
        <section id="contact" className="ct-section">
            <div className="ct-inner">
                <header className="ct-head">
                    <h2 className="ct-title">
                        Ready to protect your{" "}
                        <IgniteText as="span" pulse className="ct-title-accent">workforce?</IgniteText>
                    </h2>
                    <p className="ct-lede">
                        Whether you&apos;re an enterprise EHS manager, a defence procurement
                        officer, an investor, or a researcher — let&apos;s start a conversation.
                    </p>
                </header>

                <div className="ct-grid bx-grid-hair">
                    {PATHWAYS.map((p) => (
                        <HardFlipCard as={Link} href={p.href} key={p.title} className="bx-flip--seamless ct-card">
                            <span className="bx-flip-icon" aria-hidden="true">
                                <p.Icon size={20} strokeWidth={1.75} />
                            </span>
                            <h3 className="ct-card-title">{p.title}</h3>
                            <p className="ct-card-body">{p.body}</p>
                            <span className="ct-card-cta">
                                <span className="ct-card-arrow">→</span> {p.cta}
                            </span>
                        </HardFlipCard>
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: STYLES }} />
        </section>
    );
}

const STYLES = `
.ct-section { background: var(--bg-void); }
.ct-inner { max-width: 1400px; margin: 0 auto; padding: clamp(72px, 10vw, 130px) clamp(16px, 4vw, 48px) clamp(40px, 6vw, 72px); }

.ct-head { text-align: center; max-width: 820px; margin: 0 auto clamp(44px, 6vw, 72px); }
.ct-title {
    font-family: var(--font-display); text-transform: uppercase;
    font-size: clamp(2.5rem, 8vw, 6rem); line-height: 0.88; letter-spacing: -0.04em;
    color: var(--text-primary); margin: 0 0 24px;
}
.ct-title-accent { color: var(--accent); }
.ct-lede { font-family: var(--font-body); font-size: clamp(1.05rem, 1.6vw, 1.3rem); line-height: 1.6; color: var(--text-secondary); max-width: 620px; margin: 0 auto; }

.ct-grid { grid-template-columns: repeat(3, 1fr); }
.ct-card { display: flex; flex-direction: column; padding: clamp(32px, 3.2vw, 48px); text-decoration: none; }
.ct-card-title { font-family: var(--font-display); text-transform: uppercase; font-size: clamp(1.4rem, 2.4vw, 2rem); line-height: 0.95; letter-spacing: -0.03em; margin: 28px 0 16px; color: inherit; }
.ct-card-body { font-family: var(--font-body); font-size: 0.95rem; line-height: 1.65; color: var(--text-secondary); margin: 0 0 32px; }
.bx-flip:hover .ct-card-body, .bx-flip:focus-within .ct-card-body { color: var(--accent-foreground); }
.ct-card-cta { margin-top: auto; font-family: var(--font-mono); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.04em; color: var(--accent); display: inline-flex; align-items: center; gap: 8px; }
.bx-flip:hover .ct-card-cta, .bx-flip:focus-within .ct-card-cta { color: var(--accent-foreground); }
.ct-card-arrow { display: inline-block; transition: transform 200ms ease-in-out; }
.bx-flip:hover .ct-card-arrow { transform: translateX(5px); }

@media (max-width: 860px) {
    .ct-grid { grid-template-columns: 1fr; }
}
`;
