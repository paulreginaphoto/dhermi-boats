import type { Metadata } from "next";
import { LegacyRedirectPage } from "@/components/LegacyRedirectPage";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Redirecting to Private Boat Tour",
  description: "This old family landing page now points to the private boat tour.",
  alternates: { canonical: canonical("/private-boat-tour-albania/") }
};

export default function FamilyBoatTourDhermiPage() {
  return <LegacyRedirectPage destination="/private-boat-tour-albania/" />;
}
