// Shapes per design.md §4. Prospect is the immutable, re-importable record derived
// from the seed JSON. Live/mutable review state (verified, favourite, outreach status)
// deliberately lives only in ProspectState so re-import can never touch it.

export type MatchRating = 0 | 1 | 2 | 3 | 4 | 5;

export interface BgTranslation {
  pwdAtRelevance: string;
  careerBackground: string;
  reputationActivity: string;
  notes: string;
}

export interface Prospect {
  id: string;
  matchRating: MatchRating;
  status: "existing" | "new";
  name: string;
  roleOrganization: string;
  occupation: string;
  pwdAtRelevance: string;
  country: string;
  tzDiffHours: number | null;
  localTimeInSlot: string;
  verificationStatus: string;
  contact: string;
  profileUrl: string;
  priorPublicSpeaking: string;
  // Renamed from the source JSON's `outreachStatus` field. This is the seed's own
  // recorded value only (always "Not sent" in the current export) — the live,
  // user-editable outreach status lives in ProspectState, never here.
  outreachStatusSourceNote: string;
  careerBackground: string;
  reputationActivity: string;
  notes: string;
  // Phase 3 (folded into Phase 4): null until someone manually drops a photo file
  // into public/prospects/<id>/ and hand-updates this field. Never set by the importer.
  photoPath: string | null;
  // Phase 5 content work. Populated only for matchRating >= 4 rows; null otherwise
  // (including at Phase 4 seed-import time, since no translations exist yet).
  bgTranslation: BgTranslation | null;
}

// --- Supabase table row shapes (design.md §4) ---

export interface ProspectSeedRow extends Prospect {
  imported_at: string; // ISO timestamp
}

export type OutreachStatus =
  | "Not sent"
  | "Sent"
  | "Reminder sent"
  | "Replied"
  | "Accepted"
  | "Declined"
  | "No response";

export interface ProspectStateRow {
  id: string;
  verified: boolean;
  favourite: boolean;
  outreach_status: OutreachStatus;
  outreach_status_set_at: string | null; // ISO timestamp
  updated_at: string; // ISO timestamp
}

export const DEFAULT_PROSPECT_STATE: Omit<ProspectStateRow, "id" | "updated_at"> = {
  verified: false,
  favourite: false,
  outreach_status: "Not sent",
  outreach_status_set_at: null,
};

// Threshold for BG-translated prospect content, per CLAUDE.md's bilingual-content
// decision. Kept as a single config constant, not scattered literals.
export const BG_TRANSLATION_MIN_MATCH_RATING = 4;
