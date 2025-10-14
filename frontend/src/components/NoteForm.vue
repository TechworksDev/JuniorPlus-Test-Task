<template>
  <form
    @submit.prevent="submitForm"
    class="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-6 flex flex-col gap-3 shadow-lg border border-white/30 w-full"
  >
    <label class="text-sm font-medium text-gray-700">Заголовок*</label>
    <input
      v-model="title"
      placeholder="Введите заголовок..."
      :class="['border rounded-xl px-4 py-2 focus:outline-none transition', { 'border-red-500': errors.title }]"
    />

    <label class="text-sm font-medium text-gray-700 mt-2">Содержание*</label>
    <textarea
      v-model="content"
      placeholder="Введите текст заметки..."
      rows="3"
      ref="contentInput"
      @input="adjustTextareaHeight"
      :class="['border rounded-xl px-4 py-2 resize-none focus:outline-none transition', { 'border-red-500': errors.content }]"
    ></textarea>

    <button
      type="submit"
      class="self-end bg-yellow-400 text-white font-semibold px-5 py-2 rounded-xl hover:bg-yellow-500 transition-colors duration-300 mt-2 shadow-md"
    >
      Добавить заметку
    </button>

    <div v-if="warningMessage" class="warning-banner mt-2">
      ⚠ {{ warningMessage }}
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { NotesApi } from "../api/notes";

const title = ref("");
const content = ref("");
const errors = reactive<{ title?: boolean; content?: boolean }>({});
const warningMessage = ref("");

const emit = defineEmits(["noteAdded"]);

const contentInput = ref<HTMLTextAreaElement | null>(null);

function adjustTextareaHeight() {
  if (contentInput.value) {
    contentInput.value.style.height = "auto";
    contentInput.value.style.height = `${contentInput.value.scrollHeight}px`;
  }
}

async function submitForm() {
  errors.title = false;
  errors.content = false;
  warningMessage.value = "";

  let hasError = false;

  if (!title.value.trim()) {
    errors.title = true;
    hasError = true;
  }
  if (!content.value.trim()) {
    errors.content = true;
    hasError = true;
  }

  if (hasError) {
    warningMessage.value = "Невозможно добавить заметку: заполните все обязательные поля!";
    return;
  }

  await NotesApi.create(title.value, content.value);
  title.value = "";
  content.value = "";
  if (contentInput.value) contentInput.value.style.height = "auto";

  emit("noteAdded");
}
</script>

<style scoped>
.warning-banner {
  padding: 10px;
  background-color: #ffe0e0;
  color: #b00000;
  border: 1px solid #b00000;
  border-radius: 5px;
  font-weight: bold;
}
</style>
