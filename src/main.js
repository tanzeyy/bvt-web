import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import './plugins/socketio.js'
import './plugins/hcharts.js'
import router from './plugins/routes.js'
import axios from 'axios'
import './assets/global.css'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)


Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
