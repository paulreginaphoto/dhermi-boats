import type { Metadata } from "next";
import { LegacyRedirectPage } from "@/components/LegacyRedirectPage";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dhermi Boat",
  alternates: { canonical: canonical("/contact/") },
  robots: { index: false, follow: true }
};

export default function CommanderRedirect() {
  return <LegacyRedirectPage destination="/contact/" />;
}
