import { HotIntentLandingPage, hotIntentMetadata } from "@/components/HotIntentLandingPage";
import { tours } from "@/data/content";

const privateTour = tours.find((tour) => tour.id === "private") ?? tours[2];

export const metadata = hotIntentMetadata({
  slug: "family-boat-tour-dhermi",
  title: "Family Boat Tour Dhërmi | Private & Small-Group Trips",
  description: "Book a family-friendly boat tour from Dhërmi to Gjipe, Grama Bay or a private custom route. WhatsApp booking with a local skipper."
});

export default function FamilyBoatTourDhermiPage() {
  return (
    <HotIntentLandingPage
      slug="family-boat-tour-dhermi"
      title="Family Boat Tour Dhërmi"
      label="Families and small groups"
      heroTitle="A family boat tour from Dhërmi without complicated planning."
      heroText="Choose a shorter Gjipe route, a complete Grama Bay route, or a private tour where your family controls timing and swim stops."
      image={privateTour.image}
      primaryTourId="private"
      bullets={[
        "Private tours are best when children need a softer pace.",
        "Gjipe is the easiest short option with caves and a swim stop.",
        "Grama Bay is the more complete route for families who want a bigger day.",
        "Meeting point and sea conditions are confirmed before departure."
      ]}
    />
  );
}
