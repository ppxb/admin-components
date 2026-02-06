<script setup lang="ts">
import { PanelLeft, Sidebar as SidebarIcon } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import { useSidebar } from '@/composables/use-sidebar';
import { cn } from '@/lib/utils';

const { collapsed, hovered, toggleSidebar, setHovered } = useSidebar();

const hoverTimeoutRef = ref<number>(0);

// 侧边栏占位容器（桌面端）
const placeholderClass = cn(
  'sticky top-0 z-20',
  'pointer-events-none',
  'h-screen',
  'max-md:hidden',
  '[grid-area:sidebar]',
);

// 侧边栏本体
const sidebarClass = computed(() => {
  return cn(
    // 基础样式
    'absolute start-0 inset-y-0',
    'flex flex-col w-[268px]',
    'bg-card text-sm border-r',
    'transition-all duration-200 ease-in-out',
    'pointer-events-auto',
    // 折叠状态
    collapsed.value && [
      // 完全隐藏（向左移出）
      '-translate-x-[268px] rtl:translate-x-[268px]',
      // 悬停时显示
      hovered.value && ['translate-x-0', 'border', 'rounded-xl', 'inset-2'],
    ],
  );
});

// 移动端抽屉样式
const drawerClass = computed(() => {
  return cn(
    'fixed end-0 inset-y-0 z-40',
    'w-[85%] max-w-[380px]',
    'flex flex-col ',
    'bg-background',
    'md:hidden',
    'transition-transform duration-300',
    collapsed.value ? 'translate-x-full' : 'translate-x-0',
  );
});

const handleMouseEnter = () => {
  if (!collapsed.value) return;
  if (hoverTimeoutRef.value) {
    window.clearTimeout(hoverTimeoutRef.value);
  }
  setHovered(true);
};

const handleMouseLeave = (e: MouseEvent) => {
  if (!collapsed.value) return;
  if (hoverTimeoutRef.value) {
    window.clearTimeout(hoverTimeoutRef.value);
  }

  // 如果鼠标移出位置离边缘很近，立即关闭；否则延迟关闭
  const delay =
    Math.min(e.clientX, document.body.clientWidth - e.clientX) > 100 ? 0 : 500;

  hoverTimeoutRef.value = window.setTimeout(() => {
    setHovered(false);
  }, delay);
};

// 内部折叠按钮（在侧边栏内部右上角）
const collapseButtonClass = cn(
  'absolute top-4 right-4',
  'h-8 w-8 items-center justify-center',
  'rounded-md border bg-background',
  'transition-all hover:bg-accent',
  'z-10',
  'hidden md:flex',
);

// 浮动面板（折叠后显示在左上角）
const floatingPanelClass = computed(() => {
  return cn(
    'fixed top-4 start-4',
    'flex gap-0.5 p-0.5',
    'rounded-xl border',
    'bg-muted text-muted-foreground',
    'z-10 transition-opacity duration-200',
    // 只在折叠且未悬停时显示
    (!collapsed.value || hovered.value) && 'pointer-events-none opacity-0',
  );
});

const floatingButtonClass = cn(
  'h-8 w-8 inline-flex items-center justify-center',
  'rounded-lg',
  'transition-colors',
  'hover:bg-accent hover:text-accent-foreground',
);
</script>

<template>
  <!-- 桌面端：占位容器 + 悬浮侧边栏 -->
  <div :class="placeholderClass" class="hidden md:block">
    <!-- 折叠时显示4px宽度的触发区域 -->
    <div
      v-if="collapsed"
      class="pointer-events-auto absolute inset-y-0 start-0 w-4"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    />

    <!-- 侧边栏主体 -->
    <aside
      :class="sidebarClass"
      :data-collapsed="collapsed"
      :data-hovered="hovered"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <button
        :class="collapseButtonClass"
        aria-label="Collapse sidebar"
        @click="toggleSidebar"
      >
        <PanelLeft class="h-4 w-4" />
      </button>

      <!-- 侧边栏内容 -->
      <div class="flex h-full flex-col overflow-hidden">
        <slot>
          <!-- 默认占位内容 -->
          <div class="flex h-full flex-col p-6">
            <!-- Logo 区域 -->
            <div class="mb-8">
              <div class="bg-primary/10 h-8 w-32 rounded" />
            </div>

            <!-- 导航项占位 -->
            <nav class="flex-1 space-y-2 overflow-y-auto">
              <div
                v-for="i in 8"
                :key="i"
                class="bg-muted/50 h-10 rounded-md"
              />
            </nav>

            <!-- 底部区域占位 -->
            <div class="mt-auto space-y-2 border-t pt-4">
              <div class="bg-muted/50 h-10 rounded-md" />
            </div>
          </div>
        </slot>
      </div>
    </aside>
  </div>

  <!-- 桌面端：浮动控制面板（折叠时显示） -->
  <div :class="floatingPanelClass">
    <button
      :class="floatingButtonClass"
      aria-label="Open sidebar"
      @click="toggleSidebar"
    >
      <SidebarIcon class="h-4 w-4" />
    </button>
  </div>

  <!-- 移动端：遮罩层 -->
  <Transition
    enter-active-class="transition-opacity duration-300"
    leave-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div
      v-if="!collapsed"
      class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
      @click="toggleSidebar"
    />
  </Transition>

  <!-- 移动端：抽屉式侧边栏 -->
  <aside :class="drawerClass" :data-state="collapsed ? 'closed' : 'open'">
    <div class="flex h-full flex-col overflow-hidden">
      <slot name="mobile">
        <slot />
      </slot>
    </div>
  </aside>
</template>
