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
    <section className="relative overflow-hidden bg-limestone text-pearl">
      <div className="absolute inset-0">
        <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/88 via-navy/50 to-navy/12" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-limestone to-transparent" />
      </div>
      <div className="relative mx-auto max-w-site px-5 py-20 md:px-8 md:py-32">
        {label ? (
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-sand">{label}</p>
        ) : null}
        <h1 className="max-w-4xl text-balance font-serif text-4xl font-medium leading-[1.02] sm:text-5xl md:text-7xl">{title}</h1>
        {children ? <div className="mt-6 max-w-2xl text-lg leading-8 text-pearl/82">{children}</div> : null}
      </div>
    </section>
  );
}
