/* eslint-disable @next/next/no-img-element */
import { ArrowRight, CalendarDays, MapPin, MessageCircle, ShieldCheck, Users } from "lucide-react";
import type { CSSProperties, ComponentType } from "react";
import { ButtonLink } from "@/components/ButtonLink";
import { LocalizedText } from "@/components/LocalizedText";
import { CompareToursText, HeroWhatsappText } from "@/components/MicroCopy";
import { TrustBadges } from "@/components/TrustBadges";
import { primaryWhatsappHref, reviews } from "@/data/content";
import { assetPath } from "@/lib/site";
import { translations } from "@/lib/i18n";

const enText = (key: string) => translations.en[key] ?? "";

type HeroFactIcon = ComponentType<{ className?: string; strokeWidth?: number; "aria-hidden"?: boolean }>;

const heroFacts: Array<[HeroFactIcon, string, string, string, string]> = [
  [ShieldCheck, "hero.fact.reviews", enText("hero.fact.reviews"), "hero.fact.languages", enText("hero.fact.languages")],
  [Users, "hero.fact.groupSize", enText("hero.fact.groupSize"), "hero.fact.capacity", enText("hero.fact.capacity")],
  [MapPin, "hero.fact.departure", enText("hero.fact.departure"), "hero.fact.local", enText("hero.fact.local")],
  [CalendarDays, "hero.fact.departures", enText("hero.fact.departures"), "hero.fact.easy", enText("hero.fact.easy")],
  [MapPin, "hero.fact.weather", enText("hero.fact.weather"), "hero.fact.reply", enText("hero.fact.reply")]
];

const featuredReviews = reviews.slice(0, 2);

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

      <div className="relative mx-auto grid min-h-[calc(76svh-5rem)] max-w-site items-center gap-10 px-5 py-10 md:min-h-[calc(100svh-8rem)] md:px-8 md:py-16 lg:grid-cols-[1.08fr_0.72fr] xl:grid-cols-[1.12fr_0.72fr]">
        <div className="max-w-4xl">
          <h1 className="photo-title max-w-4xl break-words font-serif text-3xl font-medium leading-[1.04] text-pearl sm:text-5xl md:text-[3.3rem] lg:text-[3.45rem] xl:text-[3.65rem]">
            <LocalizedText id="hero.title">{enText("hero.title")}</LocalizedText>
          </h1>
          <p className="photo-copy mt-6 max-w-xl text-lg leading-8 text-pearl/96 md:text-xl">
            <LocalizedText id="hero.text">{enText("hero.text")}</LocalizedText>
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {heroFacts.map(([, , , , value], index) => (
              <span
                key={`hero-proof-${index}`}
                className="rounded-full border border-white/18 bg-white/12 px-3 py-2 text-xs font-bold text-pearl shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur"
              >
                <LocalizedText id={`hero.trust.${index}`}>{value}</LocalizedText>
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={primaryWhatsappHref} icon={MessageCircle} variant="dark" whatsappKey="default" analyticsPlacement="home_hero">
              <HeroWhatsappText />
            </ButtonLink>
            <ButtonLink href="#compare-tours" icon={ArrowRight} variant="secondary" className="border-white/25 bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-md hover:bg-white/18" analyticsEvent="hero_cta_click">
              <CompareToursText />
            </ButtonLink>
          </div>
        </div>

        <aside className="hidden self-end rounded-lg border border-white/18 bg-white/12 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-xl lg:block">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-sand">
            <LocalizedText id="hero.booking.label">{enText("hero.booking.label")}</LocalizedText>
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium">
            <LocalizedText id="hero.booking.title">{enText("hero.booking.title")}</LocalizedText>
          </h2>
          <div className="mt-5 rounded-md border border-white/20 bg-white/10 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sand">
              <LocalizedText id="section.why.title">{enText("section.why.title")}</LocalizedText>
            </p>
            <p className="mt-2 text-sm leading-7 text-pearl/90">
              <LocalizedText id="section.skipper.text">{enText("section.skipper.text")}</LocalizedText>
            </p>
            <div className="mt-4">
              <TrustBadges />
            </div>
          </div>
          <div className="mt-4 grid gap-3">
            {featuredReviews.map((review) => (
              <blockquote key={review.name} className="rounded-md bg-ink/70 p-3 text-sm leading-7 text-pearl/88">
                <span aria-hidden>★★★★★</span>
                <span aria-hidden>&quot;</span>
                <span>{review.text}</span>
                <span aria-hidden>&quot;</span>
                <p className="mt-2 text-xs font-semibold">{review.name}</p>
              </blockquote>
            ))}
          </div>
          <div className="mt-6 grid gap-4">
            {heroFacts.map(([HeroIcon, labelKey, label, valueKey, value]) => (
              <div key={labelKey} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <span className="grid place-items-center rounded-md bg-white/12 p-2">
                    <HeroIcon className="h-4 w-4 text-pearl" aria-hidden strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-sand">
                      <LocalizedText id={labelKey}>{label}</LocalizedText>
                    </p>
                    <p className="mt-1 text-sm font-semibold text-pearl/86">
                      <LocalizedText id={valueKey}>{value}</LocalizedText>
                    </p>
                  </div>
                </div>
              </div>
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
