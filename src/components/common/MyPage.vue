<script setup>
const props = defineProps({
  pdList: {
    type: [Array],
    default: () => [],
    validator(typeValue) {
      if (!Array.isArray(typeValue)) {
        console.warn('pdList must be a Array');
        return false;
      }
      if (typeValue.length > 4) {
        console.warn('pdList must less than or equal 4');
        return false;
      }
      const isAllNumber = typeValue.every((item) => typeof item == 'number');
      if (!isAllNumber) {
        console.warn('The sub-item of pdList must be a number');
        return false;
      }
      return true;
    },
  },
});

const route = useRoute();

const pdt = ref(null),
  pdr = ref(null),
  pdb = ref(null),
  pdl = ref(null);

const pageWrapRef = useTemplateRef('pageWrap'),
  pageHeaderRef = useTemplateRef('pageHeader'),
  pageContentRef = useTemplateRef('pageContent'),
  pageFooterRef = useTemplateRef('pageFooter');

const { height: pageWrapHeight } = useElementSize(pageWrapRef);
const { height: pageHeaderHeight } = useElementSize(pageHeaderRef);
const { height: pageFooterHeight } = useElementSize(pageFooterRef);

const pageHeaderPaddingY = computed(() => {
    const el = pageHeaderRef.value;
    if (!el) return 0;
    const style = window.getComputedStyle(el);
    return parseFloat(style.paddingTop || '0') + parseFloat(style.paddingBottom || '0');
  }),
  pageContentPaddingY = computed(() => {
    const el = pageContentRef.value;
    if (!el) return 0;
    const style = window.getComputedStyle(el);
    return parseFloat(style.paddingTop || '0') + parseFloat(style.paddingBottom || '0');
  }),
  maxHeight = computed(() => {
    const height =
      pageWrapHeight.value -
      pageHeaderHeight.value -
      pageFooterHeight.value -
      pageContentPaddingY.value -
      pageHeaderPaddingY.value;
    return height > 0 ? height : 0;
  });

const pageName = computed(() => {
  return route.name;
});

function setMainPd(pdList = []) {
  const length = pdList.length;
  if (length === 0 || length === 1) {
    pdt.value = pdr.value = pdb.value = pdl.value = length === 0 ? '10px' : `${pdList[0]}px`;
  }
  switch (length) {
    case 2: {
      pdt.value = pdb.value = pdList[0];
      pdl.value = pdr.value = pdList[1];
      break;
    }
    case 3: {
      pdt.value = pdList[0];
      pdl.value = pdr.value = pdList[1];
      pdb.value = pdList[2];
      break;
    }
    case 4: {
      pdt.value = pdList[0];
      pdr.value = pdList[1];
      pdb.value = pdList[2];
      pdl.value = pdList[3];
      break;
    }
  }
}

watch(
  () => props.pdList,
  (newVal) => {
    if (newVal) {
      setMainPd(newVal);
    }
  },
  {
    immediate: true,
    deep: true,
  },
);
</script>

<template>
  <div ref="pageWrap" class="my_page_wrap">
    <div ref="pageHeader" class="page_header">
      <div class="header">
        <slot name="header">{{ pageName }}</slot>
      </div>
      <div class="page_header_right">
        <slot name="header-right"></slot>
      </div>
    </div>
    <div ref="pageContent" class="page_content">
      <el-scrollbar :max-height="maxHeight">
        <slot :maxHeight="maxHeight"></slot>
      </el-scrollbar>
    </div>
    <footer ref="pageFooter" class="page_footer">
      <slot name="down"></slot>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
$contentPd: (
  top: v-bind(pdt),
  right: v-bind(pdr),
  bottom: v-bind(pdb),
  left: v-bind(pdl),
);

.my_page_wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .page_header {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    background-color: #ccc;
    padding: 10px 20px 10px;
    .page_header_right {
      margin-left: auto;
    }
  }
  .page_content {
    @each $key, $value in $contentPd {
      padding-#{$key}: $value;
    }
    flex: 1;
    height: 0;
    // min-height: 0;
    overflow: hidden;
  }

  .page_footer {
    display: flow-root;
    flex-shrink: 0;
  }
}
</style>
