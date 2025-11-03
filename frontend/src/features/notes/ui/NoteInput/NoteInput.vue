<script setup lang="ts">
interface Props {
  modelValue: string
  label: string
  placeholder: string
  disabled?: boolean
  type?: 'text' | 'textarea'
  maxlength?: number
  rows?: number
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  maxlength: 255,
  rows: 8
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="note-input-group">
    <label :for="`note-${label}`" class="note-input-label">
      {{ label }}
    </label>

    <input
      v-if="type === 'text'"
      :id="`note-${label}`"
      :value="modelValue"
      class="note-input"
      type="text"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />

    <textarea
      v-else
      :id="`note-${label}`"
      :value="modelValue"
      class="note-textarea"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    ></textarea>
  </div>
</template>

<style scoped>
.note-input-group {
  margin-bottom: 15px;
}

.note-input-label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #333;
  font-size: 14px;
}

.note-input,
.note-textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.note-input:focus,
.note-textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.note-input:disabled,
.note-textarea:disabled {
  background-color: #f5f5f5;
  color: #999;
  cursor: not-allowed;
}

.note-textarea {
  resize: vertical;
  min-height: 150px;
}
</style>
