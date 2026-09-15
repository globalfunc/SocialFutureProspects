import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { InMemoryStorageClient } from "./storage/mockClient.js";
import { runSeedImport } from "./seedImport.js";
import type { RawProspectRow } from "./normalizeProspect.js";

const seedPath = fileURLToPath(new URL("../../data/blind_leads_list.json", import.meta.url));
const rawSeed = JSON.parse(readFileSync(seedPath, "utf8")) as RawProspectRow[];

function minimalRow(id: string, overrides: Partial<RawProspectRow> = {}): RawProspectRow {
  return {
    id,
    matchRating: 3,
    status: "new",
    name: "Test",
    roleOrganization: "Role",
    occupation: "Occ",
    pwdAtRelevance: "Rel",
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

describe("runSeedImport", () => {
  it("seeds all 66 real rows into prospects_seed and creates matching default prospect_state rows", async () => {
    const client = new InMemoryStorageClient();
    const result = await runSeedImport(client, rawSeed);

    expect(result.seededCount).toBe(66);
    expect(result.newStateRowCount).toBe(66);

    const seedRows = await client.prospectsSeed.getAll();
    expect(seedRows.length).toBe(66);

    const stateRows = await client.prospectState.getAll();
    expect(stateRows.length).toBe(66);
    for (const row of stateRows) {
      expect(row.verified).toBe(false);
      expect(row.favourite).toBe(false);
      expect(row.outreach_status).toBe("Not sent");
      expect(row.outreach_status_set_at).toBeNull();
    }
  });

  it("re-import upserts prospects_seed but never touches edited prospect_state rows", async () => {
    const client = new InMemoryStorageClient();
    await runSeedImport(client, [minimalRow("a"), minimalRow("b")]);

    // Simulate Christian/Stoyan having edited live state for "a".
    await client.prospectState.update("a", {
      verified: true,
      favourite: true,
      outreach_status: "Sent",
      outreach_status_set_at: "2026-09-14T00:00:00.000Z",
    });

    // Re-import with "a" changed in the seed data (e.g. a corrected roleOrganization)
    // and a brand-new row "c" added.
    const result = await runSeedImport(client, [
      minimalRow("a", { roleOrganization: "Corrected Role" }),
      minimalRow("b"),
      minimalRow("c"),
    ]);

    expect(result.seededCount).toBe(3);
    // Only "c" is new to prospect_state — "a" and "b" already existed.
    expect(result.newStateRowCount).toBe(1);

    const seedA = await client.prospectsSeed.getById("a");
    expect(seedA?.roleOrganization).toBe("Corrected Role");

    const stateA = await client.prospectState.getById("a");
    expect(stateA?.verified).toBe(true);
    expect(stateA?.favourite).toBe(true);
    expect(stateA?.outreach_status).toBe("Sent");
    expect(stateA?.outreach_status_set_at).toBe("2026-09-14T00:00:00.000Z");

    const stateC = await client.prospectState.getById("c");
    expect(stateC?.verified).toBe(false);
    expect(stateC?.outreach_status).toBe("Not sent");
  });

  it("leaves an orphaned prospect_state row untouched when its seed row disappears on re-import", async () => {
    const client = new InMemoryStorageClient();
    await runSeedImport(client, [minimalRow("a"), minimalRow("b")]);

    // "b" removed from a future re-export.
    await runSeedImport(client, [minimalRow("a")]);

    const seedRows = await client.prospectsSeed.getAll();
    expect(seedRows.map((r) => r.id).sort()).toEqual(["a"]);

    // prospect_state for "b" is orphaned but still present — decision documented
    // in seedImport.ts: no prune step, harmless dead data.
    const stateB = await client.prospectState.getById("b");
    expect(stateB).not.toBeNull();
  });
});
