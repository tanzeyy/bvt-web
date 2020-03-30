<template>
  <el-card class="box-card" shadow="never">
    <div slot="header" class="header clearfix">
      <span>信息</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="$emit('show:form')">修改</el-button>
    </div>
    <div class="text item">
      <span>
        <i class="el-icon-user" />
        微博用户ID：{{uid}}
      </span>
    </div>
    <div class="text item">
      <i class="el-icon-date" />
      时间区间：{{startDate}} 到 {{endDate}}
    </div>
    <div class="text item">
      <i class="el-icon-data-line" />
      图表类型：
      <pre v-for="chart in charts" :key="chart">  <i class="el-icon-arrow-right" />{{chart}}</pre>
    </div>
    <div class="text item">
      <i class="el-icon-info" />
      当前进度：
      <span v-if="!done">已分析{{cnt}}条微博</span>
      <span v-else>分析完成！</span>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "Status",
  data() {
    return {
      uid: "",
      startDate: "",
      endDate: "",
      charts: [],
      cnt: 0,
      done: false
    };
  },
  mounted() {
    const today = new Date();
    this.endDate = today
      .toLocaleDateString()
      .split("/")
      .join("-");
  },
  sockets: {
    errorUid(message) {
      if (message.info === "wrongUID") {
        this.$message({
          message: "用户ID错误，请检查用户ID是否正确！",
          showClose: true,
          type: "error"
        });
      }
    }
  }
};
</script>
