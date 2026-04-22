"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";

/* ═══════════════════════════════════════════════════════
   Constants
   ═══════════════════════════════════════════════════════ */
const FACILITY_TYPES = [
  "Manufacturing",
  "Construction",
  "Logistics",
  "Defence",
  "Other",
];

const PROCESS_STEPS = [
  { num: "01", title: "Site & Workflow Evaluation", desc: "Understand facility layout, task profiles, and ergonomic risk factors." },
  { num: "02", title: "Use-Case Identification", desc: "Map high-impact zones where exosuit integration yields measurable results." },
  { num: "03", title: "Pilot Design & Deployment", desc: "Structured 8–12 week program with defined KPIs and on-ground support." },
  { num: "04", title: "Outcome Measurement", desc: "Fatigue reduction, injury rate change, and productivity metrics — documented." },
];

/* ═══════════════════════════════════════════════════════
   Ambient Particle Canvas (subtle, contact-page version)
   ═══════════════════════════════════════════════════════ */
function ContactParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let rafId;
    let particles = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const count = w < 768 ? 20 : 45;
      particles = [];
      for (let i = 0; i < count; i++) {
        const orange = Math.random() < 0.08;
        const size = 0.4 + Math.random() * 1.2;
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.08,
          vy: (Math.random() - 0.5) * 0.08,
          size,
          opacity: orange ? 0.08 + Math.random() * 0.06 : 0.03 + Math.random() * 0.05,
          orange,
        });
      }
    };

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        else if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        else if (p.y > h + 10) p.y = -10;
        if (p.orange) {
          ctx.shadowColor = "rgba(255,106,0,0.4)";
          ctx.shadowBlur = 2;
          ctx.fillStyle = `rgba(255,106,0,${p.opacity})`;
        } else {
          ctx.shadowBlur = 0;
          ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      rafId = requestAnimationFrame(draw);
    };

    resize();
    init();
    draw();
    window.addEventListener("resize", () => { resize(); init(); });
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════
   Main Contact Page
   ═══════════════════════════════════════════════════════ */
export default function ContactPage() {
  /* ── Pilot form state (UNCHANGED) ── */
  const [form, setForm] = useState({
    name: "",
    company: "",
    role: "",
    email: "",
    facilityType: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  /* ── Candidate form state (UNCHANGED) ── */
  const [candidateForm, setCandidateForm] = useState({
    candidateName: "",
    candidateEmail: "",
    candidateLink: "",
    areaOfInterest: "",
    whyExtrive: "",
  });
  const [candidateStatus, setCandidateStatus] = useState("idle");

  /* ── Handlers (UNCHANGED) ── */
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/request-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", company: "", role: "", email: "", facilityType: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleCandidateChange = (e) =>
    setCandidateForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleCandidateSubmit = async (e) => {
    e.preventDefault();
    setCandidateStatus("sending");
    try {
      const res = await fetch("/api/submit-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateName: candidateForm.candidateName,
          candidateEmail: candidateForm.candidateEmail,
          portfolioUrl: candidateForm.candidateLink,
          specialMessage: `Area: ${candidateForm.areaOfInterest}\n\nWhy Extrive:\n${candidateForm.whyExtrive}`
        }),
      });
      if (res.ok) {
        setCandidateStatus("success");
        setCandidateForm({ candidateName: "", candidateEmail: "", candidateLink: "", areaOfInterest: "", whyExtrive: "" });
      } else {
        setCandidateStatus("error");
      }
    } catch {
      setCandidateStatus("error");
    }
  };

  /* ── Fade-in on scroll ── */
  const sectionARightRef = useRef(null);
  const sectionBRightRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.15 }
    );
    [sectionARightRef, sectionBRightRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      style={{
        background: "#0d0f14",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        color: "#ffffff",
      }}
    >
      {/* Ambient particles */}
      <ContactParticles />

      {/* Subtle radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "900px",
          height: "900px",
          background: "radial-gradient(circle, rgba(232,106,0,0.025) 0%, transparent 60%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <Navbar />

      <div
        style={{
          maxWidth: "1140px",
          margin: "0 auto",
          padding: "0 48px",
          position: "relative",
          zIndex: 10,
        }}
        className="contact-container"
      >

        {/* ═══════════════════════════════════════════════════════
           SECTION A — DEPLOY EXOSUITS / REQUEST PILOT
           ═══════════════════════════════════════════════════════ */}
        <section style={{ padding: "140px 0 100px" }}>

          {/* System label — top left */}
          <div
            aria-hidden="true"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.25em",
              color: "rgba(255,255,255,0.45)",
              textTransform: "uppercase",
              marginBottom: "48px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "32px",
                height: "1px",
                background: "rgba(232,106,0,0.55)",
              }}
            />
            SYS.PILOT // DEPLOYMENT REQUEST
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "80px",
              alignItems: "start",
            }}
            className="contact-grid"
          >
            {/* ── Left Column — Editorial + Process ── */}
            <div>
              <h1
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: "clamp(2rem, 3.2vw, 2.8rem)",
                  color: "#ffffff",
                  lineHeight: 1.08,
                  marginBottom: "24px",
                  letterSpacing: "-0.01em",
                }}
              >
                Deploy Exosuits in
                <br />
                <span style={{ color: "#e86a00" }}>Your Operations.</span>
              </h1>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.82)",
                  maxWidth: "440px",
                  marginBottom: "40px",
                }}
              >
                We work directly with operations and safety leads to run
                structured pilot programs — 8 to 12 weeks, measurable
                outcomes, real-world deployment. Not a demo. A deployment.
              </p>

              {/* ── What to Expect ── */}
              <div style={{ marginBottom: "40px" }}>
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    color: "rgba(255,255,255,0.70)",
                    textTransform: "uppercase",
                    marginBottom: "20px",
                  }}
                >
                  What to Expect
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                  {PROCESS_STEPS.map((step) => (
                    <div
                      key={step.num}
                      style={{
                        display: "flex",
                        gap: "16px",
                        padding: "14px 0",
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "rgba(232,106,0,0.85)",
                          letterSpacing: "0.05em",
                          minWidth: "26px",
                          paddingTop: "2px",
                        }}
                      >
                        {step.num}
                      </span>
                      <div>
                        <div
                          style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "15px",
                            fontWeight: 600,
                            color: "rgba(255,255,255,0.98)",
                            marginBottom: "6px",
                          }}
                        >
                          {step.title}
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "14px",
                            fontWeight: 400,
                            lineHeight: 1.65,
                            color: "rgba(255,255,255,0.75)",
                          }}
                        >
                          {step.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Credibility line ── */}
              <div
                style={{
                  padding: "16px 0",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  maxWidth: "440px",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.65)",
                    lineHeight: 1.6,
                    fontStyle: "italic",
                  }}
                >
                  Validated in demanding operational environments across
                  manufacturing, defence, and high-load logistics.
                </p>
              </div>
            </div>

            {/* ── Right Column — Form ── */}
            <div
              ref={sectionARightRef}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderTop: "2px solid #e86a00",
                padding: "40px 32px",
                borderRadius: "2px",
                boxShadow: "0 24px 48px rgba(0,0,0,0.2)",
                opacity: 0,
                transform: "translateY(24px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              {/* Form header */}
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  color: "rgba(255,255,255,0.65)",
                  textTransform: "uppercase",
                  marginBottom: "28px",
                }}
              >
                Pilot Intake Form
              </div>

              <form onSubmit={handleSubmit} autoComplete="off">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                    marginBottom: "16px",
                  }}
                  className="form-grid"
                >
                  <FormField label="Full Name" name="name" value={form.name} onChange={handleChange} required />
                  <FormField label="Company" name="company" value={form.company} onChange={handleChange} required />
                  <FormField label="Role" name="role" value={form.role} onChange={handleChange} required />
                  <FormField label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
                </div>

                {/* Facility Type */}
                <div style={{ marginBottom: "16px" }}>
                  <label
                    htmlFor="facilityType"
                    style={{
                      display: "block",
                      fontFamily: "var(--font-heading)",
                      fontSize: "12px",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      color: "rgba(255,255,255,0.72)",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                    }}
                  >
                    Facility Type
                  </label>
                  <select
                    id="facilityType"
                    name="facilityType"
                    value={form.facilityType}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.10)",
                      borderRadius: "2px",
                      padding: "12px 14px",
                      fontFamily: "var(--font-heading)",
                      fontSize: "14px",
                      color: "#ffffff",
                      outline: "none",
                      cursor: "pointer",
                      appearance: "auto",
                    }}
                  >
                    <option value="">Select facility type</option>
                    {FACILITY_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div style={{ marginBottom: "24px" }}>
                  <label
                    htmlFor="message"
                    style={{
                      display: "block",
                      fontFamily: "var(--font-heading)",
                      fontSize: "12px",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      color: "rgba(255,255,255,0.72)",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                    }}
                  >
                    Primary Use Case / Challenge
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Describe your operational environment, pain points, or goals..."
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.10)",
                      borderRadius: "2px",
                      padding: "12px 14px",
                      fontFamily: "var(--font-heading)",
                      fontSize: "14px",
                      color: "#ffffff",
                      outline: "none",
                      resize: "vertical",
                    }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  style={{
                    width: "100%",
                    textAlign: "center",
                    padding: "14px 28px",
                    background: "#e86a00",
                    color: "#ffffff",
                    fontFamily: "var(--font-heading)",
                    fontWeight: 600,
                    fontSize: "13px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    border: "none",
                    borderRadius: "2px",
                    cursor: status === "sending" ? "wait" : "pointer",
                    transition: "background 0.2s ease",
                    opacity: status === "sending" ? 0.7 : 1,
                  }}
                  onMouseEnter={(e) => { if (status !== "sending") e.target.style.background = "#cf5e00"; }}
                  onMouseLeave={(e) => { e.target.style.background = "#e86a00"; }}
                >
                  {status === "sending" ? "Submitting..." : "Request a Pilot"}
                </button>

                {/* Trust signal */}
                <p
                  style={{
                    marginTop: "14px",
                    textAlign: "center",
                    fontFamily: "var(--font-heading)",
                    fontSize: "12px",
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.55)",
                    letterSpacing: "0.05em",
                  }}
                >
                  We respond within 24–48 hours.
                </p>

                {status === "success" && (
                  <p style={{ marginTop: "16px", fontSize: "14px", color: "#4ade80", fontFamily: "var(--font-heading)", textAlign: "center" }}>
                    Request received. Our deployment team will be in touch.
                  </p>
                )}
                {status === "error" && (
                  <p style={{ marginTop: "16px", fontSize: "14px", color: "#f87171", fontFamily: "var(--font-heading)", textAlign: "center" }}>
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div
          aria-hidden="true"
          style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.08) 80%, transparent)",
          }}
        />

        {/* ═══════════════════════════════════════════════════════
           SECTION B — JOIN THE BUILD / CAREERS
           ═══════════════════════════════════════════════════════ */}
        <section style={{ padding: "100px 0 80px" }}>

          {/* System label */}
          <div
            aria-hidden="true"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.25em",
              color: "rgba(255,255,255,0.45)",
              textTransform: "uppercase",
              marginBottom: "48px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "32px",
                height: "1px",
                background: "rgba(255,255,255,0.30)",
              }}
            />
            SYS.TEAM // APPLICATION
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "80px",
              alignItems: "start",
            }}
            className="contact-grid"
          >
            {/* ── Left Column — Mission + Filtering ── */}
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)",
                  color: "#ffffff",
                  lineHeight: 1.12,
                  marginBottom: "24px",
                  letterSpacing: "-0.01em",
                }}
              >
                Build Systems That
                <br />
                Operate in the Real World.
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.82)",
                  maxWidth: "440px",
                  marginBottom: "36px",
                }}
              >
                Hardware, software, and deployment. Physically demanding
                environments. Systems that ship and operate — not prototypes
                that stay in the lab.
              </p>

              {/* ── Who This Is For ── */}
              <div style={{ marginBottom: "28px" }}>
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    color: "rgba(255,255,255,0.70)",
                    textTransform: "uppercase",
                    marginBottom: "14px",
                  }}
                >
                  Who This Is For
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                  {[
                    "Engineers who care about real-world deployment",
                    "Builders comfortable with constraints and ambiguity",
                    "People who prioritize execution over theory",
                  ].map((item) => (
                    <li
                      key={item}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "15px",
                        color: "rgba(255,255,255,0.85)",
                        lineHeight: 1.65,
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: "#e86a00",
                          marginTop: "8px",
                          flexShrink: 0,
                        }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── Not For ── */}
              <div style={{ marginBottom: "32px" }}>
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    color: "rgba(255,255,255,0.60)",
                    textTransform: "uppercase",
                    marginBottom: "14px",
                  }}
                >
                  Not For
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                  {[
                    "Purely theoretical work",
                    "Those optimizing for comfort over impact",
                  ].map((item) => (
                    <li
                      key={item}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.65)",
                        lineHeight: 1.65,
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          width: "8px",
                          height: "1px",
                          background: "rgba(255,255,255,0.45)",
                          marginTop: "9px",
                          flexShrink: 0,
                        }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── Credibility line ── */}
              <div
                style={{
                  padding: "16px 0",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  maxWidth: "440px",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.85)",
                    letterSpacing: "0.02em",
                  }}
                >
                  Small team. Real deployments. High ownership.
                </p>
              </div>

              {/* ── Strategic note ── */}
              <div style={{ padding: "16px 0 0", maxWidth: "440px" }}>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    fontWeight: 400,
                    lineHeight: 1.65,
                    color: "rgba(255,255,255,0.60)",
                  }}
                >
                  For strategic partnerships, research collaborations, or
                  aligned capital conversations — reach out via the
                  contact channel below.
                </p>
              </div>
            </div>

            {/* ── Right Column — Application Form ── */}
            <div
              ref={sectionBRightRef}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderTop: "2px solid rgba(255,255,255,0.25)",
                padding: "40px 32px",
                borderRadius: "2px",
                boxShadow: "0 24px 48px rgba(0,0,0,0.2)",
                opacity: 0,
                transform: "translateY(24px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s",
              }}
            >
              {/* Form header */}
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  color: "rgba(255,255,255,0.65)",
                  textTransform: "uppercase",
                  marginBottom: "28px",
                }}
              >
                Submit Application
              </div>

              <form onSubmit={handleCandidateSubmit} autoComplete="off">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                    marginBottom: "16px",
                  }}
                  className="form-grid"
                >
                  <FormField label="Full Name" name="candidateName" value={candidateForm.candidateName} onChange={handleCandidateChange} required />
                  <FormField label="Email" name="candidateEmail" type="email" value={candidateForm.candidateEmail} onChange={handleCandidateChange} required />
                  <div style={{ gridColumn: "1 / -1" }}>
                    <FormField label="LinkedIn / Portfolio URL" name="candidateLink" type="url" value={candidateForm.candidateLink} onChange={handleCandidateChange} required />
                  </div>
                </div>

                {/* Area of Interest */}
                <div style={{ marginBottom: "16px" }}>
                  <label
                    htmlFor="areaOfInterest"
                    style={{
                      display: "block",
                      fontFamily: "var(--font-heading)",
                      fontSize: "12px",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      color: "rgba(255,255,255,0.72)",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                    }}
                  >
                    Area of Interest
                  </label>
                  <select
                    id="areaOfInterest"
                    name="areaOfInterest"
                    value={candidateForm.areaOfInterest}
                    onChange={handleCandidateChange}
                    required
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.10)",
                      borderRadius: "2px",
                      padding: "12px 14px",
                      fontFamily: "var(--font-heading)",
                      fontSize: "14px",
                      color: "#ffffff",
                      outline: "none",
                      cursor: "pointer",
                      appearance: "auto",
                    }}
                  >
                    <option value="">Select an area</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Product">Product</option>
                    <option value="Robotics">Robotics</option>
                    <option value="AI / Data">AI / Data</option>
                    <option value="Research">Research</option>
                    <option value="Operations">Operations</option>
                    <option value="Partnerships">Partnerships</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Why Extrive */}
                <div style={{ marginBottom: "24px" }}>
                  <label
                    htmlFor="whyExtrive"
                    style={{
                      display: "block",
                      fontFamily: "var(--font-heading)",
                      fontSize: "12px",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      color: "rgba(255,255,255,0.72)",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                    }}
                  >
                    Why This Work?
                  </label>
                  <textarea
                    id="whyExtrive"
                    name="whyExtrive"
                    value={candidateForm.whyExtrive}
                    onChange={handleCandidateChange}
                    rows={3}
                    placeholder="What have you built or shipped, and why does this work matter to you?"
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.10)",
                      borderRadius: "2px",
                      padding: "12px 14px",
                      fontFamily: "var(--font-heading)",
                      fontSize: "14px",
                      color: "#ffffff",
                      outline: "none",
                      resize: "vertical",
                    }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={candidateStatus === "sending"}
                  style={{
                    width: "100%",
                    textAlign: "center",
                    padding: "14px 28px",
                    background: "transparent",
                    color: "#ffffff",
                    fontFamily: "var(--font-heading)",
                    fontWeight: 600,
                    fontSize: "13px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "2px",
                    cursor: candidateStatus === "sending" ? "wait" : "pointer",
                    transition: "border-color 0.2s ease, background 0.2s ease",
                    opacity: candidateStatus === "sending" ? 0.7 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (candidateStatus !== "sending") {
                      e.target.style.borderColor = "rgba(255,255,255,0.4)";
                      e.target.style.background = "rgba(255,255,255,0.03)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = "rgba(255,255,255,0.15)";
                    e.target.style.background = "transparent";
                  }}
                >
                  {candidateStatus === "sending" ? "Submitting..." : "Submit Application"}
                </button>

                {/* Trust signal */}
                <p
                  style={{
                    marginTop: "14px",
                    textAlign: "center",
                    fontFamily: "var(--font-heading)",
                    fontSize: "12px",
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.55)",
                    letterSpacing: "0.05em",
                  }}
                >
                  We review every application. Response within 3–5 days.
                </p>

                {candidateStatus === "success" && (
                  <p style={{ marginTop: "16px", fontSize: "14px", color: "#4ade80", fontFamily: "var(--font-heading)", textAlign: "center" }}>
                    Application received. We&apos;ll be in touch.
                  </p>
                )}
                {candidateStatus === "error" && (
                  <p style={{ marginTop: "16px", fontSize: "14px", color: "#f87171", fontFamily: "var(--font-heading)", textAlign: "center" }}>
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div
          aria-hidden="true"
          style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent)",
          }}
        />

        {/* ═══════════════════════════════════════════════════════
           SECTION C — DIRECT CONTACT
           ═══════════════════════════════════════════════════════ */}
        <section style={{ padding: "80px 0 60px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "80px",
              alignItems: "start",
            }}
            className="contact-grid"
          >
            {/* Left — Email & LinkedIn */}
            <div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  color: "rgba(255,255,255,0.70)",
                  textTransform: "uppercase",
                  marginBottom: "20px",
                }}
              >
                Direct Channel
              </div>

              <a
                href="mailto:info@extriveinnovations.com"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(1.1rem, 2vw, 1.6rem)",
                  fontWeight: 600,
                  color: "#ffffff",
                  textDecoration: "none",
                  display: "inline-block",
                  borderBottom: "1px solid transparent",
                  transition: "border-color 0.2s ease",
                  marginBottom: "8px",
                }}
                onMouseEnter={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.3)")}
                onMouseLeave={(e) => (e.target.style.borderColor = "transparent")}
              >
                info@extriveinnovations.com
              </a>

              <p
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.65)",
                  marginTop: "6px",
                }}
              >
                We respond within 48 hours.
              </p>

              <div style={{ marginTop: "28px" }}>
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.2em",
                    color: "rgba(255,255,255,0.70)",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                  }}
                >
                  LinkedIn
                </div>
                <a
                  href="https://www.linkedin.com/company/extrive-innovations/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "15px",
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.90)",
                    textDecoration: "none",
                    borderBottom: "1px solid transparent",
                    transition: "border-color 0.2s ease, color 0.2s ease",
                    display: "inline-block",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = "rgba(232,106,0,0.5)";
                    e.target.style.color = "rgba(255,255,255,0.9)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = "transparent";
                    e.target.style.color = "rgba(255,255,255,0.90)";
                  }}
                >
                  linkedin.com/company/extrive-innovations
                </a>
              </div>
            </div>

            {/* Right — Address */}
            <div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  color: "rgba(255,255,255,0.70)",
                  textTransform: "uppercase",
                  marginBottom: "20px",
                }}
              >
                Location
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "15px",
                  color: "rgba(255,255,255,0.80)",
                  lineHeight: 1.7,
                }}
              >
                Survey No: 62, 1A, Jeedimetla,
                <br />
                Bahadurpally, Hyderabad,
                <br />
                Telangana 500043
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "40px 24px",
          textAlign: "center",
          position: "relative",
          zIndex: 10,
        }}
      >
        <p
          style={{
            color: "rgba(255,255,255,0.60)",
            fontSize: "13px",
            letterSpacing: "0.05em",
            fontFamily: "var(--font-heading)",
          }}
        >
          © {new Date().getFullYear()}{" "}
          <span style={{ color: "#e86a00" }}>Extrive</span> Innovations. All
          rights reserved.
        </p>
      </footer>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   FORM FIELD (UNCHANGED structure — restyled for dark bg)
   ═══════════════════════════════════════════════════════ */
function FormField({ label, name, type = "text", value, onChange, required }) {
  return (
    <div>
      <label
        htmlFor={name}
        style={{
          display: "block",
          fontFamily: "var(--font-heading)",
          fontSize: "12px",
          fontWeight: 500,
          letterSpacing: "0.1em",
          color: "rgba(255,255,255,0.72)",
          textTransform: "uppercase",
          marginBottom: "8px",
        }}
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          width: "100%",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: "2px",
          padding: "12px 14px",
          fontFamily: "var(--font-heading)",
          fontSize: "14px",
          color: "#ffffff",
          outline: "none",
          transition: "border-color 0.2s ease",
        }}
        onFocus={(e) => (e.target.style.borderColor = "rgba(232,106,0,0.5)")}
        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.10)")}
      />
    </div>
  );
}
