/* ══════════════════════════════════════════════════════════════════
   POST /api/chat — EX/O reply endpoint (Google GenAI).

   Request : { message: string }
             { messages: [{ role: "user" | "assistant", text: string }] }
   Response: { reply: string }  |  { error: string } on failure

   The single-message shape is the contract the widget uses today. It is
   normalised into a turn array immediately, so multi-turn history can be
   switched on by sending `messages` instead — no refactor, no change to
   the response shape.
   ══════════════════════════════════════════════════════════════════ */

import { ai } from "@/lib/gemini";
import { SYSTEM_PROMPT } from "@/lib/prompts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* Override without a code change if the model id differs on your key. */
const MODEL = process.env.GEMINI_CHAT_MODEL || "gemini-3.6-flash";

const MAX_TURN_LENGTH = 2000;
const MAX_TURNS = 40;

/* ── Validation error carrying the status it should surface as ── */
class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

/**
 * Normalise any accepted body shape into an ordered turn array.
 * Today: { message }. Tomorrow: { messages }. Same downstream path.
 */
function parseTurns(body) {
  const raw = Array.isArray(body?.messages)
    ? body.messages
    : [{ role: "user", text: body?.message }];

  if (raw.length === 0) throw new BadRequest("No messages provided.");
  if (raw.length > MAX_TURNS) {
    throw new BadRequest(`Conversation exceeds ${MAX_TURNS} turns.`);
  }

  const turns = raw.map((turn) => {
    // `content` accepted as an alias so common client shapes drop straight in.
    const text = typeof turn?.text === "string" ? turn.text : turn?.content;

    if (typeof text !== "string" || !text.trim()) {
      throw new BadRequest("Every message requires non-empty text.");
    }
    if (text.length > MAX_TURN_LENGTH) {
      throw new BadRequest(`Message exceeds ${MAX_TURN_LENGTH} characters.`);
    }

    return {
      role: turn?.role === "assistant" || turn?.role === "model" ? "model" : "user",
      text: text.trim(),
    };
  });

  if (turns[turns.length - 1].role !== "user") {
    throw new BadRequest("The final message must come from the user.");
  }

  return turns;
}

/** Turn array → Gemini `contents`. */
function toContents(turns) {
  return turns.map(({ role, text }) => ({ role, parts: [{ text }] }));
}

/** Map an SDK error onto a status we're willing to return. */
function statusFor(err) {
  const status = Number(err?.status ?? err?.code);
  // Pass through the meaningful upstream codes; collapse anything else.
  return [400, 401, 403, 404, 408, 429].includes(status) ? status : 500;
}

export async function POST(req) {
  let turns;

  try {
    const body = await req.json();
    turns = parseTurns(body);
  } catch (err) {
    const message =
      err instanceof BadRequest ? err.message : "Invalid JSON body.";
    return Response.json({ error: message }, { status: 400 });
  }

  try {
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: toContents(turns),
      config: { systemInstruction: SYSTEM_PROMPT },
    });

    const reply = response.text?.trim();

    if (!reply) {
      // Empty output is usually a safety block or a truncated candidate.
      console.error(
        "[/api/chat] empty response",
        response?.candidates?.[0]?.finishReason ?? "unknown finishReason"
      );
      return Response.json(
        { error: "Unable to generate a reply." },
        { status: 502 }
      );
    }

    return Response.json({ reply });
  } catch (err) {
    // Log server-side; never leak provider details to the client.
    console.error("[/api/chat]", err);
    return Response.json(
      { error: "Unable to generate a reply." },
      { status: statusFor(err) }
    );
  }
}
