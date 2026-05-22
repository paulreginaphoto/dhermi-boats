import { MessageCircle } from "lucide-react";
import { BookingCTA } from "@/components/BookingCTA";
import { ButtonLink } from "@/components/ButtonLink";
import { GalleryGrid } from "@/components/GalleryGrid";
import { Icon3D, type Icon3DName } from "@/components/Icon3D";
import { PageHero } from "@/components/PageHero";
import type { Tour } from "@/data/content";
import { whatsappUrl } from "@/lib/site";

export function TourDetailPage({ tour }: { tour: Tour }) {
  const facts: Array<{ label: string; value: string; icon: Icon3DName }> = [
    { label: "Duration", value: tour.duration, icon: "clock" },
    { label: "Price", value: tour.price, icon: "euro" },
    { label: "Capacity", value: tour.capacity, icon: "group" },
    { label: "Departure", value: tour.departure, icon: "pin" }
  ];

  return (
    <>
      <PageHero title={tour.title} image={tour.image} label="Tour details">
        <p>{tour.subtitle}</p>
        <div className="mt-8">
          <ButtonLink href={whatsappUrl(tour.whatsappText)} icon={MessageCircle} variant="dark">
            Book this tour
          </ButtonLink>
        </div>
      </PageHero>

      <section className="bg-limestone py-14">
        <div className="site-band">
          <div className="grid gap-3 md:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label} className="rounded-md border border-ink/10 bg-pearl p-5">
                <Icon3D name={fact.icon} alt="" size={48} />
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-bronze">{fact.label}</p>
                <p className="mt-2 text-base font-semibold text-ink">{fact.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-pearl py-16 md:py-24">
        <div className="site-band grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-bronze">Route highlights</p>
            <h2 className="mt-4 font-serif text-4xl font-medium leading-tight text-ink md:text-5xl">
              Clear route, relaxed pace, no complicated booking.
            </h2>
            <p className="mt-5 text-base leading-8 text-ink-soft">
              Every departure is confirmed on WhatsApp, including the meeting point and final route.
              Sea conditions guide the itinerary so the trip stays comfortable and safe.
            </p>
          </div>
          <div className="grid gap-4">
            {tour.highlights.map((highlight, index) => (
              <div key={highlight} className="grid grid-cols-[auto_1fr] gap-4 rounded-md border border-ink/10 bg-limestone p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-sm font-bold text-pearl">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="self-center text-base font-semibold text-ink">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-limestone py-16 md:py-24">
        <div className="site-band grid gap-10 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <GalleryGrid limit={6} />
          </div>
          <aside className="rounded-md border border-ink/10 bg-pearl p-6 md:p-8">
            <h2 className="font-serif text-3xl font-medium text-ink">Included</h2>
            <ul className="mt-6 grid gap-3 text-base leading-7 text-ink-soft">
              {tour.included.map((item) => (
                <li key={item} className="flex gap-3">
                  <Icon3D name="check" alt="" size={28} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {tour.notes?.length ? (
              <div className="mt-8 border-t border-ink/10 pt-6">
                {tour.notes.map((note) => (
                  <p key={note} className="text-sm leading-7 text-ink-soft">{note}</p>
                ))}
              </div>
            ) : null}
          </aside>
        </div>
      </section>

      <BookingCTA title={`Book the ${tour.shortTitle}`} />
    </>
  );
}
