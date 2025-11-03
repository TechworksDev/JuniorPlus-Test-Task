import { ref } from 'vue'
import type { Ref } from 'vue'
import type { Note } from '@/shared/types'
import { notesApi } from '@/shared/api'

export const useNotes = () => {
  const notes = ref<Note[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchNotes = async () => {
    try {
      loading.value = true
      error.value = null
      notes.value = await notesApi.getAll()
    } catch (err) {
      error.value = 'Не удалось загрузить заметки. Убедитесь, что backend запущен на http://localhost:3000'
      console.error('Error fetching notes:', err)
    } finally {
      loading.value = false
    }
  }

  const createNote = async (title: string, content: string): Promise<Note> => {
    try {
      error.value = null
      const newNote = await notesApi.create(title, content)
      notes.value.unshift(newNote)
      return newNote
    } catch (err) {
      error.value = 'Не удалось создать заметку'
      console.error('Error creating note:', err)
      throw err
    }
  }

  const updateNote = async (
    id: number,
    title: string,
    content: string
  ): Promise<Note> => {
    try {
      error.value = null
      const updated = await notesApi.update(id, title, content)
      const index = notes.value.findIndex((n) => n.id === id)
      if (index !== -1) {
        notes.value[index] = updated
      }
      return updated
    } catch (err) {
      error.value = 'Не удалось обновить заметку'
      console.error('Error updating note:', err)
      throw err
    }
  }

  const deleteNote = async (id: number): Promise<void> => {
    try {
      error.value = null
      await notesApi.delete(id)
      notes.value = notes.value.filter((n) => n.id !== id)
    } catch (err) {
      error.value = 'Не удалось удалить заметку'
      console.error('Error deleting note:', err)
      throw err
    }
  }

  return {
    notes: notes as Ref<Note[]>,
    loading,
    error,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
  }
}
