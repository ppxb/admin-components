<script setup lang="ts">
import { useFullscreen } from '@vueuse/core';
import Button from '@/components/ui/button/Button.vue';
import { LucideExitFullscreen, LucideFullscreen } from '@/components/icons';
import { inject } from 'vue';

const isLogin = inject('isLogin', false);
const { isFullscreen, toggle } = useFullscreen();
</script>

<template>
  <Button
    variant="ghost"
    size="icon-sm"
    class="rounded-lg"
    @click="toggle"
    v-if="!isLogin"
  >
    <LucideExitFullscreen v-if="isFullscreen" />
    <LucideFullscreen v-else />
  </Button>
</template>
