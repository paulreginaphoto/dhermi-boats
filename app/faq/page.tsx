import type { Metadata } from "next";
import { BookingCTA } from "@/components/BookingCTA";
import { FAQAccordion } from "@/components/FAQAccordion";
import { LocalizedText } from "@/components/LocalizedText";
import { PageHero } from "@/components/PageHero";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { faqs, tours } from "@/data/content";
import { canonical, languageAlternates } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dhermi Boat Tour FAQ",
  description:
    "Practical answers for booking a Dhermi boat tour: departure point, weather, private tours, what to bring, children, payment and group size.",
  alternates: { canonical: canonical("/faq/"), languages: languageAlternates("/faq/") }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer
    }
  }))
};

export default function FAQPage() {
  return (
    <>
      <SEOJsonLd data={faqSchema} />
      <PageHero
        title={<LocalizedText id="section.faq.title">Frequently asked questions</LocalizedText>}
        image={tours[0].image}
        imageAlt={tours[0].imageAlt}
        label={<LocalizedText id="section.faq.label">Before booking</LocalizedText>}
      >
        <p>
          <LocalizedText id="section.faq.text">
            Quick answers to prepare your boat tour in Dhërmi without making the booking complicated.
          </LocalizedText>
        </p>
      </PageHero>
      <section className="bg-pearl py-16 md:py-24">
        <div className="site-band max-w-4xl">
          <FAQAccordion items={faqs} />
        </div>
      </section>
      <BookingCTA />
    </>
  );
}
