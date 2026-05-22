import type { Metadata } from "next";
import { TourDetailPage } from "@/components/TourDetailPage";
import { tours } from "@/data/content";
import { canonical } from "@/lib/site";

const tour = tours.find((item) => item.id === "gjipe")!;

export const metadata: Metadata = {
  title: "Gjipe Boat Tour",
  description:
    "Gjipe boat tour from Dhërmi with Pirates Cave, Pigeon Cave, hidden coves and a 30-minute swim stop.",
  alternates: { canonical: canonical("/destinations/gjipe/") }
};

export default function GjipeLegacyPage() {
  return <TourDetailPage tour={tour} />;
}

