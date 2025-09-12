import { defineStore } from 'pinia'
import { useUserStore } from './userStore'

export type Note = {
  id: number
  owner_id: number
  title: string
  text: string
  created_at: string
}

export interface UserStoreInterface {
  notes: Note[] | null
  createNote: (title: string, text: string) => void
  deleteNote: (id: number) => void
  updateNote: (id: number, title: string, text: string) => void
  getNotes: () => void
}

export const useNoteStore = defineStore('notes', {
  state: () => ({
    notes: [] as Note[],
  }),
  actions: {
    async getNotes() {
      const userStore = useUserStore()
      try{
        const url = 'http://127.0.0.1:3000/notes/getNotes'
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${userStore.user?.token}`
          }
        }).then(response => response.json()).then(response => response.notes)
        if(!response || response.length === 0) return []
        console.log("RESPONSE:", response)
        this.notes = response.sort((a: Note, b: Note) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        localStorage.setItem('notes', JSON.stringify(response))
        return response
      } catch (err) {
        console.log('Error occured', err)
        return { message: 'Неизвестная ошибка' }
      }
    },
    async createNote(title: string, text: string) {
      const userStore = useUserStore()
      try{
        const url = 'http://127.0.0.1:3000/notes/addNote'
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${userStore.user?.token}`
          },
          body: JSON.stringify({ title, text })
        }).then(response => response.json())
        if(!response.id) return
        this.notes?.push(response)
        localStorage.setItem('notes', JSON.stringify(this.notes))
        return response
      } catch (err) {
        console.log('Error occured', err)
        return { message: 'Неизвестная ошибка' }
      }
    },
    async deleteNote(id: number) {
      const userStore = useUserStore()
      try{
        const url = 'http://127.0.0.1:3000/notes/removeNote'
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${userStore.user?.token}`
          },
          body: JSON.stringify({ id })
        })
        if (!response.ok) {
          const errData = await response.json()
          return { message: errData.message || 'Ошибка сервера' }
        }
        this.notes = this.notes?.filter(note => note.id !== id)
        localStorage.setItem('notes', JSON.stringify(this.notes))
      } catch (err) {
        console.log('Error occured', err)
        return { message: 'Неизвестная ошибка' }
      }
    },
    async updateNote(id: number, title: string, text: string) {
      const userStore = useUserStore()
      try{
        const url = 'http://127.0.0.1:3000/notes/updateNote'
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${userStore.user?.token}`
          },
          body: JSON.stringify({ id, title, text })
        })
        if (!response.ok) {
          const errData = await response.json()
          return { message: errData.message || 'Ошибка сервера' }
        }
        this.notes = this.notes?.map(note => note.id === id ? { ...note, title, text } : note)
        localStorage.setItem('notes', JSON.stringify(this.notes))
      } catch (err) {
        console.log('Error occured', err)
        return { message: 'Неизвестная ошибка' }
      }
    },
    loadFromLocalStorage() {
      const notes = localStorage.getItem('notes')
      if (notes) {
        this.notes = JSON.parse(notes)
      }
    }
  }
})
