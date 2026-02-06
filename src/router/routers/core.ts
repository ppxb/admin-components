import type { RouteRecordRaw } from 'vue-router';

const coreRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/auth',
  },
  {
    component: () => import('@/views/auth/index.vue'),
    meta: {
      title: 'Auth',
    },
    name: 'Auth',
    path: '/auth',
  },
  {
    component: () => import('@/views/test/index.vue'),
    name: 'Test',
    path: '/test',
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
