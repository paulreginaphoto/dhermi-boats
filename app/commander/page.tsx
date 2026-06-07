import type { Metadata } from "next";
import { LegacyRedirectPage } from "@/components/LegacyRedirectPage";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Redirecting to Contact Dhermi Boat",
  description: "This legacy checkout URL now points to the Dhermi Boat contact page.",
  alternates: { canonical: canonical("/contact/") }
};

export default function LegacyCommanderPage() {
  return <LegacyRedirectPage destination="/contact/" />;
}
