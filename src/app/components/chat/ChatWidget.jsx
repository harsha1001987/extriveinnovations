"use client";

import { useEffect, useRef, useState } from "react";
import ChatWindow from "./ChatWindow";

/* ══════════════════════════════════════════════════════════
   ChatWidget.jsx — mount point + closed state.

   The closed trigger is a stamped identification plate, not a
   circular bubble: hard rectangle, hairline border, mono type,
   one live orange dot. It reads as a unit label on a machine.
   ══════════════════════════════════════════════════════════ */

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const wasOpen = useRef(false);

  // Return focus to the plate when the window closes.
  useEffect(() => {
    if (wasOpen.current && !open) triggerRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  // Lock the page behind the full-screen mobile panel.
  useEffect(() => {
    if (!open) return;
    const mobile = window.matchMedia("(max-width: 640px)").matches;
    if (!mobile) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // data-cursor="native" — tells CustomCursor to stand down here so the real
  // pointer/text cursor is the one you see inside the widget.
  return (
    <div className="exo-mount" data-cursor="native">
      {open && <ChatWindow onClose={() => setOpen(false)} />}

      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`exo-trigger ${open ? "is-open" : ""}`}
        aria-expanded={open}
        aria-label={open ? "Close EX/O" : "Open EX/O — Extrive assistant"}
      >
        <span className="exo-dot" aria-hidden="true" />
        <span className="exo-trigger-mark">EX/O</span>
        <span className="exo-trigger-sub" aria-hidden="true">
          {open ? "CLOSE" : "ASK"}
        </span>
      </button>
    </div>
  );
}
