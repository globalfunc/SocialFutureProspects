// Shared config constants — kept here rather than scattered literals per CLAUDE.md.

// Passphrase write-gate (design.md §3 / CLAUDE.md Phase 1 decision). Not a
// security boundary — the anon key ships in the public bundle regardless, so
// this is friction against casual editing, not cryptography. Override via
// .env.local (see .env.example) before sharing the real link.
export const WRITE_PASSPHRASE = import.meta.env.VITE_WRITE_PASSPHRASE ?? "sofia2026";

export const UNLOCK_SESSION_KEY = "sfp-unlocked";
export const LANGUAGE_STORAGE_KEY = "sfp-language";

// Re-exported from src/lib/types.ts so app code has one place to import
// cross-cutting config from; the threshold itself is defined alongside the
// Prospect shape it governs.
export { BG_TRANSLATION_MIN_MATCH_RATING } from "./lib/types.js";
