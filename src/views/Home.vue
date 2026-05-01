<script setup>
// import { storeToRefs } from 'pinia';
import { useCounterStore } from '@s/counter.js';
// import { usePage } from '@/hooks/index.js';
// import { onActivated, onUnmounted } from 'vue';

const countStore = useCounterStore();
const { count } = storeToRefs(countStore);
const { init } = countStore;

let timer = null;

// 启动计时器
const startTimer = (callback, interval = 1000) => {
  if (!timer) {
    timer = setInterval(callback, interval);
  }
};

// 停止计时器
const stopTimer = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
};

usePage(
  (once) => {
    if (once) {
      console.log('home once');
      init();
    }
    console.log('home actived');
    startTimer(() => {
      count.value++;
    });
  },
  {
    deactivatedFn() {
      stopTimer();
    },
  },
);

onUnmounted(() => {
  stopTimer();
});
</script>

<template>
  <div>
    <h1>You did it!</h1>
    <p>计数器: {{ count }}</p>
    <p class="hint">（每秒自动加1）</p>
    <button class="g_btn" @click="count++">+1</button>
    <button class="g_btn" @click="init()">重置</button>

    <p>
      Visit
      <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a>
      to read the documentation
    </p>
  </div>
</template>

<style scoped>
.hint {
  color: #666;
  font-size: 0.9rem;
}
</style>
