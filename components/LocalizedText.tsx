
import type { ReactNode } from "react";

export function LocalizedText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <span data-i18n={id}>
      {children}
    </span>
  );
}
