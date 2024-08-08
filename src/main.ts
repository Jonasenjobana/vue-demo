import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import HelloWorld from './components/HelloWorld.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/hello', component: HelloWorld },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
createApp(App).use(router).mount('#app')
