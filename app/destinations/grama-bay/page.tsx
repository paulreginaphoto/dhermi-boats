import type { Metadata } from "next";
import { LegacyRedirectPage } from "@/components/LegacyRedirectPage";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Redirecting to Grama Bay Boat Tour",
  description: "This old destination URL now points to the Grama Bay boat tour.",
  alternates: { canonical: canonical("/grama-bay-boat-tour/") },
  robots: { index: false, follow: true }
};

export default function GramaDestinationPage() {
  return <LegacyRedirectPage destination="/grama-bay-boat-tour/" />;
}
