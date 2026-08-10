/* ══════════════════════════════════════════════════════════════════
   System prompt composition root.

   Each module answers exactly one question and owns it exclusively:

     identity            WHO the assistant is
     personality         HOW it speaks
     behavior            HOW it thinks during a conversation
     goals               WHAT it optimises for, in priority order
     leadQualification   HOW understanding is built and a handoff offered
     knowledge           WHAT it may state as fact
     restrictions        WHAT it must never do

   ── Extending ──────────────────────────────────────────────────────
   Modules are ordered by a numeric `order`, spaced in tens so new ones
   slot between existing ones without renumbering. Pass extras to
   buildSystemPrompt() — nothing here or in any module file changes:

     buildSystemPrompt([
       { id: "crm",    order: 45, content: crmContext(account) },
       { id: "memory", order: 55, content: conversationSummary(history) },
     ]);

   An extra sharing an id with a core module REPLACES it. That's the
   upgrade path for retrieval: supply { id: "knowledge", content: … }
   built from retrieved passages and the static catalogue steps aside.

   Reserved slots for the modules on the roadmap:

      45  crm             account/CRM context for a known visitor
      55  memory          rolling summary of prior conversations
      58  preferences     stated user preferences (language, depth)
      62  rag             retrieved passages for this specific turn
      65  recommendation  product recommendation engine output
      68  strategy        per-session conversation strategy

   Ordering rationale: identity and voice first, method next, priorities
   as the tie-breaker, then anything situational, then facts — and
   restrictions last, closest to the conversation they constrain.
   ══════════════════════════════════════════════════════════════════ */

import { IDENTITY } from "./identity";
import { PERSONALITY } from "./personality";
import { BEHAVIOR } from "./behavior";
import { GOALS } from "./goals";
import { LEAD_QUALIFICATION } from "./leadQualification";
import { KNOWLEDGE } from "./knowledge";
import { RESTRICTIONS } from "./restrictions";

const SEPARATOR = "\n\n---\n\n";

/** The always-present layers, in composition order. */
export const CORE_MODULES = Object.freeze([
  { id: "identity", order: 10, content: IDENTITY },
  { id: "personality", order: 20, content: PERSONALITY },
  { id: "behavior", order: 30, content: BEHAVIOR },
  { id: "goals", order: 40, content: GOALS },
  { id: "leadQualification", order: 50, content: LEAD_QUALIFICATION },
  { id: "knowledge", order: 60, content: KNOWLEDGE },
  { id: "restrictions", order: 70, content: RESTRICTIONS },
]);

/**
 * Compose the system prompt.
 *
 * @param {Array<{id: string, order?: number, content: string}>} [modules]
 *   Additional or replacement modules. A matching `id` replaces the core
 *   module of that name; `order` defaults to the replaced module's slot,
 *   or to the end for genuinely new modules.
 * @returns {string}
 */
export function buildSystemPrompt(modules = []) {
  const composed = new Map(CORE_MODULES.map((m) => [m.id, m]));

  for (const extra of modules) {
    if (!extra?.id || typeof extra.content !== "string") continue;
    if (!extra.content.trim()) continue;

    const replaced = composed.get(extra.id);
    composed.set(extra.id, {
      ...extra,
      order: extra.order ?? replaced?.order ?? Number.MAX_SAFE_INTEGER,
    });
  }

  return [...composed.values()]
    .sort((a, b) => a.order - b.order || a.id.localeCompare(b.id))
    .map((m) => m.content.trim())
    .join(SEPARATOR);
}

/** The default instruction — every module, no runtime context. */
export const SYSTEM_PROMPT = buildSystemPrompt();

export default SYSTEM_PROMPT;
