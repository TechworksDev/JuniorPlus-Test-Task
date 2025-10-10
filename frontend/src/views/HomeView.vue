<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import type { CreateNoteDTO, Note, UpdateNoteDTO } from '@/types';
import { useNotesStore } from '@/stores/useNotesStore';
import { resolver } from '@/utils/noteResolver';

import { Toast, ConfirmDialog, useConfirm, useToast } from 'primevue';

const store = useNotesStore();
const editNoteId = ref<Note['id'] | null>(null);
const visible = ref<boolean>(false);

const toast = useToast();
const confirm = useConfirm();

const showToast = (severity: 'success' | 'error' = 'success', summary: string = 'Success!') => {
    toast.add({ severity, summary, life: 3000 });
};

const openEditNoteForm = (id: number) => {
    visible.value = true;
    editNoteId.value = id;
};

const openAddNoteForm = () => {
    visible.value = true;
    editNoteId.value = null;
};

const editedNote = computed<Note | undefined>(() => {
    return store.notes.find((note) => note.id === editNoteId.value);
});

const modalHeader = computed<string>(() => {
    return editNoteId.value ? 'Edit Note' : 'Add Note';
});

const handleVisibleUpdate = (val: boolean) => {
    if (!val) {
        editNoteId.value = null;
    }
};

const handleSave = (note: CreateNoteDTO | UpdateNoteDTO) => {
    const func = editNoteId.value ? 'updateNote' : 'createNote';
    const data = editNoteId.value ? { id: editNoteId.value, ...note } : note;

    store[func](data).then(() => {
        visible.value = false;
        editNoteId.value = null;
        showToast('success', editNoteId.value ? 'Note updated successfully!' : 'Note created successfully!');
    }).catch((error) => {
        showToast('error', error);
    });
};

const confirmDelete = (id: Note['id']) => {
    confirm.require({
        message: 'Do you want to delete this record?',
        header: 'Danger Zone',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancel',
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Delete',
            severity: 'danger'
        },
        accept: () => {
            store.deleteNote(id).then(() => {
                showToast('success', 'Note deleted successfully!');
            }).catch((error) => {
                showToast('error', error);
            });
        }
    });
};

onMounted(() => {
    store.fetchNotes();
});
</script>

<template>
    <div class="home-view">
        <DataView paginator :value="store.notes" :rows="5" :paginator-position="'bottom'">
            <template #header>
                <NotesSearch v-model="store.searchQuery" @search-input="store.setSearch($event)" />
                <NotesSort :model-value="store.sortOption" @sort-change="store.setSort($event)" />
                <Button label="Add Note" icon="pi pi-plus" class="add-note-button" @click="openAddNoteForm" />
            </template>
            <template #list="slotProps">
                <ul>
                    <li v-for="(item, i) in slotProps.items" :key="i">
                        <NoteCard :note="item" @edit="openEditNoteForm($event)" @delete="confirmDelete($event)"/>
                    </li>
                </ul>
            </template>
        </DataView>
        <Dialog v-model:visible="visible" modal :header="modalHeader" :closable="true" @update:visible="handleVisibleUpdate">
            <NoteForm :note="editedNote" :resolver="resolver" :errorMessage="store.error" @submit="handleSave($event)" />
        </Dialog>
        <Toast />
        <ConfirmDialog />
    </div>
</template>
