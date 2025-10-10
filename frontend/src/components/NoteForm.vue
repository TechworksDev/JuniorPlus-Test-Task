<script setup lang="ts">
import { NOTE_COLORS, type NoteColor, type CreateNoteDTO, type UpdateNoteDTO } from '@/types';
import Select from 'primevue/select';
import { Form, type FormSubmitEvent } from '@primevue/forms';
import { ref } from 'vue';

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

function handleSubmit(event: FormSubmitEvent) {;
    if (event.valid) {
        emit('submit', event.values);
    }
}

function handleReset() {
    formRef.value.reset();
}   
</script>

<template>
    <Form
        ref="formRef"
        v-slot="$form"
        :initialValues="note"
        :resolver="resolver"
        @submit="handleSubmit"
        @reset="handleReset"
    >
        <div class="flex flex-col gap-3">
            <div>
                <InputText name="title" type="text" placeholder="title" />
                <Message v-if="$form.title?.invalid" severity="error" size="small" variant="simple">
                    {{ $form.title.error?.message }}
                </Message>
            </div>
            <div>
                <Textarea name="content" placeholder="Note content" rows="4" />
                <Message v-if="$form.content?.invalid" severity="error" size="small" variant="simple">
                    {{ $form.content.error?.message }}
                </Message>
            </div>
            <div>
                <Select
                    name="marker"
                    :options="colorOptions"
                    optionLabel="label"
                    optionValue="value"
                >
                    <template #value="slotProps">
                        <i :class="`pi pi-bookmark-fill text-${slotProps.value}-600`"></i>
                    </template>
                    <template #option="slotProps">
                        <i :class="`pi pi-bookmark-fill text-${slotProps.option.value}-600`"></i>
                    </template>
                </Select>
                <Message v-if="$form.marker?.invalid" severity="error" size="small" variant="simple">
                    {{ $form.marker.error?.message }}
                </Message>
            </div>
            <div class="flex gap-2">
                <Button type="reset" severity="secondary" label="Clear" outlined />
                <Button type="submit" severity="primary" label="Submit" />
            </div>
            <Message v-if="errorMessage" severity="error" class="mt-2">{{ errorMessage }}</Message>
        </div>
    </Form>
</template>
