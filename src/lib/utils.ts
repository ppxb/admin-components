import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { localStg } from './storage';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAuthorization() {
  const token = localStg.get('token');
  return token ? `Bearer ${token}` : null;
}
