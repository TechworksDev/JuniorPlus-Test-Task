<template>
  <div class="note-card" @click="$emit('edit-note', note)">
    <div class="note-header">
      <h3>{{ note.title }}</h3>
      <button
        @click.stop="$emit('delete-note', note.id)"
        class="btn-delete"
        title="Delete note"
      >
        ×
      </button>
    </div>
    <p class="note-content">{{ note.content || "No content" }}</p>
    <div class="note-footer">
      <small>{{ formatDate(note.updated_at) }}</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Note } from "../types/Note";

interface Props {
  note: Note;
}

defineProps<Props>();

defineEmits<{
  "edit-note": [note: Note];
  "delete-note": [id: number];
}>();

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>

<style scoped>
.note-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.note-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.note-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.note-header h3 {
  color: #333;
  font-size: 1.25rem;
  margin: 0;
  flex: 1;
}

.btn-delete {
  background: #dc0e0e;
  color: white;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.btn-delete:hover {
  background: #c0392b;
}

.note-content {
  color: #666;
  margin-bottom: 12px;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.note-footer {
  color: #999;
  font-size: 0.875rem;
}
</style>
