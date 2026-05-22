import { Anchor, CalendarDays, CheckCircle2, MessageCircle, Users } from "lucide-react";
import { trustBadges } from "@/data/content";

const icons = [CalendarDays, Users, Anchor, MessageCircle, CheckCircle2];

export function TrustBadges() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5" aria-label="Trust indicators">
      {trustBadges.map((badge, index) => {
        const Icon = icons[index] ?? CheckCircle2;
        return (
          <li
            key={badge}
            className="flex min-h-16 items-center gap-3 rounded-md border border-ink/10 bg-pearl px-4 text-sm font-semibold text-ink shadow-sm"
          >
            <Icon className="h-5 w-5 shrink-0 text-turquoise" aria-hidden />
            {badge}
          </li>
        );
      })}
    </ul>
  );
}

