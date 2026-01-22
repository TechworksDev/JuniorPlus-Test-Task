<template>
  <div class="note-edit">
    <div v-if="loading" class="loading">Загрузка...</div>

    <div v-else-if="error" class="error">
      Ошибка: {{ error }}
      <router-link to="/" class="back-link">Вернуться к списку</router-link>
    </div>

    <div v-else-if="note" class="note-form">
      <h1>Редактировать заметку</h1>

      <form @submit.prevent="submitForm" class="form">
        <div class="form-group">
          <label for="title" class="form-label">Заголовок *</label>
          <input
            id="title"
            v-model="form.title"
            type="text"
            class="form-input"
            :class="{ error: errors.title }"
            placeholder="Введите заголовок заметки"
            required
          />
          <span v-if="errors.title" class="error-message">{{ errors.title }}</span>
        </div>

        <div class="form-group">
          <label for="content" class="form-label">Содержимое</label>
          <textarea
            id="content"
            v-model="form.content"
            class="form-textarea"
            :class="{ error: errors.content }"
            placeholder="Введите содержимое заметки"
            rows="10"
          ></textarea>
          <span v-if="errors.content" class="error-message">{{ errors.content }}</span>
        </div>

        <div class="form-actions">
          <button type="button" @click="cancel" class="btn-secondary">Отмена</button>
          <button type="submit" :disabled="saving" class="btn-primary">
            {{ saving ? 'Сохранение...' : 'Сохранить изменения' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { NoteService } from '@/services/api'
import type { Note, UpdateNoteRequest } from '@/types/note'

const router = useRouter()
const route = useRoute()
const note = ref<Note | null>(null)
const loading = ref(false)
const saving = ref(false)
const error = ref<string | null>(null)
const errors = reactive<Record<string, string>>({})

const noteId = Number(route.params.id)

const form = reactive<UpdateNoteRequest>({
  title: '',
  content: ''
})

const loadNote = async () => {
  loading.value = true
  error.value = null
  try {
    const loadedNote = await NoteService.getNoteById(noteId)
    note.value = loadedNote
    form.title = loadedNote.title
    form.content = loadedNote.content
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Неизвестная ошибка'
  } finally {
    loading.value = false
  }
}

const validateForm = (): boolean => {
  errors.title = ''
  errors.content = ''

  if (!form.title?.trim()) {
    errors.title = 'Заголовок обязателен'
    return false
  }

  if (form.title && form.title.length > 255) {
    errors.title = 'Заголовок не должен превышать 255 символов'
    return false
  }

  return true
}

const submitForm = async () => {
  if (!validateForm() || !note.value) return

  saving.value = true
  try {
    const updatedNote = await NoteService.updateNote(note.value.id, {
      title: form.title?.trim(),
      content: form.content?.trim()
    })
    router.push(`/notes/${updatedNote.id}`)
  } catch (error: any) {
    if (error.response?.data?.errors) {
      error.response.data.errors.forEach((err: any) => {
        errors[err.field] = err.message
      })
    } else {
      alert('Ошибка при сохранении изменений')
    }
  } finally {
    saving.value = false
  }
}

const cancel = () => {
  router.go(-1)
}

onMounted(() => {
  if (isNaN(noteId)) {
    error.value = 'Неверный ID заметки'
    return
  }
  loadNote()
})
</script>

<style scoped>
.note-edit {
  max-width: 800px;
  margin: 0 auto;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #7f8c8d;
}

.error {
  background: #fee;
  color: #c0392b;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.back-link {
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
}

.back-link:hover {
  text-decoration: underline;
}

.note-form h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
}

.form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2c3e50;
}

.form-input, .form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-input:focus, .form-textarea:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.form-textarea {
  resize: vertical;
  min-height: 200px;
}

.form-input.error, .form-textarea.error {
  border-color: #e74c3c;
}

.error-message {
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 0.25rem;
  display: block;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.btn-primary, .btn-secondary {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: #3498db;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #2980b9;
}

.btn-primary:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.btn-secondary {
  background: #ecf0f1;
  color: #2c3e50;
}

.btn-secondary:hover {
  background: #d5dbdb;
}
</style>