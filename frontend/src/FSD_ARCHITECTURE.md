# Frontend Architecture - Feature-Sliced Design (FSD)

This document describes the Feature-Sliced Design (FSD) structure of the frontend application.

## Directory Structure

src/
├── features/                    # Business features
│   ├── notes/                   # Notes feature
│   │   ├── ui/                  # UI components for notes
│   │   │   ├── NoteForm/        # Feature: Form for creating/editing notes
│   │   │   │   ├── NoteForm.vue
│   │   │   │   └── index.ts
│   │   │   ├── NotesList/       # Feature: List/grid of notes
│   │   │   │   ├── NotesList.vue
│   │   │   │   └── index.ts
│   │   │   ├── NoteCard/        # UI: Single note card
│   │   │   │   ├── NoteCard.vue
│   │   │   │   └── index.ts
│   │   │   ├── NoteInput/       # UI: Reusable input fields
│   │   │   │   ├── NoteInput.vue
│   │   │   │   └── index.ts
│   │   │   ├── NoteActions/     # UI: Action buttons (Submit/Cancel)
│   │   │   │   ├── NoteActions.vue
│   │   │   │   └── index.ts
│   │   │   ├── NoteError/       # UI: Error message display
│   │   │   │   ├── NoteError.vue
│   │   │   │   └── index.ts
│   │   │   └── index.ts         # Barrel export
│   │   └── index.ts             # Feature export
│   └── index.ts                 # Features export
├── shared/                      # Shared utilities and types
│   ├── types/                   # Shared TypeScript types
│   │   ├── note.ts              # Note type definitions
│   │   └── index.ts             # Types export
│   └── ui/                      # Shared UI components (future)
├── App.vue                      # Root component
├── main.ts                      # Application entry point
└── style.css                    # Global styles

## Component Hierarchy

### Feature Components (Entry Points)

#### `NoteForm` - Creating/Editing Notes

- **Purpose**: Manages note creation and editing workflow
- **Responsibilities**:
  - Form state management
  - Validation logic
  - API integration for create/update
  - Child component composition
- **Props**: None (uses injections)
- **Emits**: None (uses injections and mutations)
- **Child Components**: `NoteInput`, `NoteError`, `NoteActions`

#### `NotesList` - Displaying Notes

- **Purpose**: Manages note listing and grid display
- **Responsibilities**:
  - Fetching notes
  - Managing empty/loading states
  - Delegating to NoteCard components
- **Props**: None (uses injections)
- **Emits**: None (uses injections and mutations)
- **Child Components**: `NoteCard`

### UI Components (Presentational)

#### `NoteCard` - Single Note Display

- **Purpose**: Display a single note with metadata and actions
- **Props**:
  - `note: Note` - The note to display
- **Emits**:
  - `edit` - When edit button clicked
  - `delete` - When delete button clicked
- **Responsibilities**: Rendering note data and delegating interactions

#### `NoteInput` - Form Fields

- **Purpose**: Reusable input component for title and content
- **Props**:
  - `modelValue: string` - Current input value
  - `label: string` - Field label
  - `placeholder: string` - Input placeholder
  - `type: 'text' | 'textarea'` - Input type
  - `disabled?: boolean` - Disabled state
  - `maxlength?: number` - Max character limit
  - `rows?: number` - Textarea rows
- **Emits**:
  - `update:modelValue` - When input value changes
- **Responsibilities**: Rendering input/textarea with proper styling

#### `NoteError` - Error Messages

- **Purpose**: Display error messages with consistent styling
- **Props**:
  - `message: string` - Error message to display
- **Emits**: None
- **Responsibilities**: Conditional rendering of error message

#### `NoteActions` - Form Buttons

- **Purpose**: Submit and cancel buttons with proper states
- **Props**:
  - `isSubmitting?: boolean` - Loading state
  - `isEditing?: boolean` - Whether editing or creating
  - `disabled?: boolean` - Disabled state
- **Emits**:
  - `submit` - When submit button clicked
  - `cancel` - When cancel button clicked
- **Responsibilities**: Button rendering with dynamic labels and styles

## Key Design Principles

### 1. Feature-Sliced Design (FSD)

- **Features layer**: Contains business logic and workflows
- **UI layer**: Contains presentational and reusable components
- **Shared layer**: Contains types and shared utilities

### 2. Component Composition

- Feature components (`NoteForm`, `NotesList`) orchestrate child components
- UI components are small, focused, and reusable
- Clear separation of concerns

### 3. Naming Conventions

- **BEM-style class names**: `.component-name__element--modifier`
- **Component names**: PascalCase (e.g., `NoteCard`)
- **Props/variables**: camelCase

### 4. Type Safety

- All components use TypeScript
- Props are typed with interfaces
- Shared types defined in `shared/types/`

### 5. Code Organization

- Each component has its own folder with `index.ts` barrel export
- Barrel exports at each level allow clean import paths
- Path alias `@/` for absolute imports

## Imports Pattern

**Bad** (relative imports):

```typescript
import { NoteForm } from '../../../features/notes/ui/NoteForm/NoteForm.vue'
```

**Good** (using barrel exports):

```typescript
import { NoteForm } from '@/features'
```

**Shared types**:

```typescript
import type { Note } from '@/shared/types'
```

## Scaling Considerations

### Adding New Features

1. Create `features/[feature-name]/` folder
2. Create `ui/` subfolder with components
3. Create `index.ts` barrel exports
4. Add to `features/index.ts`

### Adding Shared Components

1. Create in `shared/ui/[component-name]/`
2. Create `index.ts` barrel export
3. Add to `shared/index.ts`

### Adding Shared Types

1. Create in `shared/types/[domain].ts`
2. Export in `shared/types/index.ts`

## Build Output

- Type checking: `npm run build` includes `vue-tsc` type checking
- Production build: Optimized bundle with tree-shaking
- Output size: ~26.67 kB gzipped

## Future Improvements

1. **API layer**: Create `api/` folder for data fetching utilities
2. **Stores**: Add state management layer if needed
3. **Composables**: Extract reusable logic into composition API composables
4. **Hooks**: Common utilities in `shared/hooks/`
5. **Constants**: Centralize magic strings in `shared/constants/`

## References

- [Feature-Sliced Design Methodology](https://feature-sliced.design/)
- [Vue 3 Best Practices](https://vuejs.org/guide/best-practices/)
- [BEM Naming Convention](http://getbem.com/naming/)
