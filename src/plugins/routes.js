import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../components/Auth.vue'
import Main from '../components/Main.vue'
// import Input from '../components/Input.vue'


Vue.use(VueRouter)

const routes = [
    { path: '/auth_callback', component: Auth },
    { path: '/', component: Main}
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

// Vue.use(router)

export default router;