import type { ComponentType } from "react";

export const iconStrokeWidth = 1.75;

export type OutlineIconComponent = ComponentType<{
  "aria-hidden"?: boolean;
  className?: string;
  strokeWidth?: number;
}>;

const frameSizes = {
  sm: "h-9 w-9",
  md: "h-11 w-11",
  lg: "h-14 w-14",
  xl: "h-16 w-16"
};

const iconSizes = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-7 w-7"
};

const variants = {
  sand: "border-ink/10 bg-pearl text-turquoise shadow-sm",
  glass: "border-white/20 bg-white/12 text-pearl shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-md",
  dark: "border-white/15 bg-white/8 text-sand",
  soft: "border-turquoise/18 bg-turquoise-soft/70 text-turquoise"
};

export function IconFrame({
  icon: Icon,
  size = "md",
  variant = "sand",
  className = "",
  iconClassName = ""
}: {
  icon: OutlineIconComponent;
  size?: keyof typeof frameSizes;
  variant?: keyof typeof variants;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <span
      aria-hidden
      className={[
        "inline-flex shrink-0 items-center justify-center rounded-md border",
        frameSizes[size],
        variants[variant],
        className
      ].join(" ")}
    >
      <Icon className={[iconSizes[size], iconClassName].filter(Boolean).join(" ")} strokeWidth={iconStrokeWidth} />
    </span>
  );
}
