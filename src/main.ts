import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// import HelloWorld from './components/HelloWorld.vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import NotFound from './main/tpl/404.vue';
import Main from './main/Main.vue';
import { mainRoute } from './main/main.route';
const routes: RouteRecordRaw[] = [
  // { path: '/hello', component: HelloWorld },
  { path: '/main', component: Main, children: mainRoute },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
export const app = createApp(App).use(router).mount('#app')
