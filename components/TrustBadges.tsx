import { Anchor, CalendarDays, ShieldCheck, Star, Users } from "lucide-react";
import { trustBadges } from "@/data/content";
import { LocalizedText } from "@/components/LocalizedText";
import { IconFrame, type OutlineIconComponent } from "@/components/OutlineIcon";
import { translations } from "@/lib/i18n";

const icons: OutlineIconComponent[] = [Star, Users, Anchor, CalendarDays, ShieldCheck];
const keys = ["hero.trust.0", "hero.trust.1", "hero.trust.2", "hero.trust.3", "hero.trust.4"];
const enText = (key: string) => translations.en[key] ?? "";

export function TrustBadges() {
  return (
    <>
      <span id="trust-indicators-label" className="sr-only">
        <LocalizedText id="a11y.trustIndicators">{enText("a11y.trustIndicators")}</LocalizedText>
      </span>
      <ul className="grid gap-2" aria-labelledby="trust-indicators-label">
        {trustBadges.map((badge, index) => {
          const icon = icons[index] ?? "check";
          const badgeKey = keys[index] ?? badge;
          return (
            <li
              key={badge}
              className="flex min-h-12 items-center gap-3 rounded-md border border-white/12 bg-ink/80 px-3 py-2 text-sm font-semibold leading-snug text-pearl shadow-sm"
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
