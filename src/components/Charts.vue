<template>
  <el-card class="box-card" shadow="never">
    <div slot="header" class="header clearfix">
      <el-row>
        <el-col :span="23">
          <span>图表</span>
        </el-col>
        <el-col :span="1">
          <bounce-loader
            v-if="loading"
            align="right"
            :loading="loading"
            :color="loaderOptions.color"
            :size="loaderOptions.size"
          ></bounce-loader>
          <i v-else class="el-icon-check" style="font-size: 28.5px; color: #67c23a" />
        </el-col>
      </el-row>
    </div>
    <highcharts v-if="show.wordcloud" :options="wordCloudChartOptions"></highcharts>
    <highcharts v-if="show.streamgraph" :options="streamGraphChartOptions"></highcharts>
    <highcharts
      v-if="show.hist"
      @mousedown.native="mouseDownEvent"
      @mouseup.native="mouseUpEvent"
      @mousemove.native="mouseMoveEvent"
      :options="bar3DChartOptions"
      :deepCopyOnUpdate="false"
      ref="bar3DChart"
    ></highcharts>
  </el-card>
</template>

<script>
import BounceLoader from "vue-spinner/src/BounceLoader.vue";

export default {
  name: "Charts",
  components: {
    BounceLoader
  },
  data() {
    return {
      loading: true,
      show: {
        wordcloud: false,
        streamgraph: false,
        hist: false
      },
      loaderOptions: {
        color: "#67c23a",
        size: "30px"
      },
      mouseDown: false,
      mousePos: null,
      wordCloudChartOptions: {
        series: [
          {
            type: "wordcloud",
            data: [],
            name: "权重",
            rotation: {
              from: 0,
              orientations: 1,
              to: 90
            },
            minFontSize: 10,
            maxFontSize: 30
          }
        ],
        title: {
          text: "用户关注话题词云"
        },
        credits: {
          enabled: false
        }
      },
      streamGraphChartOptions: {
        chart: {
          type: "streamgraph",
          zoomType: "x"
        },
        title: {
          text: "用户发布内容相关话题流图"
        },
        subtitle: {
          text: "点击图表下方的标签可以显示或隐藏某个标签"
        },
        xAxis: {
          maxPadding: 0,
          type: "category",
          crosshair: true,
          categories: [],
          labels: {
            align: "left",
            reserveSpace: true,
            rotation: 270
          }
        },
        yAxis: {
          visible: false,
          startOnTick: false,
          endOnTick: false
        },
        plotOptions: {
          series: {
            dataSorting: {
              enabled: true,
              sortKey: "name"
            },
            label: {
              minFontSize: 5,
              maxFontSize: 15,
              style: {
                color: "rgba(255,255,255,0.75)"
              }
            }
          }
        },
        series: [],
        credits: {
          enabled: false
        }
      },
      bar3DChartOptions: {
        chart: {
          type: "column",
          options3d: {
            enabled: true,
            alpha: 15,
            beta: 15,
            depth: 50,
            viewDistance: 25
          }
        },
        title: {
          text: "周期内收到的评论、转发和点赞直方图"
        },
        subtitle: {
          text: "加载完成后，点击鼠标拖拽可从不同角度进行查看"
        },
        plotOptions: {
          column: {
            depth: 25,
            width: 25,
            stacking: true,
            grouping: false,
            groupZPadding: 10
          }
        },
        xAxis: {
          type: "datetime",
          categories: [],
          crosshair: true
        },
        yAxis: {
          title: {
            text: "数量"
          }
        },
        series: [
          {
            name: "评论数",
            data: [],
            stack: 0
          },
          {
            name: "转发数",
            data: [],
            stack: 1
          },
          {
            name: "点赞数",
            data: [],
            stack: 2
          }
        ],
        credits: {
          enabled: false
        }
      }
    };
  },
  methods: {
    mouseDownEvent: function(e) {
      let chart = this.$refs.bar3DChart.chart;
      e = chart.pointer.normalize(e);
      this.mousePos = {
        posX: e.pageX,
        posY: e.pageY,
        alpha: chart.options.chart.options3d.alpha,
        beta: chart.options.chart.options3d.beta,
        sensitivity: 5 // lower is more sensitive
      };
      this.mouseDown = true;
    },
    mouseUpEvent: function() {
      this.mouseDown = false;
    },
    mouseMoveEvent: function(e) {
      if (this.mouseDown) {
        let chart = this.$refs.bar3DChart.chart;
        let newBeta =
          this.mousePos.beta +
          (this.mousePos.posX - e.pageX) / this.mousePos.sensitivity;
        newBeta = Math.min(100, Math.max(-100, newBeta));
        chart.options.chart.options3d.beta = newBeta;
        // Run alpha
        let newAlpha =
          this.mousePos.alpha +
          (e.pageY - this.mousePos.posY) / this.mousePos.sensitivity;
        newAlpha = Math.min(100, Math.max(-100, newAlpha));
        chart.options.chart.options3d.alpha = newAlpha;
        chart.redraw(false);
      }
    }
  },
  sockets: {
    receiveData: function(message) {
      this.bar3DChartOptions.xAxis.categories = message.data.statuses.dates;
      this.bar3DChartOptions.series[2].data =
        message.data.statuses.attitudes_count;
      this.bar3DChartOptions.series[1].data =
        message.data.statuses.reposts_count;
      this.bar3DChartOptions.series[0].data =
        message.data.statuses.comments_count;

      let days = message.data.topics.dates,
        topics = message.data.topics.data;

      this.streamGraphChartOptions.xAxis.categories = days;
      this.streamGraphChartOptions.series = topics;
      this.wordCloudChartOptions.series[0].data = topics;

      this.$emit("update:cnt");
    },
    updateStatus: function(message) {
      if (message.status === "done") {
        this.loading = false;
        this.$emit("update:progress");
      }
    }
  }
};
</script>
