<template>
  <div class="notes-list">
    <div class="header">
      <h1>Мои заметки</h1>
      <p v-if="notes.length === 0" class="empty-message">
        У вас пока нет заметок. <router-link to="/create">Создайте первую!</router-link>
      </p>
    </div>

    <div v-if="loading" class="loading">Загрузка...</div>

    <div v-else-if="error" class="error">
      Ошибка загрузки: {{ error }}
      <button @click="loadNotes" class="retry-btn">Повторить</button>
    </div>

    <div v-else class="notes-grid">
      <div
        v-for="note in notes"
        :key="note.id"
        class="note-card"
        @click="viewNote(note.id)"
      >
        <h3 class="note-title">{{ note.title }}</h3>
        <p class="note-content">{{ truncateContent(note.content) }}</p>
        <div class="note-meta">
          <span class="note-date">{{ formatDate(note.created_at) }}</span>
          <div class="note-actions">
            <button @click.stop="editNote(note.id)" class="btn-secondary">✏️</button>
            <button @click.stop="deleteNote(note.id)" class="btn-danger">🗑️</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { NoteService } from '@/services/api'
import type { Note } from '@/types/note'

const router = useRouter()
const notes = ref<Note[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const loadNotes = async () => {
  loading.value = true
  error.value = null
  try {
    notes.value = await NoteService.getAllNotes()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Неизвестная ошибка'
  } finally {
    loading.value = false
  }
}

const viewNote = (id: number) => {
  router.push(`/notes/${id}`)
}

const editNote = (id: number) => {
  router.push(`/notes/${id}/edit`)
}

const deleteNote = async (id: number) => {
  if (confirm('Вы уверены, что хотите удалить эту заметку?')) {
    try {
      await NoteService.deleteNote(id)
      notes.value = notes.value.filter(note => note.id !== id)
    } catch (err) {
      alert('Ошибка при удалении заметки')
    }
  }
}

const truncateContent = (content: string): string => {
  return content.length > 100 ? content.substring(0, 100) + '...' : content
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

onMounted(() => {
  loadNotes()
})
</script>

<style scoped>
.notes-list {
  width: 100%;
}

.header {
  margin-bottom: 2rem;
}

.header h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.empty-message {
  color: #7f8c8d;
  font-style: italic;
}

.empty-message a {
  color: #3498db;
  text-decoration: none;
}

.empty-message a:hover {
  text-decoration: underline;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.retry-btn {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.retry-btn:hover {
  background: #c0392b;
}

.notes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.note-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.note-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  border-color: #3498db;
}

.note-title {
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
}

.note-content {
  color: #555;
  margin: 0 0 1rem 0;
  line-height: 1.4;
}

.note-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #7f8c8d;
}

.note-date {
  font-style: italic;
}

.note-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-secondary, .btn-danger {
  background: none;
  border: none;
  padding: 0.25rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.btn-secondary:hover {
  background: #ecf0f1;
}

.btn-danger:hover {
  background: #fee;
}
</style>