<script setup>
const files = import.meta.glob(['./components/*.vue'], { eager: true, import: 'default' });
const layoutType = ref('default');
const comName = computed(() => files[`./components/${layoutType.value}.vue`]);
</script>

<template>
  <component :is="comName"></component>
</template>
