import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/NotesList.vue')
    },
    {
      path: '/notes/:id',
      name: 'note-detail',
      component: () => import('@/views/NoteDetail.vue'),
      props: true
    },
    {
      path: '/notes/:id/edit',
      name: 'note-edit',
      component: () => import('@/views/NoteEdit.vue'),
      props: true
    },
    {
      path: '/create',
      name: 'note-create',
      component: () => import('@/views/NoteCreate.vue')
    }
  ]
})

export default router