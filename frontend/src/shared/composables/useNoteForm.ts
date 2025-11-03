import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import type { Note } from '@/shared/types'

interface FormState {
  title: string
  content: string
  error: string
  submitting: boolean
}

export const useNoteForm = (editingNote: Ref<Note | null | undefined>) => {
  const title = ref('')
  const content = ref('')
  const error = ref('')
  const submitting = ref(false)

  // Define functions first (before they're used in watch)
  const resetForm = () => {
    title.value = ''
    content.value = ''
    error.value = ''
  }

  const validateForm = (): boolean => {
    error.value = ''

    if (!title.value.trim()) {
      error.value = 'Title is required'
      return false
    }

    if (!content.value.trim()) {
      error.value = 'Content is required'
      return false
    }

    return true
  }

  const resetError = () => {
    error.value = ''
  }

  const setError = (message: string) => {
    error.value = message
  }

  const getFormData = () => ({
    title: title.value,
    content: content.value,
  })

  const getFormState = (): FormState => ({
    title: title.value,
    content: content.value,
    error: error.value,
    submitting: submitting.value,
  })

  // Watch for editing note changes and populate form (after functions defined)
  watch(
    () => editingNote?.value,
    (newNote) => {
      if (newNote) {
        title.value = newNote.title
        content.value = newNote.content
      } else {
        resetForm()
      }
    },
    { immediate: true }
  )

  return {
    title,
    content,
    error,
    submitting,
    validateForm,
    resetForm,
    resetError,
    setError,
    getFormData,
    getFormState,
  }
}
