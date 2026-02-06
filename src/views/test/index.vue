<script setup lang="ts">
import LayoutBody from '@/components/layout/LayoutBody.vue';
import LayoutHeader from '@/components/layout/LayoutHeader.vue';
import Sidebar from '@/components/sidebar/Sidebar.vue';
import { useSidebar } from '@/composables/use-sidebar';

const { collapsed, hovered } = useSidebar();
</script>

<template>
  <LayoutBody class="bg-background">
    <!-- 侧边栏 -->
    <Sidebar />

    <!-- 主内容容器 -->
    <div class="flex min-h-screen flex-col">
      <!-- 顶部导航（仅移动端） -->
      <LayoutHeader>
        <h1 class="text-xl font-semibold">Vue3 响应式布局</h1>
        <div class="ml-auto flex items-center gap-4">
          <span class="text-muted-foreground text-sm">
            {{ collapsed ? '已折叠' : '已展开' }}
            {{ hovered ? '(悬停)' : '' }}
          </span>
        </div>
      </LayoutHeader>

      <!-- 主内容区域 -->
      <main class="flex-1 overflow-auto p-6">
        <div class="mx-auto max-w-4xl space-y-8">
          <!-- 欢迎区域 -->
          <section class="bg-card rounded-lg border p-6 shadow-sm">
            <h2 class="mb-4 text-2xl font-bold">欢迎使用 Vue3 布局系统 🎉</h2>
            <p class="text-muted-foreground mb-4">
              这是一个功能完整的响应式布局示例，完全参考 Fumadocs 的实现方式：
            </p>
            <ul class="space-y-2 text-sm">
              <li class="flex items-start gap-2">
                <span class="text-primary font-bold">✓</span>
                <span>侧边栏完全折叠时移出视口</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-primary font-bold">✓</span>
                <span>折叠后左上角显示浮动按钮</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-primary font-bold">✓</span>
                <span>Hover 时侧边栏滑入并带圆角阴影</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-primary font-bold">✓</span>
                <span>主内容区自动扩展占满全宽</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-primary font-bold">✓</span>
                <span>移动端抽屉式侧边栏</span>
              </li>
            </ul>
          </section>

          <!-- 使用说明 -->
          <section class="bg-card rounded-lg border p-6 shadow-sm">
            <h3 class="mb-3 text-lg font-semibold">💡 使用说明</h3>
            <div class="text-muted-foreground space-y-4 text-sm">
              <div class="bg-muted/50 rounded-md p-4">
                <strong class="text-foreground mb-2 block">🖥️ 桌面端：</strong>
                <ul class="list-inside list-disc space-y-1">
                  <li>
                    点击侧边栏右上角的
                    <code class="bg-background rounded px-1 py-0.5 text-xs"
                      >&lt;</code
                    >
                    按钮折叠侧边栏
                  </li>
                  <li>折叠后，侧边栏完全移出视口，主内容占满全宽</li>
                  <li>左上角会出现浮动按钮（侧边栏图标），点击可重新打开</li>
                  <li>
                    鼠标悬停在左侧边缘 4px 区域或浮动按钮，侧边栏会滑入显示
                  </li>
                  <li>悬停时侧边栏带圆角和阴影效果</li>
                </ul>
              </div>
              <div class="bg-muted/50 rounded-md p-4">
                <strong class="text-foreground mb-2 block">📱 移动端：</strong>
                <ul class="list-inside list-disc space-y-1">
                  <li>点击顶部导航栏左侧的菜单图标打开侧边栏</li>
                  <li>侧边栏以抽屉形式从右侧滑入</li>
                  <li>点击遮罩层或导航项自动关闭</li>
                </ul>
              </div>
            </div>
          </section>

          <!-- 状态指示器 -->
          <section
            class="from-primary/5 to-primary/10 rounded-lg border bg-linear-to-br p-6 shadow-sm"
          >
            <h3 class="mb-3 text-lg font-semibold">📊 当前状态</h3>
            <div class="grid gap-3 sm:grid-cols-2">
              <div
                class="bg-background/80 flex items-center gap-3 rounded-md p-3 backdrop-blur"
              >
                <div
                  class="h-3 w-3 rounded-full transition-colors"
                  :class="[collapsed ? 'bg-amber-500' : 'bg-green-500']"
                />
                <div>
                  <div class="text-muted-foreground text-xs">侧边栏</div>
                  <div class="font-semibold">
                    {{ collapsed ? '已折叠' : '已展开' }}
                  </div>
                </div>
              </div>
              <div
                class="bg-background/80 flex items-center gap-3 rounded-md p-3 backdrop-blur"
              >
                <div
                  class="h-3 w-3 rounded-full transition-colors"
                  :class="[hovered ? 'bg-blue-500' : 'bg-gray-400']"
                />
                <div>
                  <div class="text-muted-foreground text-xs">悬停状态</div>
                  <div class="font-semibold">
                    {{ hovered ? '悬停中' : '未悬停' }}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- 演示卡片 -->
          <section class="space-y-3">
            <h3 class="text-lg font-semibold">📦 内容示例</h3>
            <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div
                v-for="i in 6"
                :key="i"
                class="bg-card rounded-lg border p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div
                  class="from-primary/20 to-primary/10 mb-3 h-6 w-3/4 rounded bg-linear-to-r"
                />
                <div class="space-y-2">
                  <div class="bg-muted/80 h-4 rounded" />
                  <div class="bg-muted/60 h-4 w-5/6 rounded" />
                  <div class="bg-muted/40 h-4 w-4/6 rounded" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  </LayoutBody>
</template>

<style scoped>
code {
  font-family: Monaco, 'Courier New', monospace;
}
</style>
