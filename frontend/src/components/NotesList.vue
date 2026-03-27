<script setup lang="ts">
import { ref, onMounted } from "vue";
import { NotesApi, type Note } from "../api/notes";

const notes = ref<Note[]>([]);

async function fetchNotes() {
  notes.value = await NotesApi.getAll();
}

async function deleteNote(id: string) {
  await NotesApi.remove(id);
  await fetchNotes();
}

onMounted(fetchNotes);
</script>

<template>
  <div>
    <h2 class="text-xl font-bold mb-2">Notes</h2>
    <ul>
      <li v-for="note in notes" :key="note.id" class="mb-2">
        <h3 class="font-semibold">{{ note.title }}</h3>
        <p>{{ note.content }}</p>
        <button @click="deleteNote(note.id)" class="text-red-500">Delete</button>
      </li>
    </ul>
  </div>
</template>
