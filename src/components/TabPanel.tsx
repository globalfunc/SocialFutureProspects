import type { ReactNode } from "react";

interface TabPanelProps {
  tabKey: string;
  active: boolean;
  children: ReactNode;
}

// `hidden` removes inactive panels from the DOM flow entirely (design.md
// §2) — a screen reader in browse mode never lands on off-screen tab content.
export function TabPanel({ tabKey, active, children }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      id={`panel-${tabKey}`}
      aria-labelledby={`tab-${tabKey}`}
      tabIndex={0}
      hidden={!active}
      className="max-w-[66ch]"
    >
      {children}
    </div>
  );
}
