import type { Metadata } from "next";
import { LegacyRedirectPage } from "@/components/LegacyRedirectPage";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Redirecting to Dhermi Boat Photos",
  description: "This legacy media attachment URL now points to the boat photos page.",
  alternates: { canonical: canonical("/boat-photos/") },
  robots: { index: false, follow: true }
};

export default function LegacyMediaAttachmentPage() {
  return <LegacyRedirectPage destination="/boat-photos/" />;
}
