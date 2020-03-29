<template>
  <el-container id="app">
    <el-header>
      <h1 align="center">微博用户可视化工具</h1>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "App"
};
</script>

<style scoped>
#app {
  display: flex;
  align-items: center;
  background: #f6f8fa;
}
</style>
