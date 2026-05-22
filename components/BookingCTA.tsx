import { CalendarDays, MessageCircle, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { primaryWhatsappHref } from "@/data/content";
import { phoneDisplay } from "@/lib/site";

export function BookingCTA({
  title = "Ready to plan your boat day?",
  text = "Send your date, group size and preferred tour. Availability and meeting point are confirmed directly on WhatsApp."
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-ink text-pearl">
      <div className="mx-auto grid max-w-site gap-8 px-5 py-14 md:grid-cols-[1fr_auto] md:items-center md:px-8">
        <div>
          <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
            <CalendarDays className="h-5 w-5 text-turquoise" aria-hidden />
          </div>
          <h2 className="font-serif text-4xl font-medium leading-tight md:text-5xl">{title}</h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-pearl/74">{text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
          <ButtonLink href={primaryWhatsappHref} icon={MessageCircle} variant="dark">
            Book on WhatsApp
          </ButtonLink>
          <ButtonLink href={`tel:${phoneDisplay.replace(/\s/g, "")}`} icon={Phone} variant="ghost" className="border border-white/15 text-pearl hover:bg-white/10">
            Call now
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

