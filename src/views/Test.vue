<script setup>
import { ref } from 'vue';

const message = ref('这是 Test 页面');
</script>

<template>
  <div>
    <h1>{{ message }}</h1>
  </div>
</template>
