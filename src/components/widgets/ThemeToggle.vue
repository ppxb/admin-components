<script setup lang="ts">
import { computed, inject } from 'vue';
import { LucideMonitor, LucideMoon, LucideSun } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePreferencesStore } from '@/stores/modules/preferences';

const isLogin = inject('isLogin', false);

const preferencesStore = usePreferencesStore();

const currentMode = computed(() => {
  return preferencesStore.preferences.theme.mode;
});

const toggleTheme = () => {
  const modes = ['light', 'dark', 'auto'] as const;
  const currentIndex = modes.indexOf(currentMode.value);
  const nextIndex = (currentIndex + 1) % modes.length;
  const nextMode = modes[nextIndex];

  preferencesStore.updatePreferences({
    theme: { mode: nextMode },
  });
};

const ThemeIcon = computed(() => {
  switch (currentMode.value) {
    case 'light':
      return LucideMoon;
    case 'dark':
      return LucideSun;
    case 'auto':
      return LucideMonitor;
    default:
      return LucideSun;
  }
});

const buttonClass = computed(() =>
  cn('rounded-lg', isLogin && 'bg-background border'),
);
</script>

<template>
  <Button
    variant="ghost"
    size="icon-sm"
    :class="buttonClass"
    @click="toggleTheme"
  >
    <component :is="ThemeIcon" />
    <span class="sr-only">Switch Theme</span>
  </Button>
</template>
