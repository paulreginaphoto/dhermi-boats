import type { Metadata } from "next";
import { TourDetailPage } from "@/components/TourDetailPage";
import { tours } from "@/data/content";
import { canonical } from "@/lib/site";

const tour = tours.find((item) => item.id === "sunset")!;

export const metadata: Metadata = {
  title: "Sunset Private Tour",
  description: "Private sunset boat tour around Dhërmi from 120 € for two people.",
  alternates: { canonical: canonical("/tours/private/#sunset") }
};

export default function SunsetLegacyPage() {
  return <TourDetailPage tour={tour} />;
}

