import { useLayoutStore } from '@/stores/layout.js';

export default function (router) {
  const storeLayout = useLayoutStore();
  const { addActive } = storeLayout;

  router.beforeEach((to, from) => {
    if (from.name === void 0) {
      addActive(to.name);
    }
  });
};
