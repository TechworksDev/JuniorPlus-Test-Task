<script setup lang="ts">
import ModalNoteCard from '@/components/ModalNoteCard.vue';
import NoteCard from '@/components/NoteCard.vue';
import IconClose from '@/assets/icons/IconClose.vue';
import IconTrash from '@/assets/icons/IconTrash.vue';
import { useNoteStore, type Note } from '@/stores/noteStore';
import { ref } from 'vue';
import IconSave from '@/assets/icons/IconSave.vue';
import IconExclamation from '@/assets/icons/IconExclamation.vue';
import IconNotes from '@/assets/icons/IconNotes.vue';
import IconCat from '@/assets/icons/IconCat.vue';

const noteStore = useNoteStore()
const showModal = ref(false)
const selectedNote = ref({} as Note)
const showSaveButton = ref(false)
noteStore.getNotes()

const editedNote = ref({
  title: "",
  text: ""
} as Note)

function toggleModal(id: number) {
  showModal.value = !showModal.value
  showSaveButton.value = false
  if (showModal.value) {
    selectedNote.value = noteStore.notes.find(note => note.id === id) as Note
  }
}

const toggleShowSaveButton = (value: boolean, note: { title: string, text: string }) => {
  showSaveButton.value = value
  editedNote.value.title = note.title
  editedNote.value.text = note.text
}

function deleteNote(id: number) {
  noteStore.deleteNote(id)
  showModal.value = false
}

function saveNote() {
  selectedNote.value.title = editedNote.value.title
  selectedNote.value.text = editedNote.value.text
  noteStore.updateNote(selectedNote.value.id, editedNote.value.title, editedNote.value.text)
  showModal.value = false
}
</script>

<template>
  <div class="container">
    <div class="wrapper">
      <NoteCard v-for="note in noteStore.notes" :key="note.id" :title="note.title" :text="note.text" :id="note.id"
        :toggleModal="toggleModal" />
    </div>
  </div>
  <div class="modal-container" v-if="showModal" @dblclick="showModal = false">
    <div class="modal-wrapper" @dblclick="e => e.stopPropagation()">
      <ModalNoteCard :title="selectedNote.title" :text="selectedNote.text" :id="selectedNote.id"
        :toggleModal="toggleModal" :toggleShowSaveButton="toggleShowSaveButton" />
      <div class="modal-buttons">
        <span class="modal-span">
          <IconCat :width="'16px'" :height="'16px'" :color="'#fff'" />
          Вы можете редактировать заголовок и текст заметки! А так же выходить на двойной клик по пустому месту
        </span>
        <button @click="saveNote" v-if="showSaveButton" class="modal-button-save">
          <IconSave :width="'16px'" :height="'16px'" :color="'#fff'" />Сохранить заметку
        </button>
        <button @click="deleteNote(selectedNote.id)" class="modal-button-delete">
          <IconTrash :width="'16px'" :height="'16px'" :color="'#fff'" />Удалить заметку
        </button>
        <button @click="showModal = false">
          <IconClose :width="'20px'" :height="'20px'" :color="'#fff'" />Закрыть
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.modal-span{
  width: 170px;
  background-color: #30303070;
  padding: 10px;
  font-size: 14px;
  border-radius: 10px;
  color: #ffffff90;
  &::selection{
    background: transparent;
  }
}
.modal-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;

  button {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 40px;
    color: #fff;
    width: 190px;
    border: none;
    gap: 10px;
    background: #202020;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
      width: 180px;
      background: #303030;
    }
  }

  .modal-button-delete {
    background-color: #904040;

    &:hover {
      background-color: #b04040;
    }
  }

  .modal-button-save {
    background-color: #50905090;

    &:hover {
      background-color: #50b050bb;
    }
  }
}

.modal-container {
  z-index: 100;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  backdrop-filter: blur(2px);
  background: #00000070;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-wrapper {
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 15px;
  justify-content: center;
}

.container {
  position: fixed;
  display: flex;
  top: 0px;
  padding-top: 10px;
  right: 0px;
  left: 80px;
  bottom: 0px;
}

.wrapper {
  overflow-y: auto;
  justify-content: flex-start;
  align-content: flex-start;
  padding: 20px 10px;
  width: max-content;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  gap: 16px;
}
</style>
