import { apiClient } from './client'
import type { Note } from '@/shared/types'

export const notesApi = {
  async getAll(): Promise<Note[]> {
    return apiClient.get<Note[]>('/notes')
  },

  async getById(id: number): Promise<Note> {
    return apiClient.get<Note>(`/notes/${id}`)
  },

  async create(title: string, content: string): Promise<Note> {
    return apiClient.post<Note>('/notes', { title, content })
  },

  async update(id: number, title: string, content: string): Promise<Note> {
    return apiClient.put<Note>(`/notes/${id}`, { title, content })
  },

  async delete(id: number): Promise<void> {
    await apiClient.delete(`/notes/${id}`)
  },
}
