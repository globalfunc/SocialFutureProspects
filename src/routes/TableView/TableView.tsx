import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useProspects } from "../../hooks/useProspects.js";
import { useAnnounce } from "../../context/AnnounceContext.js";
import { UnlockGate } from "../../components/UnlockGate.js";
import { SortableHeader } from "./SortableHeader.js";
import { ProspectRow } from "./ProspectRow.js";
import {
  useTableFilters,
  distinctCountries,
  distinctTags,
  UNKNOWN_COUNTRY_VALUE,
  type SortField,
} from "./useTableFilters.js";

const COLUMN_LABEL_KEYS: Record<SortField, string> = {
  name: "table.thName",
  matchRating: "table.thRating",
  country: "table.thCountry",
  tzDiffHours: "table.thTz",
  occupation: "table.thOccupation",
};

export function TableView() {
  const { t } = useTranslation();
  const announce = useAnnounce();
  const { prospects, loading, setVerified, setFavourite, setOutreachStatus } = useProspects();
  const {
    sort,
    cycleSort,
    search,
    setSearch,
    tzOffset,
    setTzOffset,
    showDnc,
    setShowDnc,
    country,
    setCountry,
    tag,
    setTag,
    hasEmailOnly,
    setHasEmailOnly,
    groups,
  } = useTableFilters(prospects);

  const countryOptions = distinctCountries(prospects);
  const tagOptions = distinctTags(prospects);

  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchInput), 150);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const isFirstSort = useRef(true);
  useEffect(() => {
    if (isFirstSort.current) {
      isFirstSort.current = false;
      return;
    }
    announce(
      t("announce.sortChanged", {
        column: t(COLUMN_LABEL_KEYS[sort.field]).toLowerCase(),
        direction: t(sort.direction === "asc" ? "announce.ascending" : "announce.descending"),
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort.field, sort.direction]);

  const isFirstFilter = useRef(true);
  useEffect(() => {
    if (isFirstFilter.current) {
      isFirstFilter.current = false;
      return;
    }
    if (groups.totalShown === 0) {
      announce(t("announce.noResults"));
    } else {
      announce(t("announce.resultCount", { count: groups.totalShown, total: groups.totalInScope }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups.totalShown, groups.totalInScope]);

  const clearFilters = () => {
    setSearchInput("");
    setSearch("");
    setTzOffset(null);
    setCountry(null);
    setTag(null);
    setHasEmailOnly(false);
  };

  if (!loading && prospects.length === 0) {
    return (
      <UnlockGate>
        <div className="py-16 text-center text-ink-soft">
          <p>{t("table.emptyState")}</p>
        </div>
      </UnlockGate>
    );
  }

  return (
    <UnlockGate>
      <div>
        <div className="pt-5 pb-1.5">
          <p className="mb-1.5 text-[11px] uppercase tracking-[0.12em] text-ink-soft">
            {t("table.eyebrow")}
          </p>
          <h2 className="text-[22px]">{t("table.title")}</h2>
          <p className="mt-2 max-w-[70ch] text-[13px] text-ink-soft">{t("table.note")}</p>
        </div>

        <div className="mb-1 flex flex-wrap items-end gap-5 border-b border-line py-4">
          <div className="flex min-w-[220px] flex-1 flex-col gap-1.5">
            <label htmlFor="search-input" className="text-xs font-semibold text-ink-soft">
              {t("table.searchLabel")}
            </label>
            <input
              id="search-input"
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={t("table.searchPlaceholder")}
              className="rounded-sm border border-line bg-paper-raised px-2.5 py-2 text-sm"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="tz-offset" className="text-xs font-semibold text-ink-soft">
              {t("table.tzLabel")}
            </label>
            <div className="flex items-center gap-1.5">
              <input
                id="tz-offset"
                type="number"
                min={0}
                max={12}
                value={tzOffset ?? ""}
                onChange={(e) => setTzOffset(e.target.value === "" ? null : Number(e.target.value))}
                placeholder="off"
                className="w-16 rounded-sm border border-line bg-paper-raised px-2.5 py-2 text-sm"
              />
              <button
                type="button"
                onClick={() => setTzOffset(null)}
                className="rounded-sm border border-line bg-paper-raised px-2 py-1.5 text-xs font-medium hover:border-ink-soft"
              >
                {t("table.tzClear")}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="country-filter" className="text-xs font-semibold text-ink-soft">
              {t("table.countryFilterLabel")}
            </label>
            <select
              id="country-filter"
              value={country ?? ""}
              onChange={(e) => setCountry(e.target.value === "" ? null : e.target.value)}
              className="rounded-sm border border-line bg-paper-raised px-2.5 py-2 text-sm"
            >
              <option value="">{t("table.countryFilterAll")}</option>
              <option value={UNKNOWN_COUNTRY_VALUE}>{t("table.countryFilterUnknown")}</option>
              {countryOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          {tagOptions.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <label htmlFor="tag-filter" className="text-xs font-semibold text-ink-soft">
                {t("table.tagFilterLabel")}
              </label>
              <select
                id="tag-filter"
                value={tag ?? ""}
                onChange={(e) => setTag(e.target.value === "" ? null : e.target.value)}
                className="rounded-sm border border-line bg-paper-raised px-2.5 py-2 text-sm"
              >
                <option value="">{t("table.tagFilterAll")}</option>
                {tagOptions.map((tg) => (
                  <option key={tg} value={tg}>
                    {tg}
                  </option>
                ))}
              </select>
            </div>
          )}
          <label className="flex items-center gap-1.5 pb-2 text-[13px] text-ink-soft">
            <input
              type="checkbox"
              checked={hasEmailOnly}
              onChange={(e) => setHasEmailOnly(e.target.checked)}
              className="h-4 w-4"
            />
            {t("table.hasEmailLabel")}
          </label>
          <label className="flex items-center gap-1.5 pb-2 text-[13px] text-ink-soft">
            <input
              type="checkbox"
              checked={showDnc}
              onChange={(e) => setShowDnc(e.target.checked)}
              className="h-4 w-4"
            />
            {t("table.showDncLabel")}
          </label>
          <p className="ml-auto self-center text-[13px] text-ink-soft" aria-hidden="true">
            {t("table.resultCount", { count: groups.totalShown, total: groups.totalInScope })}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] border-collapse">
            <caption className="py-2.5 text-left text-xs text-ink-soft">
              {t("table.caption")}
            </caption>
            <thead>
              <tr>
                <th scope="col" className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
                  {t("table.thActions")}
                </th>
                <SortableHeader field="name" label={t("table.thName")} sort={sort} onSort={cycleSort} />
                <SortableHeader
                  field="matchRating"
                  label={t("table.thRating")}
                  sort={sort}
                  onSort={cycleSort}
                />
                <SortableHeader
                  field="country"
                  label={t("table.thCountry")}
                  sort={sort}
                  onSort={cycleSort}
                />
                <SortableHeader
                  field="tzDiffHours"
                  label={t("table.thTz")}
                  sort={sort}
                  onSort={cycleSort}
                />
                <SortableHeader
                  field="occupation"
                  label={t("table.thOccupation")}
                  sort={sort}
                  onSort={cycleSort}
                />
                <th scope="col" className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
                  {t("table.thOutreach")}
                </th>
                <th scope="col" className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
                  {t("table.thTags")}
                </th>
              </tr>
            </thead>

            {groups.main.length > 0 && (
              <tbody>
                <tr>
                  <th
                    colSpan={8}
                    scope="colgroup"
                    className="border-b border-t border-line bg-paper-raised px-3 py-2 text-left text-xs font-semibold"
                  >
                    {t("table.mainGroupHeading")}
                  </th>
                </tr>
              </tbody>
            )}
            <tbody>
              {groups.main.map((p) => (
                <ProspectRow
                  key={p.id}
                  prospect={p}
                  onVerifiedChange={(v) => void setVerified(p.id, v)}
                  onFavouriteChange={(v) => void setFavourite(p.id, v)}
                  onOutreachChange={(v) => void setOutreachStatus(p.id, v)}
                />
              ))}
            </tbody>

            {groups.tzUnknown.length > 0 && (
              <>
                <tbody>
                  <tr>
                    <th
                      colSpan={8}
                      scope="colgroup"
                      className="border-b border-t border-line bg-paper-raised px-3 py-2 text-left text-xs font-semibold"
                    >
                      <span aria-hidden="true" className="mr-1.5 text-warn">
                        ⚠
                      </span>
                      {t("table.tzGroupHeading")}
                    </th>
                  </tr>
                </tbody>
                <tbody>
                  {groups.tzUnknown.map((p) => (
                    <ProspectRow
                      key={p.id}
                      prospect={p}
                      onVerifiedChange={(v) => void setVerified(p.id, v)}
                      onFavouriteChange={(v) => void setFavourite(p.id, v)}
                      onOutreachChange={(v) => void setOutreachStatus(p.id, v)}
                    />
                  ))}
                </tbody>
              </>
            )}

            {groups.dnc.length > 0 && (
              <>
                <tbody>
                  <tr>
                    <th
                      colSpan={8}
                      scope="colgroup"
                      className="border-b border-t border-line bg-paper-raised px-3 py-2 text-left text-xs font-semibold"
                    >
                      <span aria-hidden="true" className="mr-1.5 text-danger">
                        ⛔
                      </span>
                      {t("table.dncGroupHeading")}
                    </th>
                  </tr>
                </tbody>
                <tbody>
                  {groups.dnc.map((p) => (
                    <ProspectRow
                      key={p.id}
                      prospect={p}
                      onVerifiedChange={(v) => void setVerified(p.id, v)}
                      onFavouriteChange={(v) => void setFavourite(p.id, v)}
                      onOutreachChange={(v) => void setOutreachStatus(p.id, v)}
                    />
                  ))}
                </tbody>
              </>
            )}
          </table>

          {groups.totalShown === 0 && (
            <div className="border-b border-line py-7 text-center text-ink-soft">
              <p>{t("table.noResults")}</p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-2.5 rounded-sm border border-line bg-paper-raised px-3.5 py-2 text-[13px] font-medium hover:border-ink-soft"
              >
                {t("table.clearFilters")}
              </button>
            </div>
          )}
        </div>

        <p className="max-w-[70ch] py-3.5 text-xs text-ink-soft">{t("table.i18nNote")}</p>
      </div>
    </UnlockGate>
  );
}
