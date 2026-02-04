import type { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createRouterGuard } from './guard';
import { routes } from './routers';
const router = createRouter({
  history: createWebHistory(),
  routes,
});
/** Setup Vue Router */
export async function setupRouter(app: App) {
  app.use(router);
  createRouterGuard(router);
  await router.isReady();
}
