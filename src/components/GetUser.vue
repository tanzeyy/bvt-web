<template>
  <div>
    <el-input
      v-model="input"
      type="text"
      placeholder="请输入用户昵称或用户ID，e.g.：浙江大学"
      class="input-with-select"
    >
      <el-popover placement="top" v-model="infoVisible" slot="prepend" width="250" trigger="manual">
        <Auth></Auth>
        <el-select v-model="select" slot="reference" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-popover>
    </el-input>
  </div>
</template>

<script>
import Auth from "./Auth.vue";
export default {
  name: "GetUser",
  components: {
    Auth
  },
  data() {
    return {
      input: this.$cookies.get("input"),
      select: this.$cookies.get("select"),
      infoVisible: false,
      options: [
        {
          value: "uid",
          label: "用户ID"
        },
        {
          value: "nickname",
          label: "用户昵称"
        }
      ]
    };
  },
  watch: {
    select: function(newValue) {
      if (newValue === "nickname") {
        this.$axios
          .get("http://127.0.0.1:5000/auth_status")
          .then(response => {
            if (response.data.status === "done") {
              this.infoVisible = false;
            } else {
              this.infoVisible = true;
            }
            if (this.infoVisible) {
              this.$message(response.data.message);
            }
          })
          .catch(() => {
            this.$message("获取授权失败！");
          });
      }
    }
  }
};
</script>

<style scoped>
.el-select {
  width: 110px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>