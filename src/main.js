import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './scss/index.scss'
import App from './App.vue'
// import router from './router'

const app = createApp(App)

app.use(createPinia());
const { default: router } = await import('./router');
app.use(router);
const list = [
  [() => import('./directives'), res => app.use(res.default)],
  // [() => import('./http'), res => (app.config.globalProperties['$http'] = res.default)],
];

await Promise.all(list.map(item => item[0]())).then(resList => {
  resList.forEach((res, i) => {
    const callback = list[i][1];
    callback && callback(res);
  });
});
app.mount('#app');
