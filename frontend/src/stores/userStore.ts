import { defineStore } from 'pinia'
import { useNoteStore } from './noteStore'

export type User = {
  id: number
  email: string
  avatar: string
  created_at: string
  token: string
}

export interface UserStoreInterface {
  user: User | null
  auth: (email: string, password: string, register: boolean) => Promise<User | AuthError>
  logout: () => void
}

export interface AuthError {
  message: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
  }),
  actions: {
    async auth(email: string, password: string, register: boolean): Promise<User | AuthError> {
      try{
        const url = register ? 'http://127.0.0.1:3000/auth/register' : 'http://127.0.0.1:3000/auth/login'
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        })
        if (!response.ok) {
          const errData = await response.json()
          return { message: errData.message || 'Ошибка сервера' }
        }

        const data: User = await response.json()
        this.user = data
        localStorage.setItem('user', JSON.stringify(data))
        return data
      } catch (err) {
        console.log('Error occured', err)
        return { message: 'Неизвестная ошибка' }
      }
    },
    async logout(){
      this.user = null
      const noteStore = useNoteStore()
      noteStore.notes = []
      localStorage.removeItem('user')
      localStorage.removeItem('notes')
    },
    async deleteAccount(){
      const data = localStorage.getItem('user')
      if (!data) return
      const user: User = JSON.parse(data)
      console.log(user)
      await fetch('http://127.0.0.1:3000/auth/delete', {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        }
      })
    },
    async updateAccount(avatar: string){
      const data = localStorage.getItem('user')
      if (!data) return
      const user: User = JSON.parse(data)
      await fetch('http://127.0.0.1:3000/auth/updateProfile', {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify({ avatar })
      })
      user.avatar = avatar
      localStorage.setItem('user', JSON.stringify(user))
    },
    loadFromLocalStorage() {
      const user = localStorage.getItem('user')
      if (user) {
        this.user = JSON.parse(user)
      }
    }
  }
})
