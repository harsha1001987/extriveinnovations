"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Play, CheckCircle, Users, Clock } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HardFlipCard from "../components/brutalist/HardFlipCard";
import BxButton from "../components/brutalist/BxButton";
import RotatingScrollIndicator from "../components/brutalist/RotatingScrollIndicator";

/* ══════════════════════════════════════════════════════════════════
   Standalone /contact — the site's destination "wow" moment, built in
   the brutalist system: a scroll-ignited headline, an oversized inquiry
   form (with an "I AM A…" segmented selector pre-set from ?intent=), the
   three contact-method HardFlipCards, and a reused RotatingScrollIndicator
   as a response-time badge. Submits to the existing /api/request-demo.
   ══════════════════════════════════════════════════════════════════ */

const HEADLINE = ["Let's", "Build", "the", "Future", "of", "Work."];

const PERSONAS = ["EHS Manager", "Defence Procurement", "Investor", "Researcher", "Other"];

const INTENT_TO_PERSONA = {
    demo: "EHS Manager",
    pilot: "EHS Manager",
    partnership: "Investor",
    investor: "Investor",
    research: "Researcher",
    researcher: "Researcher",
    defence: "Defence Procurement",
};

const CARDS = [
    { Icon: Play, title: "Request a demo", body: "See BackEX and ErgoEX live. We come to your facility and demonstrate on your own workers.", cta: "Book now", href: "/contact?intent=demo" },
    { Icon: CheckCircle, title: "Start a pilot", body: "Deploy BackEX with 10–50 workers for 4 weeks. Full ErgoEX monitoring. Data-backed results report.", cta: "Apply for pilot", href: "/contact?intent=pilot" },
    { Icon: Users, title: "Work with us", body: "Investors, research partners, faculty collaborators, or enterprise procurement — we want to hear from you.", cta: "Get in touch", href: "/contact?intent=partnership" },
];

export default function ContactPage() {
    const [lit, setLit] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [persona, setPersona] = useState("EHS Manager");
    const [status, setStatus] = useState("idle");
    const headRef = useRef(null);

    // Pre-select persona from ?intent= (read without Suspense via window).
    useEffect(() => {
        const intent = new URLSearchParams(window.location.search).get("intent");
        if (intent && INTENT_TO_PERSONA[intent]) setPersona(INTENT_TO_PERSONA[intent]);
    }, []);

    // Ignite the headline once on scroll-into-view (or immediately if reduced-motion).
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setLit(true); return; }
        const el = headRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { setLit(true); obs.disconnect(); }
        }, { threshold: 0.4 });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        setStatus("sending");
        try {
            const res = await fetch("/api/request-demo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    role: persona,
                    company: "",
                    facilityType: persona,
                    message: form.message,
                }),
            });
            if (res.ok) { setStatus("success"); setForm({ name: "", email: "", message: "" }); }
            else setStatus("error");
        } catch { setStatus("error"); }
    };

    return (
        <div className="cp-root">
            <Navbar />

            {/* Ignition headline */}
            <section className="cp-hero">
                <div className="cp-eyebrow"><span className="bx-sq" aria-hidden="true" />Contact // Ignition</div>
                <h1 className="cp-headline" ref={headRef}>
                    {HEADLINE.map((w, i) => (
                        <span
                            key={i}
                            className={`bx-ignite cp-word ${lit ? "lit" : ""}`}
                            style={{ transitionDelay: `${i * 100}ms` }}
                        >
                            {w}{" "}
                        </span>
                    ))}
                </h1>
            </section>

            {/* Form + response badge */}
            <section className="cp-form-wrap">
                <form className="cp-form" onSubmit={submit}>
                    <div className="cp-field">
                        <label className="cp-label" htmlFor="cp-name">Name</label>
                        <input id="cp-name" className="bx-input" placeholder="YOUR NAME" required
                            value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div className="cp-field">
                        <label className="cp-label" htmlFor="cp-email">Email</label>
                        <input id="cp-email" type="email" className="bx-input" placeholder="YOU@COMPANY.COM" required
                            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </div>

                    <div className="cp-field">
                        <span className="cp-label">I am a…</span>
                        <div className="cp-seg" role="radiogroup" aria-label="I am a">
                            {PERSONAS.map((p) => (
                                <button key={p} type="button" role="radio" aria-checked={persona === p}
                                    className={`cp-seg-btn ${persona === p ? "on" : ""}`}
                                    onClick={() => setPersona(p)}>
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="cp-field">
                        <label className="cp-label" htmlFor="cp-msg">Message</label>
                        <textarea id="cp-msg" className="bx-input cp-textarea" placeholder="TELL US ABOUT YOUR ENVIRONMENT…"
                            value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                    </div>

                    <div className="cp-submit-row">
                        <BxButton as="button" type="submit" variant="primary" size="lg" pill disabled={status === "sending"}>
                            {status === "sending" ? "Sending…" : "Send Inquiry →"}
                        </BxButton>
                        {status === "success" && <span className="cp-msg ok">Received — we&apos;ll be in touch.</span>}
                        {status === "error" && <span className="cp-msg err">Something went wrong. Try again.</span>}
                    </div>
                </form>

                <aside className="cp-aside">
                    <RotatingScrollIndicator
                        label="AVG RESPONSE — 24H"
                        centerIcon={<Clock size={22} strokeWidth={2} />}
                    />
                    <a className="cp-email" href="mailto:info@extriveinnovations.com">info@extriveinnovations.com</a>
                    <p className="cp-loc">Jeedimetla, Bahadurpally,<br />Hyderabad, Telangana 500043</p>
                </aside>
            </section>

            {/* Contact-method cards */}
            

            <Footer />
            <style dangerouslySetInnerHTML={{ __html: STYLES }} />
        </div>
    );
}

const STYLES = `
.cp-root { background: var(--bg-void); color: var(--text-primary); min-height: 100vh; }

.cp-hero { max-width: 1400px; margin: 0 auto; padding: 200px clamp(16px, 4vw, 48px) clamp(48px, 7vw, 90px); min-height: 80vh; display: flex; flex-direction: column; justify-content: center; }
.cp-eyebrow { display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-mono); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.12em; color: var(--accent); margin-bottom: 30px; }
.cp-headline { font-family: var(--font-display); text-transform: uppercase; font-size: clamp(2.5rem, 11vw, 9rem); line-height: 0.86; letter-spacing: -0.04em; margin: 0; }
.cp-word { transition: color 180ms ease-in-out, -webkit-text-stroke-color 180ms ease-in-out; }

.cp-form-wrap { max-width: 1400px; margin: 0 auto; padding: clamp(48px, 6vw, 90px) clamp(16px, 4vw, 48px); display: grid; grid-template-columns: 1fr 320px; gap: clamp(40px, 6vw, 80px); align-items: start; }
.cp-form { display: flex; flex-direction: column; gap: clamp(28px, 4vw, 44px); }
.cp-field { display: flex; flex-direction: column; }
.cp-label { font-family: var(--font-mono); text-transform: uppercase; font-size: 0.72rem; letter-spacing: 0.14em; color: var(--accent); margin-bottom: 6px; }
.cp-textarea { height: auto; min-height: 120px; padding-top: 18px; font-size: clamp(1.1rem, 2vw, 1.5rem); resize: vertical; line-height: 1.3; }

.cp-seg { display: flex; flex-wrap: wrap; gap: 0; border: 2px solid var(--border); width: fit-content; max-width: 100%; }
.cp-seg-btn { font-family: var(--font-mono); text-transform: uppercase; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.04em; color: var(--text-secondary); background: transparent; border: none; border-right: 2px solid var(--border); padding: 14px 18px; cursor: pointer; transition: background 150ms ease-in-out, color 150ms ease-in-out; }
.cp-seg-btn:last-child { border-right: none; }
.cp-seg-btn:hover { color: var(--text-primary); }
.cp-seg-btn.on { background: var(--accent); color: var(--accent-foreground); }

.cp-submit-row { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; margin-top: 8px; }
.cp-msg { font-family: var(--font-mono); text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.04em; }
.cp-msg.ok { color: var(--accent); }
.cp-msg.err { color: var(--destructive); }

.cp-aside { display: flex; flex-direction: column; align-items: flex-start; gap: 24px; border-left: 2px solid var(--border); padding-left: clamp(24px, 3vw, 44px); }
.cp-email { font-family: var(--font-mono); text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.02em; color: var(--text-primary); text-decoration: none; border-bottom: 1px solid var(--border); }
.cp-email:hover { color: var(--accent); border-color: var(--accent); }
.cp-loc { font-family: var(--font-mono); text-transform: uppercase; font-size: 0.72rem; letter-spacing: 0.06em; line-height: 1.7; color: var(--text-secondary); margin: 0; }

.cp-cards-wrap { max-width: 1400px; margin: 0 auto; padding: 0 clamp(16px, 4vw, 48px) clamp(64px, 8vw, 110px); }
.cp-cards { grid-template-columns: repeat(3, 1fr); border: 2px solid var(--border); }
.cp-card { display: flex; flex-direction: column; padding: clamp(30px, 3vw, 46px); text-decoration: none; }
.cp-card-title { font-family: var(--font-display); text-transform: uppercase; font-size: clamp(1.4rem, 2.4vw, 2rem); line-height: 0.95; letter-spacing: -0.03em; margin: 26px 0 16px; color: inherit; }
.cp-card-body { font-family: var(--font-body); font-size: 0.95rem; line-height: 1.65; color: var(--text-secondary); margin: 0 0 30px; }
.bx-flip:hover .cp-card-body, .bx-flip:focus-within .cp-card-body { color: var(--accent-foreground); }
.cp-card-cta { margin-top: auto; font-family: var(--font-mono); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.04em; color: var(--accent); display: inline-flex; align-items: center; gap: 8px; }
.bx-flip:hover .cp-card-cta, .bx-flip:focus-within .cp-card-cta { color: var(--accent-foreground); }
.cp-card-arrow { transition: transform 200ms ease-in-out; }
.bx-flip:hover .cp-card-arrow { transform: translateX(5px); }

@media (max-width: 900px) {
    .cp-form-wrap { grid-template-columns: 1fr; }
    .cp-aside { border-left: none; padding-left: 0; padding-top: 32px; }
    .cp-cards { grid-template-columns: 1fr; }
}
`;
