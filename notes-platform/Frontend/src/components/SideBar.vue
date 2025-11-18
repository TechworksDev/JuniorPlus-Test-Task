<script setup>
const props = defineProps({
  notes: Array,
  selectedNoteId: String,
  searchQuery: String,
  isLoading: Boolean
});

const emit = defineEmits([
  'select',
  'edit',
  'delete',
  'update:searchQuery'
]);

const handleSearchInput = (event) => {
  emit('update:searchQuery', event.target.value);
};

const handleSelect = (id) => emit('select', id);
const handleEdit = (id) => emit('edit', id);
const handleDelete = (id) => emit('delete', id);

const clearSearch = () => {
  emit('update:searchQuery', '');
};
</script>

<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <h1>Просто заметки без ии</h1>

      <div class="search-container">
        <div class="search-input-wrapper">
          <span class="search-icon">🔍</span>
          <input
              type="text"
              class="search-input"
              placeholder="Поиск заметок..."
              :value="searchQuery"
              @input="handleSearchInput"
          />
          <button
              v-if="searchQuery"
              @click="clearSearch"
              class="clear-button"
              title="Очистить"
          >
            ✕
          </button>
        </div>
      </div>
    </div>

    <div class="notes-list">
      <div v-if="isLoading" class="loading-state">
        <div class="spinner"></div>
        <p>Загрузка...</p>
      </div>

      <div v-else-if="notes.length === 0 && searchQuery" class="empty-search">
        <div class="empty-icon">🔍</div>
        <p class="empty-text">Ничего не найдено</p>
        <p class="empty-hint">Попробуйте другой запрос</p>
      </div>

      <div v-else-if="notes.length === 0" class="empty-search">
        <div class="empty-icon">📭</div>
        <p class="empty-text">Нет заметок</p>
        <p class="empty-hint">Создайте первую заметку!</p>
      </div>

      <div
          v-else
          v-for="note in notes"
          :key="note.id"
          @click="handleSelect(note.id)"
          :class="['note-item', { active: selectedNoteId === note.id }]"
      >
        <div class="note-item-content">
          <h3 class="note-title">{{ note.name }}</h3>

          <div class="note-actions">
            <button
                @click.stop="handleEdit(note.id)"
                class="btn-action btn-edit"
                title="Редактировать"
            >
              ✏️
            </button>
            <button
                @click.stop="handleDelete(note.id)"
                class="btn-action btn-delete"
                title="Удалить"
            >
              🗑️
            </button>
          </div>
        </div>

        <p class="note-preview">{{ note.content }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  width: 320px;
  background-color: white;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.sidebar-header h1 {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
}

.search-container {
  margin-top: 12px;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  font-size: 16px;
  color: #999;
}

.search-input {
  width: 100%;
  padding: 10px 36px 10px 36px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #2196F3;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

.search-input::placeholder {
  color: #999;
}

.clear-button {
  position: absolute;
  right: 8px;
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 4px 8px;
  font-size: 18px;
  line-height: 1;
  transition: color 0.2s;
}

.clear-button:hover {
  color: #333;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: #999;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #2196F3;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.empty-search {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.empty-text {
  font-size: 16px;
  font-weight: 600;
  color: #666;
  margin-bottom: 4px;
}

.empty-hint {
  font-size: 14px;
  color: #999;
}

.notes-list {
  flex: 1;
  overflow-y: auto;
}

.note-item {
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  transition: background-color 0.2s;
}

.note-item:hover {
  background-color: #f9f9f9;
}

.note-item.active {
  background-color: #e3f2fd;
  border-left: 4px solid #2196F3;
}

.note-item-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.note-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  flex: 1;
}

.note-actions {
  display: flex;
  gap: 8px;
  margin-left: 8px;
}

.btn-action {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  padding: 4px;
  transition: transform 0.2s;
}

.btn-action:hover {
  transform: scale(1.2);
}

.note-preview {
  font-size: 14px;
  color: #666;
  margin-top: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>