import Image from "next/image";
import { ArrowRight, Euro, MessageCircle, Sparkles, Users } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { LocalizedText } from "@/components/LocalizedText";
import { tours } from "@/data/content";
import { translations } from "@/lib/i18n";
import { tourBookFallback, tourBookKey } from "@/lib/tourBookingCopy";
import { whatsappHrefForKey, type WhatsappMessageKey } from "@/lib/whatsappMessages";

const ladder = [
  {
    tourId: "gjipe",
    badgeKey: "tour.label.bestValue",
    headlineKey: "offer.gjipe.title",
    textKey: "offer.gjipe.text",
    priceKey: "offer.gjipe.price"
  },
  {
    tourId: "grama",
    badgeKey: "tour.label.mostComplete",
    headlineKey: "offer.grama.title",
    textKey: "offer.grama.text",
    priceKey: "offer.grama.price"
  },
  {
    tourId: "private",
    badgeKey: "tour.label.privateOption",
    headlineKey: "offer.private.title",
    textKey: "offer.private.text",
    priceKey: "offer.private.price"
  }
];

const enText = (key: string) => translations.en[key] ?? "";

export function HighSeasonOfferLadder() {
  const featuredTours = ladder
    .map((item) => {
      const tour = tours.find((entry) => entry.id === item.tourId);
      return tour ? { ...item, tour } : null;
    })
    .filter((item): item is (typeof ladder)[number] & { tour: (typeof tours)[number] } => Boolean(item));

  return (
    <section className="below-fold overflow-hidden bg-pearl py-16 md:py-28">
      <div className="site-band">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-bronze">
              <LocalizedText id="offer.label">{enText("offer.label")}</LocalizedText>
            </p>
            <h2 className="mt-4 max-w-3xl font-serif text-4xl font-medium leading-[1.02] text-ink md:text-6xl">
              <LocalizedText id="offer.title">{enText("offer.title")}</LocalizedText>
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-ink-soft">
            <LocalizedText id="offer.text">{enText("offer.text")}</LocalizedText>
          </p>
        </div>

        <div className="mt-12 grid grid-flow-dense gap-5 lg:grid-cols-3">
          {featuredTours.map((item, index) => (
            <article
              key={item.tour.id}
              className={[
                "group flex min-h-full flex-col overflow-hidden rounded-lg border border-ink/8 bg-limestone shadow-sm transition duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-image",
                index === 1 ? "lg:-mt-8 lg:mb-8" : ""
              ].join(" ")}
              data-tour-card={item.tour.id}
            >
              <a className="block overflow-hidden" href={item.tour.href}>
                <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                  <Image
                    src={item.tour.cardImage ?? item.tour.image}
                    alt={item.tour.imageAlt ?? item.tour.shortTitle}
                    fill
                    loading="lazy"
                    quality={58}
                    sizes="(min-width: 1024px) 31vw, 92vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/12 to-transparent" />
                  <div className="absolute left-4 top-4 rounded-full bg-pearl px-3 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-ink shadow-sm">
                    <LocalizedText id={item.badgeKey}>{enText(item.badgeKey)}</LocalizedText>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="inline-flex items-center gap-2 rounded-full bg-ink/80 px-3 py-2 text-xs font-extrabold text-pearl shadow-sm backdrop-blur">
                      <Euro className="h-4 w-4" aria-hidden strokeWidth={1.75} />
                      <LocalizedText id={item.priceKey}>{enText(item.priceKey)}</LocalizedText>
                    </p>
                  </div>
                </div>
              </a>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-3xl font-medium leading-[1.05] text-ink">
                  <LocalizedText id={item.headlineKey}>{enText(item.headlineKey)}</LocalizedText>
                </h3>
                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  <LocalizedText id={item.textKey}>{enText(item.textKey)}</LocalizedText>
                </p>
                <div className="mt-5 grid gap-2 text-sm font-bold text-ink">
                  <p className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-turquoise" aria-hidden strokeWidth={1.75} />
                    <LocalizedText id={`tour.${item.tour.id}.bestFor`}>{item.tour.bestFor}</LocalizedText>
                  </p>
                  <p className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-turquoise" aria-hidden strokeWidth={1.75} />
                    <LocalizedText id={`tour.${item.tour.id}.capacity`}>{item.tour.capacity}</LocalizedText>
                  </p>
                </div>
                <div className="mt-auto grid gap-3 pt-7">
                  <ButtonLink
                    href={whatsappHrefForKey(item.tour.id as WhatsappMessageKey)}
                    icon={MessageCircle}
                    className="w-full"
                    whatsappKey={item.tour.id}
                    analyticsTour={item.tour.id}
                    analyticsPlacement="high_season_offer"
                  >
                    <LocalizedText id={tourBookKey(item.tour.id)}>{tourBookFallback(item.tour.id)}</LocalizedText>
                  </ButtonLink>
                  <ButtonLink href={item.tour.href} icon={ArrowRight} variant="secondary" className="w-full">
                    <LocalizedText id="tour.details">{enText("tour.details")}</LocalizedText>
                  </ButtonLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
