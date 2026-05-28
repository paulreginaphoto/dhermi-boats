import { CalendarDays, Clock3, MessageCircle, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { primaryWhatsappHref } from "@/data/content";

const checks = [
  {
    icon: CalendarDays,
    title: "Today or tomorrow in Dhërmi?",
    text: "Send your date and group size. We answer with the safest available route."
  },
  {
    icon: ShieldCheck,
    title: "Sea conditions checked first",
    text: "Caves, beaches and timing are confirmed by the skipper before departure."
  },
  {
    icon: Clock3,
    title: "Fast WhatsApp booking",
    text: "No slow checkout. Share the tour, date, adults, children and preferred time."
  }
];

export function SeasonAvailabilityStrip() {
  return (
    <section className="relative z-10 bg-ink text-pearl">
      <div className="site-band py-6 md:py-8">
        <div className="grid gap-5 rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-[0_26px_80px_rgba(7,27,38,0.22)] backdrop-blur md:grid-cols-[1fr_auto] md:items-center md:p-5">
          <div className="grid gap-4 lg:grid-cols-3">
            {checks.map((item) => (
              <article key={item.title} className="flex gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-pearl text-ink">
                  <item.icon className="h-5 w-5" aria-hidden strokeWidth={1.75} />
                </span>
                <div>
                  <h2 className="text-sm font-extrabold leading-5 text-white">{item.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-pearl/80">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
          <ButtonLink
            href={primaryWhatsappHref}
            icon={MessageCircle}
            variant="dark"
            className="w-full whitespace-nowrap md:w-auto"
            whatsappKey="default"
            analyticsPlacement="season_availability"
          >
            Check today&apos;s availability
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
