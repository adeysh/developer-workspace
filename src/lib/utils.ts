import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const notesTableColumns = "grid-cols-[minmax(0,1fr)_220px_140px_96px]";
