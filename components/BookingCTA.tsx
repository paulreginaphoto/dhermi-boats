import { MessageCircle, Phone, Ticket } from "lucide-react";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ButtonLink";
import { IconFrame } from "@/components/OutlineIcon";
import { phoneDisplay } from "@/lib/site";
import { LocalizedText } from "@/components/LocalizedText";
import { whatsappHrefForKey, type WhatsappMessageKey } from "@/lib/whatsappMessages";

export function BookingCTA({
  title,
  text,
  whatsappKey = "default",
  analyticsPlacement = "booking_cta"
}: {
  title?: ReactNode;
  text?: ReactNode;
  whatsappKey?: WhatsappMessageKey;
  analyticsPlacement?: string;
}) {
  return (
    <section className="bg-ink text-pearl">
      <div className="mx-auto grid max-w-site gap-8 px-5 py-14 md:grid-cols-[1fr_auto] md:items-center md:px-8">
        <div>
          <IconFrame icon={Ticket} variant="dark" size="xl" className="mb-5" />
          <h2 className="font-serif text-4xl font-medium leading-tight md:text-5xl">
            {title ?? <LocalizedText id="booking.title">Book your boat tour in Dhërmi</LocalizedText>}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-pearl/88">
            {text ?? (
              <LocalizedText id="booking.text">
                Send a WhatsApp message with the tour, date, adults, children, preferred time and questions. We confirm availability together.
              </LocalizedText>
            )}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
          <ButtonLink href={whatsappHrefForKey(whatsappKey)} icon={MessageCircle} variant="dark" whatsappKey={whatsappKey} analyticsTour={whatsappKey} analyticsPlacement={analyticsPlacement}>
            <LocalizedText id="cta.heroWhatsapp">Check availability on WhatsApp</LocalizedText>
          </ButtonLink>
          <ButtonLink href={`tel:${phoneDisplay.replace(/\s/g, "")}`} icon={Phone} variant="ghost" className="border border-white/15 text-pearl hover:bg-white/10" analyticsEvent="call_click">
            <LocalizedText id="cta.call">Call now</LocalizedText>
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
