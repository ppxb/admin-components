import type { RouteRecordRaw } from 'vue-router';

const coreRoutes: RouteRecordRaw[] = [
  {
    component: () => import('@/views/auth/index.vue'),
    meta: {
      title: 'Auth',
    },
    name: 'Auth',
    path: '/',
  },
];

const fallbackNotFoundRoute: RouteRecordRaw = {
  component: () => import('@/views/_core/fallback/not-found.vue'),
  meta: {
    title: '404',
  },
  name: 'FallbackNotFound',
  path: '/:path(.*)*',
};

export { coreRoutes, fallbackNotFoundRoute };
