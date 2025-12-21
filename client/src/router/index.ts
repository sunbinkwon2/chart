import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/scatter',
    name: 'Scatter',
    component: () => import('@/views/ScatterView.vue')
  },
  {
    path: '/line',
    name: 'Line',
    component: () => import('@/views/LineView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
