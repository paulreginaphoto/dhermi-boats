import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { heroImage, primaryWhatsappHref } from "@/data/content";
import { ButtonLink } from "@/components/ButtonLink";

export function HeroCinematic() {
  return (
    <section className="relative overflow-hidden bg-navy text-pearl">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Aerial view of a turquoise Albanian Riviera beach reached by boat"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy/18" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/92 via-navy/58 to-navy/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/10 via-navy/30 to-navy/88 md:hidden" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy to-transparent" />
      </div>

      <div className="relative mx-auto grid min-h-[620px] max-w-site items-center gap-10 px-5 py-12 md:min-h-[calc(100svh-10rem)] md:px-8 md:py-16 lg:grid-cols-[0.95fr_0.75fr]">
        <div className="max-w-3xl">
          <h1 className="max-w-4xl font-serif text-5xl font-medium leading-[0.96] text-balance drop-shadow-[0_5px_22px_rgba(0,0,0,0.45)] md:text-7xl lg:text-8xl">
            Boat tours in Dhërmi
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-pearl/90 drop-shadow-[0_3px_16px_rgba(0,0,0,0.55)] md:text-xl">
            Discover the Albanian Riviera from the sea with private and small-group tours to Gjipe,
            Grama Bay, Blue Cave and the Karaburun coastline.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={primaryWhatsappHref} icon={MessageCircle} variant="dark">
              Book on WhatsApp
            </ButtonLink>
            <ButtonLink href="/tours/" icon={ArrowRight} variant="secondary" className="border-white/25 bg-white/10 text-white hover:bg-white/18">
              View tours
            </ButtonLink>
          </div>
        </div>

        <aside className="hidden self-end rounded-md border border-white/16 bg-white/10 p-5 backdrop-blur-md lg:block">
          <div className="grid gap-4">
            {[
              ["From", "35 €", "shared Gjipe tour"],
              ["Private", "200 € / hour", "minimum 2 hours"],
              ["Groups", "15 guests", "small-boat capacity"]
            ].map(([label, value, note]) => (
              <div key={label} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-sand">{label}</p>
                <p className="mt-1 font-serif text-3xl font-medium">{value}</p>
                <p className="mt-1 text-sm text-pearl/65">{note}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
