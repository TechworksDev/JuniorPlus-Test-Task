<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import type { CreateNoteDTO, Note, UpdateNoteDTO } from "@/types";
import { useNotesStore } from "@/stores/useNotesStore";
import { resolver } from "@/utils/noteResolver";

import { ConfirmDialog, useConfirm, useToast } from "primevue";

const store = useNotesStore();
const editNoteId = ref<Note["id"] | null>(null);
const visible = ref<boolean>(false);

const toast = useToast();
const confirm = useConfirm();

const showToast = (
    severity: "success" | "error" = "success",
    summary: string = "Success!"
) => {
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

const editedNote = computed<Note | CreateNoteDTO>(() => {
    return store.notes.find((note) => note.id === editNoteId.value) ?? {
        title: "",
        content: "",
        marker: "gray",
    };
});

const modalHeader = computed<string>(() => {
    return editNoteId.value ? "Edit Note" : "Add Note";
});

const handleVisibleUpdate = (val: boolean) => {
    if (!val) {
        editNoteId.value = null;
    }

    if (store.formError) {
        store.formError = null;
    }
};

const handleSave = (note: CreateNoteDTO | UpdateNoteDTO) => {
    const func = editNoteId.value ? "updateNote" : "createNote";
    const data = editNoteId.value ? { id: editNoteId.value, ...note } : note;

    store[func](data as Note)
        .then(() => {
            visible.value = false;
            editNoteId.value = null;
            showToast(
                "success",
                editNoteId.value ? "Note updated successfully!" : "Note created successfully!"
            );
        })
};

const confirmDelete = (id: Note["id"]) => {
    confirm.require({
        message: "Do you want to delete this record?",
        header: "Danger Zone",
        icon: "pi pi-info-circle",
        rejectLabel: "Cancel",
        rejectProps: {
            label: "Cancel",
            severity: "secondary",
            outlined: true,
        },
        acceptProps: {
            label: "Delete",
            severity: "danger",
        },
        accept: () => {
            store.deleteNote(id).then(() => {
                showToast("success", "Note deleted successfully!");
            }).catch(() => {
                showToast("error", "Failed to delete the note.");
            });
        },
    });
};

onMounted(() => {
    store.fetchNotes();
});
</script>

<template>
    <div class="home-view flex flex-grow max-w-7xl mx-auto flex-col">
        <header class="p-4 flex items-center justify-between border-b border-gray-300">
            <h1 class="text-3xl font-bold my-4 ">My Notes</h1>
            <Button label="Add Note" icon="pi pi-plus" @click="openAddNoteForm" />
        </header>

        <DataView class="flex flex-col flex-grow p-4 my-4" paginator :value="store.notes" :rows="5" :paginator-position="'bottom'">
            <template #header>
                <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 my-4">
                    <NotesSearch class="flex flex-grow" v-model="store.searchQuery" @search-input="store.setSearch($event)" />
                    <NotesSort :model-value="store.sortOption" @sort-change="store.setSort($event)" />
                </div>
            </template>
            <template #list="slotProps">
                <ul class="pt-6" v-if="slotProps.items.length">
                    <li v-for="(item, i) in slotProps.items" :key="i">
                        <NoteCard :note="item" @edit="openEditNoteForm($event)" @delete="confirmDelete($event)" />
                    </li>
                </ul>
            </template>
            <template #empty>
                <Message v-if="store.fetchError" severity="error" :text="store.fetchError" />
                <Message v-else severity="info" text="No notes found." />
            </template>
        </DataView>

        <Dialog class="w-lg max-md:w-full" v-model:visible="visible" modal :header="modalHeader" :closable="true"
            @update:visible="handleVisibleUpdate">
            <NoteForm :note="editedNote" :errorMessage="store.formError" :resolver="resolver"
                @submit="handleSave($event)" />
        </Dialog>

        <Toast />
        <ConfirmDialog />
    </div>
</template>
