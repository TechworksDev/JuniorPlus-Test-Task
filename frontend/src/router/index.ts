import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage,
    },
    {
      path: '/home',
      name: 'HomePage',
      component: () => import('@views/HomeView.vue'),
    },
  ],
})

export default router
