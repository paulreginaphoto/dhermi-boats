
"use client";

import type { ReactNode } from "react";
import { translations } from "@/lib/i18n";
import { useLanguage } from "@/components/LanguageProvider";

export function LocalizedText({ id, children }: { id: string; children: ReactNode }) {
  const { locale } = useLanguage();
  const value = translations[locale]?.[id];

  return (
    <span data-i18n={id} suppressHydrationWarning>
      {typeof value === "string" ? value : children}
    </span>
  );
}
