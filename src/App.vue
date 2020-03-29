<template>
  <el-container id="app">
    <el-header>
      <h1 align="left">微博用户可视化工具</h1>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
#app {
  display: flex;
  align-items: center;
  background: #f6f8fa;
}

.h1 {
  font-size: 36px;
}
</style>
