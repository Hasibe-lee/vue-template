<script setup>
import {
  ElInput,
  ElSelect,
  ElRadio,
  ElCheckbox,
  ElSwitch,
  ElDatePicker,
  ElTimePicker,
  ElSlider,
  ElCascader,
} from 'element-plus';
const props = defineProps({
  cell: {
    type: Object,
    default: () => ({}),
  },
});

const comName = computed(() => {
  return comMap[props.cell.target] || comMap.input;
});
const comMap = {
  input: ElInput,
  select: ElSelect,
  radio: ElRadio,
  checkbox: ElCheckbox,
  switch: ElSwitch,
  'date-picker': ElDatePicker,
  'time-picker': ElTimePicker,
  slider: ElSlider,
  cascader: ElCascader,
};
</script>

<template>
  <div class="form_item">
    <template v-if="cell.target == 'radio'">
      <el-radio-group v-model="cell.value">
        <el-radio v-for="item in cell.attrs?.options || []" :key="item.value" v-bind="item">{{
          item.label
        }}</el-radio>
      </el-radio-group>
    </template>
    <component v-else v-model="cell.value" :is="comName" v-bind="cell?.attrs || {}"></component>
  </div>
</template>

<style scoped lang="scss">
.form_item {
  width: 100%;
  :deep(> [class^='el-']) {
    &:not([class*='el-radio']) {
      width: 100%;
    }
    // &.el-slider {
    //   padding-right: 12px;
    // }
  }

  &:has(.el-slider) {
    padding-right: 12px;
  }
}
</style>
