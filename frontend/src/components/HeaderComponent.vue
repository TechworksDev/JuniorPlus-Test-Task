<template>
  <header class="header">
    <h1>Notes Platform</h1>
    <button @click="$emit('create-note')" class="btn btn-primary">
      + New Note
    </button>
  </header>
</template>

<script setup lang="ts">
defineEmits<{
  "create-note": [];
}>();
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  background: white;
  padding: 20px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.header:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 18px rgba(0, 0, 0, 0.1);
}

.header h1 {
  color: #333;
  font-size: 2rem;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.2s;
  font-weight: 500;
  cursor: pointer;
}

.btn-primary {
  background: #6e96d1;
  color: white;
}

.btn-primary:hover {
  background: #4a70a9;
}
</style>
