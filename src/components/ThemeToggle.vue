<script setup lang="ts">
import { computed } from 'vue';
import { LucideMonitor, LucideMoon, LucideSun } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePreferencesStore } from '@/stores/modules/preferences';

withDefaults(
  defineProps<{
    isLogin?: boolean;
  }>(),
  {
    isLogin: false,
  },
);

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
</script>

<template>
  <Button
    variant="ghost"
    size="icon-sm"
    :class="cn('rounded-lg', isLogin && 'bg-background border')"
    @click="toggleTheme"
  >
    <component :is="ThemeIcon" class="size-4" />
    <span class="sr-only">Switch Theme</span>
  </Button>
</template>
