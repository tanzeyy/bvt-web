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
      时间区间：{{startDate}} 到 {{endDate}}
    </div>
    <div class="text item">
      <i class="el-icon-info" />
      当前进度：已爬取{{cnt}}条微博
    </div>
  </el-card>
</template>

<script>
export default {
  name: "Status",
  data() {
    return {
      uid: "",
      startDate: Date(),
      endDate: Date(),
      cnt: 0
    };
  }
};
</script>
