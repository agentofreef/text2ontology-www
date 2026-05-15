import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind-aware className concat — clsx for conditional logic, twMerge to
 * resolve conflicting utilities (`text-sm` overrides `text-lg`, etc.).
 * Standard pattern; keep this file small.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
