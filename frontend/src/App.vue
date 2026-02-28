<template>
  <div class="app">
    <HeaderComponent @create-note="showCreateModal = true" />

    <NotesGrid
      :notes="notes"
      :loading="loading"
      :error="error"
      @edit-note="openEditModal"
      @delete-note="deleteNote"
    />

    <NoteModal
      :is-visible="showCreateModal || showEditModal"
      :is-edit-mode="showEditModal"
      :form-data="formData"
      @close="closeModal"
      @submit="showEditModal ? updateNote($event) : createNote($event)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { notesApi } from "./services/api";
import type { Note, CreateNoteDto } from "./types/Note";
import HeaderComponent from "./components/HeaderComponent.vue";
import NotesGrid from "./components/NotesGrid.vue";
import NoteModal from "./components/NoteModal.vue";

const notes = ref<Note[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const showCreateModal = ref(false);
const showEditModal = ref(false);
const editingNoteId = ref<number | null>(null);
const formData = ref<CreateNoteDto>({
  title: "",
  content: "",
});

const loadNotes = async () => {
  loading.value = true;
  error.value = null;
  try {
    notes.value = await notesApi.getAllNotes();
  } catch (err: any) {
    error.value = err.response?.data?.error?.message || "Failed to load notes";
    console.error("Error loading notes:", err);
  } finally {
    loading.value = false;
  }
};

const createNote = async (noteData: CreateNoteDto) => {
  try {
    await notesApi.createNote(noteData);
    closeModal();
    await loadNotes();
  } catch (err: any) {
    error.value = err.response?.data?.error?.message || "Failed to create note";
    console.error("Error creating note:", err);
  }
};

const updateNote = async (noteData: CreateNoteDto) => {
  if (!editingNoteId.value) return;
  try {
    await notesApi.updateNote(editingNoteId.value, noteData);
    closeModal();
    await loadNotes();
  } catch (err: any) {
    error.value = err.response?.data?.error?.message || "Failed to update note";
    console.error("Error updating note:", err);
  }
};

const deleteNote = async (id: number) => {
  if (!confirm("Are you sure you want to delete this note?")) return;
  try {
    await notesApi.deleteNote(id);
    await loadNotes();
  } catch (err: any) {
    error.value = err.response?.data?.error?.message || "Failed to delete note";
    console.error("Error deleting note:", err);
  }
};

const openEditModal = (note: Note) => {
  editingNoteId.value = note.id;
  formData.value = {
    title: note.title,
    content: note.content || "",
  };
  showEditModal.value = true;
};

const closeModal = () => {
  showCreateModal.value = false;
  showEditModal.value = false;
  editingNoteId.value = null;
  formData.value = {
    title: "",
    content: "",
  };
};

onMounted(() => {
  loadNotes();
});
</script>

<style scoped>
.app {
  min-height: 100vh;
}
</style>
