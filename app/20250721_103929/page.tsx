import type { Metadata } from "next";
import { LegacyRedirectPage } from "@/components/LegacyRedirectPage";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dhermi Boat Photos",
  alternates: { canonical: canonical("/boat-photos/") },
  robots: { index: false, follow: true }
};

export default function LegacyMediaAttachmentRedirect() {
  return <LegacyRedirectPage destination="/boat-photos/" />;
}
