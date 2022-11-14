import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'

const Vue = createApp(App)
Vue.use(store).use(router).use(VueCookies).mount('#app')
