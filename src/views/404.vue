<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="container">
    <div class="content">
      <h1 class="code">404</h1>
      <h2 class="title">页面不存在</h2>
      <p class="desc">抱歉，您访问的页面不存在或已被移除</p>
      <button class="btn" @click="goHome">返回首页</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.content {
  max-width: 400px;
  padding: 1rem;
}

.code {
  font-size: 8rem;
  font-weight: 700;
  color: #42b983;
  line-height: 1;
  margin: 0;
}

.title {
  font-size: 1.5rem;
  color: #2c3e50;
  margin: 1rem 0;
}

.desc {
  color: #666;
  margin-bottom: 2rem;
}

.btn {
  padding: 0.75rem 2rem;
  font-size: 1rem;
  color: #fff;
  background-color: #42b983;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn:hover {
  background-color: #3aa876;
}
</style>
