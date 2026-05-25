import Image from "next/image";
import { AtSign, ExternalLink, Music2 } from "lucide-react";
import tiktokItems from "@/data/tiktok-media.json";
import { assetPath, instagramUrl, tiktokUrl } from "@/lib/site";
import { LocalizedText } from "@/components/LocalizedText";
import { translations } from "@/lib/i18n";

type TikTokItem = {
  id: string;
  title: string;
  description: string;
  url: string;
  duration: number;
  views: number;
  likes: number;
  image: string;
};

const items = tiktokItems as TikTokItem[];

export function SocialFeed() {
  return (
    <section className="below-fold bg-limestone py-16 md:py-24" id="social">
      <div className="site-band">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-bronze">
              <LocalizedText id="section.social.label">{translations.en["section.social.label"] ?? ""}</LocalizedText>
            </p>
            <h2 className="font-serif text-4xl font-medium leading-[1.04] text-ink md:text-5xl">
              <LocalizedText id="section.social.title">{translations.en["section.social.title"] ?? ""}</LocalizedText>
            </h2>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-ink px-5 text-sm font-semibold text-pearl transition hover:bg-navy"
                data-analytics-event="instagram_click"
                href={instagramUrl}
                rel="noreferrer"
                target="_blank"
              >
                <AtSign className="h-4 w-4" aria-hidden />
                <LocalizedText id="social.instagram">{translations.en["social.instagram"] ?? ""}</LocalizedText>
              </a>
              <a
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-ink/15 bg-pearl px-5 text-sm font-semibold text-ink transition hover:border-ink/35 hover:bg-white"
                data-analytics-event="tiktok_click"
                href={tiktokUrl}
                rel="noreferrer"
                target="_blank"
              >
                <Music2 className="h-4 w-4" aria-hidden />
                <LocalizedText id="social.tiktok">{translations.en["social.tiktok"] ?? ""}</LocalizedText>
              </a>
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-bronze">
              <LocalizedText id="social.latest">{translations.en["social.latest"] ?? ""}</LocalizedText>
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {items.map((item) => (
                <a
                  key={item.id}
                  className="group overflow-hidden rounded-md border border-ink/10 bg-pearl shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
                  data-analytics-event="tiktok_click"
                  href={item.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  <div className="relative aspect-[9/16] bg-sand">
                    <Image
                      src={assetPath(item.image)}
                      alt={item.title}
                      fill
                      loading="lazy"
                      fetchPriority="low"
                      decoding="async"
                      quality={52}
                      sizes="(min-width: 1024px) 20vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <span className="absolute right-3 top-3 rounded-full bg-navy/80 px-3 py-1 text-xs font-bold text-pearl backdrop-blur">
                      {item.duration}s
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="line-clamp-3 text-sm font-semibold leading-6 text-ink">{item.title}</p>
                    <p className="mt-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-bronze">
                      {item.views.toLocaleString("en-US")} views
                      <ExternalLink className="h-3 w-3" aria-hidden />
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
