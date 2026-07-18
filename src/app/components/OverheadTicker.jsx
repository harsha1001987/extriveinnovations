"use client";

import { useEffect, useState } from "react";
import StatusMarquee from "./brutalist/StatusMarquee";

/* ══════════════════════════════════════════════════════════════════
   Part 3 — Overhead Status Marquee. A slim ops/lab status strip that
   slides in once the user scrolls past the Hero, sitting just above the
   nav pill (it publishes its height as --bx-ticker-h so the nav shifts
   down). Moderate, legible pace. Real data pulled from across the site.
   ══════════════════════════════════════════════════════════════════ */

const hl = (t) => <span className="bx-hl">{t}</span>;

const ITEMS = [
    <>SYSTEM STATUS: {hl("OPERATIONAL")}</>,
    <>{hl("BACKEX")} — STAGE 1 DEPLOYED</>,
    <>{hl("₹35L")} GOVERNMENT-BACKED FUNDING</>,
    <>FIELD-VALIDATED — {hl("INDIAN ARMY")}</>,
    <>{hl("₹5L")} MSIL MOU SIGNED</>,
];

const PLAIN =
    "System status: operational. BackEX — Stage 1 deployed. ₹35L government-backed funding. Field-validated — Indian Army. ₹5L MSIL MoU signed.";

export default function OverheadTicker() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            const past = window.scrollY > window.innerHeight * 1.1;
            setVisible(past);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Publish height so the nav can offset itself while the ticker is shown.
    useEffect(() => {
        document.documentElement.style.setProperty("--bx-ticker-h", visible ? "37px" : "0px");
        return () => document.documentElement.style.setProperty("--bx-ticker-h", "0px");
    }, [visible]);

    return (
        <>
            {/* Accessible, non-scrolling copy of the same data */}
            <p className="bx-sr-only">{PLAIN}</p>

            <div className={`bx-ticker bxticker ${visible ? "on" : ""}`} aria-hidden="true">
                <StatusMarquee items={ITEMS} duration={38} separator="square" />
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .bxticker {
                    position: fixed; top: 0; left: 0; right: 0; z-index: 101;
                    transform: translateY(-100%);
                    transition: transform 300ms ease-in-out;
                }
                .bxticker.on { transform: translateY(0); }
                @media (prefers-reduced-motion: reduce) {
                    .bxticker { transition: none; }
                }
            `}} />
        </>
    );
}
