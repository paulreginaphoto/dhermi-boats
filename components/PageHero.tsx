import Image from "next/image";
import type { ReactNode } from "react";

export function PageHero({
  title,
  children,
  image,
  imageAlt = "",
  label
}: {
  title: ReactNode;
  children?: ReactNode;
  image: string;
  imageAlt?: string;
  label?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-limestone text-pearl">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          preload
          loading="eager"
          quality={72}
          decoding="async"
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 photo-overlay-dark" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-navy/55 via-navy/22 to-transparent" />
      </div>
      <div className="relative mx-auto max-w-site px-5 py-14 md:px-8 md:py-24">
        {label ? (
          <p className="photo-label mb-5 text-xs font-bold uppercase tracking-[0.24em] text-sand">{label}</p>
        ) : null}
        <h1 className="photo-title max-w-4xl font-serif text-3xl font-medium leading-[1.06] text-pearl sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {children ? <div className="photo-copy mt-6 max-w-2xl text-lg leading-8 text-pearl/96">{children}</div> : null}
      </div>
    </section>
  );
}
