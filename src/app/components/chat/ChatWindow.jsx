"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Message from "./Message";
import Typing from "./Typing";
import { OPENING_MESSAGES, SUGGESTIONS, UNIT_SPEC } from "./exoPersona";

/* ══════════════════════════════════════════════════════════
   ChatWindow.jsx — expanded state.

   MOTIF: product datasheet. The window is a spec sheet that
   happens to talk — stamped header, ruled spec strip, hairline
   seams between every zone, mono field labels. Orange appears
   in exactly five places and each one means something:
   the live status dot, the typing pulse, the focus rule under
   the input, the armed send key, and the transmit caret.

   Replies come from POST /api/chat.
   ══════════════════════════════════════════════════════════ */

const FAILURE_TEXT = "Sorry, something went wrong. Please try again.";

function stamp() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(
    d.getMinutes()
  ).padStart(2, "0")}`;
}

export default function ChatWindow({ onClose }) {
  /* Client-only mount (the window renders after a click, never on the
     server), so the opening lines can be stamped up front. */
  const [messages, setMessages] = useState(() =>
    OPENING_MESSAGES.map((m) => ({ ...m, time: stamp() }))
  );
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [throwing, setThrowing] = useState(false); // send-key travel

  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const timers = useRef([]);
  const busy = useRef(false); // hard lock — state alone can't dedupe fast clicks
  const abort = useRef(null);

  /* Boot: take focus, and tear down anything in flight on close. */
  useEffect(() => {
    inputRef.current?.focus();

    const pending = timers.current;
    return () => {
      pending.forEach(clearTimeout);
      abort.current?.abort();
    };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const send = useCallback(async (raw) => {
    const text = raw.trim();
    if (!text || busy.current) return;
    busy.current = true;

    // Mechanical send-key throw.
    setThrowing(true);
    timers.current.push(setTimeout(() => setThrowing(false), 160));

    setMessages((m) => [
      ...m,
      { id: `u-${Date.now()}`, role: "user", text, time: stamp() },
    ]);
    setDraft("");
    if (inputRef.current) inputRef.current.style.height = "auto";
    setTyping(true);

    const controller = new AbortController();
    abort.current = controller;

    let reply = FAILURE_TEXT;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
        signal: controller.signal,
      });

      if (res.ok) {
        const data = await res.json();
        if (typeof data?.reply === "string" && data.reply.trim()) {
          reply = data.reply.trim();
        }
      }
    } catch (err) {
      if (err.name === "AbortError") return; // unmounted — drop it
    } finally {
      abort.current = null;
    }

    setMessages((m) => [
      ...m,
      { id: `e-${Date.now()}`, role: "exo", text: reply, time: stamp() },
    ]);
    setTyping(false);
    busy.current = false;
  }, []);

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(draft);
    }
  };

  const onInput = (e) => {
    setDraft(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 104)}px`;
  };

  const armed = draft.trim().length > 0 && !typing;
  const fresh = messages.every((m) => m.role === "exo");

  return (
    <section
      className="exo-window"
      role="dialog"
      aria-modal="false"
      aria-label="EX/O — Extrive assistant"
    >
      {/* ═══ DATASHEET HEADER ═══ */}
      <header className="exo-head">
        <div className="flex items-start justify-between gap-3 px-4 pt-3.5 pb-3">
          <div className="min-w-0">
            <h2 className="font-display text-[1.35rem] leading-none tracking-[-0.02em] uppercase">
              EX/O
            </h2>
            <p className="exo-status">
              UNIT STATUS:
              <span className="exo-dot" aria-hidden="true" />
              <span className="text-accent">ONLINE</span>
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="exo-close"
            aria-label="Close EX/O"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
              <path
                d="M1 1 L11 11 M11 1 L1 11"
                stroke="currentColor"
                strokeWidth="1.6"
              />
            </svg>
          </button>
        </div>

        {/* ruled spec line — the datasheet tell, one field only */}
        <dl className="exo-spec">
          <dt>{UNIT_SPEC.label}</dt>
          <dd>{UNIT_SPEC.value}</dd>
        </dl>
      </header>

      {/* ═══ TRANSCRIPT ═══ */}
      <div className="exo-scroll" ref={scrollRef}>
        {messages.map((m, i) => (
          <Message
            key={m.id}
            role={m.role}
            text={m.text}
            time={m.time}
            showCaret={m.role === "exo" && i === messages.length - 1 && !typing}
          />
        ))}

        {typing && <Typing />}

        {/* Entry points, not a self-select menu — they disappear the
            moment the visitor says anything of their own. */}
        {fresh && !typing && (
          <div className="exo-chips">
            <span className="exo-chips-label">TRY</span>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="exo-chip"
                  onClick={() => send(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ═══ INPUT ROW ═══ */}
      <div className="exo-input-row">
        <span className="exo-prompt" aria-hidden="true">
          &gt;
        </span>

        <label htmlFor="exo-input" className="bx-sr-only">
          Message EX/O
        </label>
        <textarea
          id="exo-input"
          ref={inputRef}
          rows={1}
          value={draft}
          onChange={onInput}
          onKeyDown={onKeyDown}
          placeholder="Describe the load, the task, or the limitation…"
          className="exo-input"
        />

        <button
          type="button"
          onClick={() => send(draft)}
          disabled={!armed}
          className={`exo-send ${throwing ? "is-thrown" : ""}`}
          aria-label="Transmit message"
        >
          <svg width="15" height="15" viewBox="0 0 15 15" aria-hidden="true">
            <path
              d="M1.5 7.5 H12 M7.5 3 L12 7.5 L7.5 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            />
          </svg>
        </button>
      </div>

      <p className="exo-foot">
        EX/O DOES NOT ISSUE SPECS OR MEDICAL ADVICE — ANYTHING BINDING GOES TO
        OUR TEAM.
      </p>
    </section>
  );
}
