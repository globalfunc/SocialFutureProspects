import { describe, expect, it } from "vitest";
import { generateEmail } from "./generateEmail.js";
import type { Prospect } from "../lib/types.js";

function makeProspect(overrides: Partial<Prospect> = {}): Prospect {
  return {
    id: "test-person",
    matchRating: 5,
    status: "new",
    name: "Amar Latif OBE",
    roleOrganization: "Founder & Director, Traveleyes",
    occupation: "Entrepreneur",
    pwdAtRelevance: "Built and runs a travel company employing blind guides",
    country: "UK",
    tzDiffHours: -2,
    localTimeInSlot: "12:00-15:00 BST",
    verificationStatus: "Verified",
    contact: "contact",
    scrapedEmail: null,
    profileUrl: "url",
    priorPublicSpeaking: "Y",
    outreachStatusSourceNote: "Not sent",
    careerBackground: "Background",
    reputationActivity: "Activity",
    notes: "Notes",
    photoPath: null,
    bgTranslation: null,
    ...overrides,
  };
}

describe("generateEmail", () => {
  it("uses only the prospect's first name in the EN greeting", () => {
    const { body } = generateEmail(makeProspect(), "en");
    expect(body.startsWith("Dear Amar,")).toBe(true);
  });

  it("includes the prospect's pwdAtRelevance text in the EN opening, verbatim", () => {
    const { body } = generateEmail(makeProspect(), "en");
    expect(body).toContain("Built and runs a travel company employing blind guides");
  });

  it("never mentions a fact absent from the row (no invented specifics)", () => {
    const { body } = generateEmail(makeProspect({ pwdAtRelevance: "Runs an accessible bakery" }), "en");
    expect(body).not.toContain("Traveleyes");
    expect(body).toContain("Runs an accessible bakery");
  });

  it("BG output falls back to the English source with an explicit not-translated label when bgTranslation is null", () => {
    const { body, subject } = generateEmail(makeProspect(), "bg");
    expect(subject).toContain("Покана");
    expect(body).toContain("все още не е преведено на български");
    expect(body).toContain("Built and runs a travel company employing blind guides");
  });

  it("BG output uses the translated field once bgTranslation is populated, with no untranslated-label", () => {
    const { body } = generateEmail(
      makeProspect({
        bgTranslation: {
          pwdAtRelevance: "Изгражда и управлява туристическа компания",
          careerBackground: "",
          reputationActivity: "",
          notes: "",
        },
      }),
      "bg",
    );
    expect(body).toContain("Изгражда и управлява туристическа компания");
    expect(body).not.toContain("все още не е преведено");
  });

  it("keeps the fixed event logistics (date, time, platform) unchanged across prospects", () => {
    const a = generateEmail(makeProspect({ id: "a" }), "en");
    const b = generateEmail(makeProspect({ id: "b", name: "Someone Else", pwdAtRelevance: "X" }), "en");
    expect(a.body).toContain("29 September 2026");
    expect(b.body).toContain("29 September 2026");
    expect(a.body).toContain("Zoom");
    expect(b.body).toContain("Zoom");
  });
});
