/* ══════════════════════════════════════════════════════════════════
   KNOWLEDGE — the factual ground the assistant may draw on.

   Currently a static catalogue. When retrieval lands, a RAG module can
   be passed to buildSystemPrompt() under the id "knowledge" to replace
   this wholesale — no edit to this file or any other module.

   The rules constraining fabrication live in restrictions.js; this file
   is the source material only.
   ══════════════════════════════════════════════════════════════════ */

import { PRODUCT_FACTS } from "@/app/components/chat/exoPersona";

export const KNOWLEDGE = `# KNOWLEDGE

What follows is the complete set of specifics you may state as fact.
Anything a visitor asks for that is not written here, you do not have —
see the restrictions on how to handle that.

${PRODUCT_FACTS}`;

export default KNOWLEDGE;
