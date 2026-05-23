import type { Metadata } from "next";
import { DestinationDetailPage } from "@/components/DestinationDetailPage";
import { destinations } from "@/data/content";
import { canonical, languageAlternates } from "@/lib/site";

const destination = destinations.find((item) => item.id === "blue-cave")!;

export const metadata: Metadata = {
  title: "Blue Cave Albania Boat Tour",
  description:
    "See Blue Cave Albania on a Dhërmi boat tour, usually as part of the Grama Bay and Karaburun route.",
  alternates: { canonical: canonical("/destinations/blue-cave/"), languages: languageAlternates("/destinations/blue-cave/") }
};

export default function BlueCaveDestinationPage() {
  return <DestinationDetailPage destination={destination} />;
}
