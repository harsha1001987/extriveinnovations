"use client";

/* ══════════════════════════════════════════════════════════
   Typing.jsx — EX/O "computing" indicator.
   Telemetry read-out, not three bouncing dots: a fixed
   channel of eight cells with an orange pulse travelling
   through it. Orange here means "the unit is working".
   ══════════════════════════════════════════════════════════ */

const CELLS = 8;

export default function Typing() {
  return (
    <div className="exo-row" aria-live="polite" aria-label="EX/O is composing a reply">
      <div className="exo-meta">
        <span className="text-accent">EX/O</span>
        <span className="exo-meta-sep">/</span>
        <span>COMPUTING</span>
      </div>

      <div className="exo-msg exo-msg--exo flex items-center gap-[6px] py-[10px]">
        {Array.from({ length: CELLS }).map((_, i) => (
          <span
            key={i}
            className="exo-cell"
            style={{ animationDelay: `${i * 90}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
