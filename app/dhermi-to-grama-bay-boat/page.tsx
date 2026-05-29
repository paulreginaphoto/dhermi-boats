import type { Metadata } from "next";
import { LegacyRedirectPage } from "@/components/LegacyRedirectPage";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Redirecting to Grama Bay Boat Tour",
  description: "This old Grama Bay landing page now points to the canonical Grama tour.",
  alternates: { canonical: canonical("/grama-bay-boat-tour/") },
  robots: { index: false, follow: true }
};

export default function DhermiToGramaBayBoatPage() {
  return <LegacyRedirectPage destination="/grama-bay-boat-tour/" />;
}
