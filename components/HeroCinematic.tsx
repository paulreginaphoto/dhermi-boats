/* eslint-disable @next/next/no-img-element */
import { ArrowRight, CalendarDays, MapPin, MessageCircle, ShieldCheck, Star, Users } from "lucide-react";
import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ButtonLink";
import { LocalizedText } from "@/components/LocalizedText";
import { IconFrame, type OutlineIconComponent } from "@/components/OutlineIcon";
import { primaryWhatsappHref } from "@/data/content";
import { assetPath } from "@/lib/site";

const heroFacts: Array<[OutlineIconComponent, string, string, string, string]> = [
  [Star, "hero.fact.reviews", "5-star guest reviews", "hero.fact.languages", "French, English and Albanian"],
  [Users, "hero.fact.groupSize", "Small groups, max 15 guests", "hero.fact.capacity", "Limited seats"],
  [MapPin, "hero.fact.departure", "Departure from Dhërmi area", "hero.fact.local", "Exact point on WhatsApp"],
  [CalendarDays, "hero.fact.departures", "Daily departures", "hero.fact.easy", "Book on WhatsApp in 1 minute"],
  [ShieldCheck, "hero.fact.weather", "Routes adapted to sea conditions", "hero.fact.reply", "Confirmed by skipper"]
];

const heroProofs = [
  "5-star guest reviews",
  "Small groups, max 15 guests",
  "Departure from Dhërmi area",
  "Book on WhatsApp in 1 minute",
  "Routes adapted to sea conditions"
];

const mobileHeroTiles = Array.from({ length: 12 }, (_, index) => index);

export function HeroCinematic() {
  return (
    <section className="relative overflow-hidden bg-limestone text-pearl">
      <div className="absolute inset-0">
        <div
          className="hero-mobile-backdrop sm:hidden"
          aria-hidden
          style={{ "--hero-mobile-image": `url("${assetPath("/images/hero-riviera-mobile-lcp.avif")}")` } as CSSProperties}
        >
          {mobileHeroTiles.map((tile) => (
            <span key={tile} className="hero-mobile-tile" />
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
            loading="eager"
          />
        </picture>
        <noscript>
          <img
            src={assetPath("/images/hero-riviera-tablet.webp")}
            alt="Dhermi Boat entering a sea cave with turquoise water"
            className="h-full w-full object-cover"
          />
        </noscript>
        <div className="absolute inset-0 photo-overlay-dark" />
        <div className="absolute inset-0 photo-overlay-dark-strong" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/14 via-navy/14 to-navy/80 md:hidden" />
      </div>

      <div className="relative mx-auto grid min-h-[calc(76svh-5rem)] max-w-site items-center gap-10 px-5 py-10 md:min-h-[calc(100svh-8rem)] md:px-8 md:py-16 lg:grid-cols-[1.08fr_0.72fr] xl:grid-cols-[1.12fr_0.72fr]">
        <div className="max-w-4xl">
          <h1 className="photo-title max-w-4xl break-words font-serif text-3xl font-medium leading-[1.04] text-pearl sm:text-5xl md:text-[3.3rem] lg:text-[3.45rem] xl:text-[3.65rem]">
            <LocalizedText id="hero.title">
              Boat tours from Dhërmi to Gjipe, Grama Bay & Blue Cave
            </LocalizedText>
          </h1>
          <p className="photo-copy mt-6 max-w-xl text-lg leading-8 text-pearl/96 md:text-xl">
            <LocalizedText id="hero.text">
              Small-group and private boat trips with a local skipper. Clear prices, daily departures, WhatsApp booking.
            </LocalizedText>
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {heroProofs.map((badge, index) => (
              <span key={badge} className="rounded-full border border-white/18 bg-white/12 px-3 py-2 text-xs font-bold text-pearl shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur">
                <LocalizedText id={`hero.trust.${index}`}>{badge}</LocalizedText>
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={primaryWhatsappHref} icon={MessageCircle} variant="dark" whatsappKey="default" analyticsEvent="hero_cta_click">
              <LocalizedText id="cta.heroWhatsapp">Check availability on WhatsApp</LocalizedText>
            </ButtonLink>
            <ButtonLink href="#compare-tours" icon={ArrowRight} variant="secondary" className="border-white/25 bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-md hover:bg-white/18" analyticsEvent="hero_cta_click">
              <LocalizedText id="cta.compareTours">Compare tours</LocalizedText>
            </ButtonLink>
          </div>
        </div>

        <aside className="hidden self-end rounded-lg border border-white/18 bg-white/12 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-xl lg:block">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-sand">
            <LocalizedText id="hero.booking.label">Reserve in one minute</LocalizedText>
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium">
            <LocalizedText id="hero.booking.title">Choose your route, send your date, confirm with the skipper.</LocalizedText>
          </h2>
          <div className="mt-6 grid gap-4">
            {heroFacts.map(([icon, labelKey, label, valueKey, value]) => (
              <div key={labelKey} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <IconFrame icon={icon} variant="glass" size="lg" />
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
            <LocalizedText id="hero.booking.cta">Use fast booking form</LocalizedText>
          </ButtonLink>
        </aside>
      </div>
    </section>
  );
}
