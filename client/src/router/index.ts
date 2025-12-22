import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/chart',
    name: 'Chart',
    component: () => import('@/views/ChartView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
