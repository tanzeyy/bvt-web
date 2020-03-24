<template>
  <el-date-picker
    v-model="input"
    align="right"
    type="date"
    placeholder="选择爬取的最早日期"
    :picker-options="pickerOptions"
  ></el-date-picker>
</template>

<script>
export default {
  name: "GetDate",
  data() {
    return {
      input: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "7天前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          },
          {
            text: "30天前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", date);
            }
          },
          {
            text: "90天前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
  computed: {
    dateString: function() {
      return this.input
        .toLocaleDateString()
        .split("/")
        .join("-");
    }
  }
};
</script>

<style scoped>
</style>