<script setup>
const formModel = ref({});
</script>

<template>
  <el-form :model="formModel">
    <div class="form_grid_wrap">
      <div class="grid_item _1">1</div>
      <div class="grid_item _2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates placeat aliquid iste.
        Exercitationem architecto deleniti maxime. Esse, beatae sed obcaecati doloribus excepturi
        quaerat incidunt animi recusandae quas exercitationem architecto quod.
      </div>
      <div class="grid_item _3">3</div>
      <div class="grid_item _4">4</div>
    </div>
    <!-- <el-row :gutter="24">
      <el-col :span="12"><el-form-item prop="string" label="string"></el-form-item></el-col>
      <el-col :span="12"><el-form-item prop="string" label="string"></el-form-item></el-col>
      <el-col :span="12"><el-form-item prop="string" label="string"></el-form-item></el-col>
      <el-col :span="12"><el-form-item prop="string" label="string"></el-form-item></el-col>
      <el-col :span="12"><el-form-item prop="string" label="string"></el-form-item></el-col>
      <el-col :span="12"><el-form-item prop="string" label="string"></el-form-item></el-col>
      <el-col :span="12"><el-form-item prop="string" label="string"></el-form-item></el-col>
      <el-col :span="12"><el-form-item prop="string" label="string"></el-form-item></el-col>
      <el-col :span="12"><el-form-item prop="string" label="string"></el-form-item></el-col>
      <el-col :span="12"><el-form-item prop="string" label="string"></el-form-item></el-col>
    </el-row> -->
  </el-form>
</template>

<style lang="scss" scoped>
.form_grid_wrap {
  display: grid;
  grid-template-columns: repeat(auto-fill, calc(50% - 5px));
  align-items: start;
  grid-auto-flow: dense;
  gap: 5px;

  .grid_item {
    background-color: pink;
    height: 100%;
    &._1 {
      grid-area: 1 / 1 / 1 / 2;
    }
    &._2 {
      grid-area: 1 / 2 / span 2 / 3;
    }
    &._3 {
      grid-area: 2 / 1 / 2 / 2;
    }
    &._4 {
      grid-area: 3 / 1 / 3 / span 2;
    }
  }
}
</style>
