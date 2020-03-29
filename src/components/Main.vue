<template>
  <el-container>
    <el-main>
      <Form ref='form'/>
      <Status v-if="showStatus"></Status>
      <Charts v-if="showCharts"></Charts>
    </el-main>
  </el-container>
</template>

<script>
import Form from "./Form.vue"
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
    Status,
    Form
  }
};
</script>