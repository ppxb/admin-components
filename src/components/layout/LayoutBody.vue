<script setup lang="ts">
import { computed } from 'vue';
import { useSidebar } from '@/composables/use-sidebar';
import { cn } from '@/lib/utils';

interface Props {
  class?: string;
  style?: Record<string, string | number>;
}
const props = defineProps<Props>();

const { collapsed } = useSidebar();

const containerClass = computed(() => {
  return cn(
    'grid transition-[grid-template-columns] duration-300 ease-in-out',
    'overflow-x-clip min-h-[var(--ca-layout-height)]',
    '[--ca-layout-height:100dvh] [--ca-header-height:64px]',
    props.class,
  );
});

const containerStyle = computed(() => {
  const baseStyle = {
    '--ca-sidebar-width': collapsed.value ? '0px' : '268px',
    gridTemplate: `"sidebar header" var(--ca-header-height)
                   "sidebar main" 1fr / var(--ca-sidebar-width) 1fr`,
    '--ca-top-reserve-height': 'var(--ca-banner-height, 0px)',
  } as const;
  return { ...baseStyle, ...(props.style || {}) };
});
</script>

<template>
  <div
    :class="containerClass"
    :data-sidebar-collapsed="collapsed"
    :style="containerStyle"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
