import type { Metadata } from "next";
import { LegacyRedirectPage } from "@/components/LegacyRedirectPage";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Redirecting to Private Boat Tour",
  description: "This legacy private tour URL now points to the canonical private boat tour page.",
  alternates: { canonical: canonical("/private-boat-tour-albania/") },
  robots: { index: false, follow: true }
};

export default function LegacyPrivateTourPage() {
  return <LegacyRedirectPage destination="/private-boat-tour-albania/" />;
}
