import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: () => import('@/views/home/index.vue'),
  },
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

export default router
