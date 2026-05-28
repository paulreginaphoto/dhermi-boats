import type { Metadata } from "next";
import { ArrowRight, CalendarDays, MessageCircle, ShieldCheck, Star } from "lucide-react";
import { BookingCTA } from "@/components/BookingCTA";
import { ButtonLink } from "@/components/ButtonLink";
import { ConversionTrustBlock } from "@/components/ConversionTrustBlock";
import { HighSeasonOfferLadder } from "@/components/HighSeasonOfferLadder";
import { LocalizedText } from "@/components/LocalizedText";
import { TourDetailsText } from "@/components/MicroCopy";
import { PageHero } from "@/components/PageHero";
import { SeasonAvailabilityStrip } from "@/components/SeasonAvailabilityStrip";
import { WhyBookLocal } from "@/components/WhyBookLocal";
import { primaryWhatsappHref, tours } from "@/data/content";
import { canonical, languageAlternates } from "@/lib/site";
import { translations } from "@/lib/i18n";

type LandingPageProps = {
  slug: string;
  title: string;
  description?: string;
  heroTitle: string;
  heroText: string;
  label: string;
  image: string;
  bullets: string[];
  primaryTourId?: string;
};

const enText = (key: string) => translations.en[key] ?? "";

export function hotIntentMetadata({ slug, title, description }: Pick<LandingPageProps, "slug" | "title" | "description">): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: canonical(`/${slug}/`), languages: languageAlternates(`/${slug}/`) }
  };
}

export function HotIntentLandingPage({
  title,
  heroTitle,
  heroText,
  label,
  image,
  bullets,
  primaryTourId = "grama"
}: LandingPageProps) {
  const primaryTour = tours.find((tour) => tour.id === primaryTourId) ?? tours[1];

  return (
    <>
      <PageHero title={heroTitle} image={image} imageAlt={title} label={label}>
        <p>{heroText}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink
            href={primaryWhatsappHref}
            icon={MessageCircle}
            variant="dark"
            whatsappKey="default"
            analyticsPlacement={`landing_${primaryTour.id}`}
          >
            <LocalizedText id="cta.heroWhatsapp">{enText("cta.heroWhatsapp")}</LocalizedText>
          </ButtonLink>
          <ButtonLink href={primaryTour.href} icon={ArrowRight} variant="secondary" className="border-white/25 bg-white/10 text-white hover:bg-white/18">
            <TourDetailsText />
          </ButtonLink>
        </div>
      </PageHero>

      <SeasonAvailabilityStrip />
      <ConversionTrustBlock />

      <section className="bg-pearl py-14 md:py-24">
        <div className="site-band grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-bronze">
              <LocalizedText id="landing.guide.label">{enText("landing.guide.label")}</LocalizedText>
            </p>
            <h2 className="mt-4 font-serif text-4xl font-medium leading-[1.04] text-ink md:text-5xl">
              <LocalizedText id="landing.guide.title">{enText("landing.guide.title")}</LocalizedText>
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {bullets.map((bullet, index) => (
              <article key={bullet} className="rounded-2xl border border-ink/8 bg-limestone/70 p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink text-pearl">
                    {index === 0 ? <CalendarDays className="h-5 w-5" aria-hidden strokeWidth={1.75} /> : null}
                    {index === 1 ? <ShieldCheck className="h-5 w-5" aria-hidden strokeWidth={1.75} /> : null}
                    {index > 1 ? <Star className="h-5 w-5" aria-hidden strokeWidth={1.75} /> : null}
                  </span>
                  <p className="text-base font-semibold leading-7 text-ink">{bullet}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <HighSeasonOfferLadder />
      <WhyBookLocal />
      <BookingCTA whatsappKey={primaryTour.id as "gjipe" | "grama" | "private" | "sunset" | "fishing"} analyticsPlacement="hot_intent_final" />
    </>
  );
}
