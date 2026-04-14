"use client";

import Link from "next/link";
import { Play, CheckCircle, Users } from "lucide-react";

const PATHWAYS = [
    {
        icon: Play,
        title: "Request a demo",
        body: "See BackEX and ErgoEX live. We come to your facility and demonstrate on your own workers.",
        cta: "Book now",
        href: "/contact?intent=demo",
    },
    {
        icon: CheckCircle,
        title: "Start a pilot",
        body: "Deploy BackEX with 10–50 of your workers for 4 weeks. Full ErgoEX monitoring. Data-backed results report.",
        cta: "Apply for pilot",
        href: "/contact?intent=pilot",
    },
    {
        icon: Users,
        title: "Work with us",
        body: "Investors, research partners, faculty collaborators, or enterprise procurement — we want to hear from you.",
        cta: "Get in touch",
        href: "/contact?intent=partnership",
    },
];

export default function ContactCTA() {
    return (
        <section
            style={{
                background: "transparent",
                padding: "80px 24px 140px",
            }}
        >
            <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>

                <h2
                    style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 700,
                        fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                        color: "var(--text-primary)",
                        lineHeight: 1.05,
                        letterSpacing: "-0.02em",
                        marginBottom: "24px",
                    }}
                >
                    Ready to protect your <span style={{ color: "var(--accent)" }}>workforce?</span>
                </h2>

                <p
                    style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: 1.7,
                        color: "var(--text-secondary)",
                        maxWidth: "620px",
                        margin: "0 auto 64px auto",
                    }}
                >
                    Whether you&apos;re an enterprise EHS manager, a defence procurement officer, an investor, or a researcher — let&apos;s start a conversation.
                </p>

                {/* ═══════════ 3-Column Pathway Grid ═══════════ */}
                <div
                    className="contact-pathway-grid"
                    style={{
                        border: "1px solid var(--border)",
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        background: "transparent",
                        textAlign: "left",
                    }}
                >
                    {PATHWAYS.map((p) => (
                        <PathwayCard key={p.title} {...p} />
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .pathway-card {
                    position: relative;
                    padding: 44px 40px 40px;
                    background: var(--surface);
                    border-right: 1px solid var(--border);
                    display: flex;
                    flex-direction: column;
                    text-decoration: none;
                    overflow: hidden;
                    transition: background 320ms cubic-bezier(0.16, 1, 0.3, 1);
                }
                .pathway-card:last-child {
                    border-right: none;
                }
                .pathway-card::before {
                    content: "";
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    width: 1px;
                    background: var(--accent);
                    transform: scaleY(0);
                    transform-origin: top center;
                    transition: transform 360ms cubic-bezier(0.16, 1, 0.3, 1);
                    pointer-events: none;
                }
                @media (hover: hover) and (pointer: fine) {
                    .pathway-card:hover {
                        background: var(--surface-hover);
                    }
                    .pathway-card:hover::before {
                        transform: scaleY(1);
                    }
                    .pathway-card:hover .pathway-icon {
                        border-color: var(--accent);
                        color: var(--accent);
                    }
                    .pathway-card:hover .pathway-title {
                        color: var(--accent);
                    }
                    .pathway-card:hover .pathway-cta-arrow {
                        transform: translateX(4px);
                    }
                }

                .pathway-icon {
                    width: 40px;
                    height: 40px;
                    border: 1px solid var(--border);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--accent);
                    margin-bottom: 28px;
                    transition: border-color 260ms ease, color 260ms ease;
                }

                .pathway-title {
                    font-family: var(--font-heading);
                    font-weight: 700;
                    font-size: 1.35rem;
                    line-height: 1.2;
                    letter-spacing: -0.01em;
                    color: var(--text-primary);
                    margin-bottom: 14px;
                    transition: color 260ms ease;
                }

                .pathway-body {
                    font-family: var(--font-body);
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 1.7;
                    color: var(--text-secondary);
                    margin-bottom: 32px;
                    max-width: 320px;
                }

                .pathway-cta {
                    margin-top: auto;
                    font-family: var(--font-mono, monospace);
                    font-size: 12px;
                    font-weight: 500;
                    letter-spacing: 0.04em;
                    color: var(--accent);
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                }
                .pathway-cta-arrow {
                    display: inline-block;
                    transition: transform 260ms cubic-bezier(0.16, 1, 0.3, 1);
                }

                @media (max-width: 900px) {
                    .contact-pathway-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .pathway-card {
                        border-right: none !important;
                        border-bottom: 1px solid var(--border);
                    }
                    .pathway-card:last-child {
                        border-bottom: none;
                    }
                }
            `}} />
        </section>
    );
}

function PathwayCard({ icon: Icon, title, body, cta, href }) {
    return (
        <Link href={href} className="pathway-card" data-cursor="product">
            <div className="pathway-icon" aria-hidden="true">
                <Icon size={18} strokeWidth={1.5} />
            </div>

            <h3 className="pathway-title">{title}</h3>

            <p className="pathway-body">{body}</p>

            <span className="pathway-cta">
                <span className="pathway-cta-arrow">→</span>
                {cta}
            </span>
        </Link>
    );
}
