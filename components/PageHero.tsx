import Image from "next/image";
import type { ReactNode } from "react";

export function PageHero({
  title,
  children,
  image,
  label
}: {
  title: ReactNode;
  children?: ReactNode;
  image: string;
  label?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy text-pearl">
      <div className="absolute inset-0">
        <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/88 via-navy/56 to-navy/18" />
      </div>
      <div className="relative mx-auto max-w-site px-5 py-20 md:px-8 md:py-28">
        {label ? (
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-sand">{label}</p>
        ) : null}
        <h1 className="max-w-4xl font-serif text-5xl font-medium leading-[1] md:text-7xl">{title}</h1>
        {children ? <div className="mt-6 max-w-2xl text-lg leading-8 text-pearl/82">{children}</div> : null}
      </div>
    </section>
  );
}
