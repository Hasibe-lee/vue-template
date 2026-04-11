import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
// {
//   const count = ref(0)
//   const doubleCount = computed(() => count.value * 2)
//   function increment() {
//     count.value++
//   }

//   return { count, doubleCount, increment }
// }
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  actions: {
    init() {
      this.$reset();
    }
  },
})
