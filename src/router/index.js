import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/snake',
      name: 'snake',
      component: () => import('../views/Snake.vue')
    },
    {
      path: '/canvas',
      name: 'canvas',
      component: () => import('../views/Canvas.vue')
    },
    {
      path: '/rek',
      name: 'rek',
      component: () => import('../views/Rek.vue')
    }
  ]
})

export default router
