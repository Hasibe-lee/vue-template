<script setup>
defineOptions({ name: 'TestPageAdd' });
const { onBack } = usePage((once) => {
  if (once) {
    console.log(once);
  }
});
const schema = [
  { prop: 'name', label: '姓名', type: 'input', position: [1, 1], colspan: 2 },
  { prop: 'age', label: '年龄', type: 'input', position: [1, 2] },
  { prop: 'remark', label: '备注', type: 'textarea', position: [2, 1], colspan: 3, rowspan: 2 },
];
</script>

<template>
  <MyPage>
    <template #header-right>
      <el-button @click="onBack">返回</el-button>
    </template>
    <MyForm :schema></MyForm>
  </MyPage>
</template>

<style lang="scss" scoped></style>
