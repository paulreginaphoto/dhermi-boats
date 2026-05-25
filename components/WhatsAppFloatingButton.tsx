import { MessageCircle } from "lucide-react";
import { primaryWhatsappHref } from "@/data/content";
import { conversionAttrs } from "@/lib/conversion";

export function WhatsAppFloatingButton() {
  return (
    <a
      aria-label="Book your tour now on WhatsApp"
      className="fixed bottom-24 right-4 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#1FAF5C] text-white shadow-soft transition hover:scale-105 md:flex"
      data-whatsapp-key="default"
      href={primaryWhatsappHref}
      rel="noreferrer"
      target="_blank"
      {...conversionAttrs({ tourId: "default", placement: "floating_desktop" })}
    >
      <MessageCircle className="h-6 w-6" aria-hidden />
    </a>
  );
}
