
import Vue from 'vue'

import HighchartsVue from 'highcharts-vue'

import Highcharts from 'highcharts'
import highcharts3d from 'highcharts/highcharts-3d'
// import exportingInit from 'highcharts/modules/exporting'
import wordcloud from "highcharts/modules/wordcloud"
// exportingInit(Highcharts)


require('highcharts/modules/streamgraph')(Highcharts)
highcharts3d(Highcharts)
wordcloud(Highcharts)
Vue.use(HighchartsVue)