import type { Metadata } from "next";
import { LegacyRedirectPage } from "@/components/LegacyRedirectPage";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dhermi Boat",
  alternates: { canonical: canonical("/") },
  robots: { index: false, follow: true }
};

export default function PanierRedirect() {
  return <LegacyRedirectPage />;
}
