import type { Metadata } from "next";
import { SEOLandingPage } from "@/components/SEOLandingPage";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { orderedTours } from "@/data/content";
import { canonical, languageAlternates } from "@/lib/site";
import { breadcrumbSchema, faqSchema, serviceLandingPageSchema, touristTripSchema } from "@/lib/seo";

const routePath = "/french-speaking-boat-tour-dhermi/";
const selectedTours = orderedTours.filter((tour) => ["gjipe", "grama", "private"].includes(tour.id));
const heroTour = selectedTours.find((tour) => tour.id === "grama") ?? selectedTours[0] ?? orderedTours[0]!;
const faqs = [
  {
    question: "Does the skipper speak French?",
    answer: "Yes. Dhermi Boat can help French-speaking guests understand the routes, prices and practical details before booking."
  },
  {
    question: "Can French families book directly?",
    answer: "Yes. Use the booking form with your preferred tour, date and group size. We can answer in French when needed."
  },
  {
    question: "Which route is easiest to understand before booking?",
    answer: "Gjipe is the simplest short route. Grama is the more complete Karaburun route. Private is best when your group wants custom timing."
  }
];

export const metadata: Metadata = {
  title: "French-Speaking Boat Tour Dhermi | Dhermi Boat",
  description:
    "Book a French-speaking Dhermi boat tour with a local skipper. Gjipe, Grama Bay, Blue Cave and private boat routes explained clearly before booking.",
  alternates: { canonical: canonical(routePath), languages: languageAlternates(routePath) }
};

export default function FrenchSpeakingBoatTourDhermiPage() {
  return (
    <>
      <SEOJsonLd
        data={[
          ...serviceLandingPageSchema({
            path: routePath,
            name: "French-speaking boat tour Dhermi",
            description: "French-speaking Dhermi boat tour booking for Gjipe, Grama Bay, Blue Cave and private routes with a local skipper.",
            serviceType: "French-speaking boat tour",
            keywords: ["French-speaking boat tour Dhermi", "tour bateau Dhermi francais", "excursion bateau Dhermi francophone"]
          }),
          ...selectedTours.map((tour) => touristTripSchema(tour)),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Dhermi boat tours", url: "/" },
            { name: "French-speaking boat tour Dhermi", url: routePath }
          ])
        ]}
      />
      <SEOLandingPage
        eyebrow="French-speaking skipper"
        title="French-speaking boat tour Dhermi"
        summary="French-speaking guests can compare the routes clearly before booking: Gjipe, Grama Bay, Blue Cave and private boat tours from Dhërmi."
        image={heroTour.image}
        imageAlt={heroTour.imageAlt ?? "French-speaking Dhermi boat tour on the Albanian Riviera"}
        primaryTourId="default"
        facts={[
          { label: "Languages", value: "French, English and Albanian" },
          { label: "Routes", value: "Gjipe, Grama Bay, Blue Cave, private tours" },
          { label: "Booking", value: "Tour, date and group sent to WhatsApp" }
        ]}
        introTitle="Clear explanations matter when you book from abroad."
        intro="The site keeps prices, duration and route choices visible. The form sends the useful booking details first, so French-speaking guests do not need to rewrite the message in WhatsApp."
        steps={[
          { title: "Compare the routes", text: "Gjipe is shorter, Grama is the complete route, and private gives your group custom timing." },
          { title: "Send the form", text: "Choose the tour, date and group size. The message is prepared automatically." },
          { title: "Receive the options", text: "We reply with available routes and practical details in French, English or Albanian." }
        ]}
        tours={selectedTours}
        faqs={faqs}
        finalTitle="Réservez sans stress depuis Dhërmi."
        finalText="Choisissez le tour, la date et le groupe. Le formulaire prépare le message proprement avant WhatsApp."
      />
    </>
  );
}
