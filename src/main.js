import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './scss/index.scss'
import App from './App.vue'
// import router from './router'

const app = createApp(App)

app.use(createPinia());
const { default: router } = await import('./router');
app.use(router);
app.mount('#app');


