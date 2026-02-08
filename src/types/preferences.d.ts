import type { SupportedLanguagesType } from './i18n';

export type ThemeMode = 'light' | 'dark' | 'auto';

export type ThemePreset =
  | 'default'
  | 'violet'
  | 'pink'
  | 'yellow'
  | 'sky-blue'
  | 'green'
  | 'orange'
  | 'rose'
  | 'zinc'
  | 'slate'
  | 'gray';

export interface AppPreferences {
  locale: SupportedLanguagesType;
}

export interface ThemePreferences {
  mode: ThemeMode;
  preset: ThemePreset;
}

export interface Preferences {
  app: AppPreferences;
  theme: ThemePreferences;
}

export type PreferencesPayload = Partial<{
  app: Partial<AppPreferences>;
  theme: Partial<ThemePreferences>;
}>;
