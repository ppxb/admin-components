<script setup lang="ts">
import { provide } from 'vue';
import FullscreenToggle from './FullscreenToggle.vue';
import LanguageToggle from './LanguageToggle.vue';
import ThemeToggle from './ThemeToggle.vue';

const props = withDefaults(
  defineProps<{
    isLogin?: boolean;
  }>(),
  {
    isLogin: false,
  },
);

provide('isLogin', props.isLogin);

// TODO: usePreferencesStore
</script>

<template>
  <div class="flex items-center gap-2">
    <FullscreenToggle />
    <LanguageToggle />
    <ThemeToggle />
  </div>
</template>
