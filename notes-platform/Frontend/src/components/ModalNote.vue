<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  mode: String,
  initialData: Object
});

const emit = defineEmits(['submit', 'cancel']);

const name = ref('');
const content = ref('');

watch(() => props.initialData, (newData) => {
  name.value = newData.name || '';
  content.value = newData.content || '';
}, { immediate: true });

const handleSubmit = () => {
  if (!name.value.trim()) {
    alert('Введите название заметки!');
    return;
  }

  emit('submit', {
    ...props.initialData, // сохраняем id при редактировании
    name: name.value,
    content: content.value
  });
};
</script>

<template>
  <div class="modal-backdrop" @click.self="emit('cancel')">
    <div class="modal">
      <h2 class="modal-title">
        {{ mode === 'create' ? 'Создать заметку' : 'Редактировать заметку' }}
      </h2>

      <div class="form-group">
        <label class="form-label">Название</label>
        <input
            v-model="name"
            type="text"
            class="form-input"
            placeholder="Введите название"
            @keyup.enter="handleSubmit"
        />
      </div>

      <div class="form-group">
        <label class="form-label">Содержимое</label>
        <textarea
            v-model="content"
            class="form-textarea"
            placeholder="Введите текст заметки"
        ></textarea>
      </div>

      <div class="modal-actions">
        <button @click="emit('cancel')" class="btn btn-cancel">
          Отмена
        </button>
        <button @click="handleSubmit" class="btn btn-primary">
          Сохранить
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

.modal {
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.modal-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #555;
  margin-bottom: 8px;
}

.form-input {
  width: 90%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #2196F3;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

.form-textarea {
  width: 90%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  height: 120px;
  resize: none;
  font-family: inherit;
  transition: border-color 0.2s;
}

.form-textarea:focus {
  outline: none;
  border-color: #2196F3;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
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

.btn-primary {
  background-color: #2196F3;
  color: white;
}

.btn-primary:hover {
  background-color: #1976D2;
}

.btn:active {
  transform: scale(0.98);
}
</style>