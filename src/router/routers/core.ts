import type { RouteRecordRaw } from 'vue-router';

const fallbackNotFoundRoute: RouteRecordRaw = {
  component: () => import('@/views/_core/fallback/not-found.vue'),
  meta: {
    title: '404',
  },
  name: 'FallbackNotFound',
  path: '/:path(.*)*',
};
const coreRoutes: RouteRecordRaw[] = [
  {
    component: () => import('@/views/auth/index.vue'),
    meta: {
      title: 'Auth',
    },
    name: 'Auth',
    path: '/auth',
  },
];
export { coreRoutes, fallbackNotFoundRoute };
