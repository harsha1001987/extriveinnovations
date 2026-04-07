"use client";

import EarthBackground from "./components/Earthbg";
import AboutSection from "./components/AboutSection";
import ProductsSection from "./components/ProductsSection";
import ManipurPilotSection from "./components/ManipurPilotSection";
import TeamSection from "./components/TeamSection";
import TractionSection from "./components/TractionSection";
import ContactCTA from "./components/ContactCTA";
import Navbar from "./components/Navbar";

/* ═══════════════════════════════════════════════════════════
   Partner data
   ═══════════════════════════════════════════════════════════ */
const PARTNERS = [
  "Maruti Suzuki",
  "Boeing India",
  "AIC Mahindra",
  "DST NIDHI",
  "Startup India",
  "Wadhwani Foundation",
];

/* ═══════════════════════════════════════════════════════════
   Main Landing Page
   ═══════════════════════════════════════════════════════════ */
function LandingPage() {
  return (
    <div className="relative w-full">
      {/* ═══════════════ NAVBAR ═══════════════ */}
      <Navbar />

      {/* ═══════════════ HERO (Full Viewport) ═══════════════ */}
      <div className="relative w-full h-screen overflow-hidden">

        {/* Background Earth — fixed, centered, z-0 */}
        <EarthBackground />

        {/* Content Layer */}
        <div className="relative z-10 w-full h-full">

          {/* ═══════════════ HERO CONTENT ═══════════════ */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">

            {/* Text Container with dark radial fade */}
            <div className="relative text-center max-w-4xl px-5 md:px-6">

              {/* Dark backsplash behind text */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] 
                bg-[radial-gradient(ellipse_at_center,rgba(13,15,20,0.7)_0%,transparent_65%)] pointer-events-none -z-10" />

              {/* ── Badge ── */}
              <div
                className="hero-fade-in inline-flex items-center gap-2 mb-8"
                style={{
                  padding: "6px 16px",
                  border: "1px solid rgba(232,106,0,0.4)",
                  borderRadius: "100px",
                  background: "rgba(13,15,20,0.8)",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#e86a00",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.18em",
                    color: "rgba(255,255,255,0.65)",
                    textTransform: "uppercase",
                  }}
                >
                  India&apos;s First Occupational Exosuit Platform
                </span>
              </div>

              {/* ── Headline ── */}
              <div className="hero-fade-in">
                <h2
                  className="text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    fontSize: "clamp(2rem, 3.8vw, 3.4rem)",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.0,
                    maxWidth: "900px",
                    margin: "0 auto",
                  }}
                >
                  Building the Future of
                </h2>
                <h2
                  className="drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    fontSize: "clamp(2.1rem, 4vw, 3.55rem)",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.0,
                    color: "#e86a00",
                    maxWidth: "900px",
                    margin: "0 auto",
                    marginTop: "4px",
                  }}
                >
                  Industrial Human Augmentation
                </h2>
              </div>

              {/* ── Subtext ── */}
              <p
                className="hero-fade-in-delay mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  fontSize: "clamp(0.88rem, 1.3vw, 1.05rem)",
                  lineHeight: 1.75,
                  color: "rgba(255, 255, 255, 0.55)",
                  maxWidth: "520px",
                  marginTop: "28px",
                }}
              >
                Wearable robotics and ergonomics intelligence systems that reduce
                fatigue, prevent injuries, and elevate productivity across the
                world&apos;s toughest manual environments.
              </p>

              {/* ── CTA Buttons ── */}
              <div
                className="hero-fade-in-buttons pointer-events-auto flex flex-row items-center justify-center gap-[14px]"
                style={{ marginTop: "36px" }}
              >
                <a href="/ProductsPage" className="cta-primary">
                  Explore Products
                </a>
                <a 
                  href="/contact" 
                  className="cta-secondary hero-cta-override"
                  style={{
                    color: "#ffffff",
                    borderColor: "rgba(255, 255, 255, 0.25)"
                  }}
                  onMouseEnter={(e) => e.target.style.borderColor = "rgba(255, 255, 255, 0.8)"}
                  onMouseLeave={(e) => e.target.style.borderColor = "rgba(255, 255, 255, 0.25)"}
                >
                  Request a Pilot
                </a>
              </div>

              {/* ── Partner Validation Strip ── */}
              <div
                className="hero-fade-in-buttons pointer-events-auto"
                style={{ marginTop: "26px" }}
              >
                {/* Label */}
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.2em",
                    color: "rgba(255,255,255,0.5)",
                    textTransform: "uppercase",
                    textAlign: "center",
                  }}
                >
                  Backed &amp; Validated By
                </div>

                {/* Partner Names */}
                <div
                  className="flex flex-wrap items-center justify-center"
                  style={{
                    marginTop: "10px",
                    gap: "0",
                  }}
                >
                  {PARTNERS.map((name, i) => (
                    <span key={name} className="flex items-center">
                      <span
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontSize: "13.5px",
                          fontWeight: 400,
                          color: "rgba(255,255,255,0.7)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {name}
                      </span>
                      {i < PARTNERS.length - 1 && (
                        <span
                          style={{
                            margin: "0 12px",
                            color: "rgba(232,106,0,0.6)",
                            fontSize: "14px",
                            userSelect: "none",
                          }}
                        >
                          ·
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* 
        ═══════════════════════════════════════════════════════
        SOLID CONTENT LAYER
        This wrapper guarantees the Earth stops at the hero 
        and does not bleed through sections below. 
        ═══════════════════════════════════════════════════════ 
      */}
      <div style={{ position: "relative", zIndex: 20, background: "var(--background)" }}>
      
        {/* ═══════════════ SECTION 2 — ABOUT ═══════════════ */}
        <AboutSection />

      {/* ═══════════════ SECTION 3 — PRODUCTS ═══════════════ */}
      <ProductsSection />

      {/* ═══════════════ SECTION 3.5 — FIELD VALIDATION ═══════════════ */}
      <ManipurPilotSection />

      {/* ═══════════════ SECTION 4 — TEAM ═══════════════ */}
      <TeamSection />

      {/* ═══════════════ SECTION 4.5 — TRACTION ═══════════════ */}
      <TractionSection />

      {/* ═══════════════ SECTION 5 — CONTACT CTA ═══════════════ */}
      <ContactCTA />

        {/* ═══════════════ FOOTER ═══════════════ */}
        <footer
          style={{
            borderTop: "1px solid var(--border)",
            padding: "40px 24px",
            textAlign: "center",
            background: "var(--background)",
          }}
        >
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "13px",
              letterSpacing: "0.05em",
              fontFamily: "var(--font-heading)",
            }}
          >
            © {new Date().getFullYear()} E<span style={{ color: "var(--accent)" }}>x</span>trive Innovations. All rights reserved.
          </p>
        </footer>
      </div>

    </div>
  );
}

export default LandingPage;