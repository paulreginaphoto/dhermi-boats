import type { ComponentType, ReactNode } from "react";
import { iconStrokeWidth } from "@/components/OutlineIcon";
import { conversionAttrs } from "@/lib/conversion";
import { sitePath } from "@/lib/site";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "dark";
  className?: string;
  icon?: ComponentType<{ className?: string; "aria-hidden"?: boolean; strokeWidth?: number }>;
  ariaLabel?: string;
  whatsappKey?: string;
  analyticsEvent?: string;
  analyticsPlacement?: string;
  analyticsTour?: string;
};

const variants = {
  primary:
    "bg-ink text-pearl shadow-soft hover:bg-navy focus-visible:ring-ink",
  secondary:
    "border border-ink/12 bg-pearl/88 text-ink hover:border-ink/28 hover:bg-white focus-visible:ring-ink",
  ghost:
    "text-ink hover:bg-ink/5 focus-visible:ring-ink",
  dark:
    "bg-pearl text-ink shadow-sm hover:bg-white focus-visible:ring-pearl"
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  icon: Icon,
  ariaLabel,
  whatsappKey,
  analyticsEvent,
  analyticsPlacement,
  analyticsTour
}: ButtonLinkProps) {
  const resolvedHref = sitePath(href);
  const analyticsData = analyticsPlacement
    ? conversionAttrs({ tourId: analyticsTour ?? whatsappKey ?? "default", placement: analyticsPlacement })
    : { "data-analytics-event": analyticsEvent };
  const classes = [
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold leading-none transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:translate-y-px",
    variants[variant],
    className
  ].join(" ");

  const content = (
    <>
      {Icon ? <Icon aria-hidden className="h-4 w-4 shrink-0" strokeWidth={iconStrokeWidth} /> : null}
      <span>{children}</span>
    </>
  );

  if (/^(https?:|tel:|mailto:)/.test(resolvedHref)) {
    return (
      <a
        aria-label={ariaLabel}
        className={classes}
        data-whatsapp-key={whatsappKey}
        href={resolvedHref}
        rel={resolvedHref.startsWith("http") ? "noreferrer" : undefined}
        target={resolvedHref.startsWith("http") ? "_blank" : undefined}
        {...analyticsData}
      >
        {content}
      </a>
    );
  }

  return (
    <a aria-label={ariaLabel} className={classes} data-whatsapp-key={whatsappKey} href={resolvedHref} {...analyticsData}>
      {content}
    </a>
  );
}
