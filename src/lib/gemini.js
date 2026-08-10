/* ══════════════════════════════════════════════════════════════════
   Google GenAI client — single shared instance.

   Server-only. GEMINI_API_KEY is read from .env.local and must never
   reach the browser (no NEXT_PUBLIC_ prefix, and this module must not
   be imported from a "use client" component).
   ══════════════════════════════════════════════════════════════════ */

import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  // Fail loudly at import time rather than silently 500-ing per request.
  throw new Error(
    "GEMINI_API_KEY is not set. Add it to .env.local before starting the server."
  );
}

export const ai = new GoogleGenAI({ apiKey });

export default ai;
