import type { ThemePreset } from '@/types/preferences';

export interface ThemePresetConfig {
  name: string;
  light: string;
  dark: string;
}

export const THEME_PRESETS: Record<ThemePreset, ThemePresetConfig> = {
  default: {
    name: '默认',
    light: '20.5% 0 0',
    dark: '92.2% 0 0',
  },
  violet: {
    name: '紫罗兰',
    light: '57% 0.22 293',
    dark: '67% 0.22 293',
  },
  pink: {
    name: '粉红',
    light: '60% 0.24 350',
    dark: '70% 0.24 350',
  },
  yellow: {
    name: '明黄',
    light: '75% 0.18 95',
    dark: '85% 0.18 95',
  },
  'sky-blue': {
    name: '天蓝',
    light: '60% 0.20 230',
    dark: '70% 0.20 230',
  },
  green: {
    name: '翠绿',
    light: '55% 0.20 145',
    dark: '65% 0.20 145',
  },
  orange: {
    name: '橙色',
    light: '65% 0.22 45',
    dark: '75% 0.22 45',
  },
  rose: {
    name: '玫瑰',
    light: '55% 0.24 15',
    dark: '65% 0.24 15',
  },
  zinc: {
    name: '锌灰',
    light: '35% 0.015 255',
    dark: '85% 0.015 255',
  },
  slate: {
    name: '石板',
    light: '40% 0.02 240',
    dark: '80% 0.02 240',
  },
  gray: {
    name: '中性灰',
    light: '35% 0.01 0',
    dark: '85% 0.01 0',
  },
};

export function toOklch(value: string) {
  return `oklch(${value}deg)`;
}

export function fromOklch(value: string) {
  const match = value.match(/oklch\((.*?)\)/);
  return match ? match[1] : value;
}
