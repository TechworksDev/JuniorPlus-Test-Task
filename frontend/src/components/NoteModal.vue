<template>
  <div v-if="isVisible" class="modal-overlay" @click="$emit('close')">
    <div class="modal" @click.stop>
      <div class="modal-header">
        <h2>{{ isEditMode ? "Edit Note" : "Create Note" }}</h2>
        <button @click="$emit('close')" class="btn-close">×</button>
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="title">Title <span class="required">*</span></label>
          <input
            id="title"
            v-model="localFormData.title"
            type="text"
            required
            maxlength="255"
            placeholder="Enter note title"
          />
        </div>
        <div class="form-group">
          <label for="content">Content</label>
          <textarea
            id="content"
            v-model="localFormData.content"
            rows="6"
            placeholder="Enter note content"
          ></textarea>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            @click="$emit('close')"
            class="btn btn-secondary"
          >
            Cancel
          </button>
          <button type="submit" class="btn btn-primary">
            {{ isEditMode ? "Update" : "Create" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { CreateNoteDto } from "../types/Note";

interface Props {
  isVisible: boolean;
  isEditMode: boolean;
  formData: CreateNoteDto;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  close: [];
  submit: [formData: CreateNoteDto];
}>();

const localFormData = ref<CreateNoteDto>({
  title: "",
  content: "",
});

watch(
  () => props.formData,
  (newFormData) => {
    localFormData.value = { ...newFormData };
  },
  { immediate: true, deep: true }
);

const handleSubmit = () => {
  emit("submit", localFormData.value);
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  border-bottom: 1px solid #eee;
}

.modal-header h2 {
  color: #333;
  margin: 0;
}

.btn-close {
  background: none;
  border: none;
  font-size: 28px;
  color: #999;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.2s;
}

.btn-close:hover {
  background: #f0f0f0;
}

form {
  padding: 30px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
}

.form-group textarea {
  resize: vertical;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
}

.btn-primary {
  background: #6e96d1;
  color: white;
}

.btn-primary:hover {
  background: #4a70a9;
}

.btn-secondary {
  background: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background: #7f8c8d;
}

.required {
  color: #e74c3c;
}
</style>
