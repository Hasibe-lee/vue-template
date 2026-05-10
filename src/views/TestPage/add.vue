<script setup>
defineOptions({ name: 'TestPageAdd' });
const { onCancel } = usePage((once) => {
  if (once) {
    console.log(once);
  }
});
const formData = ref([
  {
    prop: 'name',
    value: '',
    formItem: { label: '姓名' },
    type: 'input',
    position: [1, 1],
    colspan: 2,
  },
  { prop: 'age', value: '', formItem: { label: '年龄' }, type: 'input', position: [2, 1] },
  { prop: 'sex', value: '', formItem: { label: '性别' }, type: 'radio', position: [2, 2] },
  {
    prop: 'remark',
    value: '',
    formItem: { label: '备注' },
    type: 'textarea',
    position: [3, 1],
    colspan: 2,
  },
]);
</script>

<template>
  <MyPage>
    <template #header-right>
      <el-button type="warning">填充</el-button>
      <el-button type="primary">确定</el-button>
      <el-button @click="onCancel">取消</el-button>
    </template>
    <div class="test_box">
      <div class="box1"></div>
      <div class="box2"></div>
    </div>
    <MyForm :data="formData"></MyForm>
    <template #down>
      <div class="down_btn_wrap">
        <el-button type="warning">填充</el-button>
        <el-button type="primary">确定</el-button>
        <el-button @click="onCancel">取消</el-button>
      </div>
    </template>
  </MyPage>
</template>

<style lang="scss" scoped>
.test_box {
  // height: 100px;
  width: 100%;
  background-color: blue;
  display: flow-root;

  .box1 {
    width: 100px;
    height: 100px;
    float: left;
    background-color: red;
  }
  .box2 {
    display: flow-root;
    height: 100px;
    background-color: yellow;
  }
}
</style>
