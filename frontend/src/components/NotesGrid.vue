<template>
  <div v-if="loading" class="loading">Loading notes...</div>
  <div v-else-if="error" class="error">{{ error }}</div>
  <div v-else-if="notes.length === 0" class="empty-state">
    <p>No notes yet. Create your first note!</p>
  </div>
  <div v-else class="notes-grid">
    <NoteCard
      v-for="note in notes"
      :key="note.id"
      :note="note"
      @edit-note="$emit('edit-note', $event)"
      @delete-note="$emit('delete-note', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import type { Note } from "../types/Note";
import NoteCard from "./NoteCard.vue";

interface Props {
  notes: Note[];
  loading: boolean;
  error: string | null;
}

defineProps<Props>();

defineEmits<{
  "edit-note": [note: Note];
  "delete-note": [id: number];
}>();
</script>

<style scoped>
.loading,
.error,
.empty-state {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #666;
}

.error {
  color: #e74c3c;
}

.notes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
</style>
