"use client";

import type { ReactNode } from "react";
import { translations } from "@/lib/i18n";
import { useLanguage } from "@/components/LanguageProvider";

export function LocalizedText({ id, children }: { id: string; children: ReactNode }) {
  const { locale } = useLanguage();
  return <>{translations[locale][id] ?? children}</>;
}
