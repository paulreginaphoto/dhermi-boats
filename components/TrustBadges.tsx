import { trustBadges } from "@/data/content";
import { Icon3D, type Icon3DName } from "@/components/Icon3D";
import { LocalizedText } from "@/components/LocalizedText";

const icons: Icon3DName[] = ["calendar", "group", "chat", "boat"];
const keys = ["badge.daily", "badge.guests", "badge.whatsapp", "badge.private"];

export function TrustBadges() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5" aria-label="Trust indicators">
      {trustBadges.map((badge, index) => {
        const icon = icons[index] ?? "check";
        return (
          <li
            key={badge}
            className="flex min-h-20 items-center gap-3 rounded-md border border-ink/10 bg-pearl px-4 text-sm font-semibold text-ink shadow-sm"
          >
            <Icon3D name={icon} alt="" size={42} />
            <LocalizedText id={keys[index] ?? badge}>{badge}</LocalizedText>
          </li>
        );
      })}
    </ul>
  );
}
