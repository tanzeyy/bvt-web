<template>
  <el-card class="box-card" shadow="never">
    <div slot="header" class="header clearfix">
      <span>提交信息</span>
    </div>
    <el-form :label-position="form.options.labelPosition" :model="formData">
      <el-form-item label="用户标识类型">
        <el-radio-group v-model="identifier.type">
          <el-radio
            v-for="option in identifier.options"
            :key="option"
            :label="option"
            :border="true"
          />
        </el-radio-group>
      </el-form-item>
      <el-collapse-transition>
        <el-form-item v-if="needAuth">
          <auth />
        </el-form-item>
      </el-collapse-transition>
      <el-form-item label="用户标识">
        <el-input
          v-model="identifier.value"
          type="text"
          placeholder="请输入用户标识（ID或昵称），例如：浙江大学"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="最早日期">
        <el-date-picker
          v-model="datePicker.value"
          align="center"
          type="date"
          placeholder="选择爬取的最早日期"
          :picker-options="datePicker.options"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="图表类型">
        <el-checkbox-group v-model="info.charts">
          <el-checkbox v-for="option in charts.options" :key="option" :label="option" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item align="right">
        <el-button type="primary" @click="onSubmit">完成</el-button>
        <el-button @click="$emit('show:status')">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import Auth from "./Auth.vue";

export default {
  name: "Form",
  components: { Auth },
  data() {
    return {
      formData: {

      },
      info: {
        uid: "",
        date: "",
        charts: []
      },
      form: {
        options: { labelPosition: "top" }
      },
      identifier: {
        type: "",
        value: "",
        options: ["用户ID", "用户昵称"]
      },
      datePicker: {
        value: "",
        options: {
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
            }
          ]
        }
      },
      charts: {
        value: [],
        options: ["数据流图", "词云", "统计数据直方图"]
      }
    };
  },
  computed: {
    needAuth: function() {
      console.log(this.identifier.type);
      return this.identifier.type === "用户昵称";
    }
  },
  methods: {
    async onSubmit() {
      if (this.identifier.type === "用户昵称") {
        await this.$axios
          .get("/get_uid", {
            params: {
              screen_name: this.identifier.value
            }
          })
          .then(response => {
            this.info.uid = response.data.uid;
          })
          .catch(() => {
            this.$message("获取uid失败");
          });
      } else {
        this.info.uid = this.identifier.value;
      }
      this.info.date = this.datePicker.value
        .toLocaleDateString()
        .split("/")
        .join("-");
      this.$emit("update:info", this.info);
      this.$emit("show:status");
    }
  }
};
</script>
