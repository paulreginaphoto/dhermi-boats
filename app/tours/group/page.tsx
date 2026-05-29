import type { Metadata } from "next";
import { LegacyRedirectPage } from "@/components/LegacyRedirectPage";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Redirecting to Dhermi Boat Tours",
  description: "This legacy group tours URL now points to the canonical tours comparison page.",
  alternates: { canonical: canonical("/tours/") },
  robots: { index: false, follow: true }
};

export default function LegacyGroupToursPage() {
  return <LegacyRedirectPage destination="/tours/" />;
}
