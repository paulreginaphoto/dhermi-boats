import { LocalizedText } from "@/components/LocalizedText";
import { assetPath } from "@/lib/site";
import { translations } from "@/lib/i18n";

const videoSrc = assetPath("/videos/dhermi-sea-moments.mp4");

export function VideoFeature() {
  return (
    <div className="relative mx-auto aspect-[9/16] max-h-[620px] w-full max-w-[390px] overflow-hidden rounded-lg border border-ink/10 bg-navy shadow-image">
      <span id="video-description" className="sr-only">
        <LocalizedText id="a11y.videoDescription">{translations.en["a11y.videoDescription"] ?? ""}</LocalizedText>
      </span>
      <video
        aria-labelledby="video-description"
        className="h-full w-full object-cover"
        controls
        loop
        muted
        playsInline
        poster={assetPath("/images/video-sea-cave-poster.webp")}
        preload="none"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-navy/55 to-transparent" />
    </div>
  );
}
