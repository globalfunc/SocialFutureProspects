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
  // Auto-extracted from the raw `contact` text at import time, e.g. "nidhi@risingflame.org
  // (published on their org site)" -> "nidhi@risingflame.org". Null when no address-looking
  // text is present. This is the seed's own read-only finding — the live, user-editable
  // email (which can start from this value or override it) lives in ProspectState, never here.
  scrapedEmail: string | null;
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

// A non-email way to reach a prospect, for the common case (CLAUDE.md: most rows
// list a speaker bureau, contact form, or social profile rather than an actual
// email address) where no address is publicly available. Purely user-curated —
// never guessed or scraped, unlike scrapedEmail.
export type ContactSourceType =
  | "personal-website"
  | "company-website"
  | "linkedin"
  | "instagram"
  | "facebook"
  | "other";

export interface ContactSource {
  id: string;
  type: ContactSourceType;
  url: string;
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
  // User-editable, single source of truth for "the email to use" once set — starts as
  // the seed's scrapedEmail (see Prospect) but either person can correct or fill it in,
  // and re-import can never touch it. Null means "use scrapedEmail, if any".
  email: string | null;
  // User-curated list of non-email ways to reach this prospect (personal/company
  // site, LinkedIn, Instagram, Facebook, other). Empty until someone adds one.
  contact_sources: ContactSource[];
  updated_at: string; // ISO timestamp
}

export const DEFAULT_PROSPECT_STATE: Omit<ProspectStateRow, "id" | "updated_at"> = {
  verified: false,
  favourite: false,
  outreach_status: "Not sent",
  outreach_status_set_at: null,
  email: null,
  contact_sources: [],
};

// Threshold for BG-translated prospect content, per CLAUDE.md's bilingual-content
// decision. Kept as a single config constant, not scattered literals.
export const BG_TRANSLATION_MIN_MATCH_RATING = 4;
