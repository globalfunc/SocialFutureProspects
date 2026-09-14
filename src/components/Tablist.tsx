import { useRef } from "react";

export interface TabDef {
  key: string;
  label: string;
  disabled?: boolean;
}

interface TablistProps {
  tabs: TabDef[];
  activeKey: string;
  onChange: (key: string) => void;
  ariaLabel: string;
}

// Full W3C APG tabs pattern (design.md §2): roving tabindex, automatic
// activation on arrow-key move (appropriate since panel content is cheap and
// static, not a paginated fetch), Home/End, and disabled tabs skipped by the
// keyboard cycle entirely.
export function Tablist({ tabs, activeKey, onChange, ariaLabel }: TablistProps) {
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const enabledIndexes = tabs.reduce<number[]>((acc, tab, i) => {
    if (!tab.disabled) acc.push(i);
    return acc;
  }, []);

  const activate = (key: string) => {
    onChange(key);
    buttonRefs.current[key]?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const dir = e.key === "ArrowRight" ? 1 : -1;
      let next = index;
      for (let step = 0; step < tabs.length; step++) {
        next = (next + dir + tabs.length) % tabs.length;
        if (!tabs[next]?.disabled) break;
      }
      const nextTab = tabs[next];
      if (nextTab) activate(nextTab.key);
    } else if (e.key === "Home") {
      e.preventDefault();
      const first = enabledIndexes[0];
      const tab = first !== undefined ? tabs[first] : undefined;
      if (tab) activate(tab.key);
    } else if (e.key === "End") {
      e.preventDefault();
      const last = enabledIndexes[enabledIndexes.length - 1];
      const tab = last !== undefined ? tabs[last] : undefined;
      if (tab) activate(tab.key);
    }
  };

  return (
    <div role="tablist" aria-label={ariaLabel} className="mb-6 flex flex-wrap gap-0 border-b border-line">
      {tabs.map((tab, index) => {
        const selected = tab.key === activeKey;
        return (
          <button
            key={tab.key}
            ref={(el) => {
              buttonRefs.current[tab.key] = el;
            }}
            role="tab"
            id={`tab-${tab.key}`}
            aria-selected={selected}
            aria-controls={`panel-${tab.key}`}
            aria-disabled={tab.disabled || undefined}
            tabIndex={selected ? 0 : -1}
            onClick={() => {
              if (tab.disabled) return;
              activate(tab.key);
            }}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`mr-5 -mb-px border-b-2 px-1 py-2.5 text-[13px] font-semibold tracking-wide ${
              tab.disabled
                ? "cursor-not-allowed border-transparent text-ink-soft/55 line-through"
                : selected
                  ? "border-accent text-ink"
                  : "border-transparent text-ink-soft hover:text-ink"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
