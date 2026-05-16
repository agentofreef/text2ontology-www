"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Keeps <html lang> in sync with the current locale. The root layout renders
 * once for a static export, so it always ships lang="en"; this effect flips it
 * to zh-CN on /zh/* routes and back, on initial load and on every client-side
 * navigation. It runs after hydration, so it produces no hydration mismatch.
 */
export function LangSync() {
  const pathname = usePathname();

  useEffect(() => {
    const isZh = pathname === "/zh" || pathname.startsWith("/zh/");
    document.documentElement.lang = isZh ? "zh-CN" : "en";
  }, [pathname]);

  return null;
}
