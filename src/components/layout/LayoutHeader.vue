<script setup lang="ts">
import { Bell, Menu, PanelLeft, Settings } from 'lucide-vue-next';
import { computed } from 'vue';
import ToggleLanguage from '@/components/toggle-language.vue';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/composables/use-sidebar';
import { cn } from '@/lib/utils';

interface Props {
  class?: string;
}

const props = defineProps<Props>();

const { collapsed, toggleSidebar } = useSidebar();

const appTitle = import.meta.env.VITE_APP_TITLE;

const headerClass = computed(() => {
  return cn(
    'absolute top-0 right-0 left-0',
    'flex justify-between items-center gap-20',
    'border-b bg-background/60 backdrop-blur-sm',
    'px-4 h-16',
    'transition-all duration-200',
    collapsed.value && [
      'md:top-4 md:left-54 md:right-54 md:rounded-3xl md:border md:bg-transparent md:border-none backdrop-blur-none',
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

    <h1 class="text-xl font-semibold md:hidden">Vue3 布局</h1>

    <div
      class="flex-1 bg-blue-200"
      :class="
        collapsed
          ? 'bg-background/60! rounded-xl border p-2 backdrop-blur-sm'
          : ''
      "
    >
      <Button
        variant="ghost"
        size="icon-sm"
        class="rounded-lg"
        @click="toggleSidebar"
      >
        <PanelLeft />
      </Button>
    </div>
    <div
      class="flex-2 bg-amber-500"
      :class="
        collapsed
          ? 'bg-background/60! rounded-xl border px-4 py-3 backdrop-blur-sm'
          : ''
      "
    >
      <div class="flex items-center gap-2">
        <img src="/logo.svg?url" alt="logo" class="size-6" />
        <div class="font-bold md:text-lg">
          {{ appTitle }}
        </div>
      </div>
    </div>
    <div
      class="flex items-center gap-2"
      :class="
        collapsed
          ? 'bg-background/60 rounded-xl border px-2 backdrop-blur-sm'
          : ''
      "
    >
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

      <ToggleLanguage />

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
    </div>
  </header>
</template>
