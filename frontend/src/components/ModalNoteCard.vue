<script setup lang="ts">
import type { Note } from '@/stores/noteStore'
import { ref, watch } from 'vue'
import IconNotes from '@/assets/icons/IconNotes.vue'
interface Props {
  id: number
  title: string
  text: string
  toggleShowSaveButton: (value: boolean, note: { title: string; text: string }) => void
}

const props = defineProps<Props>()

const editedNote = ref({
  title: props.title,
  text: props.text
} as Note)

watch(
  editedNote,
  (newVal) => {
    const changed =
      newVal.title !== props.title ||
      newVal.text !== props.text
    props.toggleShowSaveButton(changed, {
      title: newVal.title,
      text: newVal.text
    })
  },
  { deep: true }
)
</script>

<template>
  <div class="note-wrapper">
    <div class="title-wrapper">
      <IconNotes :width="'20px'" :height="'20px'" :color="'#fff'" />
      <input class="title" v-model="editedNote.title" />
    </div>
    <div class="text-wrapper">
      <textarea class="text" v-model="editedNote.text" style="resize: none;"></textarea>
    </div>
  </div>
</template>

<style scoped lang="scss">
.note-wrapper {
  width: 400px;
  height: min-content;
  min-height: 400px;
  gap: 10px;
  border-radius: 16px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  font-family: monospace;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
    .text-wrapper, .title-wrapper{
      box-shadow: 0px 0px 10px 0px #ccffcc30;
    }
  }

  input,
  textarea {
    padding: 10px;
    border-radius: 8px;
    border: none;
    outline: none;
    background-color: transparent;
    color: #fff;
  }

  textarea {
    padding: 10px;
    overflow-y: auto;
  }
}

.text {
  padding: 10px;
  flex: 1;
  max-width: 380px;
  word-wrap: break-word;
  overflow: hidden;
  font-size: 15px;
  height: 100%;
  width: 100%;
}

.text-wrapper {
  background: #30303090 !important;
  backdrop-filter: blur(1px);
  border-radius: 10px;
  width: 400px;
  height: 400px;
}

.title-wrapper {
  border-radius: 10px;
  background: #90ff9060;
  flex-direction: row;
  align-items: center;
  width: 390px;
  padding: 6px;
  height: 22px;
  gap: 0px;
  display: flex;
}

.title {
  font-size: 16px;
  overflow: hidden;
  display: inline-block;
}
</style>
