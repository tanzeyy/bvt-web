<template>
  <div>
    <el-row :gutter="2">
      <el-col :span="12">
        <GetUser ref="user" />
      </el-col>
      <el-col :span="6">
        <GetDate ref="date" />
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="submit">点击提交</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import GetUser from "./GetUser.vue";
import GetDate from "./GetDate.vue";

export default {
  name: "Input",
  data() {
    return {
      input: "",
      uid: ""
    };
  },
  components: {
    GetUser,
    GetDate
  },
  methods: {
    submit() {
      this.uid = "";
      if (this.$refs.user.select === "nickname") {
        this.$axios
          .get("http://127.0.0.1:5000/get_uid", {
            params: {
              screen_name: this.$refs.user.input
            }
          })
          .then(response => {
            this.uid = response.data.uid;
            this.queryWeibo();
          })
          .catch(() => {
            this.$message("获取uid失败");
          });
      } else {
        this.uid = this.$refs.user.input;
        this.queryWeibo();
      }
    },
    queryWeibo() {
      this.$socket.emit("get_weibo", {
        uid: this.uid,
        date: this.$refs.date.dateString
      });
    }
  },
};
</script>

<style scoped>
</style>