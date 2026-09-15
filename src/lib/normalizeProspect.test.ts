import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  InvalidSeedRowError,
  normalizeAllProspects,
  normalizeProspect,
  type RawProspectRow,
} from "./normalizeProspect.js";

const seedPath = fileURLToPath(new URL("../../data/blind_leads_list.json", import.meta.url));
const rawSeed = JSON.parse(readFileSync(seedPath, "utf8")) as RawProspectRow[];

function makeRow(overrides: Partial<RawProspectRow>): RawProspectRow {
  return {
    id: "test-id",
    matchRating: 3,
    status: "new",
    name: "Test Person",
    roleOrganization: "Role",
    occupation: "Occupation",
    pwdAtRelevance: "Relevance",
    country: "UK",
    tzDiffHours: 0,
    localTimeInSlot: "14:00",
    verificationStatus: "Verified",
    contact: "contact",
    profileUrl: "url",
    priorPublicSpeaking: "Y",
    outreachStatus: "Not sent",
    careerBackground: "Background",
    reputationActivity: "Activity",
    notes: "Notes",
    ...overrides,
  };
}

describe("normalizeProspect: countryNormalized", () => {
  it("passes a plain country name through unchanged", () => {
    expect(normalizeProspect(makeRow({ country: "Germany" })).countryNormalized).toBe("Germany");
  });

  it("strips a trailing city/detail qualifier", () => {
    expect(normalizeProspect(makeRow({ country: "USA (Cupertino, CA)" })).countryNormalized).toBe("USA");
    expect(normalizeProspect(makeRow({ country: "UK (London)" })).countryNormalized).toBe("UK");
  });

  it("normalizes N/A and Unclear to null", () => {
    expect(normalizeProspect(makeRow({ country: "N/A" })).countryNormalized).toBeNull();
    expect(normalizeProspect(makeRow({ country: "Unclear" })).countryNormalized).toBeNull();
  });

  it("normalizes a genuinely ambiguous compound country to null rather than guessing one", () => {
    expect(
      normalizeProspect(makeRow({ country: "Ireland/UK (org HQ London)" })).countryNormalized,
    ).toBeNull();
  });
});

describe("normalizeProspect: tags", () => {
  it("defaults to an empty array when the raw row has no tags", () => {
    expect(normalizeProspect(makeRow({}))).toHaveProperty("tags", []);
  });

  it("passes given tags through unchanged", () => {
    expect(normalizeProspect(makeRow({ tags: ["blind-influencers-2026"] })).tags).toEqual([
      "blind-influencers-2026",
    ]);
  });
});

describe("normalizeProspect: tzDiffHours", () => {
  it("passes numbers through unchanged, including fractional values", () => {
    expect(normalizeProspect(makeRow({ tzDiffHours: -2 })).tzDiffHours).toBe(-2);
    expect(normalizeProspect(makeRow({ tzDiffHours: 2.5 })).tzDiffHours).toBe(2.5);
  });

  it("normalizes JSON null to null", () => {
    expect(normalizeProspect(makeRow({ tzDiffHours: null })).tzDiffHours).toBeNull();
  });

  it('normalizes the literal string "None" to null', () => {
    expect(normalizeProspect(makeRow({ tzDiffHours: "None" })).tzDiffHours).toBeNull();
  });

  it("rejects any other string value", () => {
    expect(() => normalizeProspect(makeRow({ tzDiffHours: "unknown" }))).toThrow(
      InvalidSeedRowError,
    );
  });
});

describe("normalizeProspect: other fields", () => {
  it("renames outreachStatus to outreachStatusSourceNote", () => {
    const result = normalizeProspect(makeRow({ outreachStatus: "Not sent" }));
    expect(result.outreachStatusSourceNote).toBe("Not sent");
    expect(result).not.toHaveProperty("outreachStatus");
  });

  it("always sets photoPath to null explicitly", () => {
    expect(normalizeProspect(makeRow({}))).toHaveProperty("photoPath", null);
  });

  it("extracts an email address embedded in the contact field", () => {
    const result = normalizeProspect(
      makeRow({ contact: "srikanth@bollant.com (published by him on Instagram)" }),
    );
    expect(result.scrapedEmail).toBe("srikanth@bollant.com");
  });

  it("sets scrapedEmail to null when no address is present", () => {
    expect(normalizeProspect(makeRow({ contact: "Speaker bureau contact form" })).scrapedEmail).toBeNull();
  });

  it("always sets bgTranslation to null at import time regardless of matchRating", () => {
    expect(normalizeProspect(makeRow({ matchRating: 5 })).bgTranslation).toBeNull();
    expect(normalizeProspect(makeRow({ matchRating: 1 })).bgTranslation).toBeNull();
  });

  it("rejects an out-of-range matchRating", () => {
    expect(() => normalizeProspect(makeRow({ matchRating: 6 }))).toThrow(InvalidSeedRowError);
  });

  it('rejects a status other than "existing"/"new"', () => {
    expect(() => normalizeProspect(makeRow({ status: "bogus" }))).toThrow(InvalidSeedRowError);
  });
});

describe("normalizeAllProspects", () => {
  it("rejects duplicate ids", () => {
    const rows = [makeRow({ id: "dup" }), makeRow({ id: "dup" })];
    expect(() => normalizeAllProspects(rows)).toThrow(InvalidSeedRowError);
  });
});

describe("against the real seed file", () => {
  it("has 66 rows, all unique ids", () => {
    expect(rawSeed.length).toBe(66);
    expect(new Set(rawSeed.map((r) => r.id)).size).toBe(66);
  });

  it("normalizes every row without throwing", () => {
    const prospects = normalizeAllProspects(rawSeed);
    expect(prospects.length).toBe(66);
  });

  it("matches the current seed's matchRating distribution (original 50 plus the blind-influencers-2026 batch)", () => {
    const prospects = normalizeAllProspects(rawSeed);
    const dist: Record<number, number> = {};
    for (const p of prospects) dist[p.matchRating] = (dist[p.matchRating] ?? 0) + 1;
    expect(dist).toEqual({ 0: 3, 1: 7, 2: 3, 3: 10, 4: 17, 5: 26 });
  });

  it("matches the current seed's unresolved-timezone count (11)", () => {
    const prospects = normalizeAllProspects(rawSeed);
    const unresolved = prospects.filter((p) => p.tzDiffHours === null);
    expect(unresolved.length).toBe(11);
  });

  it("keeps the one fractional tzDiffHours value (2.5) as-is", () => {
    const prospects = normalizeAllProspects(rawSeed);
    expect(prospects.some((p) => p.tzDiffHours === 2.5)).toBe(true);
  });

  it("finds exactly 18 rows with a scrapable email address in the current seed", () => {
    const prospects = normalizeAllProspects(rawSeed);
    expect(prospects.filter((p) => p.scrapedEmail !== null).length).toBe(18);
  });

  it("tags every row from the blind-influencers-2026 batch, and no pre-existing row", () => {
    const prospects = normalizeAllProspects(rawSeed);
    const tagged = prospects.filter((p) => p.tags.includes("blind-influencers-2026"));
    expect(tagged.length).toBe(16);
  });

  it("includes both split rows for the former joint Masselin/Simon entry", () => {
    const prospects = normalizeAllProspects(rawSeed);
    const ids = new Set(prospects.map((p) => p.id));
    expect(ids.has("matthieu-masselin")).toBe(true);
    expect(ids.has("nicolas-simon")).toBe(true);
  });
});
