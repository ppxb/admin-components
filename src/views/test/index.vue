<script setup lang="ts">
import LayoutBody from '@/components/layout/LayoutBody.vue';
import LayoutHeader from '@/components/layout/LayoutHeader.vue';
import Sidebar from '@/components/sidebar/Sidebar.vue';
import { useSidebar } from '@/composables/use-sidebar';

const { collapsed } = useSidebar();
</script>

<template>
  <LayoutBody class="bg-gray-50">
    <Sidebar />

    <LayoutHeader class="flex items-center border-b bg-white p-4">
      <h1 class="text-xl font-bold">Vue3 布局示例</h1>
    </LayoutHeader>

    <main class="overflow-auto p-6" style="grid-area: main">
      <h2 class="text-lg font-semibold">主内容区域</h2>
      <p class="mt-2">侧边栏状态：{{ collapsed ? '已隐藏' : '已展开' }}</p>
    </main>
  </LayoutBody>
</template>
