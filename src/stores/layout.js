import { defineStore } from 'pinia'

const paramsOne = ({ param, cb }) => {
  if (typeof param == 'string') {
    cb([param])
  }

  if (Array.isArray(param)) {
    cb(param)
  }
}

export const useLayoutStore = defineStore('layout', () => {

  const keepAliveList = ref([]), keepKeyMap = new Map();

  // 新增需要保持活性的页面
  function addActive(meta = []) {
    const add = (activeNames = []) => {
      activeNames.forEach(activeName => {
        const hasName = !!keepAliveList.value.find(name => name === activeName);
        if (!hasName) {
          keepAliveList.value.push(activeName);
          keepKeyMap.set(activeName, {
            key: getUniqueId(),
            actived: false,
          })
        }
      });
    };

    paramsOne({ param: meta, cb: (_meta) => add(_meta) })
  }

  // 移除活性的页面
  function removeActive(meta = []) {
    const remove = (removeNames) => {
      removeNames.forEach(removeName => {
        const removeIdx = keepAliveList.value.findIndex(name => name === removeName);
        if (removeIdx > -1) {
          keepAliveList.value.splice(removeIdx, 1);
          if (keepKeyMap.get(removeName)) {
            keepKeyMap.delete(removeName);
          }
        }
      })
    }
    paramsOne({ param: meta, cb: (_meta) => remove(_meta) })
  }

  // 刷新活性页面
  function refreshActive(name) {
    keepKeyMap.set(name, {
      key: getUniqueId(),
      actived: false,
    })
  }

  return {
    keepAliveList, keepKeyMap,
    addActive,
    removeActive,
    refreshActive,
  }
})
