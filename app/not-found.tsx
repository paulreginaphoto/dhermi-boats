import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Home, MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { LocalizedText } from "@/components/LocalizedText";
import { primaryWhatsappHref, tours } from "@/data/content";
import { translations } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true }
};

export default function NotFound() {
  const enText = (key: string) => translations.en[key] ?? "";

  return (
    <>
      <section className="bg-limestone py-10 md:py-16">
        <div className="site-band grid gap-8 lg:grid-cols-[0.72fr_1fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-bronze">
              <LocalizedText id="notfound.label">{enText("notfound.label")}</LocalizedText>
            </p>
            <h1 className="mt-4 font-serif text-4xl font-medium leading-tight text-ink md:text-6xl">
              <LocalizedText id="notfound.title">{enText("notfound.title")}</LocalizedText>
            </h1>
            <p className="mt-5 text-base leading-8 text-ink-soft md:text-lg">
              <LocalizedText id="notfound.text">{enText("notfound.text")}</LocalizedText>
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/tours/" icon={ArrowRight}>
                <LocalizedText id="notfound.tours">{enText("notfound.tours")}</LocalizedText>
              </ButtonLink>
              <ButtonLink href={primaryWhatsappHref} icon={MessageCircle} variant="secondary" whatsappKey="default" analyticsPlacement="not_found">
                <LocalizedText id="notfound.whatsapp">{enText("notfound.whatsapp")}</LocalizedText>
              </ButtonLink>
              <ButtonLink href="/" icon={Home} variant="ghost" className="border border-ink/10 bg-pearl/70">
                <LocalizedText id="notfound.home">{enText("notfound.home")}</LocalizedText>
              </ButtonLink>
            </div>
          </div>

          <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-sand shadow-image">
            <Image
              src={tours[1].image}
              alt={tours[1].imageAlt ?? "Dhermi Boat tour on the Albanian Riviera"}
              fill
              preload
              quality={58}
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
      <section className="bg-pearl py-8 md:py-12">
        <div className="site-band">
          <div className="rounded-lg border border-ink/8 bg-limestone/70 p-5 text-sm font-semibold leading-7 text-ink-soft md:p-6 md:text-base">
            <LocalizedText id="notfound.hint">{enText("notfound.hint")}</LocalizedText>
          </div>
        </div>
      </section>
    </>
  );
}
