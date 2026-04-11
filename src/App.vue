<script setup>
import { storeToRefs } from 'pinia';
import { useCounterStore } from '@s/counter.js';
import { useRouter } from 'vue-router';

const countStore = useCounterStore();
const { count } = storeToRefs(countStore);
const { init } = countStore;
const router = useRouter();

const test404 = () => {
  router.push('/test-404');
};
</script>

<template>
  <router-view />
</template>

<style scoped></style>
