import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@views/LoginView.vue'
import { useUserStore } from '@/stores/userStore'

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
    {
      path: '/profile',
      name: 'ProfilePage',
      component: () => import('@views/ProfilePage.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const token = userStore.user?.token || localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')!).token
  console.log("Going to ", to.name, " with token ", token)
  if (to.name !== 'LoginPage' && !token) {
    next({ name: 'LoginPage' })
  } else if (to.name === 'LoginPage' && token) {
    next({ name: 'HomePage' })
  } else {
    next()
  }
})

export default router
