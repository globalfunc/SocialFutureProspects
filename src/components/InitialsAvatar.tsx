import { useState } from "react";

function initials(name: string): string {
  const parts = name
    .replace(/[^\p{L}\s]/gu, "")
    .trim()
    .split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
}

// Extensions tried in order at public/prospects/<id>/photo.<ext>. No manifest,
// no build step: dropping a file in with one of these names is enough. Each
// candidate is a straight guess (no directory listing on GitHub Pages), so a
// missing file is a normal 404 the <img>'s onError silently advances past.
const PHOTO_EXTENSIONS = ["jpg", "png", "webp"];

// Photo-absent is the normal state right now (design.md §2), not an error —
// a fixed-size box with initials, decorative (aria-hidden), since the
// person's name is already given as accessible text elsewhere on the page.
export function InitialsAvatar({ id, name }: { id: string; name: string }) {
  const [extensionIndex, setExtensionIndex] = useState(0);

  if (extensionIndex < PHOTO_EXTENSIONS.length) {
    return (
      <div className="aspect-square w-full max-w-[220px] overflow-hidden border border-line bg-paper-raised">
        <img
          key={`${id}-${extensionIndex}`}
          src={`prospects/${id}/photo.${PHOTO_EXTENSIONS[extensionIndex]}`}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
          onError={() => setExtensionIndex((i) => i + 1)}
        />
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
