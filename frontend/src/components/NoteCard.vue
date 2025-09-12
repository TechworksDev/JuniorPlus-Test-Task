<script setup lang="ts">
import IconNotes from '@/assets/icons/IconNotes.vue'
interface Props {
  id: number
  title: string
  text: string
  toggleModal: (id: number) => void
}

const props = defineProps<Props>()
</script>

<template>
  <div class="note-wrapper" @click="toggleModal(props.id)">
    <div class="title-wrapper">
      <IconNotes :width="'20px'" :height="'20px'" :color="'#fff'" />
      <span class="title">{{ props.title }}</span>
    </div>
    <span class="text">{{ props.text }}</span>
  </div>
</template>

<style scoped lang="scss">
.note-wrapper {
  width: 280px;
  height: 226px;
  background: #303030;
  border-radius: 6px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  color: #ffffff;
  overflow: hidden;
  font-family: monospace;
  clip-path: polygon(0 0,
      calc(100% - 30px) 0,
      100% 35px,
      100% 100%,
      0 100%);
  cursor: pointer;

  &:hover {
    background: #424242;
    filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.5));
    transform: scale(1.05);
  }
}

.text {
  padding: 10px;
  flex: 1;
  max-width: 230px;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 15px;

  &::selection {
    background: transparent;
  }
}

.title-wrapper {
  background: #90ff9060;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 6px;
  height: 22px;
  gap: 6px;
  display: flex;
  clip-path: polygon(0 0,
      calc(100% - 40px) 0,
      100% 40px,
      100% 100%,
      0 100%);
}

.title {
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 230px;
  display: inline-block;

  &::selection {
    background: transparent;
  }
}
</style>
