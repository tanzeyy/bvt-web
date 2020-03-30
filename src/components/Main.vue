<template>
  <el-container>
    <el-main>
      <el-collapse-transition>
        <Status v-show="showStatus" ref="status" @show:form="showStatus=false"></Status>
      </el-collapse-transition>
      <Form
        v-show="!showStatus"
        ref="form"
        @show:status="showStatus=true"
        @update:info="updateStatus"
      />
      <Charts
        v-show="showCharts"
        ref="charts"
        @update:cnt="updateCnt"
        @update:progress="updateProgress"
      ></Charts>
    </el-main>
  </el-container>
</template>

<script>
import Form from "./Form.vue";
import Charts from "./Charts.vue";
import Status from "./Status.vue";
export default {
  name: "Main",
  data: function() {
    return {
      showStatus: false,
      showCharts: false
    };
  },
  components: {
    Charts,
    Status,
    Form
  },
  methods: {
    updateStatus(info) {
      console.log(info);
      if (!info.uid) {
        this.$message({
          message: "获取用户ID失败，请检查用户昵称是否正确！",
          showClose: true,
          type: "error"
        });
      }
      this.$refs.status.uid = info.uid;
      this.$refs.status.startDate = info.date;
      this.$refs.status.cnt = 0;
      this.$refs.status.done = false;

      this.$refs.status.charts = info.charts;

      this.$refs.charts.show.hist = false;
      this.$refs.charts.show.streamgraph = false;
      this.$refs.charts.show.wordcloud = false;

      for (let chart of info.charts) {
        if (chart === "统计数据直方图") {
          this.$refs.charts.show.hist = true;
        } else if (chart === "数据流图") {
          this.$refs.charts.show.streamgraph = true;
        } else if (chart === "词云") {
          this.$refs.charts.show.wordcloud = true;
        }
      }

      this.$socket.emit("get_weibo", info);

      this.showCharts = true;
    },
    updateCnt() {
      this.$refs.status.cnt += 1;
      this.$refs.charts.loading = true;
    },
    updateProgress() {
      this.$refs.status.done = true;
    }
  }
};
</script>