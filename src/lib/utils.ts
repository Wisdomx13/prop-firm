import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const years = () => {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let year = currentYear; year >= 1900; year--) {
    years.push(year);
  }
  return years;
};
