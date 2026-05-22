import { Anchor, CalendarDays, MessageCircle, Users } from "lucide-react";
import { trustBadges } from "@/data/content";
import { LocalizedText } from "@/components/LocalizedText";
import { IconFrame, type OutlineIconComponent } from "@/components/OutlineIcon";

const icons: OutlineIconComponent[] = [CalendarDays, Users, MessageCircle, Anchor];
const keys = ["badge.daily", "badge.guests", "badge.whatsapp", "badge.private"];

export function TrustBadges() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Trust indicators">
      {trustBadges.map((badge, index) => {
        const icon = icons[index] ?? "check";
        return (
          <li
            key={badge}
            className="flex min-h-20 items-center gap-3 rounded-lg border border-ink/8 bg-pearl/86 px-4 text-sm font-semibold text-ink shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
          >
            <IconFrame icon={icon} variant="soft" />
            <LocalizedText id={keys[index] ?? badge}>{badge}</LocalizedText>
          </li>
        );
      })}
    </ul>
  );
}
