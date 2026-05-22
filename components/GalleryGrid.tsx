import Image from "next/image";
import { gallery } from "@/data/content";

export function GalleryGrid({ limit = gallery.length }: { limit?: number }) {
  const items = gallery.slice(0, limit);

  return (
    <div className="grid gap-3 md:grid-cols-4 md:auto-rows-[220px]">
      {items.map((item, index) => (
        <figure
          key={item.src}
          className={[
            "relative min-h-72 overflow-hidden rounded-md bg-sand md:min-h-0",
            index === 0 ? "md:col-span-2 md:row-span-2" : "",
            index === 5 ? "md:col-span-2" : ""
          ].join(" ")}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes={index === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 100vw"}
            className="object-cover"
          />
        </figure>
      ))}
    </div>
  );
}
