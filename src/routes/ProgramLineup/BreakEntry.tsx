import type { AppLanguage } from "../../i18n/index.js";
import type { ScheduleBreak } from "./speakers.js";

export function BreakEntry({ item, lang }: { item: ScheduleBreak; lang: AppLanguage }) {
  const isBg = lang === "bg";
  const time = isBg ? item.bg.time : item.timeSofia;
  const label = isBg ? item.bg.label : item.label;

  return (
    <li className="pl-speaker pl-speaker--break">
      <div className="pl-time-col">
        <span className="pl-time-node" aria-hidden="true"></span>
        <div className="pl-time-big">{time}</div>
      </div>
      <div className="pl-break-label">{label}</div>
    </li>
  );
}
