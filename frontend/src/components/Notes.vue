<template>
  <div>
    <form @submit.prevent="createNote">
      <input v-model="title" placeholder="Заголовок" required maxlength="255" />
      <br />
      <textarea v-model="content" placeholder="Текст заметки"></textarea>
      <br />
      <button type="submit">Создать</button>
    </form>

    <hr />

    <div v-if="loading">Загрузка...</div>
    <ul v-else>
      <li v-for="note in notes" :key="note.id" style="margin-bottom:1rem;">
        <h3>{{ note.title }}</h3>
        <p>{{ note.content }}</p>
        <small>Создано: {{ formatDate(note.created_at) }}</small>
        <br />
        <button @click="deleteNote(note.id)">Удалить</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import axios from "axios";

type Note = {
  id: string;
  title: string;
  content: string | null;
  created_at: string;
  updated_at: string;
};

const notes = ref<Note[]>([]);
const title = ref("");
const content = ref("");
const loading = ref(false);

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

const fetchNotes = async () => {
  loading.value = true;
  try {
    const res = await axios.get(`${API}/api/notes`);
    notes.value = res.data;
  } catch (err) {
    console.error(err);
    alert("Ошибка при загрузке заметок");
  } finally {
    loading.value = false;
  }
};

const createNote = async () => {
  if (!title.value.trim()) return alert("Нужен заголовок");
  try {
    await axios.post(`${API}/api/notes`, {
      title: title.value,
      content: content.value,
    });
    title.value = "";
    content.value = "";
    fetchNotes();
  } catch (err) {
    console.error(err);
    alert("Ошибка при создании заметки");
  }
};

const deleteNote = async (id: string) => {
  if (!confirm("Удалить заметку?")) return;
  try {
    await axios.delete(`${API}/api/notes/${id}`);
    fetchNotes();
  } catch (err) {
    console.error(err);
    alert("Ошибка при удалении");
  }
};

const formatDate = (d: string) => new Date(d).toLocaleString();

onMounted(fetchNotes);
</script>

<style scoped>
input,
textarea {
  width: 100%;
  max-width: 600px;
  margin: 8px 0;
  padding: 8px;
  box-sizing: border-box;
}
button {
  padding: 6px 12px;
}
</style>
