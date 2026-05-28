import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { BookingCTA } from "@/components/BookingCTA";
import { ButtonLink } from "@/components/ButtonLink";
import { ConversionTrustBlock } from "@/components/ConversionTrustBlock";
import { CompareToursText } from "@/components/MicroCopy";
import { FAQAccordion } from "@/components/FAQAccordion";
import { LocalizedText } from "@/components/LocalizedText";
import { PageHero } from "@/components/PageHero";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { faqs, primaryWhatsappHref, tours } from "@/data/content";
import { canonical, languageAlternates } from "@/lib/site";
import { faqSchema } from "@/lib/seo";
import { translations } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Dhermi Boat Tour FAQ",
  description:
    "Practical answers for booking a Dhermi boat tour: departure point, weather, private tours, what to bring, children, payment and group size.",
  alternates: { canonical: canonical("/faq/"), languages: languageAlternates("/faq/") }
};

const visibleFaqIndexes = [0, 1, 4, 13, 7, 6, 17];
const visibleFaqs = visibleFaqIndexes
  .map((index) => faqs[index])
  .filter((item) => item?.question);

export default function FAQPage() {
  return (
    <>
      <SEOJsonLd data={faqSchema(visibleFaqs)} />
      <PageHero
        title={<LocalizedText id="section.faq.title">{translations.en["section.faq.title"] ?? ""}</LocalizedText>}
        image={tours[0].image}
        imageAlt={tours[0].imageAlt}
        label={<LocalizedText id="section.faq.label">{translations.en["section.faq.label"] ?? ""}</LocalizedText>}
      >
        <p>
          <LocalizedText id="section.faq.text">{translations.en["section.faq.text"] ?? ""}</LocalizedText>
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/tours/" variant="dark">
            <CompareToursText />
          </ButtonLink>
          <ButtonLink href={primaryWhatsappHref} icon={MessageCircle} variant="secondary" className="border-white/0 bg-pearl text-ink shadow-sm hover:bg-white" whatsappKey="default" analyticsPlacement="faq_hero">
            <LocalizedText id="contact.message.title">{translations.en["contact.message.title"] ?? ""}</LocalizedText>
          </ButtonLink>
        </div>
      </PageHero>
      <ConversionTrustBlock />
      <section className="bg-pearl py-16 md:py-24">
        <div className="site-band max-w-4xl">
          <FAQAccordion items={visibleFaqIndexes.map((index) => ({ ...faqs[index], translationIndex: index })).filter((item) => item.question)} />
        </div>
      </section>
      <BookingCTA />
    </>
  );
}
