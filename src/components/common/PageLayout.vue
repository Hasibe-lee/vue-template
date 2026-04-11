<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useCacheStore } from '@s/cache.js';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';

const router = useRouter();
const route = useRoute();
const cacheStore = useCacheStore();
const { cachedComponents } = storeToRefs(cacheStore);

// 记录上一个路由的组件名
let prevComponentName = '';

// 监听路由变化，页面跳转后缓存上一个页面
watch(
  () => route.name,
  (newName, oldName) => {
    if (oldName && prevComponentName) {
      cacheStore.addCache(prevComponentName);
    }
    prevComponentName = newName || '';
  }
);

const test404 = () => {
  router.push('/test-404');
};
</script>

<template>
  <div class="layout">
    <header class="header">
      <h1>My App</h1>
      <div class="header-buttons">
        <button @click="router.push('/')">首页</button>
        <button @click="router.push('/test')">测试</button>
        <button @click="test404">测试 404</button>
      </div>
    </header>

    <main class="main">
      <router-view v-slot="{ Component, route: currentRoute }">
        <keep-alive :include="cachedComponents">
          <component :is="Component" :key="currentRoute.name" />
        </keep-alive>
      </router-view>
    </main>

    <footer class="footer">
      <p>Footer</p>
    </footer>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  padding: 1rem 2rem;
  background-color: #42b983;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header h1 {
  margin: 0;
  font-size: 1.5rem;
}

.header-buttons button {
  padding: 0.5rem 1rem;
  margin-left: 0.5rem;
  background-color: white;
  color: #42b983;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.main {
  flex: 1;
  padding: 2rem;
}

.footer {
  padding: 1rem 2rem;
  background-color: #f5f5f5;
  text-align: center;
  color: #666;
}

.footer p {
  margin: 0;
}
</style>
