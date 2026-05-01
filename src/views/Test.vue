<script setup>
import { ref } from 'vue';
import { useLayoutStore } from '@/stores/layout.js';

const message = ref('这是 Test 页面');
const cacheStore = useLayoutStore();

// 重置首页缓存
const resetHomeCache = () => {
  cacheStore.removeActive('Home');
  console.log('已重置 Home 缓存');
};
usePage((once) => {
  if (once) {
    console.log('test once');
  }
  console.log('test actived');
});
</script>

<template>
  <div>
    <h1>{{ message }}</h1>
    <button @click="resetHomeCache">重置首页缓存</button>
  </div>
</template>
