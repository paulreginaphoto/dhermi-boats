import type { Metadata } from "next";
import { SEOLandingPage } from "@/components/SEOLandingPage";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { orderedTours } from "@/data/content";
import { canonical, languageAlternates } from "@/lib/site";
import { breadcrumbSchema, faqSchema, serviceLandingPageSchema, touristTripSchema } from "@/lib/seo";

const routePath = "/family-boat-tour-dhermi/";
const selectedTours = orderedTours.filter((tour) => ["private", "gjipe", "grama"].includes(tour.id));
const heroTour = selectedTours.find((tour) => tour.id === "private") ?? selectedTours[0] ?? orderedTours[0]!;
const faqs = [
  {
    question: "Which Dhermi boat tour fits a family with children?",
    answer: "Private is the most comfortable for families because you control the timing and stops. Gjipe is the lighter shared option when you want a shorter trip."
  },
  {
    question: "Can children join the shared tours?",
    answer: "Yes. Children aged 5-10 have child prices on Gjipe and Grama. Send the number of adults and children in the form."
  },
  {
    question: "Can we choose calmer swimming stops?",
    answer: "Yes on private tours. Tell us your group size, ages and preferred rhythm so we can suggest a comfortable route."
  }
];

export const metadata: Metadata = {
  title: "Family Boat Tour Dhermi | Private & Small-Group Options",
  description:
    "Family boat tours from Dhërmi with private routes, Gjipe, Grama Bay, child prices and a local skipper. Choose the comfortable route before booking.",
  alternates: { canonical: canonical(routePath), languages: languageAlternates(routePath) }
};

export default function FamilyBoatTourDhermiPage() {
  return (
    <>
      <SEOJsonLd
        data={[
          ...serviceLandingPageSchema({
            path: routePath,
            name: "Family boat tour Dhermi",
            description: "Family-friendly Dhermi boat tours with private routes, shared Gjipe and Grama options, child prices and a local skipper.",
            serviceType: "Family boat tour",
            keywords: ["family boat tour Dhermi", "Dhermi boat tour with children", "private family boat Albania"]
          }),
          ...selectedTours.map((tour) => touristTripSchema(tour)),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Dhermi boat tours", url: "/" },
            { name: "Family boat tour Dhermi", url: routePath }
          ])
        ]}
      />
      <SEOLandingPage
        eyebrow="Family boat tours"
        title="Family boat tour Dhermi"
        summary="Choose a boat route that fits your family: short shared trip, longer Karaburun route, or a private boat with your own timing."
        image={heroTour.image}
        imageAlt={heroTour.imageAlt ?? "Private Dhermi boat tour for families"}
        primaryTourId="private"
        facts={[
          { label: "Most comfortable", value: "Private boat from 200 € / hour" },
          { label: "Short shared option", value: "Gjipe: 1h30 with swim stop" },
          { label: "Children", value: "Child prices on Gjipe and Grama, ages 5-10" }
        ]}
        introTitle="The right family tour depends on rhythm, not hype."
        intro="Families usually need clear timing, easy stops and enough space for bags, towels and children. The booking form sends those details first, so the answer you get is useful."
        steps={[
          { title: "Tell us the group", text: "Adults, children and preferred date are the details that change the recommendation." },
          { title: "Choose shared or private", text: "Shared tours are clear and affordable. Private tours are better when you want calmer timing and custom stops." },
          { title: "Confirm before paying", text: "Availability and practical details come before any commitment." }
        ]}
        tours={selectedTours}
        faqs={faqs}
        finalTitle="Make the boat day easy for everyone."
        finalText="Send one complete request and we will guide you toward the route that fits your family rhythm."
      />
    </>
  );
}
