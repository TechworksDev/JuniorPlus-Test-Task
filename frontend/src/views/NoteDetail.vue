<template>
  <div class="note-detail">
    <div v-if="loading" class="loading">Загрузка...</div>

    <div v-else-if="error" class="error">
      Ошибка: {{ error }}
      <router-link to="/" class="back-link">Вернуться к списку</router-link>
    </div>

    <div v-else-if="note" class="note-content">
      <div class="note-header">
        <h1>{{ note.title }}</h1>
        <div class="note-actions">
          <router-link :to="`/notes/${note.id}/edit`" class="btn-secondary">✏️ Редактировать</router-link>
          <button @click="deleteNote" class="btn-danger">🗑️ Удалить</button>
        </div>
      </div>

      <div class="note-meta">
        <span>Создано: {{ formatDate(note.created_at) }}</span>
        <span>Обновлено: {{ formatDate(note.updated_at) }}</span>
      </div>

      <div class="note-body">
        <pre v-if="note.content">{{ note.content }}</pre>
        <p v-else class="empty-content">Содержимое отсутствует</p>
      </div>

      <div class="note-footer">
        <router-link to="/" class="back-link">← К списку заметок</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { NoteService } from '@/services/api'
import type { Note } from '@/types/note'

const router = useRouter()
const route = useRoute()
const note = ref<Note | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

const noteId = Number(route.params.id)

const loadNote = async () => {
  loading.value = true
  error.value = null
  try {
    note.value = await NoteService.getNoteById(noteId)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Неизвестная ошибка'
  } finally {
    loading.value = false
  }
}

const deleteNote = async () => {
  if (!note.value) return

  if (confirm('Вы уверены, что хотите удалить эту заметку?')) {
    try {
      await NoteService.deleteNote(note.value.id)
      router.push('/')
    } catch (err) {
      alert('Ошибка при удалении заметки')
    }
  }
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleString('ru-RU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
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
.note-detail {
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

.note-content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  overflow: hidden;
}

.note-header {
  background: #f8f9fa;
  padding: 2rem;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.note-header h1 {
  color: #2c3e50;
  margin: 0;
  flex: 1;
  margin-right: 1rem;
}

.note-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-secondary, .btn-danger {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.btn-secondary {
  background: #3498db;
  color: white;
}

.btn-secondary:hover {
  background: #2980b9;
}

.btn-danger {
  background: #e74c3c;
  color: white;
}

.btn-danger:hover {
  background: #c0392b;
}

.note-meta {
  padding: 1rem 2rem;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  gap: 2rem;
  font-size: 0.9rem;
  color: #6c757d;
}

.note-body {
  padding: 2rem;
  min-height: 300px;
}

.note-body pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  color: #2c3e50;
  line-height: 1.6;
  margin: 0;
  font-family: inherit;
}

.empty-content {
  color: #6c757d;
  font-style: italic;
  text-align: center;
  margin: 2rem 0;
}

.note-footer {
  padding: 1rem 2rem;
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
  text-align: center;
}
</style>