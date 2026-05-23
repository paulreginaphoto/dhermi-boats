/* eslint-disable @next/next/no-img-element */
import { ArrowRight, CalendarDays, Euro, Languages, MessageCircle, ShieldCheck, Users } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { LocalizedText } from "@/components/LocalizedText";
import { IconFrame, type OutlineIconComponent } from "@/components/OutlineIcon";
import { primaryWhatsappHref, trustBadges } from "@/data/content";
import { assetPath } from "@/lib/site";

const heroFacts: Array<[OutlineIconComponent, string, string, string, string]> = [
  [Euro, "hero.fact.gjipePrice", "From €35", "hero.fact.gjipeShared", "Gjipe Tour"],
  [CalendarDays, "hero.fact.departures", "Daily departures", "hero.fact.reply", "Fast WhatsApp reply"],
  [Users, "hero.fact.groupSize", "Max 15 guests", "hero.fact.capacity", "Small groups"],
  [ShieldCheck, "hero.fact.skipper", "Local skipper", "hero.fact.local", "Dhërmi area"],
  [Languages, "hero.fact.languages", "English • French • Albanian", "hero.fact.easy", "Easy booking"]
];

export function HeroCinematic() {
  return (
    <section className="relative overflow-hidden bg-limestone text-pearl">
      <div className="absolute inset-0">
        <picture className="block h-full w-full">
          <source media="(max-width: 640px)" srcSet={assetPath("/images/hero-riviera-mobile.avif")} type="image/avif" />
          <source media="(max-width: 640px)" srcSet={assetPath("/images/hero-riviera-mobile.webp")} type="image/webp" />
          <source srcSet={assetPath("/images/hero-riviera-tablet.avif")} type="image/avif" />
          <img
            src={assetPath("/images/hero-riviera-tablet.webp")}
            alt="Dhermi Boat heading along the Albanian Riviera coast"
            className="h-full w-full object-cover"
            decoding="sync"
            fetchPriority="high"
            loading="eager"
          />
        </picture>
        <noscript>
          <img
            src={assetPath("/images/hero-riviera-tablet.webp")}
            alt="Dhermi Boat heading along the Albanian Riviera coast"
            className="h-full w-full object-cover"
          />
        </noscript>
        <div className="absolute inset-0 photo-overlay-dark" />
        <div className="absolute inset-0 photo-overlay-dark-strong" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/14 via-navy/14 to-navy/80 md:hidden" />
      </div>

      <div className="relative mx-auto grid min-h-[calc(76svh-5rem)] max-w-site items-center gap-10 px-5 py-10 md:min-h-[calc(100svh-8rem)] md:px-8 md:py-16 lg:grid-cols-[0.95fr_0.75fr]">
        <div className="max-w-3xl">
          <h1 className="photo-title max-w-3xl break-words font-serif text-3xl font-medium leading-[1.06] text-pearl sm:text-5xl md:text-6xl lg:text-6xl">
            <LocalizedText id="hero.title">
              Dhërmi boat tours to Gjipe, Grama Bay & hidden caves
            </LocalizedText>
          </h1>
          <p className="photo-copy mt-6 max-w-xl text-lg leading-8 text-pearl/96 md:text-xl">
            <LocalizedText id="hero.text">
              Small-group and private boat trips from Dhërmi. Swim in turquoise coves, visit Pirate’s Cave and Grama Bay, and book by WhatsApp in one minute.
            </LocalizedText>
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {trustBadges.map((badge, index) => (
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
            <LocalizedText id="hero.booking.title">Pick a tour, send WhatsApp, confirm your sea day.</LocalizedText>
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
