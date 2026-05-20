<script setup>
import ItemRender from './components/ItemRender.vue';

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
  formName: {
    type: String,
    default: null,
  },
  formTitle: {
    type: [String],
    default: () => '',
  },
  baseRowHeight: {
    type: [Number],
    default: () => 32,
  },
  columnGap: {
    type: [String],
    default: '18px',
  },
  rowGap: {
    type: [String],
    default: '18px',
  },
});

const formModel = ref({}),
  renderData = ref([]);

const maxColumnIndex = computed(() => {
  const list = props.data.map((item) => item.position[1]);
  return Math.max(...list);
});

const gtcStyle = computed(() => {
  const percentColumn = `${100 / maxColumnIndex.value}%`;
  const halfGap = parseInt(props.columnGap, 10) / 2;
  return `repeat(auto-fill, calc(${percentColumn} - ${halfGap}px))`;
});

const gapStyle = computed(() => `${props.rowGap} ${props.columnGap}`);

function getGridStyle(cell) {
  const [x, y] = cell.position;
  return {
    'grid-row-start': x,
    'grid-column-start': y,
    'grid-row-end': cell.rowspan ? `span ${cell.rowspan}` : x,
    'grid-column-end': cell.colspan ? `span ${cell.colspan}` : y + 1,
  };
}

function getFormItemStyle(cell) {
  return cell.rowspan
    ? {
        'min-height':
          cell.rowspan * (parseInt(props.baseRowHeight) || 32) +
          (cell.rowspan - 1) * parseInt(props.rowGap) +
          'px',
      }
    : {};
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
  <section class="my_form_wrap">
    <div class="form_title_wrap">
      <slot name="form-title">
        <section v-if="props.formTitle" class="form_title">{{ props.formTitle }}</section>
      </slot>

      <slot name="form-title-operate"></slot>
    </div>
    <el-form v-tab="props.formName" :model="formModel" class="form_grid_wrap">
      <div class="grid_item" v-for="cell in renderData" :style="getGridStyle(cell)">
        <el-form-item
          :prop="cell.prop"
          v-bind="cell?.formItem ?? {}"
          :style="getFormItemStyle(cell)"
        >
          <template #label="{ label }">
            <div class="form_label_wrap">
              <div class="form_label">{{ label }}</div>
              <div class="form_label_suffix">：</div>
            </div>
          </template>
          <slot v-if="cell.custom" :name="[cell.prop]" :model="cell"></slot>
          <template v-else>
            <ItemRender :cell="cell"></ItemRender>
          </template>
        </el-form-item>
      </div>
    </el-form>
  </section>
</template>

<style lang="scss" scoped>
.form_title_wrap {
  display: flex;
  justify-content: space-between;
  padding: 10px 10px 16px;
  font-size: 20px;
  .form_title {
    display: flex;
    align-items: center;
    font-weight: bold;
    position: relative;
    padding-left: 10px;
    &::before {
      left: 0;
      position: absolute;
      top: 50%;
      transform: translateY(calc(-50% + 1px));
      content: '';
      display: block;
      width: 4px;
      height: 16px;
      background-color: var(--el-color-primary);
      border-radius: 12px;
    }
  }
}
.form_grid_wrap {
  display: grid;
  grid-template-columns: v-bind(gtcStyle);
  align-items: start;
  grid-auto-flow: dense;
  gap: v-bind(gapStyle);
  :deep() {
    .el-form-item {
      margin-bottom: 0;
      flex: 1;
      min-height: 32px;

      .el-form-item__label {
        min-width: 90px;
        // flex: 0 0 90px;
        flex-grow: 0;
        flex-shrink: 0;
        text-align: left;
        height: fit-content;
        overflow: hidden;
        word-break: break-all;
      }
      .el-form-item__content {
        // height: 100% !important;
        align-items: flex-start;
        > .el-textarea {
          height: 100%;
          textarea {
            height: 100% !important;
            min-height: initial !important;
          }
        }
      }
    }
  }

  .grid_item {
    display: flex;
    align-items: center;
    // background-color: pink;
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
    .form_label_wrap {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      // align-items: center;
      > .form_label {
        text-align: right;
        word-break: break-all;
      }
    }
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
