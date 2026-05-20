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
    target: 'input',
    position: [1, 1],
    colspan: 2,
  },
  { prop: 'age', value: '', formItem: { label: '年龄' }, target: 'input', position: [2, 1] },
  {
    prop: 'sex',
    value: '',
    formItem: { label: '性别' },
    target: 'radio',
    attrs: {
      options: [
        { label: '男', value: '1' },
        { label: '女', value: '2' },
      ],
    },
    position: [2, 2],
  },
  {
    prop: 'remark',
    custom: true,
    value: '',
    formItem: { label: '备注' },
    target: 'textarea',
    position: [3, 1],
    rowspan: 3,
  },
  {
    prop: 'birthday',
    value: '',
    formItem: { label: '生日' },
    target: 'date-picker',
    position: [3, 2],
  },
  {
    prop: 'aaa',
    value: '',
    formItem: { label: 'aaa' },
    target: 'select',
    position: [4, 2],
  },
  {
    prop: 'bbb',
    value: 0,
    target: 'slider',
    formItem: { label: 'bbb' },
    position: [5, 2],
  },
  {
    prop: 'ccc',
    value: '',
    formItem: { label: 'ccccccccccccccccccccccc', labelWidth: '120px' },
    position: [6, 1],
  },
  {
    prop: 'ccc',
    value: '',
    formItem: { label: 'eeeeeeeeeeeeeeee', labelWidth: '120px' },
    position: [6, 2],
  },
  {
    prop: 'ccc',
    value: '',
    formItem: { label: 'mmmmmmmmmmmmmm', labelWidth: '120px' },
    position: [7, 1],
  },
  {
    prop: 'ccc',
    value: '',
    formItem: { label: 'ddddddddddddddddd', labelWidth: '120px' },
    position: [7, 2],
  },
  {
    prop: 'ccc',
    value: '',
    formItem: { label: 'sssssssssssss', labelWidth: '120px' },
    position: [8, 1],
  },
  {
    prop: 'ccc',
    value: '',
    formItem: { label: 'zzzzzzzzzzzzz', labelWidth: '120px' },
    position: [8, 2],
  },
  {
    prop: 'ccc',
    value: '',
    formItem: { label: 'xxxxxxxxxxxx', labelWidth: '120px' },
    position: [9, 1],
  },
  {
    prop: 'ccc',
    value: '',
    formItem: { label: 'jjjjjjjjjjj', labelWidth: '120px' },
    position: [9, 2],
  },
  {
    prop: 'ccc',
    value: '',
    formItem: { label: 'nnnnnnnnnnn', labelWidth: '120px' },
    position: [10, 1],
  },
  {
    prop: 'ccc',
    value: '',
    formItem: { label: 'bbbbbbbbbb', labelWidth: '120px' },
    position: [10, 2],
  },
  {
    prop: 'ccc',
    value: '',
    formItem: { label: 'hhhhhhhhhh', labelWidth: '120px' },
    position: [11, 1],
  },
  {
    prop: 'ccc',
    value: '',
    formItem: { label: 'dddddddddd', labelWidth: '120px' },
    position: [11, 2],
  },
  {
    prop: 'ccc',
    value: '',
    formItem: { label: 'ffffffffffff', labelWidth: '120px' },
    position: [12, 1],
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
    <!-- <div class="test_box">
      <div class="box1"></div>
      <div class="box2"></div>
    </div> -->
    <MyForm :data="formData" form-title="添加">
      <template #remark="{ model }">
        <el-input
          type="textarea"
          v-model="model.value"
          resize="none"
          show-word-limit
          :maxlength="200"
        >
        </el-input>
      </template>
    </MyForm>
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

.remark_wrap {
  max-height: 100px;
  overflow: auto;
}
</style>
