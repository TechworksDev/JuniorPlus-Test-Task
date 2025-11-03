<script setup lang="ts">
import type { Note } from '@/shared/types'

interface Props {
  note: Note
}

const props = defineProps<Props>()

const emit = defineEmits<{
  edit: [note: Note]
  delete: [id: number]
}>()

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const handleEdit = () => {
  emit('edit', props.note)
}

const handleDelete = () => {
  if (confirm('Вы уверены, что хотите удалить эту заметку?')) {
    emit('delete', props.note.id)
  }
}
</script>

<template>
  <div class="note-card">
    <h3 class="note-card__title">{{ note.title }}</h3>
    <p class="note-card__content">{{ note.content }}</p>

    <div class="note-card__meta">
      <span class="note-card__date">{{ formatDate(note.createdAt) }}</span>
    </div>

    <div class="note-card__actions">
      <button class="note-card__btn note-card__btn--edit" @click="handleEdit">
        Редактировать
      </button>
      <button class="note-card__btn note-card__btn--delete" @click="handleDelete">
        Удалить
      </button>
    </div>
  </div>
</template>

<style scoped>
.note-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s;
}

.note-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.note-card__title {
  margin: 0 0 10px 0;
  font-size: 16px;
  color: #333;
  word-break: break-word;
}

.note-card__content {
  margin: 0 0 10px 0;
  color: #555;
  font-size: 14px;
  line-height: 1.5;
  max-height: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;
}

.note-card__meta {
  margin-bottom: 10px;
}

.note-card__date {
  font-size: 12px;
  color: #999;
}

.note-card__actions {
  display: flex;
  gap: 8px;
}

.note-card__btn {
  flex: 1;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  transition: background-color 0.2s;
}

.note-card__btn--edit {
  background-color: #007bff;
  color: white;
}

.note-card__btn--edit:hover {
  background-color: #0056b3;
}

.note-card__btn--delete {
  background-color: #dc3545;
  color: white;
}

.note-card__btn--delete:hover {
  background-color: #c82333;
}
</style>
