import { HotIntentLandingPage, hotIntentMetadata } from "@/components/HotIntentLandingPage";
import { heroImage } from "@/data/content";

export const metadata = hotIntentMetadata({
  slug: "french-speaking-boat-tour-dhermi",
  title: "French-Speaking Boat Tour Dhërmi | Local Skipper in Albania",
  description: "Book a French-friendly boat tour from Dhërmi with local skipper Isuf. Gjipe, Grama Bay, Blue Cave and private trips by WhatsApp."
});

export default function FrenchSpeakingBoatTourDhermiPage() {
  return (
    <HotIntentLandingPage
      slug="french-speaking-boat-tour-dhermi"
      title="French-Speaking Boat Tour Dhërmi"
      label="French-friendly skipper"
      heroTitle="A Dhërmi boat tour that feels easy for French-speaking guests."
      heroText="Isuf speaks Albanian and French, with good English for international guests. Ask questions, confirm the meeting point and book by WhatsApp."
      image={heroImage}
      primaryTourId="private"
      bullets={[
        "Choose this for French families, couples and groups who want clear communication.",
        "The skipper confirms route, timing and sea conditions directly.",
        "Private tours are ideal if your group wants a calmer rhythm.",
        "WhatsApp makes the booking simple before you arrive at the beach."
      ]}
    />
  );
}
