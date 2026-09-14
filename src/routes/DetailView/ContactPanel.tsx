import { useTranslation } from "react-i18next";
import type { ProspectView } from "../../hooks/useProspects.js";
import { OutreachSelect } from "../../components/OutreachSelect.js";
import { useUnlock } from "../../context/UnlockContext.js";
import type { OutreachStatus } from "../../lib/types.js";

interface ContactPanelProps {
  prospect: ProspectView;
  onOutreachChange: (value: OutreachStatus) => void;
}

const UNVERIFIED_MARKERS = ["(verify URL)", "(unverified)"];

export function ContactPanel({ prospect: p, onOutreachChange }: ContactPanelProps) {
  const { t } = useTranslation();
  const { unlocked } = useUnlock();
  const isDnc = p.matchRating <= 1;
  const needsVerification = UNVERIFIED_MARKERS.some((marker) => p.profileUrl.includes(marker));

  return (
    <div>
      <dl className="flex flex-col">
        <Row label={t("detail.contact.contactLabel")}>{p.contact}</Row>
        <Row label={t("detail.contact.profileUrlLabel")}>
          {p.profileUrl}
          {needsVerification ? (
            <span className="mt-1 block text-xs font-semibold text-warn">
              {t("detail.contact.verifyNote")}
            </span>
          ) : null}
        </Row>
        <Row label={t("detail.contact.sourceLabel")}>
          {p.status === "existing" ? t("detail.statusExisting") : t("detail.statusNew")}
        </Row>
        <Row label={t("detail.contact.outreachSourceLabel")}>
          {t("detail.contact.outreachSourceValue")}
        </Row>
        <Row label={t("detail.contact.notesLabel")}>{p.notes}</Row>
      </dl>

      {!isDnc && (
        <div className="mt-4">
          <OutreachSelect
            id={`${p.id}-detail`}
            value={p.outreachStatus}
            setAt={p.outreachStatusSetAt}
            locked={!unlocked}
            pending={p.pendingField === "outreachStatus"}
            onChange={onOutreachChange}
            label={t("detail.contact.outreachStatusLabel")}
            className="max-w-[260px]"
          />
        </div>
      )}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-2.5 border-t border-line py-2.5 text-[13.5px] last-of-type:border-b">
      <dt className="w-[150px] shrink-0 text-xs font-semibold text-ink-soft">{label}</dt>
      <dd className="m-0 flex-1">{children}</dd>
    </div>
  );
}
