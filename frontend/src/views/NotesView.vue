<template>
  <div class="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex flex-col items-center py-10">
    <div class="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6">
      <h1 class="text-4xl font-extrabold mb-6 text-center text-gray-800">My Notes</h1>

      <form @submit.prevent="submitForm" class="mb-8 flex flex-col sm:flex-row gap-4">
        <input v-model="title" placeholder="Title"
          class="flex-1 border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300" />
        <textarea v-model="content" placeholder="Content"
          class="flex-1 border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-y min-h-[3.2rem]"
          rows="1" @input="adjustTextareaHeight" ref="contentInput"></textarea>
        <button type="submit"
          class="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg">
          Add Note
        </button>
      </form>

      <ul class="space-y-4">
        <li v-for="note in notes" :key="note.id"
          class="border border-gray-200 p-5 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div class="flex-1 w-full">
            <div v-if="editingId === note.id" class="flex flex-col gap-2">
              <input v-model="editTitle"
                class="border border-gray-300 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300" />
              <textarea v-model="editContent"
                class="border border-gray-300 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 resize-none"
                rows="4"></textarea>
            </div>
            <div v-else>
              <h3 class="font-bold text-2xl text-gray-800">{{ note.title }}</h3>
              <p class="text-gray-600 mt-1 whitespace-pre-line break-words">{{ note.content }}</p>
            </div>
          </div>

          <div class="flex gap-2 mt-4 md:mt-0 md:self-center flex-wrap">
            <template v-if="editingId === note.id">
              <button @click="saveEdit(note.id)"
                class="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition-colors duration-300 font-medium">
                Save
              </button>
              <button @click="cancelEdit"
                class="bg-gray-300 px-4 py-2 rounded-xl hover:bg-gray-400 transition-colors duration-300 font-medium">
                Cancel
              </button>
            </template>
            <template v-else>
              <button @click="startEdit(note)"
                class="bg-yellow-400 text-white px-4 py-2 rounded-xl hover:bg-yellow-500 transition-colors duration-300 font-medium">
                Edit
              </button>
              <button @click="deleteNote(note.id)"
                class="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition-colors duration-300 font-medium">
                Delete
              </button>
            </template>
          </div>
        </li>
      </ul>

      <p v-if="notes.length === 0" class="text-center text-gray-500 mt-6 text-lg italic">
        No notes yet. Add one above!
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { NotesApi, type Note } from "../api/notes";

const notes = ref<Note[]>([]);
const title = ref("");
const content = ref("");

const editingId = ref<string | null>(null);
const editTitle = ref("");
const editContent = ref("");

const contentInput = ref<HTMLTextAreaElement | null>(null);

async function fetchNotes() {
  notes.value = await NotesApi.getAll();
}

function adjustTextareaHeight() {
  if (contentInput.value) {
    contentInput.value.style.height = "auto";
    contentInput.value.style.height = `${contentInput.value.scrollHeight}px`;
  }
}

async function submitForm() {
  if (!title.value.trim() || !content.value.trim()) return;
  await NotesApi.create(title.value, content.value);
  title.value = "";
  content.value = "";
  if (contentInput.value) {
    contentInput.value.style.height = "auto";
  }
  await fetchNotes();
}

async function deleteNote(id: string) {
  await NotesApi.remove(id);
  await fetchNotes();
}

function startEdit(note: Note) {
  editingId.value = note.id;
  editTitle.value = note.title;
  editContent.value = note.content;
}

function cancelEdit() {
  editingId.value = null;
  editTitle.value = "";
  editContent.value = "";
}

async function saveEdit(id: string) {
  if (!editTitle.value.trim() || !editContent.value.trim()) return;
  await NotesApi.update(id, editTitle.value, editContent.value);
  cancelEdit();
  await fetchNotes();
}

onMounted(fetchNotes);
</script>