import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router/index.js'
import globalComponent from '@/components/global.component.js'

import 'virtual:uno.css'
import './styles/global.css'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(globalComponent)
app.mount('#app')
