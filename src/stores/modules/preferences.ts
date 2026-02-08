import type { Preferences, PreferencesPayload, ThemeMode } from '@/types';
import type { SupportedLanguagesType } from '@/types/i18n';
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import { THEME_PRESETS, toOklch } from '@/preferences/constants';

const DEFAULT_PREFERENCES: Preferences = {
  app: {
    locale: 'en-US',
  },
  theme: {
    mode: 'auto',
    preset: 'default',
  },
};

export const usePreferencesStore = defineStore('preferences', () => {
  const preferences = ref<Preferences>(DEFAULT_PREFERENCES);
  const themeMode = computed(() => preferences.value.theme.mode);
  const themePreset = computed(() => preferences.value.theme.preset);

  const isDark = computed(() => {
    const mode = themeMode.value;
    if (mode === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return mode === 'dark';
  });

  const actualTheme = computed(() => (isDark.value ? 'dark' : 'light'));

  const locale = computed(() => preferences.value.app.locale);

  function updatePreferences(payload: PreferencesPayload) {
    preferences.value = {
      app: { ...preferences.value.app, ...payload.app },
      theme: { ...preferences.value.theme, ...payload.theme },
    };
  }

  function setThemeMode(mode: ThemeMode) {
    updatePreferences({ theme: { mode } });
  }

  function setThemePreset(preset: Preferences['theme']['preset']) {
    updatePreferences({ theme: { preset } });
  }

  function setLocale(locale: SupportedLanguagesType) {
    updatePreferences({ app: { locale } });
  }

  function init() {
    applyTheme();

    watch(
      () => [themeMode.value, themePreset.value, isDark.value],
      () => applyTheme(),
    );

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', () => {
      if (themeMode.value === 'auto') {
        applyTheme();
      }
    });
  }

  function applyTheme() {
    const root = document.documentElement;

    root.classList.toggle('dark', isDark.value);

    const presetConfig = THEME_PRESETS[themePreset.value];
    if (presetConfig) {
      const primaryColor = isDark.value
        ? toOklch(presetConfig.dark)
        : toOklch(presetConfig.light);

      root.style.setProperty('--primary', primaryColor);
      root.style.setProperty('--sidebar-primary', primaryColor);
    }
    root.style.colorScheme = actualTheme.value;
  }

  return {
    preferences,
    themeMode,
    themePreset,
    isDark,
    actualTheme,
    locale,
    updatePreferences,
    setThemeMode,
    setThemePreset,
    setLocale,
    init,
  };
});
