import { assetPath } from "@/lib/site";

export function VideoFeature() {
  return (
    <div className="overflow-hidden rounded-md border border-ink/10 bg-navy shadow-image">
      <video
        className="aspect-video w-full object-cover"
        controls
        muted
        playsInline
        preload="metadata"
        poster={assetPath("/images/gallery-blue-cove-boat.webp")}
      >
        <source src={assetPath("/videos/dhermi-sea-moments.mp4")} type="video/mp4" />
      </video>
    </div>
  );
}
