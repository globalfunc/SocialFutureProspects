import { useMemo, useState } from "react";
import type { ProspectView } from "../../hooks/useProspects.js";

export type SortField = "name" | "matchRating" | "country" | "tzDiffHours" | "occupation";
export type SortDirection = "asc" | "desc";

export interface SortState {
  field: SortField;
  direction: SortDirection;
}

const SEARCH_FIELDS: (keyof ProspectView)[] = [
  "name",
  "roleOrganization",
  "occupation",
  "country",
  "pwdAtRelevance",
  "careerBackground",
];

function normalize(value: unknown): string {
  return String(value ?? "").toLowerCase();
}

function matchesSearch(p: ProspectView, query: string): boolean {
  if (!query) return true;
  const q = normalize(query);
  return SEARCH_FIELDS.some((field) => normalize(p[field]).includes(q));
}

function sortRows(rows: ProspectView[], sort: SortState): ProspectView[] {
  const dir = sort.direction === "asc" ? 1 : -1;
  return [...rows].sort((a, b) => {
    const av = a[sort.field];
    const bv = b[sort.field];
    let cmp = 0;
    if (typeof av === "string" && typeof bv === "string") {
      cmp = av.toLowerCase().localeCompare(bv.toLowerCase());
    } else if (typeof av === "number" && typeof bv === "number") {
      cmp = av - bv;
    }
    if (cmp !== 0) return cmp * dir;
    // Stable, predictable tie-break regardless of sort direction (design.md
    // "Default sort" note; matches the approved mockup's sortRows).
    return a.name.localeCompare(b.name);
  });
}

export interface TableGroups {
  main: ProspectView[];
  tzUnknown: ProspectView[];
  dnc: ProspectView[];
  totalShown: number;
  totalInScope: number;
}

// Distinct, non-null countryNormalized values present in the data, sorted for a
// stable dropdown order. Rows with no normalized country (unknown/ambiguous
// source text) are reachable separately via the "unknown" filter option — never
// silently dropped from the list of choices.
export function distinctCountries(prospects: ProspectView[]): string[] {
  return [...new Set(prospects.map((p) => p.countryNormalized).filter((c): c is string => c !== null))].sort(
    (a, b) => a.localeCompare(b),
  );
}

export function distinctTags(prospects: ProspectView[]): string[] {
  return [...new Set(prospects.flatMap((p) => p.tags))].sort((a, b) => a.localeCompare(b));
}

// Sentinel for "country not determined" in the country filter's <select>, kept
// out of the way of any real country name.
export const UNKNOWN_COUNTRY_VALUE = "__unknown__";

export function useTableFilters(prospects: ProspectView[]) {
  const [sort, setSort] = useState<SortState>({ field: "matchRating", direction: "desc" });
  const [search, setSearch] = useState("");
  const [tzOffset, setTzOffset] = useState<number | null>(null);
  const [showDnc, setShowDnc] = useState(true);
  const [country, setCountry] = useState<string | null>(null);
  const [tag, setTag] = useState<string | null>(null);
  const [hasEmailOnly, setHasEmailOnly] = useState(false);

  const groups: TableGroups = useMemo(() => {
    let searched = prospects.filter((p) => matchesSearch(p, search));

    if (country !== null) {
      searched =
        country === UNKNOWN_COUNTRY_VALUE
          ? searched.filter((p) => p.countryNormalized === null)
          : searched.filter((p) => p.countryNormalized === country);
    }
    if (tag !== null) {
      searched = searched.filter((p) => p.tags.includes(tag));
    }
    if (hasEmailOnly) {
      searched = searched.filter((p) => Boolean(p.email));
    }

    let dnc = searched.filter((p) => p.matchRating <= 1);
    const rest = searched.filter((p) => p.matchRating > 1);
    const tzUnknown = rest.filter((p) => p.tzDiffHours === null);
    let main = rest.filter((p) => p.tzDiffHours !== null);

    if (tzOffset !== null) {
      main = main.filter((p) => Math.abs(p.tzDiffHours as number) <= tzOffset);
    }
    if (!showDnc) dnc = [];

    const totalInScope = showDnc
      ? prospects.length
      : prospects.filter((p) => p.matchRating > 1).length;

    const sortedMain = sortRows(main, sort);
    const sortedTzUnknown = sortRows(tzUnknown, sort);
    const sortedDnc = sortRows(dnc, sort);

    return {
      main: sortedMain,
      tzUnknown: sortedTzUnknown,
      dnc: sortedDnc,
      totalShown: sortedMain.length + sortedTzUnknown.length + sortedDnc.length,
      totalInScope,
    };
  }, [prospects, search, tzOffset, showDnc, country, tag, hasEmailOnly, sort]);

  const cycleSort = (field: SortField) => {
    setSort((prev) =>
      prev.field === field
        ? { field, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { field, direction: "asc" },
    );
  };

  return {
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
  };
}
