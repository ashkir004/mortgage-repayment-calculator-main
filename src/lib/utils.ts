import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(inputs));
}

// format number with commas as thousands separators
export function formatNumber(value: string) {
  const number = value.replace(/,/g, '');

  if (!number) return '';
  if (isNaN(Number(number))) return '';

  const formattedNumber = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(Number(number));

  return formattedNumber;
}

// Remove all non-digit and non-decimal point characters. also, one decimal point is allowed
export function sanitizeNumberInput(value: string) {
  let sanitizedValue = value.replace(/[^0-9.]/g, '');

  const parts = sanitizedValue.split('.');
  if (parts.length > 2) {
    sanitizedValue = parts[0] + '.' + parts.slice(1).join('');
  }
  return sanitizedValue;
}