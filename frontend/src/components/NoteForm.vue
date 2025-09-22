<script setup lang="ts">
import { ref } from "vue";
import { NotesApi } from "../api/notes";

const title = ref("");
const content = ref("");

const emit = defineEmits(["noteAdded"]);

async function submitForm() {
  if (!title.value || !content.value) return;

  await NotesApi.create(title.value, content.value);
  emit("noteAdded");
  title.value = "";
  content.value = "";
}
</script>

<template>
  <form @submit.prevent="submitForm" class="mb-4">
    <input v-model="title" placeholder="Title" class="border p-1 mr-2" />
    <input v-model="content" placeholder="Content" class="border p-1 mr-2" />
    <button type="submit" class="bg-blue-500 text-white px-2 py-1">Add</button>
  </form>
</template>
