"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import { Calculator } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════
   Default field values
   ═══════════════════════════════════════════════════════════════════ */

const DEFAULTS = {
  workers: 100,
  salary: 30000,
  sickDays: 8,
  costPerSickDay: 1500,
  injuryRate: 0.05,
  costPerInjury: 150000,
  productivityGain: 0.12,
  exosuitCost: 85000,
  maintenanceCost: 8000,
};

/* ═══════════════════════════════════════════════════════════════════
   Number formatting
   ═══════════════════════════════════════════════════════════════════ */

function fmt(n) {
  return new Intl.NumberFormat("en-IN").format(Math.round(n));
}

/* ═══════════════════════════════════════════════════════════════════
   Input field config
   ═══════════════════════════════════════════════════════════════════ */

const LEFT_FIELDS = [
  { key: "workers", label: "Number of Workers", type: "number", step: 1 },
  { key: "salary", label: "Average Monthly Salary (₹)", type: "number", step: 1000 },
  { key: "sickDays", label: "Avg Sick Days / Worker / Year", type: "number", step: 1 },
  { key: "costPerSickDay", label: "Cost per Sick Day (₹)", type: "number", step: 100 },
];

const RIGHT_FIELDS = [
  { key: "injuryRate", label: "Annual Injury Rate (decimal)", type: "number", step: 0.01 },
  { key: "costPerInjury", label: "Cost per Injury (₹)", type: "number", step: 5000 },
  { key: "productivityGain", label: "Productivity Gain (% decimal)", type: "number", step: 0.01 },
  { key: "exosuitCost", label: "Exosuit Cost per Worker (₹)", type: "number", step: 5000 },
  { key: "maintenanceCost", label: "Annual Maintenance / Worker (₹)", type: "number", step: 1000 },
];

/* ═══════════════════════════════════════════════════════════════════
   Page Component
   ═══════════════════════════════════════════════════════════════════ */

export default function ROICalculatorPage() {
  const [values, setValues] = useState(DEFAULTS);
  const [results, setResults] = useState(null);

  const update = (key, raw) => {
    setValues((prev) => ({ ...prev, [key]: parseFloat(raw) || 0 }));
  };

  const calculate = () => {
    const {
      workers, salary, sickDays, costPerSickDay,
      injuryRate, costPerInjury, productivityGain,
      exosuitCost, maintenanceCost,
    } = values;

    const annualInjuries = workers * injuryRate;
    const injuryCostTotal = annualInjuries * costPerInjury;
    const annualSickCost = workers * sickDays * costPerSickDay;
    const annualSalaryTotal = workers * salary * 12;
    const productivityValue = annualSalaryTotal * productivityGain;
    const totalLoss = injuryCostTotal + annualSickCost;
    const totalBenefit = totalLoss + productivityValue;
    const totalExosuitCost = workers * exosuitCost;
    const totalMaintenanceCost = workers * maintenanceCost;
    const totalInvestment = totalExosuitCost + totalMaintenanceCost;
    const netROI = totalBenefit - totalInvestment;
    const roiPercent = totalInvestment > 0 ? (netROI / totalInvestment) * 100 : 0;
    const paybackMonths = totalBenefit > 0 ? totalInvestment / (totalBenefit / 12) : 0;

    setResults({
      injuryCostTotal, annualSickCost, productivityValue,
      totalInvestment, netROI, roiPercent, paybackMonths,
    });
  };

  const renderField = ({ key, label, type, step }) => (
    <div className="group" key={key} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label
        htmlFor={key}
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.1em",
          color: "var(--text-muted)",
          textTransform: "uppercase",
        }}
      >
        {label}
      </label>
      <input
        id={key}
        type={type}
        step={step}
        value={values[key]}
        onChange={(e) => update(key, e.target.value)}
        style={{
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

  return (
    <div style={{ background: "var(--background)", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "120px 24px 80px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
              color: "var(--text-primary)",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            <Calculator size={32} className="text-orange-500" strokeWidth={1.5} />
            Interactive ROI Calculator
          </h1>
          <p
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "15px",
              color: "var(--text-secondary)",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Enter your workplace details to estimate potential cost savings
            and productivity gains.
          </p>
        </div>

        {/* Calculator Card */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "2px",
            padding: "40px 36px",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px 40px", marginBottom: "36px" }} className="roi-grid-responsive">
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {LEFT_FIELDS.map(renderField)}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {RIGHT_FIELDS.map(renderField)}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginTop: "8px" }}>
            <button
              className="cta-primary"
              onClick={calculate}
              style={{ minWidth: "220px" }}
            >
              Calculate ROI
            </button>
          </div>
        </div>

        {/* Results */}
        {results && (
          <div style={{ marginTop: "48px", textAlign: "center" }}>
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: "1.3rem",
                color: "var(--text-primary)",
                marginBottom: "28px",
              }}
            >
              Projected Annual Impact
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "32px" }} className="roi-results-responsive">
              <ResultCard label="Annual Injury Cost" value={`₹ ${fmt(results.injuryCostTotal)}`} negative />
              <ResultCard label="Annual Sick Leave Cost" value={`₹ ${fmt(results.annualSickCost)}`} negative />
              <ResultCard label="Productivity Gain Value" value={`₹ ${fmt(results.productivityValue)}`} positive />
              <ResultCard label="Total Investment" value={`₹ ${fmt(results.totalInvestment)}`} />
              <ResultCard label="Net Annual Benefit" value={`₹ ${fmt(results.netROI)}`} positive={results.netROI > 0} negative={results.netROI < 0} highlight />
              <ResultCard label="ROI" value={`${results.roiPercent.toFixed(1)}%`} positive={results.roiPercent > 0} highlight />
            </div>

            <p style={{ color: "var(--text-secondary)", fontSize: "15px", marginTop: "8px" }}>
              Estimated Payback Period:{" "}
              <strong style={{ color: "var(--text-primary)", fontWeight: 700 }}>
                {results.paybackMonths.toFixed(1)} months
              </strong>
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "40px 24px", textAlign: "center" }}>
        <p style={{ color: "var(--text-muted)", fontSize: "13px", letterSpacing: "0.05em" }}>
          © {new Date().getFullYear()} Extrive Innovations. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

function ResultCard({ label, value, positive, negative, highlight }) {
  return (
    <div
      style={{
        background: highlight ? "var(--badge-bg)" : "var(--surface)",
        border: `1px solid ${highlight ? "rgba(232,106,0,0.3)" : "var(--border)"}`,
        borderRadius: "2px",
        padding: "22px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <span style={{
        fontFamily: "var(--font-heading)",
        fontSize: "11px",
        fontWeight: 500,
        color: "var(--text-muted)",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: "var(--font-heading)",
        fontSize: highlight ? "1.4rem" : "1.25rem",
        fontWeight: 700,
        color: positive ? "#4ade80" : negative ? "#f87171" : "var(--text-primary)",
      }}>
        {value}
      </span>
    </div>
  );
}