"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import GetInTouch from "../components/Contact";
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
  {
    key: "salary",
    label: "Average Monthly Salary (₹)",
    type: "number",
    step: 1000,
  },
  {
    key: "sickDays",
    label: "Avg Sick Days / Worker / Year",
    type: "number",
    step: 1,
  },
  {
    key: "costPerSickDay",
    label: "Cost per Sick Day (₹)",
    type: "number",
    step: 100,
  },
];

const RIGHT_FIELDS = [
  {
    key: "injuryRate",
    label: "Annual Injury Rate (decimal)",
    type: "number",
    step: 0.01,
  },
  {
    key: "costPerInjury",
    label: "Cost per Injury (₹)",
    type: "number",
    step: 5000,
  },
  {
    key: "productivityGain",
    label: "Productivity Gain (% decimal)",
    type: "number",
    step: 0.01,
  },
  {
    key: "exosuitCost",
    label: "Exosuit Cost per Worker (₹)",
    type: "number",
    step: 5000,
  },
  {
    key: "maintenanceCost",
    label: "Annual Maintenance / Worker (₹)",
    type: "number",
    step: 1000,
  },
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
      workers,
      salary,
      sickDays,
      costPerSickDay,
      injuryRate,
      costPerInjury,
      productivityGain,
      exosuitCost,
      maintenanceCost,
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
    const roiPercent =
      totalInvestment > 0 ? (netROI / totalInvestment) * 100 : 0;
    const paybackMonths =
      totalBenefit > 0 ? totalInvestment / (totalBenefit / 12) : 0;

    setResults({
      injuryCostTotal,
      annualSickCost,
      productivityValue,
      totalInvestment,
      netROI,
      roiPercent,
      paybackMonths,
    });
  };

  const renderField = ({ key, label, type, step }) => (
    <div className="roi-field group" key={key}>
      <label
        className="roi-label transition-colors group-focus-within:text-orange-400"
        htmlFor={key}
      >
        {label}
      </label>
      <input
        id={key}
        className="roi-input transition-all duration-300 focus:border-orange-500 focus:shadow-[0_0_10px_rgba(249,115,22,0.2)]"
        type={type}
        step={step}
        value={values[key]}
        onChange={(e) => update(key, e.target.value)}
      />
    </div>
  );

  return (
    <>
      <div className="roi-page bg-black text-white font-sans">
        {/* ─── Navbar (consistent with main page) ─── */}
        <Navbar />

        {/* ─── Page Content ─── */}
        <div className="roi-content max-w-6xl mx-auto px-6 py-20">
          {/* Header */}
          <div className="roi-header text-center mb-16 group cursor-default">
            <h1 className="roi-title headline-glow text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Calculator
                className="w-10 h-10 text-orange-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
                strokeWidth={1.5}
              />
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent transition-all duration-300 group-hover:to-orange-200">
                Interactive ROI Calculator
              </span>
            </h1>
            <p className="roi-subtitle text-gray-400 max-w-xl mx-auto text-lg">
              Enter your workplace details to estimate potential cost savings
              and productivity gains.
            </p>
          </div>

          {/* Calculator Card */}
          <div className="roi-card bg-white/[0.02] border border-white/10 p-8 md:p-12 rounded-2xl backdrop-blur-sm shadow-2xl">
            {/* Two-column input grid */}
            <div className="roi-grid grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-10">
              <div className="roi-col space-y-6">
                {LEFT_FIELDS.map(renderField)}
              </div>
              <div className="roi-col space-y-6">
                {RIGHT_FIELDS.map(renderField)}
              </div>
            </div>

            {/* Calculate Button */}
            <div className="roi-btn-wrap text-center">
              <button
                className="cta-primary roi-btn bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-12 rounded-full text-lg transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]"
                onClick={calculate}
              >
                Calculate ROI
              </button>
            </div>
          </div>

          {/* Results */}
          {results && (
            <div className="roi-results mt-16 animate-fade-in-up">
              <h3 className="roi-results-title text-3xl font-bold text-center mb-10">
                Projected Annual Impact
              </h3>

              <div className="roi-stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ResultCard
                  label="Annual Injury Cost"
                  value={`₹ ${fmt(results.injuryCostTotal)}`}
                  negative
                  delay="0"
                />
                <ResultCard
                  label="Annual Sick Leave Cost"
                  value={`₹ ${fmt(results.annualSickCost)}`}
                  negative
                  delay="100"
                />
                <ResultCard
                  label="Productivity Gain Value"
                  value={`₹ ${fmt(results.productivityValue)}`}
                  positive
                  delay="200"
                />
                <ResultCard
                  label="Total Investment"
                  value={`₹ ${fmt(results.totalInvestment)}`}
                  delay="300"
                />
                <ResultCard
                  label="Net Annual Benefit"
                  value={`₹ ${fmt(results.netROI)}`}
                  positive={results.netROI > 0}
                  negative={results.netROI < 0}
                  highlight
                  delay="400"
                />
                <ResultCard
                  label="ROI"
                  value={`${results.roiPercent.toFixed(1)}%`}
                  positive={results.roiPercent > 0}
                  highlight
                  delay="500"
                />
              </div>

              <p className="roi-payback text-center text-gray-400 mt-10 text-lg animate-pulse">
                Estimated Payback Period:{" "}
                <strong className="text-white text-xl">
                  {results.paybackMonths.toFixed(1)} months
                </strong>
              </p>
            </div>
          )}
        </div>
      </div>

      <GetInTouch />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Result Card
   ═══════════════════════════════════════════════════════════════════ */

function ResultCard({ label, value, positive, negative, highlight, delay }) {
  let valueClass = "roi-stat-value text-2xl font-bold mt-1";
  let cardClass =
    "roi-stat-card bg-white/[0.02] border border-white/10 p-6 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.04]";

  if (highlight) {
    valueClass += " text-3xl";
    cardClass += " border-orange-500/30 bg-orange-500/[0.03]";
  }

  if (positive) valueClass += " text-emerald-400";
  else if (negative) valueClass += " text-red-400";
  else valueClass += " text-white";

  return (
    <div
      className={`${cardClass} animate-fade-in-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="roi-stat-label text-gray-400 text-sm block">
        {label}
      </span>
      <span className={valueClass}>{value}</span>
    </div>
  );
}