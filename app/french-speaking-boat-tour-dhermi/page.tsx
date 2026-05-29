import type { Metadata } from "next";
import { LegacyRedirectPage } from "@/components/LegacyRedirectPage";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Redirecting to Contact Dhermi Boat",
  description: "This old language landing page now points to the contact page.",
  alternates: { canonical: canonical("/contact/") },
  robots: { index: false, follow: true }
};

export default function FrenchSpeakingBoatTourDhermiPage() {
  return <LegacyRedirectPage destination="/contact/" />;
}
