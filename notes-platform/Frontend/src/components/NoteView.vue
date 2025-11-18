<script setup>
const props = defineProps({
  note: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="note-view">
    <h2 class="note-name">{{ note.name }}</h2>
    <p class="note-content">{{ note.content }}</p>
  </div>
</template>

<style scoped>
.note-view {
  padding: 32px;
  height: 100%;
  overflow-y: auto;
}

.note-name {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
}

.note-content {
  font-size: 16px;
  color: #555;
  line-height: 1.6;
  white-space: pre-wrap; /* сохраняет переносы строк */
}
</style>