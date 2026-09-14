import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ContactSource, Prospect, OutreachStatus } from "../lib/types.js";
import { useStorage } from "../context/StorageContext.js";
import { useAnnounce } from "../context/AnnounceContext.js";
import { useErrorBanner } from "../context/ErrorBannerContext.js";

export type PendingField = "verified" | "favourite" | "outreachStatus" | "email" | "contactSources" | null;

export interface ProspectView extends Prospect {
  verified: boolean;
  favourite: boolean;
  outreachStatus: OutreachStatus;
  outreachStatusSetAt: string | null;
  // The one email value the rest of the app should read (ContactPanel, EmailPanel):
  // the live, user-editable override if set, else the seed's own scrapedEmail finding.
  email: string | null;
  // User-curated non-email contact sources (personal/company site, LinkedIn, etc).
  contactSources: ContactSource[];
  pendingField: PendingField;
}

interface UseProspectsResult {
  prospects: ProspectView[];
  loading: boolean;
  getById: (id: string) => ProspectView | undefined;
  setVerified: (id: string, value: boolean) => Promise<void>;
  setFavourite: (id: string, value: boolean) => Promise<void>;
  setOutreachStatus: (id: string, value: OutreachStatus) => Promise<void>;
  setEmail: (id: string, value: string | null) => Promise<void>;
  setContactSources: (id: string, value: ContactSource[]) => Promise<void>;
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
          verified: state?.verified ?? false,
          favourite: state?.favourite ?? false,
          outreachStatus: state?.outreach_status ?? "Not sent",
          outreachStatusSetAt: state?.outreach_status_set_at ?? null,
          email: state?.email ?? seed.scrapedEmail,
          contactSources: state?.contact_sources ?? [],
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

  const setEmail = useCallback(
    async (id: string, value: string | null) => {
      const prospect = prospects.find((p) => p.id === id);
      if (!prospect) return;
      setPending(id, "email");
      try {
        await client.prospectState.update(id, { email: value, updated_at: new Date().toISOString() });
        setProspects((prev) =>
          prev.map((p) =>
            p.id === id ? { ...p, email: value ?? p.scrapedEmail, pendingField: null } : p,
          ),
        );
        announce(t("announce.emailSaved", { name: prospect.name }));
      } catch {
        setPending(id, null);
        announce(t("announce.writeFailed", { field: "Email" }));
        showError(t("announce.writeFailed", { field: "Email" }));
      }
    },
    [client, prospects, announce, showError, t],
  );

  const setContactSources = useCallback(
    async (id: string, value: ContactSource[]) => {
      const prospect = prospects.find((p) => p.id === id);
      if (!prospect) return;
      setPending(id, "contactSources");
      try {
        await client.prospectState.update(id, { contact_sources: value, updated_at: new Date().toISOString() });
        setProspects((prev) =>
          prev.map((p) => (p.id === id ? { ...p, contactSources: value, pendingField: null } : p)),
        );
        announce(t("announce.contactSourcesSaved", { name: prospect.name }));
      } catch {
        setPending(id, null);
        announce(t("announce.writeFailed", { field: "Contact sources" }));
        showError(t("announce.writeFailed", { field: "Contact sources" }));
      }
    },
    [client, prospects, announce, showError, t],
  );

  return {
    prospects,
    loading: seeding || loading,
    getById,
    setVerified,
    setFavourite,
    setOutreachStatus,
    setEmail,
    setContactSources,
  };
}
