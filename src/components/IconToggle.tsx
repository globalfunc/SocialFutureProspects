import { useTranslation } from "react-i18next";

interface IconToggleProps {
  pressed: boolean;
  onLabel: string;
  offLabel: string;
  onToggle: () => void;
  locked: boolean;
  pending: boolean;
  variant?: "default" | "favourite";
  className?: string;
}

// Verified/Favourite toggle button — icon + text always, never colour alone
// (CLAUDE.md). Locked state keeps the control visible and reflects current
// state, but marks it aria-disabled with an explanatory title rather than
// hiding it (design.md §3: "always able to see current state; only mutation
// is gated").
export function IconToggle({
  pressed,
  onLabel,
  offLabel,
  onToggle,
  locked,
  pending,
  variant = "default",
  className = "",
}: IconToggleProps) {
  const { t } = useTranslation();
  const label = pressed ? onLabel : offLabel;

  return (
    <button
      type="button"
      aria-pressed={pressed}
      aria-disabled={locked || undefined}
      aria-busy={pending || undefined}
      title={locked ? t("table.unlockToChange") : undefined}
      onClick={() => {
        if (locked) return;
        onToggle();
      }}
      className={`w-full inline-flex items-center justify-center gap-1.5 rounded-sm border px-2 py-1.5 text-xs font-medium transition-colors
        ${locked ? "cursor-not-allowed opacity-55" : "cursor-pointer"}
        ${
          pressed
            ? variant === "favourite"
              ? "border-gold text-gold font-semibold"
              : "border-ink-soft text-ink font-semibold"
            : "border-line text-ink-soft hover:text-ink"
        }
        ${className}`}
    >
      {label}
    </button>
  );
}
