<script setup lang="ts">
import { type SortOption } from '@/types';
import Select from 'primevue/select';
import { computed } from 'vue';

const props = defineProps<{
    modelValue: SortOption;
}>();

const emit = defineEmits<{
    (e: 'sort-change', value: SortOption): void;
}>();

const model = computed<SortOption>({
    get() {
        return props.modelValue;
    },
    set(value: SortOption) {
        emit('sort-change', value);
    }
});

const sortOptions: { label: string; value: SortOption }[] = [
    {
        label: 'Newest added',
        value: { sortBy: 'created_at', order: 'DESC' }
    },
    {
        label: 'Oldest added',
        value: { sortBy: 'created_at', order: 'ASC' }
    },
    {
        label: 'Recently updated',
        value: { sortBy: 'updated_at', order: 'DESC' }
    },
    {
        label: 'Title A–Z',
        value: { sortBy: 'title', order: 'ASC' }
    },
    {
        label: 'Title Z–A',
        value: { sortBy: 'title', order: 'DESC' }
    }
];

</script>

<template>
    <Select v-model="model" class="notes-sort" :options="sortOptions" optionLabel="label" optionValue="value" name="sort"
        placeholder="Sort By...">
    </Select>
</template>