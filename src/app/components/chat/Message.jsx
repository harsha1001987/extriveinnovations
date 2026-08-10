"use client";

/* ══════════════════════════════════════════════════════════
   Message.jsx — one logged entry in the transcript.
   Datasheet motif: every message carries a mono meta line
   (source / timestamp) above a hard-edged body block. EX/O
   speaks from the left rail; the visitor's input is boxed on
   the right like a filled-in field. No bubbles anywhere.
   ══════════════════════════════════════════════════════════ */

export default function Message({ role, text, time, showCaret = false }) {
  const isExo = role === "exo";

  return (
    <div className={`exo-row ${isExo ? "" : "exo-row--user"}`}>
      {/* ── meta line: SOURCE / TIMESTAMP ── */}
      <div className="exo-meta">
        {isExo ? (
          <>
            <span className="text-accent">EX/O</span>
            <span className="exo-meta-sep">/</span>
            <span>{time}</span>
          </>
        ) : (
          <>
            <span>{time}</span>
            <span className="exo-meta-sep">/</span>
            <span>YOU</span>
          </>
        )}
      </div>

      {/* ── body block ── */}
      <div className={`exo-msg ${isExo ? "exo-msg--exo" : "exo-msg--user"}`}>
        {text.split("\n\n").map((para, i) => (
          <p key={i} className={i > 0 ? "mt-3" : undefined}>
            {para}
            {showCaret && i === text.split("\n\n").length - 1 ? (
              <span className="exo-caret" aria-hidden="true" />
            ) : null}
          </p>
        ))}
      </div>
    </div>
  );
}
