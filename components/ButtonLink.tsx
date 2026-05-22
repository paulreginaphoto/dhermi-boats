import Link from "next/link";
import type { ComponentType, ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "dark";
  className?: string;
  icon?: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  ariaLabel?: string;
};

const variants = {
  primary:
    "bg-ink text-pearl shadow-soft hover:bg-navy focus-visible:ring-ink",
  secondary:
    "border border-ink/15 bg-pearl text-ink hover:border-ink/35 hover:bg-white focus-visible:ring-ink",
  ghost:
    "text-ink hover:bg-ink/5 focus-visible:ring-ink",
  dark:
    "bg-pearl text-ink hover:bg-white focus-visible:ring-pearl"
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  icon: Icon,
  ariaLabel
}: ButtonLinkProps) {
  const classes = [
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 text-sm font-semibold leading-none transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    variants[variant],
    className
  ].join(" ");

  const content = (
    <>
      {Icon ? <Icon aria-hidden className="h-4 w-4 shrink-0" /> : null}
      <span>{children}</span>
    </>
  );

  if (/^(https?:|tel:|mailto:)/.test(href)) {
    return (
      <a
        aria-label={ariaLabel}
        className={classes}
        href={href}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        target={href.startsWith("http") ? "_blank" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <Link aria-label={ariaLabel} className={classes} href={href}>
      {content}
    </Link>
  );
}
