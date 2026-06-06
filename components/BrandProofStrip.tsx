import { AtSign, MapPin, MessageCircle, Play, Ticket } from "lucide-react";
import { bookingFormHrefForKey } from "@/lib/bookingLinks";
import { getYourGuideUrl, googleMapsUrl, instagramUrl, tiktokUrl } from "@/lib/site";

type BrandLinkBase = {
  label: string;
  detail: string;
  href: string;
  external?: boolean;
  analyticsKey: string;
  icon?: typeof MessageCircle;
};

type BrandLink = BrandLinkBase & {
  icon: typeof MessageCircle;
};

const brandLinks: BrandLink[] = ([
  {
    label: "Book direct",
    detail: "1 minute",
    href: bookingFormHrefForKey("default"),
    analyticsKey: "booking"
  },
  {
    label: "Google",
    detail: "Reviews",
    href: googleMapsUrl,
    external: true,
    analyticsKey: "google",
    icon: MapPin
  },
  {
    label: "GetYourGuide",
    detail: "Profile",
    href: getYourGuideUrl,
    external: true,
    analyticsKey: "getyourguide",
    icon: Ticket
  },
  {
    label: "Instagram",
    detail: "Photos",
    href: instagramUrl,
    external: true,
    analyticsKey: "instagram",
    icon: AtSign
  },
  {
    label: "TikTok",
    detail: "Videos",
    href: tiktokUrl,
    external: true,
    analyticsKey: "tiktok",
    icon: Play
  }
] satisfies BrandLinkBase[]).map((brand) => ({
  icon: MessageCircle,
  ...brand
}));

export function BrandProofStrip({ className = "" }: { className?: string }) {
  return (
    <div className={["grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center", className].join(" ")} data-brand-proof>
      {brandLinks.map((brand) => {
        const Icon = brand.icon;

        return (
          <a
            key={brand.label}
            aria-label={`${brand.label} - ${brand.detail}`}
            className="group inline-flex min-h-11 items-center gap-2 rounded-lg border border-ink/10 bg-white/90 px-3 text-left text-ink shadow-sm backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-pearl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise focus-visible:ring-offset-2 active:translate-y-px"
            data-analytics-event={`${brand.analyticsKey}_logo_click`}
            href={brand.href}
            rel={brand.external ? "noreferrer" : undefined}
            target={brand.external ? "_blank" : undefined}
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-current/15 bg-pearl/80 text-ink transition group-hover:bg-white/10 group-hover:text-pearl">
              <Icon className="h-4 w-4" aria-hidden strokeWidth={1.75} />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-xs font-bold leading-4">{brand.label}</span>
              <span className="block text-[0.68rem] font-semibold leading-4 text-ink-soft transition group-hover:text-pearl">{brand.detail}</span>
            </span>
          </a>
        );
      })}
    </div>
  );
}
