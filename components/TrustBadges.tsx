import { Anchor, CalendarDays, MessageCircle, Users } from "lucide-react";
import { trustBadges } from "@/data/content";
import { LocalizedText } from "@/components/LocalizedText";
import { IconFrame, type OutlineIconComponent } from "@/components/OutlineIcon";
import { translations } from "@/lib/i18n";

const icons: OutlineIconComponent[] = [CalendarDays, Users, MessageCircle, Anchor];
const keys = ["badge.daily", "badge.guests", "badge.whatsapp", "badge.private"];
const enText = (key: string) => translations.en[key] ?? "";

export function TrustBadges() {
  return (
    <>
      <span id="trust-indicators-label" className="sr-only">
        <LocalizedText id="a11y.trustIndicators">{enText("a11y.trustIndicators")}</LocalizedText>
      </span>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-labelledby="trust-indicators-label">
        {trustBadges.map((badge, index) => {
          const icon = icons[index] ?? "check";
          const badgeKey = keys[index] ?? badge;
          return (
            <li
              key={badge}
              className="flex min-h-20 items-center gap-3 rounded-lg border border-ink/8 bg-pearl/86 px-4 text-sm font-semibold text-ink shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
            >
              <IconFrame icon={icon} variant="soft" />
              <LocalizedText id={badgeKey}>{enText(badgeKey) || badge}</LocalizedText>
            </li>
          );
        })}
      </ul>
    </>
  );
}
