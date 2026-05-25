import type { Metadata } from "next";
import { LegacyRedirectPage } from "@/components/LegacyRedirectPage";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Private Boat Tour from Dhërmi Albania",
  alternates: { canonical: canonical("/private-boat-tour-albania/") },
  robots: { index: false, follow: true }
};

export default function PrivateTourLegacyRedirect() {
  return <LegacyRedirectPage destination="/private-boat-tour-albania/" />;
}
