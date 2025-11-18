<script setup>
import { ref, computed, watch } from 'vue';
import Sidebar from './components/SideBar.vue';
import MainView from './components/MainView.vue';
import ModalNote from './components/ModalNote.vue';
import ModalConfirm from './components/ModalConfirm.vue';

// ПАСХАЛКА если читаете это) У меня времени не хватило чтоб все по файлам разбить. Если читаете это значит я оставил все в App.vue

const notes = ref([]);
const selectedNoteId = ref(null);
const isNoteModalOpen = ref(false);
const noteModalMode = ref('create');
const noteModalInitial = ref({});
const isDeleteModalOpen = ref(false);
const deleteNoteId = ref(null);
const searchQuery = ref(''); // поисковый запрос
const isLoading = ref(false); // индикатор загрузки
const searchError = ref(null); // ошибка поиска

const loadNotes = async (query = '') => {
  try {
    isLoading.value = true;
    searchError.value = null;

    const url = query
        ? `http://localhost:3000/api/notes/search?q=${encodeURIComponent(query)}`
        : 'http://localhost:3000/api/notes';

    const response = await fetch(url);
    const data = await response.json();

    if (data.success) {
      notes.value = data.data;
    } else {
      searchError.value = 'Ошибка при загрузке заметок';
    }
  } catch (error) {
    searchError.value = 'Не удалось подключиться к серверу';
  } finally {
    isLoading.value = false;
  }
};

let searchTimeout;
watch(searchQuery, (newQuery) => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    loadNotes(newQuery);
  }, 300); // задержка 300мс
});

import { onMounted } from 'vue';
onMounted(() => {
  loadNotes();
});

const selectNote = (id) => {
  selectedNoteId.value = id;
};

const openCreateModal = () => {
  noteModalMode.value = 'create';
  noteModalInitial.value = {};
  isNoteModalOpen.value = true;
};

const openEditModal = (id) => {
  const note = notes.value.find(n => n.id === id);
  noteModalMode.value = 'edit';
  noteModalInitial.value = { ...note };
  isNoteModalOpen.value = true;
};

const openDeleteModal = (id) => {
  deleteNoteId.value = id;
  isDeleteModalOpen.value = true;
};

const createNote = async (payload) => {
  try {
    const response = await fetch('http://localhost:3000/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (data.success) {
      await loadNotes(searchQuery.value); // перезагружаем список
      selectedNoteId.value = data.data.id;
      isNoteModalOpen.value = false;
    }
  } catch (error) {
    alert('Не удалось создать заметку');
  }
};

const updateNote = async (payload) => {
  try {
    const response = await fetch(`http://localhost:3000/api/notes/${payload.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (data.success) {
      await loadNotes(searchQuery.value);
      isNoteModalOpen.value = false;
    }
  } catch (error) {
    alert('Не удалось обновить заметку');
  }
};

const deleteNote = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/notes/${deleteNoteId.value}`, {
      method: 'DELETE'
    });

    const data = await response.json();

    if (data.success) {
      if (selectedNoteId.value === deleteNoteId.value) {
        selectedNoteId.value = null;
      }
      await loadNotes(searchQuery.value);
      isDeleteModalOpen.value = false;
      deleteNoteId.value = null;
    }
  } catch (error) {
    alert('Не удалось удалить заметку');
  }
};

const selectedNote = computed(() =>
    notes.value.find(n => n.id === selectedNoteId.value)
);
</script>

<template>
  <div class="app-container">
    <Sidebar
        :notes="notes"
        :selectedNoteId="selectedNoteId"
        :searchQuery="searchQuery"
        :isLoading="isLoading"
        @update:searchQuery="searchQuery = $event"
        @select="selectNote"
        @edit="openEditModal"
        @delete="openDeleteModal"
    />

    <MainView
        :note="selectedNote"
        @create="openCreateModal"
    />

    <ModalNote
        v-if="isNoteModalOpen"
        :mode="noteModalMode"
        :initialData="noteModalInitial"
        @submit="noteModalMode === 'create' ? createNote($event) : updateNote($event)"
        @cancel="isNoteModalOpen = false"
    />

    <ModalConfirm
        v-if="isDeleteModalOpen"
        @confirm="deleteNote"
        @cancel="isDeleteModalOpen = false"
    />
  </div>
</template>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.app-container {
  display: flex;
  height: 100vh;
  background-color: #f5f5f5;
}
</style>