import type { Metadata } from "next";
import { DestinationDetailPage } from "@/components/DestinationDetailPage";
import { destinations } from "@/data/content";
import { canonical } from "@/lib/site";

const destination = destinations.find((item) => item.id === "gjipe")!;

export const metadata: Metadata = {
  title: "Gjipe Boat Tour from Dhermi",
  description:
    "Visit Gjipe by boat from Dhërmi on a Dhermi boat tour with Pirates Cave, Pigeon Cave, nearby coves and a swim stop at Gjipe Beach.",
  alternates: { canonical: canonical("/gjipe-boat-tour/") },
  robots: { index: false, follow: true }
};

export default function GjipeDestinationPage() {
  return <DestinationDetailPage destination={destination} />;
}
