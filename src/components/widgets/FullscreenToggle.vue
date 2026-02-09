<script setup lang="ts">
import { useFullscreen } from '@vueuse/core';
import { inject } from 'vue';
import { LucideExitFullscreen, LucideFullscreen } from '@/components/icons';
import Button from '@/components/ui/button/Button.vue';

const isLogin = inject('isLogin', false);
const { isFullscreen, toggle } = useFullscreen();
</script>

<template>
  <Button
    v-if="!isLogin"
    variant="ghost"
    size="icon-sm"
    class="rounded-lg"
    @click="toggle"
  >
    <LucideExitFullscreen v-if="isFullscreen" />
    <LucideFullscreen v-else />
  </Button>
</template>
