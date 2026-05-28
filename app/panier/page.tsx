import type { Metadata } from "next";
import { LegacyRedirectPage } from "@/components/LegacyRedirectPage";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dhermi Boat",
  description: "This legacy cart URL now points to the Dhermi Boat home page.",
  alternates: { canonical: canonical("/") },
  robots: { index: false, follow: true }
};

export default function LegacyPanierPage() {
  return <LegacyRedirectPage destination="/" />;
}

