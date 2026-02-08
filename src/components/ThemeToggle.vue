<script setup lang="ts">
import { ref, watch } from 'vue';
import { LucideMoon, LucideSun } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { preferencesManager } from '@/layouts/preferences/preferences';
import { usePreferences } from '@/layouts/preferences/use-preferences';
import { cn } from '@/lib/utils';

withDefaults(
  defineProps<{
    isLogin?: boolean;
  }>(),
  {
    isLogin: false,
  },
);

const { theme } = usePreferences();

const currentTheme = ref(theme.value);

watch(theme, (newTheme) => {
  currentTheme.value = newTheme;
});

type Theme = 'light' | 'dark';

const toggleTheme = () => {
  const themes = ['light', 'dark'] as const;
  const currentIndex = themes.indexOf(currentTheme.value as Theme);
  const nextIndex = (currentIndex + 1) % themes.length;
  const nextTheme = themes[nextIndex];

  preferencesManager.updatePreferences({
    theme: { mode: nextTheme },
  });
};
</script>

<template>
  <Button
    variant="ghost"
    size="icon-sm"
    :class="cn('rounded-lg', isLogin && 'bg-background border')"
    @click="toggleTheme"
  >
    <LucideSun
      class="absolute scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
    />
    <LucideMoon
      class="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
    />
    <span class="sr-only">Switch Theme</span>
  </Button>
</template>
