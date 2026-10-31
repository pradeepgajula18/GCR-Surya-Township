import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(amount?: number): string {
  if (amount === undefined || amount === null || isNaN(amount)) return 'Price on Request';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function sqYardsToSqFt(sqYards: number): number {
  return Math.round(sqYards * 9);
}

export function sqYardsToCents(sqYards: number): string {
  return (sqYards / 48.4).toFixed(2);
}

