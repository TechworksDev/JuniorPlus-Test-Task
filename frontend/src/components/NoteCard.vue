<script setup lang="ts">
import { type Note } from '@/types';
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
            {{ note.title }}
            <i :class="`pi pi-bookmark-fill text-${note.marker}-600`" ar />
        </template>
        <template #subtitle>
            <small>Created at: {{ new Date(note.updated_at).toLocaleString() }}</small>
        </template>
        <template #content>
            <component :is="toParagraph(note.content)" />
            <small v-if="note.created_at !== note.updated_at">Updated at: {{ new Date(note.created_at).toLocaleString() }}</small>
        </template>
        <template #footer>
            <div>
                <Button icon="pi pi-pencil" aria-label="Edit note" @click="$emit('edit', note.id)" />
                <Button icon="pi pi-trash" severity="danger" aria-label="Delete note" @click="$emit('delete', note.id)" />
            </div>
        </template>
    </Card>
</template>