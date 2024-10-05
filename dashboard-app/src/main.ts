import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import cors from 'cors'

import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../src/assets/Saira/static/Saira-Regular.ttf'
// import BootstrapVue from 'bootstrap-vue'
createApp(App).use(store).use(router).mount('#app')
