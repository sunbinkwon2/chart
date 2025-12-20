import { createApp } from 'vue'
import App from "./App.vue"
import { createPinia } from 'pinia'
import router from './router'
import naive from 'naive-ui'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { vuetify } from '@/plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'

const app = createApp(App)

app
  .use(createPinia())
  .use(router)
  .use(naive)
  .use(ElementPlus)
  .use(vuetify)
  .mount('#app')
