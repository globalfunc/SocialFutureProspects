import type { ReactNode } from "react";

type BadgeVariant = "good" | "warn" | "danger";

// Solid fills, not tinted-background-plus-coloured-text: a 15%-opacity tint
// behind text that small (11.5px) fails WCAG AA contrast (verified via
// axe-core — 3.8:1 against the 4.5:1 minimum for non-large text). Solid fill
// + paper-raised text clears 4.5:1 for all three variants (plain `--paper`
// against `--warn` measured 4.28:1 — just short — `--paper-raised` is
// lighter and clears it with margin).
const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  good: "bg-good text-paper-raised",
  warn: "bg-warn text-paper-raised",
  danger: "bg-danger text-paper-raised",
};

// Status is always carried by the icon+text pair below, never colour alone
// (CLAUDE.md) — the colour is a reinforcing cue, not the signal itself.
export function Badge({
  variant,
  icon,
  children,
}: {
  variant: BadgeVariant;
  icon?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-sm px-1.5 py-0.5 text-[11.5px] font-bold ${VARIANT_CLASSES[variant]}`}
    >
      {icon ? <span aria-hidden="true">{icon}</span> : null}
      {children}
    </span>
  );
}
