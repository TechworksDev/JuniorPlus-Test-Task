<template>
  <div class="relative min-h-screen flex flex-col items-center py-10 overflow-hidden">
    <!-- Фон с градиентами -->
    <div class="absolute inset-0 bg-gradient-to-br from-red-600 via-red-500 to-orange-500"></div>

    <!-- Размытые пятна -->
    <div class="absolute -top-32 -left-32 w-96 h-96 bg-yellow-400 opacity-60 blur-[120px] rounded-full"></div>
    <div class="absolute top-20 right-10 w-72 h-72 bg-pink-400 opacity-50 blur-[100px] rounded-full"></div>
    <div class="absolute bottom-0 left-1/3 w-80 h-80 bg-purple-500 opacity-40 blur-[120px] rounded-full"></div>

    <!-- Контент -->
    <div class="relative z-10 w-full max-w-3xl px-4">
      <h1 class="text-4xl sm:text-5xl font-extrabold text-center text-white drop-shadow-md mb-10">
        Заметки
      </h1>

      <!-- ✅ Компонент формы добавления -->
      <NoteForm @noteAdded="fetchNotes" />

      <!-- ✅ Компонент списка заметок -->
      <NotesList
        :notes="notes"
        @deleteNote="deleteNote"
        @updateNote="updateNote"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { NotesApi, type Note } from "../api/notes";
import NoteForm from "../components/NoteForm.vue";
import NotesList from "../components/NotesList.vue";

const notes = ref<Note[]>([]);

// Получение всех заметок
async function fetchNotes() {
  notes.value = await NotesApi.getAll();
}

// Удаление заметки
async function deleteNote(id: number) {
  await NotesApi.remove(id);
  await fetchNotes();
}

// Обновление заметки
async function updateNote(updatedNote: { id: number; title: string; content: string }) {
  await NotesApi.update(updatedNote.id, updatedNote.title, updatedNote.content);
  await fetchNotes();
}

onMounted(fetchNotes);
</script>

<style scoped>
body {
  font-family: "Inter", sans-serif;
}
</style>
