import Image from "next/image";
import { ArrowRight, Euro, MessageCircle, Sparkles, Users } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { tours } from "@/data/content";
import { whatsappUrl } from "@/lib/site";

const ladder = [
  {
    tourId: "gjipe",
    badge: "Best value",
    headline: "Easy win: caves, Gjipe Beach and a swim stop",
    businessAngle: "The fastest decision for guests who want a clear boat trip today.",
    emphasis: "from 35 €"
  },
  {
    tourId: "grama",
    badge: "Most wanted",
    headline: "Push this: Grama Bay, Blue Cave and Karaburun",
    businessAngle: "The higher-value shared route with the strongest dream factor.",
    emphasis: "from 75 €"
  },
  {
    tourId: "private",
    badge: "Best basket",
    headline: "Private route for families, groups and special days",
    businessAngle: "The best revenue per booking: custom timing, route and swim stops.",
    emphasis: "200 € / hour"
  }
];

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
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-bronze">Choose fast, upgrade smart</p>
            <h2 className="mt-4 max-w-3xl font-serif text-4xl font-medium leading-[1.02] text-ink md:text-6xl">
              Three offers designed to turn interest into bookings.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-ink-soft">
            Gjipe captures last-minute guests, Grama creates the dream trip, and Private/Sunset lifts the average basket.
            The page now guides visitors toward the best choice instead of making them compare everything alone.
          </p>
        </div>

        <div className="mt-12 grid grid-flow-dense gap-5 lg:grid-cols-3">
          {featuredTours.map((item, index) => (
            <article
              key={item.tour.id}
              className={[
                "group flex min-h-full flex-col overflow-hidden rounded-2xl border border-ink/8 bg-limestone shadow-sm transition duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-image",
                index === 1 ? "lg:-mt-8 lg:mb-8" : ""
              ].join(" ")}
            >
              <a className="block overflow-hidden" href={item.tour.href}>
                <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                  <Image
                    src={item.tour.cardImage ?? item.tour.image}
                    alt={item.tour.imageAlt ?? item.tour.shortTitle}
                    fill
                    loading="lazy"
                    quality={60}
                    sizes="(min-width: 1024px) 31vw, 92vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/12 to-transparent" />
                  <div className="absolute left-4 top-4 rounded-full bg-pearl px-3 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-ink shadow-sm">
                    {item.badge}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="inline-flex items-center gap-2 rounded-full bg-white/14 px-3 py-2 text-xs font-extrabold text-white backdrop-blur">
                      <Euro className="h-4 w-4" aria-hidden strokeWidth={1.75} />
                      {item.emphasis}
                    </p>
                  </div>
                </div>
              </a>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-3xl font-medium leading-[1.05] text-ink">{item.headline}</h3>
                <p className="mt-4 text-sm leading-7 text-ink-soft">{item.businessAngle}</p>
                <div className="mt-5 grid gap-2 text-sm font-bold text-ink">
                  <p className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-turquoise" aria-hidden strokeWidth={1.75} />
                    {item.tour.bestFor}
                  </p>
                  <p className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-turquoise" aria-hidden strokeWidth={1.75} />
                    {item.tour.capacity}
                  </p>
                </div>
                <div className="mt-auto grid gap-3 pt-7">
                  <ButtonLink
                    href={whatsappUrl(item.tour.whatsappText)}
                    icon={MessageCircle}
                    className="w-full"
                    whatsappKey={item.tour.id}
                    analyticsTour={item.tour.id}
                    analyticsPlacement="high_season_offer"
                  >
                    Ask availability for {item.tour.shortTitle}
                  </ButtonLink>
                  <ButtonLink href={item.tour.href} icon={ArrowRight} variant="secondary" className="w-full">
                    See details
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
