import { bookingFormHrefForKey } from "@/lib/bookingLinks";
import { getYourGuideUrl, googleMapsUrl, instagramUrl, tiktokUrl } from "@/lib/site";

type BrandLink = {
  label: string;
  href: string;
  external?: boolean;
  logo: "whatsapp" | "google" | "getyourguide" | "instagram" | "tiktok";
};

const brandLinks: BrandLink[] = [
  { label: "WhatsApp", href: bookingFormHrefForKey("default"), logo: "whatsapp" },
  { label: "Google Maps", href: googleMapsUrl, external: true, logo: "google" },
  { label: "GetYourGuide", href: getYourGuideUrl, external: true, logo: "getyourguide" },
  { label: "Instagram", href: instagramUrl, external: true, logo: "instagram" },
  { label: "TikTok", href: tiktokUrl, external: true, logo: "tiktok" }
];

function BrandMark({ logo }: { logo: BrandLink["logo"] }) {
  if (logo === "whatsapp") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden className="h-5 w-5">
        <circle cx="16" cy="16" r="16" fill="#25D366" />
        <path fill="#fff" d="M10.9 23.2l.7-3.3a8 8 0 1 1 3 2.4l-3.7.9zm4-5.1c2.3 2.2 4.3 2.3 5.1 1.7.4-.3.7-1.2.4-1.5l-1.6-.8c-.3-.1-.5-.1-.8.2l-.6.7c-.2.2-.5.2-.8 0a7.3 7.3 0 0 1-2.8-2.8c-.2-.3-.2-.6 0-.8l.6-.6c.3-.3.3-.5.2-.8l-.7-1.6c-.2-.5-1.3-.4-1.6-.2-.9.6-1.3 2.9 2.4 6.3z" />
      </svg>
    );
  }

  if (logo === "google") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden className="h-5 w-5">
        <path fill="#34A853" d="M16 2a10.8 10.8 0 0 0-11 11c0 7.8 11 17 11 17s11-9.2 11-17A10.8 10.8 0 0 0 16 2z" />
        <path fill="#4285F4" d="M16 2v30s11-9.2 11-17A10.8 10.8 0 0 0 16 2z" opacity=".28" />
        <circle cx="16" cy="13" r="5" fill="#fff" />
        <path fill="#EA4335" d="M16 8a5 5 0 0 1 4.5 2.8h-4.6v3h7.3c.1-.5.1-.9.1-1.3A7.2 7.2 0 0 0 16 5.8a7.3 7.3 0 0 0-6.5 4l3 2.3A3.9 3.9 0 0 1 16 8z" />
        <path fill="#FBBC04" d="M9.5 9.8A7.3 7.3 0 0 0 8.7 13c0 1.1.3 2.2.8 3.2l3-2.3a4 4 0 0 1 0-1.8l-3-2.3z" />
        <path fill="#34A853" d="M16 20.2c2 0 3.7-.7 4.9-2l-2.4-1.9c-.7.5-1.5.8-2.5.8a3.9 3.9 0 0 1-3.5-2.2l-3 2.3a7.3 7.3 0 0 0 6.5 4z" />
      </svg>
    );
  }

  if (logo === "getyourguide") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden className="h-5 w-5">
        <rect width="32" height="32" rx="7" fill="#00aa6c" />
        <path fill="#fff" d="M9 10.5h5.6v3.1h-2.3v6.9H9v-10zm8.5 0H24v3.1h-3.2v2.1h2.8v2.9h-2.8v4h-3.3V10.5z" />
      </svg>
    );
  }

  if (logo === "instagram") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden className="h-5 w-5">
        <defs>
          <linearGradient id="instagram-gradient" x1="4" x2="28" y1="28" y2="4">
            <stop stopColor="#F58529" />
            <stop offset=".45" stopColor="#DD2A7B" />
            <stop offset="1" stopColor="#515BD4" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="9" fill="url(#instagram-gradient)" />
        <rect x="8.3" y="8.3" width="15.4" height="15.4" rx="5" fill="none" stroke="#fff" strokeWidth="2" />
        <circle cx="16" cy="16" r="3.6" fill="none" stroke="#fff" strokeWidth="2" />
        <circle cx="21.1" cy="10.9" r="1.2" fill="#fff" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden className="h-5 w-5">
      <rect width="32" height="32" rx="7" fill="#050505" />
      <path fill="#25F4EE" d="M18.8 7.5v10.4a5 5 0 1 1-4.4-4.9v3.1a2 2 0 1 0 1.3 1.9V7.5h3.1z" />
      <path fill="#FE2C55" d="M20.3 8.7c.9 1.8 2.3 2.7 4.2 2.8v3.1a8 8 0 0 1-4.2-1.2v5.8a5 5 0 0 1-7.7 4.2 5 5 0 0 0 6.2-4.9V8.7h1.5z" />
      <path fill="#fff" d="M18.8 7.5c.2 1 .7 1.9 1.5 2.6v3.3a7.3 7.3 0 0 1-1.5-.9v6a5 5 0 0 1-6.2 4.9 5 5 0 0 1 2.4-9.6c.4 0 .7 0 1 .1v3.2a2 2 0 1 0 1.3 1.9V7.5h1.5z" />
    </svg>
  );
}

export function BrandProofStrip({ className = "" }: { className?: string }) {
  return (
    <div className={["flex flex-wrap items-center gap-2", className].join(" ")} data-brand-proof>
      {brandLinks.map((brand) => (
        <a
          key={brand.label}
          aria-label={brand.label}
          className="inline-flex min-h-10 items-center gap-2 rounded-md border border-ink/10 bg-white px-3 text-xs font-bold text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-ink/18 hover:bg-limestone active:translate-y-px"
          data-analytics-event={`${brand.logo}_logo_click`}
          href={brand.href}
          rel={brand.external ? "noreferrer" : undefined}
          target={brand.external ? "_blank" : undefined}
        >
          <BrandMark logo={brand.logo} />
          <span>{brand.label}</span>
        </a>
      ))}
    </div>
  );
}
