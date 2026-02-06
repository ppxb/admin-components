<script setup lang="ts">
import { computed } from 'vue';
import { useSidebar } from '@/composables/use-sidebar';
import { cn } from '@/lib/utils';

interface Props {
  class?: string;
}

const props = defineProps<Props>();

const { collapsed } = useSidebar();

const containerClass = computed(() => {
  return cn(
    'min-h-screen w-full',
    'grid transition-[grid-template-columns] duration-300 ease-in-out',
    'overflow-x-clip',
    props.class,
  );
});

const containerStyle = computed(() => {
  const sidebarCol = collapsed.value ? '0px' : '268px';

  return {
    '--sidebar-width': '268px',
    '--sidebar-col': sidebarCol,
    '--header-height': '64px',
    gridTemplate: `"sidebar header" var(--header-height)
                   "sidebar main" 1fr / minmax(var(--sidebar-col), auto) 1fr`,
  } as Record<string, string>;
});
</script>

<template>
  <div
    :class="containerClass"
    :style="containerStyle"
    :data-sidebar-collapsed="collapsed"
  >
    <slot />
  </div>
</template>
