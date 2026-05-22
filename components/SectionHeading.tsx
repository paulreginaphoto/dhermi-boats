import type { ReactNode } from "react";

export function SectionHeading({
  label,
  title,
  children,
  align = "left"
}: {
  label?: string;
  title: string;
  children?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {label ? (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-bronze">
          {label}
        </p>
      ) : null}
      <h2 className="font-serif text-4xl font-medium leading-[1.04] text-ink md:text-5xl">
        {title}
      </h2>
      {children ? (
        <div className="mt-5 text-base leading-8 text-ink-soft md:text-lg">{children}</div>
      ) : null}
    </div>
  );
}

