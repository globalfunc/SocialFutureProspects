function initials(name: string): string {
  const parts = name
    .replace(/[^\p{L}\s]/gu, "")
    .trim()
    .split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
}

// Photo-absent is the normal state right now (design.md §2), not an error —
// a fixed-size box with initials, decorative (aria-hidden), since the
// person's name is already given as accessible text elsewhere on the page.
export function InitialsAvatar({ name, photoPath }: { name: string; photoPath: string | null }) {
  if (photoPath) {
    return (
      <div className="aspect-square w-full max-w-[220px] overflow-hidden border border-line bg-paper-raised">
        <img src={photoPath} alt="" aria-hidden="true" className="h-full w-full object-cover" />
      </div>
    );
  }
  return (
    <div
      className="flex aspect-square w-full max-w-[220px] items-center justify-center border border-line bg-paper-raised"
      aria-hidden="true"
    >
      <span className="font-serif text-5xl font-medium text-ink-soft">{initials(name)}</span>
    </div>
  );
}
