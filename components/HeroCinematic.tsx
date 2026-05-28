/* eslint-disable @next/next/no-img-element */
import { Anchor, ArrowRight, CalendarDays, MapPin, MessageCircle, ShieldCheck, Star, Users } from "lucide-react";
import type { CSSProperties, ComponentType } from "react";
import { ButtonLink } from "@/components/ButtonLink";
import { LocalizedText } from "@/components/LocalizedText";
import { CompareToursText } from "@/components/MicroCopy";
import { TrustBadges } from "@/components/TrustBadges";
import { primaryWhatsappHref, reviews } from "@/data/content";
import { assetPath } from "@/lib/site";
import { translations } from "@/lib/i18n";

const enText = (key: string) => translations.en[key] ?? "";

type HeroFactIcon = ComponentType<{ className?: string; strokeWidth?: number; "aria-hidden"?: boolean }>;

const heroFacts: Array<[HeroFactIcon, string, string, string, string]> = [
  [Star, "hero.fact.reviewsLabel", "Reviews", "hero.fact.reviews", "5-star guest reviews"],
  [Users, "hero.fact.groupSize", "Group size", "hero.fact.capacity", "Max 15 guests"],
  [Anchor, "hero.fact.skipperLabel", "Skipper", "hero.fact.skipper", "Local skipper"],
  [CalendarDays, "hero.fact.departuresLabel", "Departures", "hero.fact.departures", "Daily departures"],
  [ShieldCheck, "hero.fact.weatherLabel", "Sea planning", "hero.fact.weather", "Sea-condition routes"]
];

const featuredReviews = reviews.slice(0, 1);

export function HeroCinematic() {
  return (
    <section className="relative overflow-hidden bg-limestone text-pearl">
      <div className="absolute inset-0">
        <div
          className="hero-mobile-backdrop sm:hidden"
          aria-hidden
          style={{ "--hero-mobile-image": `url("${assetPath("/images/hero-riviera-mobile-lcp.avif")}")` } as CSSProperties}
        >
          {Array.from({ length: 12 }, (_, index) => (
            <span key={index} className="hero-mobile-tile" />
          ))}
        </div>
        <picture className="hidden h-full w-full sm:block">
          <source media="(max-width: 640px)" srcSet={assetPath("/images/hero-riviera-mobile-lcp.avif")} type="image/avif" />
          <source media="(max-width: 640px)" srcSet={assetPath("/images/hero-riviera-mobile.webp")} type="image/webp" />
          <source srcSet={assetPath("/images/hero-riviera-tablet-lcp.avif")} type="image/avif" />
          <img
            src={assetPath("/images/hero-riviera-tablet.webp")}
            alt="Dhermi Boat entering a sea cave with turquoise water"
            className="h-full w-full object-cover"
            decoding="sync"
            fetchPriority="high"
            height={1000}
            loading="eager"
            width={1600}
          />
        </picture>
        <noscript>
          <img
            src={assetPath("/images/hero-riviera-tablet.webp")}
            alt="Dhermi Boat entering a sea cave with turquoise water"
            className="h-full w-full object-cover"
            height={1000}
            width={1600}
          />
        </noscript>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/14 via-navy/14 to-navy/80 md:hidden" />
        <div className="absolute inset-0 photo-overlay-dark" />
        <div className="absolute inset-0 photo-overlay-dark-strong" />
      </div>

      <div className="relative mx-auto grid min-h-[calc(80svh-5rem)] max-w-site items-center gap-10 px-5 py-10 md:min-h-[calc(100svh-8rem)] md:px-8 md:py-16 lg:grid-cols-[1.05fr_0.75fr] xl:grid-cols-[1.15fr_0.72fr]">
        <div className="max-w-4xl">
          <h1 className="photo-title max-w-4xl break-words font-serif text-4xl font-medium leading-[1.02] text-pearl sm:text-6xl md:text-[4.15rem] lg:text-[4.45rem] xl:text-[4.85rem]">
            <LocalizedText id="hero.title">{enText("hero.title")}</LocalizedText>
          </h1>
          <p className="photo-copy mt-6 max-w-xl text-lg leading-8 text-pearl/96 md:text-xl">
            <LocalizedText id="hero.text">{enText("hero.text")}</LocalizedText>
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {heroFacts.map(([, , , , value], index) => (
              <span
              key={`hero-proof-${index}`}
                className="rounded-full border border-white/18 bg-white/14 px-3 py-2 text-xs font-extrabold text-pearl shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur"
              >
                <LocalizedText id={`hero.trust.${index}`}>{value}</LocalizedText>
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={primaryWhatsappHref} icon={MessageCircle} variant="dark" whatsappKey="default" analyticsPlacement="home_hero">
              <LocalizedText id="cta.heroWhatsapp">{enText("cta.heroWhatsapp")}</LocalizedText>
            </ButtonLink>
            <ButtonLink href="#compare-tours" icon={ArrowRight} variant="secondary" className="border-white/25 bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-md hover:bg-white/18" analyticsEvent="compare_tours_click">
              <CompareToursText />
            </ButtonLink>
          </div>
          <div className="mt-5 grid gap-2 text-sm font-semibold leading-6 text-pearl/92 sm:grid-cols-2 lg:max-w-2xl">
            <p className="flex items-start gap-2">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-sand" aria-hidden strokeWidth={1.75} />
              <LocalizedText id="hero.reassurance.payment">{enText("hero.reassurance.payment")}</LocalizedText>
            </p>
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sand" aria-hidden strokeWidth={1.75} />
              <LocalizedText id="hero.reassurance.meeting">{enText("hero.reassurance.meeting")}</LocalizedText>
            </p>
          </div>
          <div className="mt-6 rounded-lg border border-white/16 bg-white/10 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-md lg:hidden">
            <p className="text-sm font-bold text-pearl">
              <LocalizedText id="hero.mobileTrust.title">{enText("hero.mobileTrust.title")}</LocalizedText>
            </p>
            <p className="mt-2 text-sm leading-6 text-pearl/86">
              <LocalizedText id="hero.mobileTrust.text">{enText("hero.mobileTrust.text")}</LocalizedText>
            </p>
          </div>
        </div>

        <aside className="hidden self-center rounded-lg border border-white/18 bg-white/12 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-xl lg:block">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-sand">
            <LocalizedText id="hero.booking.label">{enText("hero.booking.label")}</LocalizedText>
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium leading-tight xl:text-4xl">
            <LocalizedText id="hero.booking.title">{enText("hero.booking.title")}</LocalizedText>
          </h2>
          <div className="mt-5 rounded-md border border-white/20 bg-white/10 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sand">
              <LocalizedText id="hero.booking.trustTitle">{enText("hero.booking.trustTitle")}</LocalizedText>
            </p>
            <p className="mt-2 text-sm leading-7 text-pearl/90">
              <LocalizedText id="hero.booking.trustText">{enText("hero.booking.trustText")}</LocalizedText>
            </p>
            <div className="mt-4">
              <TrustBadges />
            </div>
          </div>
          <div className="mt-4 grid gap-3">
            {featuredReviews.map((review) => (
              <blockquote key={review.name} className="rounded-md bg-ink/70 p-3 text-sm leading-7 text-pearl/88">
                <Star className="mb-2 h-4 w-4 fill-sand text-sand" aria-hidden strokeWidth={1.75} />
                <span aria-hidden>&quot;</span>
                <span>{review.text}</span>
                <span aria-hidden>&quot;</span>
                <p className="mt-2 text-xs font-semibold">{review.name}</p>
              </blockquote>
            ))}
          </div>
          <ButtonLink href="#book" icon={ArrowRight} variant="dark" className="mt-6 w-full" analyticsEvent="hero_cta_click">
            <LocalizedText id="hero.booking.cta">{enText("hero.booking.cta")}</LocalizedText>
          </ButtonLink>
        </aside>
      </div>
    </section>
  );
}
