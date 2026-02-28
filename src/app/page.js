"use client";

import Link from "next/link";
import EarthBackground from "./components/Earthbg";
import AboutSection from "./components/AboutSection";
import RecognitionSection from "./components/RecognitionSection";
import RequestDemoSection from "./components/RequestDemoSection";
import ContactSection from "./components/Contact";
import ProductsSection from "./components/ProductsSection";
import Navbar from "./components/Navbar";

function LandingPage() {
  return (
    <div className="relative w-full">

      {/* ═══════════════ HERO (Full Viewport) ═══════════════ */}
      <div className="relative w-full h-screen overflow-hidden">

        {/* Background Earth */}
        <EarthBackground />

        {/* Content Layer */}
        <div className="relative z-10 w-full h-full">

          {/* ═══════════════ NAVBAR ═══════════════ */}
          <Navbar />

          {/* ═══════════════ HERO ═══════════════ */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            
            {/* ── Text Container with dark radial fade behind it ── */}
            <div className="relative text-center max-w-3xl px-5 md:px-6">
              
              {/* The Dark Backsplash (dims the earth just behind the text) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] 
                bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.65)_0%,transparent_65%)] pointer-events-none -z-10" />

              <h2
                className="hero-fade-in text-white mb-8 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 600,
                  fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
                  letterSpacing: "0.015em",
                  lineHeight: 1.3,
                  maxWidth: "900px",
                  margin: "0 auto",
                }}
              >
                Building the Future of <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500 drop-shadow-[0_2px_10px_rgba(249,115,22,0.2)]">
                  Industrial Human Augmentation
                </span>
              </h2>

              {/* Subtext */}
              <p
                className="hero-fade-in-delay mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  fontSize: "clamp(0.88rem, 1.3vw, 1.05rem)",
                  lineHeight: 1.75,
                  color: "rgba(255, 255, 255, 0.9)",
                  maxWidth: "680px",
                }}
              >
                Extrive builds wearable robotics and ergonomics intelligence
                systems designed to reduce fatigue, prevent injuries, and elevate
                productivity across the world&apos;s toughest manual environments.
              </p>

              {/* CTA Buttons */}
              <div
                className="hero-fade-in-buttons pointer-events-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
                style={{ marginTop: "44px" }}
              >
                <a href="#demo" className="cta-primary">
                  Request Demo
                </a>
                <a href="#contact" className="cta-secondary bg-black/50 backdrop-blur-sm">
                  Contact
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ═══════════════ SECTION 2 — ABOUT ═══════════════ */}
      <AboutSection />
      
      {/* ═══════════════ SECTION 3 — PRODUCTS ═══════════════ */}
      <ProductsSection />
      
      {/* ═══════════════ SECTION 4 — RECOGNITION ═══════════════ */}
      <RecognitionSection />

      {/* ═══════════════ SECTION 5 — REQUEST DEMO ═══════════════ */}
      <RequestDemoSection />

      {/* ═══════════════ SECTION 6 — CONTACT ═══════════════ */}
      <ContactSection />

    </div>
  );
}

export default LandingPage;