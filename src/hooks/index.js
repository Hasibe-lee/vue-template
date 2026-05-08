import { useLayoutStore } from '@/stores/layout.js';

/**
 * 页面缓存钩子
 * @param {Function} cb - 重置回调函数，参数 once 为 true 时执行
 */
export function usePage(cb, { deactivatedFn } = {}) {
  const route = useRoute(), router = useRouter(), pageName = route.name;
  const layoutStore = useLayoutStore();
  const { keepKeyMap, removeActive } = layoutStore;

  function onBack(...args) {
    removeActive(pageName);
    router.back(...args);
  }

  onActivated(() => {
    const keep = keepKeyMap.get(pageName);
    cb(!keep.actived);
    keep.actived = true;
    keepKeyMap.set(route.name, keep);
  });

  // 进入缓存时
  onDeactivated(() => {
    if (deactivatedFn) {
      deactivatedFn();
    }
  });

  return {
    onBack
  }
}
