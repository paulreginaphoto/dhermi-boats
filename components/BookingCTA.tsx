import { MessageCircle, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { Icon3D } from "@/components/Icon3D";
import { primaryWhatsappHref } from "@/data/content";
import { phoneDisplay } from "@/lib/site";
import { LocalizedText } from "@/components/LocalizedText";

export function BookingCTA({
  title,
  text
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-ink text-pearl">
      <div className="mx-auto grid max-w-site gap-8 px-5 py-14 md:grid-cols-[1fr_auto] md:items-center md:px-8">
        <div>
          <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-md bg-white/90 shadow-sm">
            <Icon3D name="ticket" alt="" size={54} />
          </div>
          <h2 className="font-serif text-4xl font-medium leading-tight md:text-5xl">
            {title ?? <LocalizedText id="booking.title">Ready to plan your boat day?</LocalizedText>}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-pearl/74">
            {text ?? (
              <LocalizedText id="booking.text">
                Send your date, group size and preferred tour. Availability and meeting point are confirmed directly on WhatsApp.
              </LocalizedText>
            )}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
          <ButtonLink href={primaryWhatsappHref} icon={MessageCircle} variant="dark">
            <LocalizedText id="cta.book">Book on WhatsApp</LocalizedText>
          </ButtonLink>
          <ButtonLink href={`tel:${phoneDisplay.replace(/\s/g, "")}`} icon={Phone} variant="ghost" className="border border-white/15 text-pearl hover:bg-white/10">
            <LocalizedText id="cta.call">Call now</LocalizedText>
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
