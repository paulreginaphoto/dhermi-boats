import type { Metadata } from "next";
import { LegacyRedirectPage } from "@/components/LegacyRedirectPage";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Redirecting to Dhermi Boat Tours",
  description: "This old availability page now points to the tours comparison page.",
  alternates: { canonical: canonical("/tours/") },
  robots: { index: false, follow: true }
};

export default function BoatTourDhermiTodayPage() {
  return <LegacyRedirectPage destination="/tours/" />;
}
