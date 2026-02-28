<template>
  <div class="grid gap-4 sm:grid-cols-2">
    <div
      v-for="note in notes"
      :key="note.id"
      class="bg-white/90 backdrop-blur-sm border border-white/40 rounded-2xl p-5 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
    >
      <div>
        <template v-if="editingId === note.id">
          <!-- Поля для редактирования -->
          <input
            v-model="editableTitle"
            class="w-full border border-gray-300 rounded-lg px-3 py-1.5 mb-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <textarea
            v-model="editableContent"
            class="w-full border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            rows="3"
          ></textarea>
        </template>
        <template v-else>
          <h3 class="font-semibold text-lg text-gray-800">{{ note.title }}</h3>
          <p class="text-gray-600 mt-1 whitespace-pre-line">{{ note.content }}</p>
        </template>
      </div>

      <!-- Кнопки -->
      <div class="flex gap-2 mt-4 flex-wrap justify-end">
        <template v-if="editingId === note.id">
          <button
            @click="saveEdit(note.id)"
            class="bg-green-500 text-white px-4 py-1.5 rounded-lg hover:bg-green-600 transition"
          >
            Сохранить
          </button>
          <button
            @click="cancelEdit"
            class="bg-gray-200 px-4 py-1.5 rounded-lg hover:bg-gray-300 transition"
          >
            Отмена
          </button>
        </template>
        <template v-else>
          <button
            @click="startEdit(note)"
            class="bg-yellow-400 text-white px-4 py-1.5 rounded-lg hover:bg-yellow-500 transition"
          >
            Редактировать
          </button>
          <button
            @click="$emit('deleteNote', note.id)"
            class="bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition"
          >
            Удалить
          </button>
        </template>
      </div>
    </div>

    <p
      v-if="notes.length === 0"
      class="col-span-2 text-center text-white/80 mt-10 text-lg italic"
    >
      Пока нет заметок — добавьте первую!
    </p>
  </div>
</template>

<script setup lang="ts">
import { type Note } from "../api/notes";
import { ref } from "vue";

const props = defineProps<{
  notes: Note[];
}>();

const emit = defineEmits(["deleteNote", "updateNote"]);

const editingId = ref<number | null>(null);
const editableTitle = ref("");
const editableContent = ref("");

// Начать редактирование
function startEdit(note: Note) {
  editingId.value = note.id;
  editableTitle.value = note.title;
  editableContent.value = note.content;
}

// Отмена редактирования
function cancelEdit() {
  editingId.value = null;
}

// Сохранить изменения
function saveEdit(id: number) {
  // Отправляем изменения родительскому компоненту
  emit("updateNote", { id, title: editableTitle.value, content: editableContent.value });
  editingId.value = null;
}
</script>

<style scoped>
/* стили карточек через Tailwind */
</style>
