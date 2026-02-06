<script setup lang="ts">
import { Menu } from 'lucide-vue-next';
import { computed } from 'vue';
import { useSidebar } from '@/composables/use-sidebar';
import { cn } from '@/lib/utils';

interface Props {
  class?: string;
}

const props = defineProps<Props>();

const { toggleSidebar } = useSidebar();

const headerClass = computed(() => {
  return cn(
    // 基础样式
    'sticky top-0',
    'flex items-center gap-4',
    'border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
    'px-4 h-16',
    // 响应式
    'md:col-start-2',
    props.class,
  );
});
</script>

<template>
  <header :class="headerClass">
    <!-- 移动端菜单按钮 -->
    <button
      class="hover:bg-accent rounded-md p-2 transition-colors md:hidden"
      aria-label="Toggle sidebar"
      @click="toggleSidebar"
    >
      <Menu class="h-5 w-5" />
    </button>

    <slot />
  </header>
</template>
