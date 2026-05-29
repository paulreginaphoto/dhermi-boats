import type { Metadata } from "next";
import { LegacyRedirectPage } from "@/components/LegacyRedirectPage";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Redirecting to Grama Bay Boat Tour",
  description: "This old Blue Cave landing page now points to the Grama Bay tour.",
  alternates: { canonical: canonical("/grama-bay-boat-tour/") },
  robots: { index: false, follow: true }
};

export default function BlueCaveBoatTourDhermiPage() {
  return <LegacyRedirectPage destination="/grama-bay-boat-tour/" />;
}
