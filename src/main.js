import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'
import 'normalize.css'
window.CESIUM_BASE_URL = '/'

createApp(App).use(Router).mount('#app')
