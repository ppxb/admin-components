<script setup lang="ts">
import { Bell, Menu, Settings } from 'lucide-vue-next';
import { computed } from 'vue';
import { useSidebar } from '@/composables/use-sidebar';
import { cn } from '@/lib/utils';

interface Props {
  class?: string;
}

const props = defineProps<Props>();

const { collapsed, toggleSidebar } = useSidebar();

const headerClass = computed(() => {
  return cn(
    'absolute top-0 right-0',
    'flex justify-end items-center gap-4',
    'border-b bg-background/80 backdrop-blur-sm',
    'px-4 h-16',
    'transition-all duration-200',
    !collapsed.value && 'left-0',
    collapsed.value && [
      'md:top-4 md:mx-4 md:rounded-2xl md:border md:absolute',
    ],
    props.class,
  );
});
</script>

<template>
  <header :class="headerClass">
    <button
      class="hover:bg-accent rounded-md p-2 transition-colors md:hidden"
      aria-label="Toggle sidebar"
      @click="toggleSidebar"
    >
      <Menu class="h-5 w-5" />
    </button>

    <div class="flex items-center gap-4">
      <slot name="left">
        <h1 class="text-xl font-semibold md:hidden">Vue3 布局</h1>
      </slot>
    </div>

    <div class="flex items-center gap-2">
      <slot name="right">
        <button
          class="hover:bg-accent relative hidden h-9 w-9 items-center justify-center rounded-lg transition-colors md:inline-flex"
          aria-label="通知"
        >
          <Bell class="h-4 w-4" />
          <span
            class="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500"
          />
        </button>

        <button
          class="hover:bg-accent hidden h-9 w-9 items-center justify-center rounded-lg transition-colors md:inline-flex"
          aria-label="设置"
        >
          <Settings class="h-4 w-4" />
        </button>

        <div class="bg-border mx-1 hidden h-6 w-px md:block" />

        <button
          class="hover:bg-accent flex items-center gap-2 rounded-lg p-1.5 transition-colors"
        >
          <div
            class="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-purple-500 to-pink-500 text-xs font-semibold text-white"
          >
            JD
          </div>
          <div class="hidden text-left lg:block">
            <div class="text-sm font-medium">John Doe</div>
            <div class="text-muted-foreground text-xs">john@example.com</div>
          </div>
        </button>
      </slot>
    </div>
  </header>
</template>
