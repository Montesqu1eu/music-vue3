import { createRouter, createWebHistory } from 'vue-router';
import useUserStore from '@/stores/user';

const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('@/views/HomePage.vue'),
  },
  {
    name: 'about',
    path: '/about',
    component: () => import('@/views/AboutPage.vue'),
  },
  {
    name: 'manage',
    path: '/manage',
    component: () => import('@/views/ManagePage.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500',
});

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    next();
    return;
  }

  const store = useUserStore();

  store.userLoggedIn ? next() : next({ name: 'home' });
});

export default router;
