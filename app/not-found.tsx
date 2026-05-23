import type { Metadata } from "next";
import { ArrowRight, Home, MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { LocalizedText } from "@/components/LocalizedText";
import { PageHero } from "@/components/PageHero";
import { primaryWhatsappHref, tours } from "@/data/content";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true }
};

export default function NotFound() {
  return (
    <>
      <PageHero
        title={<LocalizedText id="notfound.title">Page not found</LocalizedText>}
        image={tours[1].image}
        imageAlt={tours[1].imageAlt}
        label={<LocalizedText id="notfound.label">404</LocalizedText>}
      >
        <p>
          <LocalizedText id="notfound.text">
            No stress: choose a tour, open the booking form or ask us directly on WhatsApp.
          </LocalizedText>
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/tours/" icon={ArrowRight} variant="dark">
            <LocalizedText id="notfound.tours">Compare tours</LocalizedText>
          </ButtonLink>
          <ButtonLink href={primaryWhatsappHref} icon={MessageCircle} variant="secondary" className="border-white/25 bg-white/10 text-white hover:bg-white/18" whatsappKey="default" analyticsEvent="whatsapp_click">
            <LocalizedText id="notfound.whatsapp">Ask on WhatsApp</LocalizedText>
          </ButtonLink>
          <ButtonLink href="/" icon={Home} variant="secondary" className="border-white/25 bg-white/10 text-white hover:bg-white/18">
            <LocalizedText id="notfound.home">Go home</LocalizedText>
          </ButtonLink>
        </div>
      </PageHero>
      <section className="bg-pearl py-12 md:py-16">
        <div className="site-band">
          <div className="rounded-lg border border-ink/8 bg-limestone/70 p-6 text-base leading-8 text-ink-soft md:p-8">
            <LocalizedText id="notfound.hint">
              Most visitors are choosing between Gjipe, Grama Bay, a private trip, sunset or morning fishing from Dhërmi.
            </LocalizedText>
          </div>
        </div>
      </section>
    </>
  );
}
