import type { Metadata } from "next";
import { LegacyRedirectPage } from "@/components/LegacyRedirectPage";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Redirecting to Dhermi Boat Home",
  description: "This legacy sample page now points to the Dhermi Boat home page.",
  alternates: { canonical: canonical("/") }
};

export default function LegacySamplePage() {
  return <LegacyRedirectPage destination="/" />;
}
