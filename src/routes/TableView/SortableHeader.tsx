import type { SortField, SortState } from "./useTableFilters.js";

interface SortableHeaderProps {
  field: SortField;
  label: string;
  sort: SortState;
  onSort: (field: SortField) => void;
}

// aria-sort reflects current state, and a visible ▲/▼ glyph carries the same
// information for anyone whose AT doesn't surface aria-sort (design.md §1).
export function SortableHeader({ field, label, sort, onSort }: SortableHeaderProps) {
  const active = sort.field === field;
  const ariaSort = active ? (sort.direction === "asc" ? "ascending" : "descending") : "none";
  const arrow = active ? (sort.direction === "asc" ? "▲" : "▼") : "";

  return (
    <th
      scope="col"
      aria-sort={ariaSort}
      className="whitespace-nowrap px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-ink-soft"
    >
      <button
        type="button"
        onClick={() => onSort(field)}
        className={`inline-flex items-center gap-1.5 ${active ? "text-ink" : "hover:text-ink"}`}
      >
        <span>{label}</span>
        <span aria-hidden="true" className="text-[10px] text-ink-soft">
          {arrow}
        </span>
      </button>
    </th>
  );
}
