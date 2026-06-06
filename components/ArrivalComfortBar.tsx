import { CreditCard, Euro, MapPinned, MessageCircle } from "lucide-react";
import { LocalizedText } from "@/components/LocalizedText";
import { translations } from "@/lib/i18n";

const enText = (key: string) => translations.en[key] ?? "";

const comfortItems = [
  {
    icon: MessageCircle,
    titleKey: "arrival.whatsapp.title",
    textKey: "arrival.whatsapp.text"
  },
  {
    icon: MapPinned,
    titleKey: "arrival.meeting.title",
    textKey: "arrival.meeting.text"
  },
  {
    icon: Euro,
    titleKey: "arrival.sea.title",
    textKey: "arrival.sea.text"
  },
  {
    icon: CreditCard,
    titleKey: "arrival.payment.title",
    textKey: "arrival.payment.text"
  }
];

export function ArrivalComfortBar() {
  return (
    <section className="bg-pearl py-8 md:py-10" aria-labelledby="arrival-comfort-title">
      <div className="site-band">
        <div className="grid gap-5 rounded-lg border border-ink/8 bg-limestone/72 p-4 shadow-sm md:grid-cols-[0.55fr_1.45fr] md:p-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-bronze">
              <LocalizedText id="arrival.label">{enText("arrival.label")}</LocalizedText>
            </p>
            <h2 id="arrival-comfort-title" className="mt-2 font-serif text-2xl font-medium leading-tight text-ink md:text-3xl">
              <LocalizedText id="arrival.title">{enText("arrival.title")}</LocalizedText>
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {comfortItems.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.titleKey} className="grid grid-cols-[2.75rem_1fr] gap-3 rounded-md bg-pearl/80 p-3">
                  <span className="grid h-11 w-11 place-items-center rounded-md bg-turquoise-soft text-turquoise" aria-hidden>
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold leading-5 text-ink">
                      <LocalizedText id={item.titleKey}>{enText(item.titleKey)}</LocalizedText>
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-ink-soft">
                      <LocalizedText id={item.textKey}>{enText(item.textKey)}</LocalizedText>
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
