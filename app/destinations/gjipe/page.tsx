import type { Metadata } from "next";
import { LegacyRedirectPage } from "@/components/LegacyRedirectPage";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Redirecting to Gjipe Boat Tour",
  description: "This old destination URL now points to the Gjipe boat tour.",
  alternates: { canonical: canonical("/gjipe-boat-tour/") }
};

export default function GjipeDestinationPage() {
  return <LegacyRedirectPage destination="/gjipe-boat-tour/" />;
}
