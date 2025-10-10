<script setup lang="ts">
const model = defineModel<string>();

const emit = defineEmits<{
   (e: 'search-input'): void;
}>();

let _debounce: ReturnType<typeof setTimeout> | null = null;
const onInput = () => {
  if (_debounce) clearTimeout(_debounce);
  _debounce = setTimeout(() => {
    emit('search-input');
  }, 500);
};
</script>

<template>
    <IconField class="notes-search">
      <InputIcon class="pi pi-search" />
      <InputText class="w-full" v-model="model" name="search" type="search" placeholder="Search by title or content..." aria-label="search"
        @input="onInput" />
    </IconField>
</template>
