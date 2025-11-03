<script setup lang="ts">
type ButtonVariant = 'submit' | 'cancel'

interface Props {
  isSubmitting?: boolean
  isEditing?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isSubmitting: false,
  isEditing: false,
  disabled: false
})

const emit = defineEmits<{
  submit: []
  cancel: []
}>()

const getButtonClass = (variant: ButtonVariant): string => {
  const baseClass = 'note-btn'
  const variantClass = variant === 'submit' ? 'note-btn--submit' : 'note-btn--cancel'
  return `${baseClass} ${variantClass}`
}

const getSubmitLabel = (): string => {
  if (props.isSubmitting) return 'Сохранение...'
  return props.isEditing ? 'Обновить' : 'Создать'
}
</script>

<template>
  <div class="note-actions">
    <button
      type="submit"
      :disabled="props.disabled || props.isSubmitting"
      :class="getButtonClass('submit')"
      @click="emit('submit')"
    >
      {{ getSubmitLabel() }}
    </button>

    <button
      v-if="props.isEditing"
      type="button"
      :disabled="props.disabled || props.isSubmitting"
      :class="getButtonClass('cancel')"
      @click="emit('cancel')"
    >
      Отмена
    </button>
  </div>
</template>

<style scoped>
.note-actions {
  display: flex;
  gap: 10px;
}

.note-btn {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.2s;
}

.note-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.note-btn--submit {
  background-color: #007bff;
  color: white;
}

.note-btn--submit:hover:not(:disabled) {
  background-color: #0056b3;
}

.note-btn--cancel {
  background-color: #6c757d;
  color: white;
}

.note-btn--cancel:hover:not(:disabled) {
  background-color: #5a6268;
}
</style>
