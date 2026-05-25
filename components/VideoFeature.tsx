import { assetPath } from "@/lib/site";

const videoSrc = assetPath("/videos/dhermi-sea-moments.mp4");

export function VideoFeature() {
  return (
    <div className="relative mx-auto aspect-[9/16] max-h-[620px] w-full max-w-[390px] overflow-hidden rounded-lg border border-ink/10 bg-navy shadow-image">
      <video
        aria-label="Short video from a Dhermi Boat sea cave and clear-water tour"
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
