<template>
  <el-card
    class="box-card"
    shadow="never"
    v-loading="loading"
    element-loading-text="正在检查微博授权"
    :style="cardStyle"
  >
    <div v-if="!loading">
      <div v-if="authStatus">
        <p align="center" style="margin-top: -15px; margin-bottom: -15px">
          <el-button
            type="success"
            icon="el-icon-check"
            circle
            size="mini"
            style="margin-right: 15px"
          ></el-button>已成功获取微博授权
        </p>
      </div>
      <div v-else>
        <p align="center" style="margin-top: -15px; margin-bottom: -15px">
          <el-button
            type="danger"
            icon="el-icon-close"
            circle
            size="mini"
            style="margin-right: 15px"
          ></el-button>微博授权获取失败，需要跳转至微博获得相应授权
          <el-button type="info" @click="openWeiboAuth" size="mini">点击跳转</el-button>
        </p>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "Auth",
  data() {
    return {
      loading: true,
      authStatus: false,
      poll: null
    };
  },
  computed: {
    cardStyle() {
      let style = {
        height: "auto",
        width: "auto",
      };
      if (this.loading) {
        style.height = "180px";
      }
      if (this.code) {
        style.width = "180px";
        style.border = "0px";
      }
      return style;
    }
  },
  methods: {
    openWeiboAuth() {
      this.poll = setInterval(this.checkAuth, 500);
      window.open(
        "https://api.weibo.com/oauth2/authorize?client_id=170128421&redirect_uri=http://127.0.0.1:8080/auth_callback"
      );
    },
    checkAuth() {
      this.$axios.get("/auth_status").then(response => {
        setTimeout(() => {
          if (response.data.status === "done") {
            this.authStatus = true;
          }
          this.loading = false;
          clearInterval(this.poll);
        }, 1000);
      });
    }
  },
  created() {
    this.code = this.$route.query.code;
  },
  mounted() {
    if (this.code) {
      this.$axios
        .get("/weibo_auth", {
          params: {
            code: this.code
          }
        })
        .then(response => {
          alert(response.data.message + "点击关闭窗口！");
          window.close();
        })
        .catch(() => {
          alert("获取失败！" + "点击关闭窗口！");
          window.close();
        });
    } else {
      this.checkAuth();
    }
  }
};
</script>

<style scoped>
</style>