<script setup>
import { useLayoutStore } from '@/stores/layout.js';

const router = useRouter(),
  route = useRoute();
const layoutStore = useLayoutStore();
const { addActive, keepKeyMap } = layoutStore;
const { keepAliveList } = storeToRefs(layoutStore);

function onPage(str) {
  router.push({ name: str });
  addActive(str);
}

const test404 = () => {
  router.push('/test-404');
};
</script>

<template>
  <div id="layoutPage">
    <aside id="asideLeft">123</aside>
    <aside id="asideRight">
      <header class="header">
        <h1>My App</h1>
        <div class="header-buttons">
          <button @click="onPage('Home')">首页</button>
          <button @click="onPage('Test')">测试</button>
          <button @click="test404">测试 404</button>
        </div>
      </header>

      <main class="main">
        <router-view #default="{ Component, route: currentRoute }">
          <keep-alive :include="keepAliveList">
            <component :is="Component" :key="keepKeyMap.get(currentRoute.name).key" />
          </keep-alive>
        </router-view>
      </main>

      <footer class="footer">
        <p>Footer</p>
      </footer>
    </aside>
  </div>
</template>

<style lang="scss" scoped>
$sideLeftWidth: 270px;
$asideGap: 0;
$mainPd: (
  top: 10px,
  right: 10px,
  bottom: 10px,
  left: 10px,
);
$headerPd: (
  top: 10px,
  right: 10px,
  bottom: 10px,
  left: 10px,
);

#layoutPage {
  min-height: 100vh;
  display: flex;
  gap: $asideGap;
}
#asideLeft {
  width: $sideLeftWidth;
  background-color: blue;
}
#asideRight {
  display: flex;
  flex-direction: column;
  width: calc(100% - $sideLeftWidth);

  .header {
    @each $key, $value in $headerPd {
      padding-#{$key}: $value;
    }
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
    @each $key, $value in $mainPd {
      padding-#{$key}: $value;
    }
    flex: 1;
    background-color: red;
    // padding: 2rem;
  }

  .footer {
    padding: 10px 20px 20px;
    background-color: #f5f5f5;
    text-align: center;
    color: #666;
    & p {
      margin: 0;
    }
  }
}
</style>
