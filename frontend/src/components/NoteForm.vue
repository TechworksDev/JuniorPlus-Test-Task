<script setup lang="ts">
import { ref } from 'vue';
import { NOTE_COLORS, colorClassMap, type NoteColor, type CreateNoteDTO, type UpdateNoteDTO } from '@/types';
import Select from 'primevue/select';
import { Form, type FormSubmitEvent } from '@primevue/forms';

defineProps<{
    note?: CreateNoteDTO | UpdateNoteDTO,
    errorMessage?: string,
    resolver?: (values: any) => { values: any; errors?: any },
}>();

const emit = defineEmits<{
    (e: 'submit', values: CreateNoteDTO | UpdateNoteDTO): void
}>();

const colorOptions = NOTE_COLORS.map((color: NoteColor) => ({
    label: color.toUpperCase(),
    value: color
}));

const formRef = ref();

function handleSubmit(event: FormSubmitEvent) {
    ;
    if (event.valid) {
        emit('submit', event.values);
    }
}

function handleReset() {
    formRef.value.reset();
}   
</script>

<template>
    <Form class="note-form" ref="formRef" v-slot="$form" :initialValues="note" :resolver="resolver"
        @submit="handleSubmit" @reset="handleReset">
        <div class="flex flex-col gap-3">
            <div class="flex flex-col">
                <InputText name="title" type="text" placeholder="Title" />
                <Message v-if="$form.title?.invalid" severity="error" size="small" variant="simple">
                    {{ $form.title.error?.message }}
                </Message>
            </div>
            <div class="flex flex-col">
                <Textarea name="content" placeholder="Note content" rows="4" />
                <Message v-if="$form.content?.invalid" severity="error" size="small" variant="simple">
                    {{ $form.content.error?.message }}
                </Message>
            </div>
            <div class="flex gap-3">
                <label class="content-center" for="marker">Select color</label>
                <Select id="marker" name="marker" :options="colorOptions" optionLabel="label" optionValue="value">
                    <template #value="slotProps">
                        <i :class="`pi pi-bookmark-fill ${colorClassMap[slotProps.value]}`"></i>
                    </template>
                    <template #option="slotProps">
                        <i :class="`pi pi-bookmark-fill ${colorClassMap[slotProps.option.value]}`"></i>
                    </template>
                </Select>
                <Message v-if="$form.marker?.invalid" severity="error" size="small" variant="simple">
                    {{ $form.marker.error?.message }}
                </Message>
            </div>
            <div class="flex gap-2 flex-wrap">
                <Button class="flex-grow" type="reset" severity="secondary" label="Clear" outlined />
                <Button class="flex-grow" type="submit" severity="primary" label="Submit" />
            </div>
            <Message v-if="errorMessage" severity="error" class="mt-2">{{ errorMessage }}</Message>
        </div>
    </Form>
</template>
