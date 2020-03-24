<template>
  <div id="app">
    <h1 align="left">微博用户行为可视化</h1>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
  },
  sockets: {
    receiveData: function(message) {
      console.log(message.data);
    }
  }
};
</script>

<style>
#app {
  text-align: center;
  margin-top: 60px;
  width: 50%;
  position: absolute;
  left: 50%;
  top: 20%;
  transform: translate(-50%, -50%);
}
</style>
