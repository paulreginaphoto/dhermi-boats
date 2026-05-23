import { MessageCircle, Phone } from "lucide-react";
import { primaryWhatsappHref } from "@/data/content";
import { phoneDisplay } from "@/lib/site";
import { LocalizedText } from "@/components/LocalizedText";

export function StickyBookingBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-pearl/95 p-3 shadow-[0_-12px_30px_rgba(7,25,35,0.12)] backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-[1fr_auto] gap-3">
        <a
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-ink px-4 text-sm font-semibold text-pearl"
          data-whatsapp-key="default"
          href={primaryWhatsappHref}
          rel="noreferrer"
          target="_blank"
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          <LocalizedText id="cta.book">Book now</LocalizedText>
        </a>
        <a
          aria-label="Call Dhermi Boat"
          className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-ink/15 bg-white text-ink"
          href={`tel:${phoneDisplay.replace(/\s/g, "")}`}
        >
          <Phone className="h-4 w-4" aria-hidden />
        </a>
      </div>
    </div>
  );
}
