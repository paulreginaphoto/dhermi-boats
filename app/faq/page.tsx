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

const faqGroups = [
  { titleKey: "faq.group.booking", title: "Booking", indexes: [0, 1, 9] },
  { titleKey: "faq.group.tours", title: "Tours and routes", indexes: [3, 5, 7] },
  { titleKey: "faq.group.weather", title: "Weather and safety", indexes: [2] },
  { titleKey: "faq.group.families", title: "Families and groups", indexes: [6] },
  { titleKey: "faq.group.payment", title: "Payment", indexes: [8] },
  { titleKey: "faq.group.bring", title: "What to bring", indexes: [4] }
];

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
        <div className="site-band grid gap-8">
          {faqGroups.map((group) => (
            <section key={group.titleKey} className="grid gap-5 lg:grid-cols-[0.32fr_0.68fr]">
              <h2 className="font-serif text-3xl font-medium text-ink">
                <LocalizedText id={group.titleKey}>{group.title}</LocalizedText>
              </h2>
              <FAQAccordion items={group.indexes.map((index) => ({ ...faqs[index], translationIndex: index })).filter((item) => item.question)} />
            </section>
          ))}
        </div>
      </section>
      <BookingCTA />
    </>
  );
}
