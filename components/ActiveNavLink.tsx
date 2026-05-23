"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { basePath } from "@/lib/site";

type ActiveNavLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  activePaths?: string[];
};

function stripBasePath(pathname: string) {
  if (!basePath) return pathname;
  if (pathname === basePath) return "/";
  return pathname.startsWith(`${basePath}/`) ? pathname.slice(basePath.length) : pathname;
}

function normalizePath(pathname: string) {
  const stripped = stripBasePath(pathname || "/");
  const withLeadingSlash = stripped.startsWith("/") ? stripped : `/${stripped}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`;
}

function pathnameFromHref(href: string) {
  if (/^(https?:|tel:|mailto:|#)/.test(href)) return href;

  try {
    return new URL(href, "https://dhermi.boats").pathname;
  } catch {
    return href;
  }
}

export function ActiveNavLink({
  href,
  children,
  className = "",
  activeClassName = "",
  activePaths
}: ActiveNavLinkProps) {
  const pathname = usePathname() || "/";
  const currentPath = normalizePath(pathname);
  const fallbackPath = normalizePath(pathnameFromHref(href));
  const matchPaths = activePaths?.length ? activePaths : [fallbackPath];
  const isActive = matchPaths.some((path) => {
    const isPrefix = path.endsWith("*");
    const normalized = normalizePath(isPrefix ? path.slice(0, -1) : path);

    if (normalized === "/") return currentPath === "/";
    return isPrefix ? currentPath.startsWith(normalized) : currentPath === normalized;
  });

  return (
    <a aria-current={isActive ? "page" : undefined} className={[className, isActive ? activeClassName : ""].filter(Boolean).join(" ")} href={href}>
      {children}
    </a>
  );
}
