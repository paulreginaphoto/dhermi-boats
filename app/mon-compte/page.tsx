import type { Metadata } from "next";
import { LegacyRedirectPage } from "@/components/LegacyRedirectPage";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Redirecting to Dhermi Boat Home",
  description: "This legacy account URL now points to the Dhermi Boat home page.",
  alternates: { canonical: canonical("/") },
  robots: { index: false, follow: true }
};

export default function LegacyMonComptePage() {
  return <LegacyRedirectPage destination="/" />;
}
