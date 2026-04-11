import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCacheStore = defineStore('cache', () => {
  // 需要缓存的组件名称列表（初始为空）
  const cachedComponents = ref([])

  // 添加组件到缓存
  const addCache = (componentName) => {
    if (!cachedComponents.value.includes(componentName)) {
      cachedComponents.value.push(componentName)
    }
  }

  // 清除指定组件的缓存
  const clearCache = (componentName) => {
    const index = cachedComponents.value.indexOf(componentName)
    if (index > -1) {
      cachedComponents.value.splice(index, 1)
    }
  }

  // 清除所有缓存
  const clearAllCache = () => {
    cachedComponents.value = []
  }

  return {
    cachedComponents,
    addCache,
    clearCache,
    clearAllCache,
  }
})
