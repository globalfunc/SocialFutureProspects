import { useTranslation } from "react-i18next";
import type { ProspectView } from "../../hooks/useProspects.js";
import { Badge } from "../../components/Badge.js";

export function OverviewPanel({ prospect: p }: { prospect: ProspectView }) {
  const { t } = useTranslation();
  const isDnc = p.matchRating <= 1;

  return (
    <div>
      <h3 className="mt-0 mb-2 font-serif text-[19px] font-medium">
        {t("detail.overview.ratingHeading")}
      </h3>
      <p className="mb-3.5 flex flex-wrap items-center gap-2">
        <span className="font-mono tabular-nums">{p.matchRating}</span>
        <span>— {t(`ratingLabel.${p.matchRating}`)}</span>
        {isDnc ? (
          <Badge variant="danger" icon="⛔">
            {t("table.dncBadge")}
          </Badge>
        ) : null}
      </p>

      <h3 className="mt-6 mb-2 font-serif text-[19px] font-medium">
        {t("detail.overview.rationaleHeading")}
      </h3>
      <p className="mb-3.5 text-sm text-ink-soft">{p.notes}</p>

      <h3 className="mt-6 mb-2 font-serif text-[19px] font-medium">
        {t("detail.overview.statusHeading")}
      </h3>
      <p className="mb-3.5">{p.verificationStatus}</p>

      <h3 className="mt-6 mb-2 font-serif text-[19px] font-medium">
        {t("detail.overview.timezoneHeading")}
      </h3>
      <p className="mb-3.5">
        {p.tzDiffHours === null ? (
          <Badge variant="warn" icon="⚠">
            {t("table.tzUnresolvedBadge")}
          </Badge>
        ) : (
          p.localTimeInSlot
        )}{" "}
        — {p.country}
      </p>
    </div>
  );
}
