<script setup lang="ts">
import { inject } from 'vue'
import type { Ref } from 'vue'
import type { Note } from '@/shared/types'
import { NoteCard } from '../NoteCard'

const notes = inject<Ref<Note[]>>('notes')
const loading = inject<Ref<boolean>>('loading')
const deleteNote = inject<(id: number) => Promise<void>>('deleteNote')
const setEditingNote = inject<(note: Note | null) => void>('setEditingNote')

const handleEdit = (note: Note) => {
  if (setEditingNote) {
    setEditingNote(note)
  }
}

const handleDelete = async (id: number) => {
  if (deleteNote) {
    await deleteNote(id)
  }
}
</script>

<template>
  <div class="notes-list">
    <h2 class="notes-list__title">Ваши заметки</h2>

    <div v-if="loading" class="notes-list__loading">
      Загрузка заметок...
    </div>

    <div v-else-if="!notes || notes.length === 0" class="notes-list__empty">
      Пока нет заметок. Создайте первую!
    </div>

    <div v-else class="notes-list__grid">
      <NoteCard
        v-for="note in notes"
        :key="note.id"
        :note="note"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </div>
  </div>
</template>

<style scoped>
.notes-list {
  flex: 1;
  overflow-y: auto;
}

.notes-list__title {
  margin-top: 0;
  color: #333;
  border-bottom: 2px solid #007bff;
  padding-bottom: 10px;
}

.notes-list__loading,
.notes-list__empty {
  text-align: center;
  padding: 40px 20px;
  color: #666;
  font-size: 16px;
}

.notes-list__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
  padding: 10px 0;
}
</style>
