# API Layer and Composables Documentation

## Overview

The shared layer includes both an API client layer and Vue 3 composables for managing application state and business logic.

## API Layer (`shared/api/`)

### Architecture

```
shared/api/
├── client.ts          # Base HTTP client
├── notesApi.ts        # Notes API endpoints
└── index.ts           # Barrel export
```

### ApiClient (`client.ts`)

A lightweight HTTP client that handles all API communication.

**Features:**
- Centralized configuration (base URL)
- Consistent error handling
- Type-safe generic methods
- Automatic JSON serialization

**Usage:**

```typescript
import { apiClient } from '@/shared/api'

// GET request
const notes = await apiClient.get<Note[]>('/notes')

// POST request
const newNote = await apiClient.post<Note>('/notes', {
  title: 'My Note',
  content: 'Content...'
})

// PUT request
const updated = await apiClient.put<Note>('/notes/1', {
  title: 'Updated'
})

// DELETE request
await apiClient.delete('/notes/1')
```

### Notes API Service (`notesApi.ts`)

High-level API for notes operations, built on top of `ApiClient`.

**Available Methods:**

```typescript
import { notesApi } from '@/shared/api'

// Get all notes
const notes = await notesApi.getAll() // Promise<Note[]>

// Get single note
const note = await notesApi.getById(1) // Promise<Note>

// Create note
const newNote = await notesApi.create('Title', 'Content') // Promise<Note>

// Update note
const updated = await notesApi.update(1, 'New Title', 'New Content') // Promise<Note>

// Delete note
await notesApi.delete(1) // Promise<void>
```

### Benefits

- **Separation of Concerns**: API logic separated from components
- **Reusability**: Can be used in any component or composable
- **Testability**: Easier to mock for unit tests
- **Consistency**: All API calls use the same error handling and formatting
- **Maintainability**: Changes to API structure only need to be made in one place

## Composables (`shared/composables/`)

### Architecture

```
shared/composables/
├── useNotes.ts        # Notes state and operations
├── useNoteForm.ts     # Form state and validation
└── index.ts           # Barrel export
```

### useNotes Composable

Manages the complete notes state and operations.

**State:**
```typescript
const {
  notes,        // Ref<Note[]> - Array of notes
  loading,      // Ref<boolean> - Loading state
  error         // Ref<string | null> - Error message
} = useNotes()
```

**Methods:**
```typescript
const {
  fetchNotes,   // () => Promise<void> - Fetch all notes
  createNote,   // (title, content) => Promise<Note>
  updateNote,   // (id, title, content) => Promise<Note>
  deleteNote    // (id) => Promise<void>
} = useNotes()
```

**Example Usage:**

```typescript
<script setup lang="ts">
import { useNotes } from '@/shared/composables'

const {
  notes,
  loading,
  error,
  fetchNotes,
  createNote,
  updateNote,
  deleteNote,
} = useNotes()

// Fetch on mount
onMounted(() => {
  fetchNotes()
})

// Create note
const handleCreate = async () => {
  try {
    await createNote('My Title', 'My Content')
  } catch (err) {
    console.error('Failed:', error.value)
  }
}
</script>
```

**Features:**
- Automatic error handling
- Loading state management
- Direct state updates (no manual refetching needed)
- Reactive refs for template binding

### useNoteForm Composable

Manages form state and validation for creating/editing notes.

**State:**
```typescript
const {
  title,        // Ref<string> - Note title
  content,      // Ref<string> - Note content
  error,        // Ref<string> - Validation error
  submitting    // Ref<boolean> - Form submission state
} = useNoteForm(editingNote)
```

**Methods:**
```typescript
const {
  validateForm,     // () => boolean - Validate form fields
  resetForm,        // () => void - Clear all fields
  resetError,       // () => void - Clear error only
  setError,         // (msg: string) => void - Set error message
  getFormData,      // () => { title, content } - Get current values
  getFormState      // () => FormState - Get complete state
} = useNoteForm(editingNote)
```

**Example Usage:**

```typescript
<script setup lang="ts">
import { useNoteForm } from '@/shared/composables'

const editingNote = inject('editingNote')
const {
  title,
  content,
  error,
  submitting,
  validateForm,
  resetForm,
  setError,
} = useNoteForm(editingNote)

const handleSubmit = async () => {
  if (!validateForm()) {
    // Error already set by validateForm
    return
  }

  try {
    submitting.value = true
    // Submit form...
    resetForm()
  } catch (err) {
    setError('Submission failed')
  } finally {
    submitting.value = false
  }
}
</script>
```

**Features:**
- Two-way binding with `v-model`
- Automatic form reset on editing note change
- Validation with built-in messages
- Submitting state for button disable
- Separate error management

## Data Flow

### Creating a Note

```
Component
  ↓
useNoteForm (manage form state)
  ↓
App.vue (call handleCreateNote)
  ↓
useNotes composable (create operation)
  ↓
notesApi.create() (API call)
  ↓
apiClient.post() (HTTP request)
  ↓
Backend API
```

### Listing Notes

```
App.vue mounted
  ↓
fetchNotes()
  ↓
useNotes composable
  ↓
notesApi.getAll()
  ↓
apiClient.get()
  ↓
Backend API
  ↓
Update notes ref
  ↓
NotesList component re-renders
```

## Best Practices

### 1. Always Use Composables in Components

**Bad:**
```typescript
const response = await fetch('http://localhost:3000/api/notes')
const notes = await response.json()
```

**Good:**
```typescript
const { notes, fetchNotes } = useNotes()
await fetchNotes()
```

### 2. Handle Errors Appropriately

```typescript
const { error, createNote } = useNotes()

try {
  await createNote('Title', 'Content')
  // Success - error.value is null
} catch (err) {
  // Error - error.value contains message
  console.error(error.value)
}
```

### 3. Use Ref Values Directly in Templates

Vue auto-unwraps refs in templates:

```vue
<script setup>
const { notes } = useNotes()
</script>

<template>
  <!-- Use 'notes' directly, not 'notes.value' -->
  <div v-for="note in notes" :key="note.id">
    {{ note.title }}
  </div>
</template>
```

### 4. Type Safety with Imports

```typescript
import type { Note } from '@/shared/types'
import { useNotes } from '@/shared/composables'
import { notesApi } from '@/shared/api'
```

## Testing

### Mocking the API

```typescript
import { vi } from 'vitest'
import { useNotes } from '@/shared/composables'

vi.mock('@/shared/api/notesApi', () => ({
  notesApi: {
    getAll: vi.fn().mockResolvedValue([
      { id: 1, title: 'Test', content: 'Content' }
    ]),
    create: vi.fn().mockResolvedValue({ id: 2, title: 'New' }),
  }
}))

const { notes, fetchNotes } = useNotes()
await fetchNotes()
expect(notes.value).toHaveLength(1)
```

### Testing Form Validation

```typescript
const { validateForm, setError, error } = useNoteForm(ref(null))

// Test required validation
title.value = ''
const isValid = validateForm()
expect(isValid).toBe(false)
expect(error.value).toBe('Title is required')
```

## Future Improvements

1. **Request Caching**: Add caching layer to avoid duplicate requests
2. **Retry Logic**: Implement automatic retry for failed requests
3. **Request Cancellation**: Add AbortController support
4. **Progress Tracking**: Add upload/download progress events
5. **Rate Limiting**: Implement request throttling
6. **Offline Support**: Add IndexedDB caching for offline mode

## File Structure Summary

```
src/
├── shared/
│   ├── api/                    # HTTP client and API services
│   │   ├── client.ts           # Base HTTP client
│   │   ├── notesApi.ts         # Notes-specific API
│   │   └── index.ts
│   ├── composables/            # Vue 3 composables
│   │   ├── useNotes.ts         # Notes state management
│   │   ├── useNoteForm.ts      # Form state management
│   │   └── index.ts
│   └── types/                  # Shared types
├── features/                   # Feature components
└── App.vue                     # Root component
```

## References

- [Vue 3 Composables](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [TypeScript Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
