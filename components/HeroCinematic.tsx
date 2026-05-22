import Image from "next/image";
import { ArrowRight, Euro, MessageCircle, Ship, Users } from "lucide-react";
import { heroImage, primaryWhatsappHref } from "@/data/content";
import { ButtonLink } from "@/components/ButtonLink";
import { LocalizedText } from "@/components/LocalizedText";
import { IconFrame, type OutlineIconComponent } from "@/components/OutlineIcon";

const heroFacts: Array<[OutlineIconComponent, string, string, string, string, string]> = [
  [Euro, "hero.fact.from", "From", "35 €", "hero.fact.gjipeShared", "Gjipe Tour"],
  [Ship, "hero.fact.privateBoat", "Private", "200 € / hour", "hero.fact.minimum", "per group"],
  [Users, "hero.fact.groups", "Groups", "15 guests", "hero.fact.capacity", "MAX 15 GUESTS"]
];

export function HeroCinematic() {
  return (
    <section className="relative overflow-hidden bg-limestone text-pearl">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Dhermi Boat heading along the Albanian Riviera coast"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy/18" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/88 via-navy/50 to-navy/8" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/8 via-navy/24 to-navy/82 md:hidden" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-limestone via-limestone/55 to-transparent" />
      </div>

      <div className="relative mx-auto grid min-h-[calc(100svh-5rem)] max-w-site items-center gap-10 px-5 py-12 md:min-h-[calc(100svh-8rem)] md:px-8 md:py-16 lg:grid-cols-[0.95fr_0.75fr]">
        <div className="max-w-3xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-sand">
            <LocalizedText id="hero.label">Boat Tours in Dhërmi</LocalizedText>
          </p>
          <h1 className="max-w-full break-words font-serif text-4xl font-medium leading-[1.02] drop-shadow-[0_5px_22px_rgba(0,0,0,0.45)] sm:max-w-4xl sm:text-5xl md:text-7xl lg:text-8xl">
            <LocalizedText id="hero.title">
              Discover the Albanian Riviera from the sea with our boat tours departing from Dhërmi.
            </LocalizedText>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-pearl/90 drop-shadow-[0_3px_16px_rgba(0,0,0,0.55)] md:text-xl">
            <LocalizedText id="hero.text">Discover the Albanian Riviera.</LocalizedText>
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={primaryWhatsappHref} icon={MessageCircle} variant="dark">
              <LocalizedText id="cta.book">Book now</LocalizedText>
            </ButtonLink>
            <ButtonLink href="/tours/" icon={ArrowRight} variant="secondary" className="border-white/25 bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-md hover:bg-white/18">
              <LocalizedText id="cta.viewTours">View tours</LocalizedText>
            </ButtonLink>
          </div>
        </div>

        <aside className="hidden self-end rounded-lg border border-white/18 bg-white/12 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-xl lg:block">
          <div className="grid gap-4">
            {heroFacts.map(([icon, labelKey, label, value, noteKey, note]) => (
              <div key={labelKey} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <IconFrame icon={icon} variant="glass" size="lg" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-sand">
                      <LocalizedText id={labelKey}>{label}</LocalizedText>
                    </p>
                    <p className="mt-1 font-serif text-3xl font-medium">{value}</p>
                    <p className="mt-1 text-sm text-pearl/65">
                      <LocalizedText id={noteKey}>{note}</LocalizedText>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
