<script setup>
import { storeToRefs } from 'pinia';
import { useCounterStore } from '@s/counter.js';

const countStore = useCounterStore();
const { count } = storeToRefs(countStore);
const { init } = countStore;
</script>

<template>
  <div>
    <h1>You did it!</h1>
    {{ count }}
    <button @click="count++">+1</button>
    <button @click="init()">init</button>

    <p>
      Visit
      <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a>
      to read the documentation
    </p>
  </div>
</template>
