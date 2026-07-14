import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const notesTableColumns =
  "grid-cols-[56px_minmax(0,1fr)_220px_140px_96px]";
