import { createRouter, createWebHistory } from 'vue-router';
import { autoRoutes, notFoundRoute } from '@/routes/auto-routes.js';
import PageLayout from '@/components/common/PageLayout.vue';
import intercept from './intercept';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: PageLayout,
      children: autoRoutes,
    },
    notFoundRoute,
  ],
});
intercept(router);

export default router;
