<script setup lang="ts">
import { PanelLeft } from 'lucide-vue-next';
import { computed } from 'vue';
import { useSidebar } from '@/composables/use-sidebar';
import { cn } from '@/lib/utils';

interface Props {
  class?: string;
  style?: Record<string, string | number>;
}

const props = defineProps<Props>();

const { collapsed, toggleSidebar } = useSidebar();

const sidebarClass = computed(() => {
  return cn(
    'grid-area: sidebar flex-shrink-0 z-100',
    'h-full min-h-[100dvh]',
    'bg-white border-r border-gray-200 relative',
    'w-[var(--ca-sidebar-width)] transition-[width,transform] duration-300 ease-in-out',
    collapsed.value ? '-translate-x-full opacity-0 pointer-events-none' : 'translate-x-0 opacity-100',
    props.class,
  );
});

const panelLeftIconClass = cn(
  'w-6 h-6 flex items-center justify-center',
  'text-gray-700',
  'rounded-full bg-white/80 shadow-sm hover:bg-gray-100 hover:text-gray-900',
  'transition-colors duration-200',
);
</script>

<template>
  <button
    class="fixed top-4 left-4 p-2"
    aria-label="切换侧边栏"
    title="切换侧边栏"
    @click="toggleSidebar"
  >
    <PanelLeft :class="panelLeftIconClass" />
  </button>

  <aside :class="sidebarClass" :style="props.style" v-bind="$attrs">
    <slot>
      <div class="flex h-full flex-col gap-4 p-4">
        <div class="pt-2">
          <h3 class="text-lg font-bold text-gray-800">侧边栏标题</h3>
          <p class="mt-1 text-sm text-gray-500">自定义侧边栏内容</p>
        </div>

        <button
          class="absolute top-4 right-4 p-2"
          aria-label="收缩侧边栏"
          title="收缩侧边栏"
          @click="toggleSidebar"
        >
          <PanelLeft :class="panelLeftIconClass" />
        </button>

        <div class="mt-2 flex-1">
          <div class="text-sm text-gray-600">侧边栏内容区域</div>
        </div>

        <div class="border-t border-gray-100 pt-2 text-xs text-gray-400">
          底部辅助内容
        </div>
      </div>
    </slot>
  </aside>
</template>
