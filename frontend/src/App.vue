<script setup lang="ts">
import { ref, provide, onMounted } from 'vue'
import { NotesList, NoteForm } from './features'
import { useNotes } from './shared/composables'
import type { Note } from './shared/types'

// Use composable for notes state and operations
const {
  notes,
  loading,
  fetchNotes,
  createNote,
  updateNote,
  deleteNote,
} = useNotes()

// State for editing
const editingNote = ref<Note | null>(null)

// Set editing note
const setEditingNote = (note: Note | null) => {
  editingNote.value = note
}

// Wrap API calls to include navigation cleanup
const handleCreateNote = async (title: string, content: string) => {
  await createNote(title, content)
  editingNote.value = null
}

const handleUpdateNote = async (
  id: number,
  title: string,
  content: string
) => {
  await updateNote(id, title, content)
  editingNote.value = null
}

// Provide state and methods to child components
provide('notes', notes)
provide('loading', loading)
provide('editingNote', editingNote)
provide('createNote', handleCreateNote)
provide('updateNote', handleUpdateNote)
provide('deleteNote', deleteNote)
provide('setEditingNote', setEditingNote)

// Load notes on mount
onMounted(() => {
  fetchNotes()
})
</script>

<template>
  <div id="app" class="app-container">
    <header class="app-header">
      <h1>📝 Заметки</h1>
      <p>Простое приложение для создания заметок</p>
    </header>

    <main class="app-main">
      <NoteForm />
      <NotesList />
    </main>

    <footer class="app-footer">
      <p>Создано на Vue 3 + TypeScript + Vite</p>
    </footer>
  </div>
</template>

<style scoped>
#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.app-header h1 {
  margin: 0 0 10px 0;
  font-size: 32px;
}

.app-header p {
  margin: 0;
  font-size: 14px;
  opacity: 0.9;
}

.app-main {
  flex: 1;
  display: flex;
  gap: 20px;
  padding: 20px;
  overflow: hidden;
  background-color: #f5f5f5;
}

.app-footer {
  background-color: #333;
  color: white;
  padding: 15px;
  text-align: center;
  font-size: 12px;
  border-top: 1px solid #222;
}

.app-footer p {
  margin: 0;
}

@media (max-width: 768px) {
  .app-main {
    flex-direction: column;
  }

  .app-header h1 {
    font-size: 24px;
  }

  .app-header {
    padding: 20px;
  }
}
</style>
