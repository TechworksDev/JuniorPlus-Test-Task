<script setup>
const emit = defineEmits(['confirm', 'cancel']);
</script>

<template>
  <div class="modal-backdrop" @click.self="emit('cancel')">
    <div class="modal-confirm">
      <h2 class="modal-title">⚠️ Подтверждение</h2>
      <p class="modal-text">Вы точно хотите удалить заметку?</p>

      <div class="modal-actions">
        <button @click="emit('cancel')" class="btn btn-cancel">
          Нет
        </button>
        <button @click="emit('confirm')" class="btn btn-danger">
          Да, удалить
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-confirm {
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.modal-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #333;
}

.modal-text {
  font-size: 16px;
  color: #555;
  margin-bottom: 24px;
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel {
  background-color: #e0e0e0;
  color: #333;
}

.btn-cancel:hover {
  background-color: #d0d0d0;
}

.btn-danger {
  background-color: #f44336;
  color: white;
}

.btn-danger:hover {
  background-color: #d32f2f;
}

.btn:active {
  transform: scale(0.98);
}
</style>