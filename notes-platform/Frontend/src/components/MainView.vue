<script setup>
import NoteView from './NoteView.vue';
import EmptyState from './EmptyState.vue';

const props = defineProps({
  note: Object
});

const emit = defineEmits(['create']);
</script>

<template>
  <div class="main-view">
    <NoteView v-if="note" :note="note" />

    <EmptyState v-else text="Ничего не выбрано" />

    <button
        @click="emit('create')"
        class="btn-create"
        title="Создать заметку"
    >
      +
    </button>
  </div>
</template>

<style scoped>
.main-view {
  flex: 1;
  position: relative;
}

.btn-create {
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 56px;
  height: 56px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 32px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.4);
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-create:hover {
  background-color: #1976D2;
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(33, 150, 243, 0.5);
}

.btn-create:active {
  transform: scale(0.95);
}
</style>
