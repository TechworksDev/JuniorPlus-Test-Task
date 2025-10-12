<script setup lang="ts">
import { type Note, colorClassMap } from '@/types';
import { toParagraph } from '@/utils/toParagraph';

defineProps<{
    note: Note,
    onEdit: (id: Note['id']) => void,
    onDelete: (id: Note['id']) => void
}>();

defineEmits<{
    (e: 'edit', id: Note['id']): void;
    (e: 'delete', id: Note['id']): void;
}>();

</script>

<template>
    <Card v-if="note" class="note-card">
        <template #title>
            <i :class="`pi pi-bookmark-fill ${colorClassMap[note.marker]}`"/>
            {{ note.title }}
        </template>
        <template #subtitle>
            <small>Created at: {{ new Date(note.updated_at).toLocaleString() }}</small>
        </template>
        <template #content>
            <component :is="toParagraph(note.content)" />
            <small v-if="note.created_at !== note.updated_at">Updated at: {{ new Date(note.created_at).toLocaleString() }}</small>
        </template>
        <template #footer>
            <div class="flex justify-content-end gap-2">
                <Button icon="pi pi-pencil" variant="text" raised rounded aria-label="Edit note" @click="$emit('edit', note.id)" />
                <Button icon="pi pi-trash" variant="text" raised rounded severity="danger" aria-label="Delete note" @click="$emit('delete', note.id)" />
            </div>
        </template>
    </Card>
</template>