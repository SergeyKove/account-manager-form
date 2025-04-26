import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'
import 'quasar/src/css/index.sass'
import '@quasar/extras/material-icons/material-icons.css'

import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(Quasar, {
  plugins: {},
})

app.mount('#app')
