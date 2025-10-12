<script setup lang="ts">
const model = defineModel<string>();

const emit = defineEmits<{
   (e: 'search-input', v: string): void;
}>();

let _debounce: ReturnType<typeof setTimeout> | null = null;
const onInput = (evt: InputEvent) => {
  if (_debounce) clearTimeout(_debounce);
  const target = evt.target as HTMLInputElement;
  _debounce = setTimeout(() => {
    emit('search-input', target.value);
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
