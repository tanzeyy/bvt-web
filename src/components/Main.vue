<template>
  <el-container>
    <el-main>
      <Status v-if="showStatus"></Status>
      <Charts v-if="showCharts"></Charts>
    </el-main>
  </el-container>
</template>

<script>
import Charts from "./Charts.vue";
import Status from "./Status.vue";
export default {
  name: "Main",
  data: function() {
    return {
      showStatus: true,
      showCharts: true
    };
  },
  components: {
    Charts,
    Status
  }
};
</script>