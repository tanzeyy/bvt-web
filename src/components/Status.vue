<template>
  <el-card class="box-card" shadow="never">
    <div slot="header" class="header clearfix">
      <span>信息</span>
      <el-button style="float: right; padding: 3px 0" type="text">重新填写</el-button>
    </div>
    <div class="text item">
      <span>
        <i class="el-icon-user" />
        用户：{{uid}}
      </span>
    </div>
    <div class="text item">
      <i class="el-icon-date" />
      时间区间：{{date}}
    </div>
    <pulse-loader :loading="notDone" :color="color"></pulse-loader>
    <div class="text item">
      <i class="el-icon-info" />
      当前进度：已爬取{{cnt}}条微博
    </div>
  </el-card>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
  name: "Status",
  components: {
    PulseLoader
  },
  data() {
    return {
      color: "#66b1ff",
      uid: "",
      date: Date(),
      cnt: 0,
      notDone: true
    };
  }
};
</script>
