"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";

const FACILITY_TYPES = [
  "Manufacturing",
  "Construction",
  "Logistics",
  "Defence",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    role: "",
    email: "",
    facilityType: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const [candidateForm, setCandidateForm] = useState({
    candidateName: "",
    candidateEmail: "",
    candidateLink: "",
    areaOfInterest: "",
    whyExtrive: "",
  });
  const [candidateStatus, setCandidateStatus] = useState("idle");

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

  return (
    <div style={{ background: "var(--background)", minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      {/* Background Glow */}
      <div style={{ position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)", width: "800px", height: "800px", background: "radial-gradient(circle, rgba(232,106,0,0.03) 0%, transparent 60%)", pointerEvents: "none", zIndex: 0 }} />
      <Navbar />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 48px", position: "relative", zIndex: 10 }} className="contact-container">
        
        {/* ═══════════════ SECTION A — REQUEST FOR PILOT ═══════════════ */}
        <section
          style={{
            padding: "120px 0 80px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }} className="contact-grid">
            
            {/* Left — Editorial copy */}
            <div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  marginBottom: "20px",
                }}
              >
                Request for Pilot
              </div>

              <h1
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                  color: "var(--text-primary)",
                  lineHeight: 1.1,
                  marginBottom: "20px",
                }}
              >
                Deploy Extrive in your facility.
              </h1>

              <p
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 400,
                  fontSize: "15px",
                  lineHeight: 1.7,
                  color: "var(--text-secondary)",
                  maxWidth: "480px",
                }}
              >
                We work directly with operations and safety leads to run
                structured pilot programs. 8–12 weeks. Measurable outcomes.
              </p>
            </div>

            {/* Right — Form Container */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderTop: "2px solid var(--accent)", padding: "40px 32px", borderRadius: "2px", boxShadow: "0 20px 40px rgba(0,0,0,0.05)" }}>
            <form onSubmit={handleSubmit} autoComplete="off">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }} className="form-grid">
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
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    marginBottom: "6px",
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
                    background: "var(--input-bg)",
                    border: "1px solid var(--input-border)",
                    borderRadius: "2px",
                    padding: "12px 14px",
                    fontFamily: "var(--font-heading)",
                    fontSize: "14px",
                    color: "var(--text-primary)",
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
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    marginBottom: "6px",
                  }}
                >
                  Message (optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    background: "var(--input-bg)",
                    border: "1px solid var(--input-border)",
                    borderRadius: "2px",
                    padding: "12px 14px",
                    fontFamily: "var(--font-heading)",
                    fontSize: "14px",
                    color: "var(--text-primary)",
                    outline: "none",
                    resize: "vertical",
                  }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="cta-primary"
                disabled={status === "sending"}
                style={{ width: "100%", textAlign: "center" }}
              >
                {status === "sending" ? "Submitting..." : "Submit Request"}
              </button>

              {status === "success" && (
                <p style={{ marginTop: "16px", fontSize: "14px", color: "#4ade80", fontFamily: "var(--font-heading)" }}>
                  Thank you. Our team will contact you shortly.
                </p>
              )}
              {status === "error" && (
                <p style={{ marginTop: "16px", fontSize: "14px", color: "#f87171", fontFamily: "var(--font-heading)" }}>
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
            </div>
          </div>
        </section>

        {/* ═══════════════ SECTION B — JOIN OUR TEAM ═══════════════ */}
        <section
          style={{
            padding: "80px 0",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }} className="contact-grid">
            
            {/* Left — Editorial copy */}
            <div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  marginBottom: "20px",
                }}
              >
                Join Our Team
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)",
                  color: "var(--text-primary)",
                  lineHeight: 1.15,
                  marginBottom: "20px",
                  maxWidth: "700px",
                }}
              >
                Build the systems that protect industrial work.
              </h2>

              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 400,
                  fontSize: "15px",
                  lineHeight: 1.7,
                  color: "var(--text-secondary)",
                  maxWidth: "480px",
                  marginBottom: "32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <p>
                  Wearable robotics and occupational AI remain one of the most underbuilt categories in industrial technology. The work is technically hard, operationally real, and consequential at scale. At Extrive, we are building across hardware, sensing, ergonomics intelligence, deployment, and industry partnerships — with the chance to shape a category early.
                </p>
                <p>
                  The opportunity spans product, engineering, field deployment, research, and long-horizon industrial collaboration.
                </p>
              </div>

              {/* Strategic / Investor Subtext */}
              <div style={{ padding: "20px 0", borderTop: "1px solid var(--border)", maxWidth: "480px" }}>
                <p
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "12px",
                    fontWeight: 500,
                    lineHeight: 1.6,
                    color: "var(--text-muted)",
                  }}
                >
                  For strategic partnerships, research collaborations, or aligned capital conversations, use the contact route below.
                </p>
              </div>
            </div>

            {/* Right — Candidate Form Container */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderTop: "2px solid var(--text-secondary)", padding: "40px 32px", borderRadius: "2px", boxShadow: "0 20px 40px rgba(0,0,0,0.05)" }}>
            <form onSubmit={handleCandidateSubmit} autoComplete="off">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }} className="form-grid">
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
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    marginBottom: "6px",
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
                    background: "var(--input-bg)",
                    border: "1px solid var(--input-border)",
                    borderRadius: "2px",
                    padding: "12px 14px",
                    fontFamily: "var(--font-heading)",
                    fontSize: "14px",
                    color: "var(--text-primary)",
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
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    marginBottom: "6px",
                  }}
                >
                  Why Extrive? (Optional notes)
                </label>
                <textarea
                  id="whyExtrive"
                  name="whyExtrive"
                  value={candidateForm.whyExtrive}
                  onChange={handleCandidateChange}
                  rows={3}
                  style={{
                    width: "100%",
                    background: "var(--input-bg)",
                    border: "1px solid var(--input-border)",
                    borderRadius: "2px",
                    padding: "12px 14px",
                    fontFamily: "var(--font-heading)",
                    fontSize: "14px",
                    color: "var(--text-primary)",
                    outline: "none",
                    resize: "vertical",
                  }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="cta-primary"
                disabled={candidateStatus === "sending"}
                style={{ width: "100%", textAlign: "center", background: "transparent", border: "1px solid var(--border)", color: "var(--text-primary)" }}
              >
                {candidateStatus === "sending" ? "Submitting..." : "Submit Profile"}
              </button>

              {candidateStatus === "success" && (
                <p style={{ marginTop: "16px", fontSize: "14px", color: "#4ade80", fontFamily: "var(--font-heading)" }}>
                  Thank you. Your profile has been submitted.
                </p>
              )}
              {candidateStatus === "error" && (
                <p style={{ marginTop: "16px", fontSize: "14px", color: "#f87171", fontFamily: "var(--font-heading)" }}>
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
            </div>
          </div>
        </section>

        {/* ═══════════════ SECTION C — EMAIL US ═══════════════ */}
        <section
          style={{
            padding: "80px 0",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.2em",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              marginBottom: "24px",
            }}
          >
            Direct Contact
          </div>

          <a
            href="mailto:info@extriveinnovations.com"
            className="group block"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
              fontWeight: 600,
              color: "var(--text-primary)",
              textDecoration: "none",
              marginBottom: "16px",
              display: "inline-block",
              borderBottom: "1px solid transparent",
              transition: "border-color 0.2s ease",
            }}
            onMouseEnter={(e) => e.target.style.borderColor = "var(--text-muted)"}
            onMouseLeave={(e) => e.target.style.borderColor = "transparent"}
          >
            info@extriveinnovations.com
          </a>

          <p
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "13px",
              color: "var(--text-muted)",
              marginTop: "12px",
            }}
          >
            We respond within 48 hours.
          </p>

          <div style={{ marginTop: "20px" }}>
            <p style={{
              fontFamily: "var(--font-heading)",
              fontSize: "13px",
              color: "var(--text-muted)",
            }}>
              Survey No: 62, 1A, Jeedimetla, Bahadurpally, Hyderabad, Telangana 500043
            </p>
            <p style={{
              fontFamily: "var(--font-heading)",
              fontSize: "13px",
              color: "var(--text-muted)",
              marginTop: "4px",
            }}>
              +91 7037 108 656
            </p>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "40px 24px", textAlign: "center" }}>
        <p style={{ color: "var(--text-muted)", fontSize: "13px", letterSpacing: "0.05em" }}>
          © {new Date().getFullYear()} E<span style={{ color: "var(--accent)" }}>x</span>trive Innovations. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

/* ═══════════════ FORM FIELD ═══════════════ */
function FormField({ label, name, type = "text", value, onChange, required }) {
  return (
    <div>
      <label
        htmlFor={name}
        style={{
          display: "block",
          fontFamily: "var(--font-heading)",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.1em",
          color: "var(--text-muted)",
          textTransform: "uppercase",
          marginBottom: "6px",
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
          background: "var(--input-bg)",
          border: "1px solid var(--input-border)",
          borderRadius: "2px",
          padding: "12px 14px",
          fontFamily: "var(--font-heading)",
          fontSize: "14px",
          color: "var(--text-primary)",
          outline: "none",
          transition: "border-color 0.2s ease",
        }}
        onFocus={(e) => e.target.style.borderColor = "rgba(232,106,0,0.6)"}
        onBlur={(e) => e.target.style.borderColor = ""}
      />
    </div>
  );
}
