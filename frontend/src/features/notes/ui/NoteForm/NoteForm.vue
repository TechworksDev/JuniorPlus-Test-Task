<script setup lang="ts">
import { inject } from 'vue'
import type { Ref } from 'vue'
import type { Note } from '@/shared/types'
import { useNoteForm } from '@/shared/composables'
import { NoteInput } from '../NoteInput'
import { NoteError } from '../NoteError'
import { NoteActions } from '../NoteActions'

const editingNote = inject<Ref<Note | null>>('editingNote') as Ref<Note | null>
const createNote = inject<(title: string, content: string) => Promise<void>>('createNote')
const updateNote = inject<(id: number, title: string, content: string) => Promise<void>>('updateNote')
const setEditingNote = inject<(note: Note | null) => void>('setEditingNote')

const {
  title,
  content,
  error,
  submitting,
  validateForm,
  resetForm,
  setError,
} = useNoteForm(editingNote as Ref<Note | null | undefined>)

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  try {
    submitting.value = true

    if (editingNote && editingNote.value) {
      // Update existing note
      if (updateNote) {
        await updateNote(editingNote.value.id, title.value, content.value)
      }
      if (setEditingNote) {
        setEditingNote(null)
      }
    } else {
      // Create new note
      if (createNote) {
        await createNote(title.value, content.value)
      }
    }

    resetForm()
  } catch (e) {
    setError('Не удалось сохранить заметку')
    console.error(e)
  } finally {
    submitting.value = false
  }
}

const handleCancel = () => {
  resetForm()
  if (setEditingNote) {
    setEditingNote(null)
  }
}
</script>

<template>
  <div class="note-form">
    <h2 class="note-form__title">{{ editingNote ? 'Редактировать заметку' : 'Новая заметка' }}</h2>

    <form class="note-form__form" @submit.prevent="handleSubmit">
      <NoteInput
        v-model="title"
        label="Заголовок"
        placeholder="Введите заголовок"
        type="text"
        :disabled="submitting"
        :maxlength="255"
      />

      <NoteInput
        v-model="content"
        label="Содержание"
        placeholder="Введите содержание заметки"
        type="textarea"
        :disabled="submitting"
        :rows="8"
      />

      <NoteError :message="error" />

      <NoteActions
        :is-submitting="submitting"
        :is-editing="!!editingNote"
        :disabled="submitting"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
    </form>
  </div>
</template>

<style scoped>
.note-form {
  width: 100%;
  max-width: 400px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.note-form__title {
  margin-top: 0;
  color: #333;
  font-size: 20px;
  margin-bottom: 20px;
  border-bottom: 2px solid #007bff;
  padding-bottom: 10px;
}

.note-form__form {
  display: flex;
  flex-direction: column;
  gap: 0;
}
</style>
