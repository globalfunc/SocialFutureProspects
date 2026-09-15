import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { ProspectView } from "../../hooks/useProspects.js";
import { IconToggle } from "../../components/IconToggle.js";
import { Badge } from "../../components/Badge.js";
import { OutreachSelect } from "../../components/OutreachSelect.js";
import { useUnlock } from "../../context/UnlockContext.js";

interface ProspectRowProps {
  prospect: ProspectView;
  onVerifiedChange: (value: boolean) => void;
  onFavouriteChange: (value: boolean) => void;
  onOutreachChange: (value: ProspectView["outreachStatus"]) => void;
}

function formatTz(tzDiffHours: number): string {
  const sign = tzDiffHours > 0 ? "+" : tzDiffHours < 0 ? "−" : "";
  return `${sign}${Math.abs(tzDiffHours)}h Sofia`;
}

export function ProspectRow({
  prospect: p,
  onVerifiedChange,
  onFavouriteChange,
  onOutreachChange,
}: ProspectRowProps) {
  const { t } = useTranslation();
  const { unlocked } = useUnlock();
  const isDnc = p.matchRating <= 1;

  return (
    <tr className={isDnc ? "bg-danger/5" : "hover:bg-paper-raised/60"}>
      <td className="min-w-37.5 border-b border-line px-3 py-2.5 align-top">
        <IconToggle
          pressed={p.verified}
          onLabel={t("table.verified")}
          offLabel={t("table.markVerified")}
          onToggle={() => onVerifiedChange(!p.verified)}
          locked={!unlocked}
          pending={p.pendingField === "verified"}
          className="mb-1"
        />
        <IconToggle
          pressed={p.favourite}
          onLabel={t("table.favourited")}
          offLabel={t("table.addFavourite")}
          onToggle={() => onFavouriteChange(!p.favourite)}
          locked={!unlocked}
          pending={p.pendingField === "favourite"}
          variant="favourite"
        />
      </td>
      <td className="border-b border-line px-3 py-2.5 align-top text-[13.5px]">
        <Link to={`/prospect/${p.id}`} className="font-semibold text-accent hover:underline">
          {p.name}
        </Link>
        <span className="mt-0.5 block text-xs text-ink-soft">{p.roleOrganization}</span>
      </td>
      <td className="border-b border-line px-3 py-2.5 align-top text-[13.5px]">
        <span className="inline-flex flex-wrap items-center gap-1.5 font-semibold">
          <span className="font-mono tabular-nums">{p.matchRating}</span>
          <span>— {t(`ratingLabel.${p.matchRating}`)}</span>
        </span>
        {isDnc ? (
          <div className="mt-1">
            <Badge variant="danger" icon="⛔">
              {t("table.dncBadge")}
            </Badge>
          </div>
        ) : null}
      </td>
      <td className="border-b border-line px-3 py-2.5 align-top text-[13.5px]">{p.country}</td>
      <td className="border-b border-line px-3 py-2.5 align-top text-[13.5px]">
        {p.tzDiffHours === null ? (
          <Badge variant="warn" icon="⚠">
            {t("table.tzUnresolvedBadge")}
          </Badge>
        ) : (
          <span className="font-mono tabular-nums">{formatTz(p.tzDiffHours)}</span>
        )}
      </td>
      <td className="border-b border-line px-3 py-2.5 align-top text-[13.5px]">{p.occupation}</td>
      <td className="min-w-37.5 border-b border-line px-3 py-2.5 align-top">
        {isDnc ? (
          <span className="text-[11.5px] font-bold text-danger">
            ⛔ {t("table.dncEmailDisabled")}
          </span>
        ) : (
          <OutreachSelect
            id={p.id}
            value={p.outreachStatus}
            setAt={p.outreachStatusSetAt}
            locked={!unlocked}
            pending={p.pendingField === "outreachStatus"}
            onChange={onOutreachChange}
            ariaLabel={`${t("detail.contact.outreachStatusLabel")} — ${p.name}`}
          />
        )}
      </td>
      <td className="border-b border-line px-3 py-2.5 align-top text-[13.5px]">
        {p.tags.length === 0 ? (
          <span className="text-ink-soft">{t("table.noTags")}</span>
        ) : (
          <span className="flex flex-wrap gap-1">
            {p.tags.map((tg) => (
              <span
                key={tg}
                className="whitespace-nowrap rounded-sm border border-line bg-paper-raised px-1.5 py-0.5 text-[11.5px] font-medium text-ink-soft"
              >
                {tg}
              </span>
            ))}
          </span>
        )}
      </td>
    </tr>
  );
}
