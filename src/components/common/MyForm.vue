<script setup>
const props = defineProps({
  data: {
    type: [Array],
    default: () => [],
    validator(typeValue) {
      if (!Array.isArray(typeValue)) {
        console.warn('data must be a Array');
        return false;
      }
      return true;
    },
  },
});
const formModel = ref({}),
  renderData = ref([]);

function getGridStyle(cell) {
  const [x, y] = cell.position;
  return {
    'grid-row-start': x,
    'grid-column-start': y,
    'grid-row-end': cell.rowspan ? `span ${cell.rowspan}` : x,
    'grid-column-end': cell.colspan ? `span ${cell.colspan}` : y + 1,
  };
}
watch(
  props.data,
  (newVal) => {
    if (newVal) {
      formModel.value = {};
      renderData.value = [];
      newVal.forEach((item) => {
        formModel.value[item.prop] = item.value ?? null;
        if (!Array.isArray(item.position)) {
          return;
        }
        renderData.value.push(item);
      });
    }
  },
  {
    deep: true,
    immediate: true,
  },
);

onScopeDispose(() => {
  console.log('effect dispose');
});
</script>

<template>
  <el-form :model="formModel" class="form_grid_wrap">
    <div class="grid_item" v-for="cell in renderData" :style="getGridStyle(cell)">
      <el-form-item :prop="cell.prop" v-bind="cell?.formItem ?? {}">
        <template #label="{ label }">{{ label }}</template>
        <el-input v-model="cell.value" placeholder="请输入"></el-input>
      </el-form-item>
    </div>
  </el-form>
</template>

<style lang="scss" scoped>
.form_grid_wrap {
  display: grid;
  grid-template-columns: repeat(auto-fill, calc(50% - 9px));
  align-items: start;
  grid-auto-flow: dense;
  gap: 18px 18px;
  :deep() {
    .el-form-item {
      margin-bottom: 0;
    }
  }

  .grid_item {
    background-color: pink;
    height: 100%;
    // &._1 {
    //   grid-area: 1 / 1 / 1 / 2;
    // }
    // &._2 {
    //   grid-area: 1 / 2 / span 2 / 3;
    // }
    // &._3 {
    //   grid-area: 2 / 1 / 2 / 2;
    // }
    // &._4 {
    //   grid-area: 3 / 1 / 3 / 2;
    // }
    // &._5 {
    //   grid-area: 3 / 2 / span 2 / 3;
    // }
    // &._7 {
    //   grid-area: 5 / 1 / 5 / span 2;
    // }
  }
}

// .form_grid_wrap {
//   column-count: 2;
//   column-gap: 5px;

//   .grid_item {
//     break-inside: avoid;
//     margin-bottom: 5px;
//     background-color: pink;
//   }
// }
</style>
