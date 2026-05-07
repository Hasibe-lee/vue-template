<script setup>
const pageWrapRef = useTemplateRef('pageWrap'),
  pageHeaderRef = useTemplateRef('pageHeader'),
  // pageContentRef = useTemplateRef('pageContent'),
  pageFooterRef = useTemplateRef('pageFooter');

const { height: pageWrapHeight } = useElementSize(pageWrapRef);
const { height: pageHeaderHeight } = useElementSize(pageHeaderRef);
const { height: pageFooterHeight } = useElementSize(pageFooterRef);

const pageHeaderPaddingY = computed(() => {
  const el = pageHeaderRef.value;
  if (!el) return 0;
  const style = window.getComputedStyle(el);
  return parseFloat(style.paddingTop || '0') + parseFloat(style.paddingBottom || '0');
});

const maxHeight = computed(() => {
  const height =
    pageWrapHeight.value -
    pageHeaderHeight.value -
    pageFooterHeight.value -
    pageHeaderPaddingY.value;
  return height > 0 ? height : 0;
});
</script>

<template>
  <div ref="pageWrap" class="my_page_wrap">
    <div ref="pageHeader" class="page_header">
      <div class="header">
        <slot name="header"> page-header </slot>
      </div>
      <div class="page_header_right">
        <slot name="header-right"> page_header_right </slot>
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
.my_page_wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .page_header {
    display: flex;
    background-color: #ccc;
    padding: 10px 20px 10px;
    .page_header_right {
      margin-left: auto;
    }
  }
  .page_content {
    flex: 1;
    height: 0;
    overflow: hidden;
  }
}
</style>
