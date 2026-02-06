<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useSidebar } from '@/composables/use-sidebar';

const props = defineProps<HTMLAttributes>();

const { toggleSidebar } = useSidebar();
</script>

<template>
  <header
    class="grid-area: header"
    :class="[props.class]"
    :style="props.style"
    v-bind="$attrs"
  >
    <slot />
    <button
      class="ml-auto rounded-md p-2 hover:bg-gray-100"
      @click="toggleSidebar"
    >
      切换侧边栏
    </button>
  </header>
</template>
