import { MessageCircle } from "lucide-react";
import { primaryWhatsappHref } from "@/data/content";
import { conversionAttrs } from "@/lib/conversion";
import { LocalizedText } from "@/components/LocalizedText";
import { translations } from "@/lib/i18n";

export function WhatsAppFloatingButton() {
  return (
    <a
      aria-labelledby="floating-whatsapp-cta-label"
      className="fixed bottom-24 right-4 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#1FAF5C] text-white shadow-soft transition hover:scale-105 md:flex"
      data-whatsapp-key="default"
      href={primaryWhatsappHref}
      rel="noreferrer"
      target="_blank"
      {...conversionAttrs({ tourId: "default", placement: "floating_desktop" })}
    >
      <MessageCircle className="h-6 w-6" aria-hidden />
      <span id="floating-whatsapp-cta-label" className="sr-only">
        <LocalizedText id="cta.heroWhatsapp">{translations.en["cta.heroWhatsapp"] ?? "Check availability on WhatsApp"}</LocalizedText>
      </span>
    </a>
  );
}
