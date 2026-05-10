<script setup>
import { useLayoutStore } from '@/stores/layout.js';
// const props = defineProps({
//   mainPd: {
//     type: [Array],
//     default: () => [],
//     validator(typeValue) {
//       if (!Array.isArray(typeValue)) {
//         console.warn('mainPd must be a Array');
//         return false;
//       }
//       if (typeValue.length > 4) {
//         console.warn('mainPd must less than or equal 4');
//         return false;
//       }
//       const isAllNumber = typeValue.every((item) => typeof item == 'number');
//       if (!isAllNumber) {
//         console.warn('The sub-item of mainPd must be a number');
//         return false;
//       }
//       return true;
//     },
//   },
// });
// const pdt = ref(null),
//   pdr = ref(null),
//   pdb = ref(null),
//   pdl = ref(null);
// watch(
//   () => props.mainPd,
//   (newVal) => {
//     if (newVal) {
//       setMainPd(newVal);
//     }
//   },
//   {
//     immediate: true,
//     deep: true,
//   },
// );

// function setMainPd(pdList = []) {
//   const length = pdList.length;
//   if (length === 0 || length === 1) {
//     pdt.value = pdr.value = pdb.value = pdl.value = length === 0 ? '20px' : `${pdList[0]}px`;
//   }
//   switch (length) {
//     case 2: {
//       pdt.value = pdb.value = pdList[0];
//       pdl.value = pdr.value = pdList[1];
//       break;
//     }
//     case 3: {
//       pdt.value = pdList[0];
//       pdl.value = pdr.value = pdList[1];
//       pdb.value = pdList[2];
//       break;
//     }
//     case 4: {
//       pdt.value = pdList[0];
//       pdr.value = pdList[1];
//       pdb.value = pdList[2];
//       pdl.value = pdList[3];
//       break;
//     }
//   }
// }

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
    <section id="asideRight">
      <header class="header">
        <h1>My App</h1>
        <div class="header_buttons">
          <button @click="onPage('Home')">首页</button>
          <button @click="onPage('TestPage')">测试</button>
          <button @click="test404">测试 404</button>
        </div>
      </header>

      <main class="main">
        <el-scrollbar>
          <router-view #default="{ Component, route: currentRoute }">
            <keep-alive :include="keepAliveList">
              <component :is="Component" :key="keepKeyMap.get(currentRoute.name).key" />
            </keep-alive>
          </router-view>
        </el-scrollbar>
      </main>
    </section>
  </div>
</template>

<style lang="scss" scoped>
$sideLeftWidth: 270px;
$asideGap: 0;
// $mainPd: (
//   top: v-bind(pdt),
//   right: v-bind(pdr),
//   bottom: v-bind(pdb),
//   left: v-bind(pdl),
// );
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
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
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
  min-height: 0;

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
    font-size: 1.5rem;
  }

  .header_buttons button {
    padding: 0.5rem 1rem;
    margin-left: 0.5rem;
    background-color: white;
    color: #42b983;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  // #asideRight 是纵向 flex 容器（flex-direction: column）
  // .main 写了 flex: 1，理论上占剩余高度
  // 但 .main 里有内容时，默认最小尺寸会受内容影响，可能把父级撑开，导致滚动/高度计算异常
  // height: 0 把基准高度压到 0，再靠 flex: 1 分配空间，避免按内容高度膨胀

  .main {
    @each $key, $value in $mainPd {
      padding-#{$key}: $value;
    }
    flex: 1;
    min-height: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    :deep() {
      .el-scrollbar {
        height: 100%;
        .el-scrollbar__view {
          display: flow-root;
          height: 100%;
        }
      }
    }
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
