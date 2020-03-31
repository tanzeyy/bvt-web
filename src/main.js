import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import './plugins/socketio.js'
import './plugins/hcharts.js'
import router from './plugins/routes.js'
import axios from 'axios'
import './assets/global.css'


Vue.config.productionTip = false
axios.defaults.baseURL = "/api"
Vue.prototype.$axios = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
