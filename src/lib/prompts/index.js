/* ══════════════════════════════════════════════════════════════════
   Public surface of the prompt layer.

   Consumers import from "@/lib/prompts" and stay decoupled from how the
   modules are split. Composition lives in systemPrompt.js.
   ══════════════════════════════════════════════════════════════════ */

export {
  SYSTEM_PROMPT,
  CORE_MODULES,
  buildSystemPrompt,
} from "./systemPrompt";

export { IDENTITY } from "./identity";
export { PERSONALITY } from "./personality";
export { BEHAVIOR } from "./behavior";
export { GOALS } from "./goals";
export { LEAD_QUALIFICATION } from "./leadQualification";
export { KNOWLEDGE } from "./knowledge";
export { RESTRICTIONS } from "./restrictions";
