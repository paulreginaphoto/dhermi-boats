import type { Metadata } from "next";
import { TourDetailPage } from "@/components/TourDetailPage";
import { tours } from "@/data/content";
import { canonical } from "@/lib/site";

const tour = tours.find((item) => item.id === "private")!;

export const metadata: Metadata = {
  title: "Private Boat Tour Albania",
  description:
    "Private boat tour from Dhërmi, Albania. Choose your duration, route, swimming stops and destinations.",
  alternates: { canonical: canonical("/tours/private/") }
};

export default function PrivateLegacyPage() {
  return <TourDetailPage tour={tour} />;
}
