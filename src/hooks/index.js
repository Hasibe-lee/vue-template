import { useLayoutStore } from '@/stores/layout.js';
import { ElMessage, ElMessageBox } from 'element-plus';

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

  function onCancel() {
    ElMessageBox.confirm('确定取消吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(() => {
        onBack();
      })
      .catch(() => {
        // ElMessage.info('已取消');
      });
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
    onBack,
    onCancel,
  }
}
