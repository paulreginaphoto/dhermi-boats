import { MessageCircle } from "lucide-react";
import { conversionAttrs } from "@/lib/conversion";
import { whatsappHrefForKey } from "@/lib/whatsappMessages";
import { LocalizedText } from "@/components/LocalizedText";
import { translations } from "@/lib/i18n";

const enText = (key: string) => translations.en[key] ?? "";

export function StickyBookingBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-pearl/96 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-12px_30px_rgba(7,25,35,0.12)] backdrop-blur md:hidden"
      data-sticky-booking-bar
    >
      <div className="mx-auto flex max-w-sm items-center">
        <a
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-ink px-4 text-sm font-bold leading-none text-pearl shadow-sm"
          data-whatsapp-key="default"
          href={whatsappHrefForKey("default")}
          rel="noreferrer"
          target="_blank"
          {...conversionAttrs({ tourId: "default", placement: "sticky_mobile" })}
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          <LocalizedText id="minimal.cta.whatsapp">{enText("minimal.cta.whatsapp")}</LocalizedText>
          <span className="sr-only">
            <LocalizedText id="minimal.reassurance">{enText("minimal.reassurance")}</LocalizedText>
          </span>
        </a>
      </div>
    </div>
  );
}
