import type { Metadata } from "next";
import { DestinationDetailPage } from "@/components/DestinationDetailPage";
import { destinations } from "@/data/content";
import { canonical } from "@/lib/site";

const destination = destinations.find((item) => item.id === "grama")!;

export const metadata: Metadata = {
  title: "Grama Bay Boat Tour from Dhermi",
  description:
    "Explore Grama Bay by boat from Dhërmi on a Dhermi boat tour with Karaburun Natural Park, San Andrea Beach, Blue Cave and Secret Cave.",
  alternates: { canonical: canonical("/grama-bay-boat-tour/") },
  robots: { index: false, follow: true }
};

export default function GramaDestinationPage() {
  return <DestinationDetailPage destination={destination} />;
}
