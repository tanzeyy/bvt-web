<template>
  <div v-loading="loading" element-loading-text="正在获取授权">
    <p v-if="showText">您选择使用用户昵称，需要跳转至微博获得相应授权</p>
    <el-button @click="openWeiboAuth" type="primary" v-if="showText">点击跳转</el-button>
  </div>
</template>

<script>
export default {
  name: "Auth",
  data() {
    return {
      loading: false,
      showText: true,
      code: ""
    };
  },
  methods: {
    openWeiboAuth() {
      window.open(
        "https://api.weibo.com/oauth2/authorize?client_id=170128421&redirect_uri=http://127.0.0.1:8080/auth_callback"
      );
    },
    auth() {
      this.$axios
        .get("http://127.0.0.1:5000/weibo_auth", {
          params: {
            code: this.code
          }
        })
        .then(response => {
          alert(response.data.message);
          window.close();
        })
        .catch(() => {
          alert("获取失败！");
          window.close();
        });
    },
    check() {
      this.$axios.get("http://127.0.0.1:5000/auth_status").then(response => {
        alert(response.data.message);
      });
    }
  },
  created() {},
  mounted() {
    let loc = window.location.toString();
    let index = loc.indexOf("?code=");
    if (index != -1) {
      this.code = loc.slice(index + 6);
      this.loading = true;
      this.showText = false;
    }
    if (this.code != "") {
      this.auth();
    }
  }
};
</script>

<style scoped>
</style>