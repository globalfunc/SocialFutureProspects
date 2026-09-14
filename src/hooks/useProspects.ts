import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { Prospect, OutreachStatus } from "../lib/types.js";
import { useStorage } from "../context/StorageContext.js";
import { useAnnounce } from "../context/AnnounceContext.js";
import { useErrorBanner } from "../context/ErrorBannerContext.js";
import { PHOTO_MANIFEST } from "../data/photoManifest.js";

// prospects_seed's own photoPath is always null (Phase 4 contract, tested —
// the importer never guesses a photo). Resolving PHOTO_MANIFEST into an
// actual path is an app-layer overlay, applied here rather than touching the
// seed rows, so seed re-import can never clobber it and normalizeProspect's
// "always null" invariant stays true to what's actually in storage.
function resolvePhotoPath(id: string, seedPhotoPath: string | null): string | null {
  const filename = PHOTO_MANIFEST[id];
  return filename ? `prospects/${id}/${filename}` : seedPhotoPath;
}

export type PendingField = "verified" | "favourite" | "outreachStatus" | null;

export interface ProspectView extends Prospect {
  verified: boolean;
  favourite: boolean;
  outreachStatus: OutreachStatus;
  outreachStatusSetAt: string | null;
  pendingField: PendingField;
}

interface UseProspectsResult {
  prospects: ProspectView[];
  loading: boolean;
  getById: (id: string) => ProspectView | undefined;
  setVerified: (id: string, value: boolean) => Promise<void>;
  setFavourite: (id: string, value: boolean) => Promise<void>;
  setOutreachStatus: (id: string, value: OutreachStatus) => Promise<void>;
}

// Loads prospects_seed + prospect_state and merges them into one UI-facing
// shape. Mutations follow design.md §3's failed-write model: the control
// shows a pending state immediately (pendingField, surfaced as aria-busy),
// then either commits (with a success announcement) or reverts (with a
// failure announcement + banner) — never a silent optimistic update that
// could later snap back unnoticed by a screen-reader user.
export function useProspects(): UseProspectsResult {
  const { client, seeding } = useStorage();
  const [prospects, setProspects] = useState<ProspectView[]>([]);
  const [loading, setLoading] = useState(true);
  const announce = useAnnounce();
  const { showError } = useErrorBanner();
  const { t } = useTranslation();

  useEffect(() => {
    if (seeding) return;
    let cancelled = false;
    async function load() {
      const [seedRows, stateRows] = await Promise.all([
        client.prospectsSeed.getAll(),
        client.prospectState.getAll(),
      ]);
      const stateById = new Map(stateRows.map((r) => [r.id, r]));
      const merged: ProspectView[] = seedRows.map((seed) => {
        const state = stateById.get(seed.id);
        return {
          ...seed,
          photoPath: resolvePhotoPath(seed.id, seed.photoPath),
          verified: state?.verified ?? false,
          favourite: state?.favourite ?? false,
          outreachStatus: state?.outreach_status ?? "Not sent",
          outreachStatusSetAt: state?.outreach_status_set_at ?? null,
          pendingField: null,
        };
      });
      if (!cancelled) {
        setProspects(merged);
        setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [client, seeding]);

  const getById = useCallback((id: string) => prospects.find((p) => p.id === id), [prospects]);

  const setPending = (id: string, field: PendingField) => {
    setProspects((prev) => prev.map((p) => (p.id === id ? { ...p, pendingField: field } : p)));
  };

  const setVerified = useCallback(
    async (id: string, value: boolean) => {
      const prospect = prospects.find((p) => p.id === id);
      if (!prospect) return;
      setPending(id, "verified");
      try {
        await client.prospectState.update(id, { verified: value, updated_at: new Date().toISOString() });
        setProspects((prev) =>
          prev.map((p) => (p.id === id ? { ...p, verified: value, pendingField: null } : p)),
        );
        announce(t(value ? "announce.verifiedOn" : "announce.verifiedOff", { name: prospect.name }));
      } catch {
        setPending(id, null);
        announce(t("announce.writeFailed", { field: "Verified" }));
        showError(t("announce.writeFailed", { field: "Verified" }));
      }
    },
    [client, prospects, announce, showError, t],
  );

  const setFavourite = useCallback(
    async (id: string, value: boolean) => {
      const prospect = prospects.find((p) => p.id === id);
      if (!prospect) return;
      setPending(id, "favourite");
      try {
        await client.prospectState.update(id, { favourite: value, updated_at: new Date().toISOString() });
        setProspects((prev) =>
          prev.map((p) => (p.id === id ? { ...p, favourite: value, pendingField: null } : p)),
        );
        announce(t(value ? "announce.favouriteOn" : "announce.favouriteOff", { name: prospect.name }));
      } catch {
        setPending(id, null);
        announce(t("announce.writeFailed", { field: "Favourite" }));
        showError(t("announce.writeFailed", { field: "Favourite" }));
      }
    },
    [client, prospects, announce, showError, t],
  );

  const setOutreachStatus = useCallback(
    async (id: string, value: OutreachStatus) => {
      const prospect = prospects.find((p) => p.id === id);
      if (!prospect) return;
      setPending(id, "outreachStatus");
      const setAt = new Date().toISOString();
      try {
        await client.prospectState.update(id, { outreach_status: value, outreach_status_set_at: setAt, updated_at: setAt });
        setProspects((prev) =>
          prev.map((p) =>
            p.id === id
              ? { ...p, outreachStatus: value, outreachStatusSetAt: setAt, pendingField: null }
              : p,
          ),
        );
        announce(
          t("announce.outreachChanged", {
            name: prospect.name,
            status: t(`outreachStatus.${value}`),
            date: setAt.slice(0, 10),
          }),
        );
      } catch {
        setPending(id, null);
        announce(t("announce.writeFailed", { field: "Outreach status" }));
        showError(t("announce.writeFailed", { field: "Outreach status" }));
      }
    },
    [client, prospects, announce, showError, t],
  );

  return { prospects, loading: seeding || loading, getById, setVerified, setFavourite, setOutreachStatus };
}
