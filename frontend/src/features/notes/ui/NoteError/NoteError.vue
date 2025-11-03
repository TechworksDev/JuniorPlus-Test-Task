<script setup lang="ts">
interface Props {
  message: string
}

defineProps<Props>()
</script>

<template>
  <div v-if="message" class="note-error">
    {{ message }}
  </div>
</template>

<style scoped>
.note-error {
  padding: 10px;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  color: #721c24;
  margin-bottom: 15px;
  font-size: 14px;
}
</style>
