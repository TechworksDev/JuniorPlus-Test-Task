<script setup lang="ts">
import type { Note } from '@/stores/noteStore'
import IconNotes from '@/assets/icons/IconNotes.vue'
import { ref, watch } from 'vue'
interface Props {
  id: number
  title: string
  text: string  // необязательный проп
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
      <IconNotes :width="'20px'" :height="'20px'" :color="'#fff'"/>
      <input class="title" v-model="editedNote.title"/>
    </div>
    <textarea class="text" v-model="editedNote.text" style="resize: none;"></textarea>
  </div>
</template>

<style scoped lang="scss">
  .note-wrapper{
    width: 400px;
    height: min-content;
    min-height: 400px;
    background: #303030;
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    font-family: monospace;
    clip-path: polygon(
      0 0,
      calc(100% - 30px) 0,
      100% 35px,
      100% 100%,
      0 100%
    );
    cursor: pointer;
    &:hover{
      filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.5));
      transform: scale(1.03);
    }
    input, textarea{
      padding: 10px;
      border-radius: 8px;
      border: none;
      outline: none;
      background-color: transparent;
      color: #fff;
    }
    textarea{
      padding: 10px;
      overflow-y: auto;
    }
  }
  .text{
    padding: 10px;
    flex: 1;
    max-width: 380px;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 15px;
    width: 100%;
  }
  .title-wrapper{
    background: #90ff9060;
    flex-direction: row;
    align-items: center;
    width: 400px;
    padding: 6px;
    height: 22px;
    gap: 0px;
    display: flex;
    clip-path: polygon(
      0 0,        /* левый верх */
      calc(100% - 40px) 0, /* обрезаем угол */
      100% 40px,  /* точка среза */
      100% 100%,  /* низ справа */
      0 100%      /* низ слева */
    );
  }
  .title{
    font-size: 16px;
    overflow: hidden;
    display: inline-block;
  }
</style>
