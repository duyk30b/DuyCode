import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'

// import tailwind css first
import './assets/tailwind.css'
// then import custom scss
import './assets/main.scss'
// then import common scss
import './common/scss/vue-common.scss'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
