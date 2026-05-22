import type { Metadata } from "next";
import { BookingCTA } from "@/components/BookingCTA";
import { FAQAccordion } from "@/components/FAQAccordion";
import { LocalizedText } from "@/components/LocalizedText";
import { PageHero } from "@/components/PageHero";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { faqs, tours } from "@/data/content";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Practical answers for Dhermi Boat tours: booking, departure point, weather, private tours, what to bring and group size.",
  alternates: { canonical: canonical("/faq/") }
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
      <PageHero title={<LocalizedText id="section.faq.label">Before booking</LocalizedText>} image={tours[0].image} label="FAQ">
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
