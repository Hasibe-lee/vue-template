import { useLayoutStore } from '@/stores/layout.js';
import { createRouter, createWebHistory } from 'vue-router';
import { autoRoutes, notFoundRoute } from '@/routes/auto-routes.js';
import PageLayout from '@/components/common/PageLayout/index.vue';
// import PageLayout from '@/components/common/PageLayout.vue';
import intercept from './intercept';

// const storeLayout = useLayoutStore();
// const { removeActive } = storeLayout;

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

// const originalBack = router.back
// router.back = function (...args) {
// removeActive
//   originalBack(...args);
// }

export default router;
