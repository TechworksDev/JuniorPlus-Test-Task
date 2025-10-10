export const NOTE_COLORS = ['red', 'blue', 'green', 'yellow', 'purple', 'gray'] as const;

export const SORT_BY = ['created_at' , 'updated_at' , 'title'] as const;
export const SORT_ORDER = ['ASC', 'DESC'] as const;

export type NoteColor = typeof NOTE_COLORS[number];
export interface Note {
  id: number
  title: string
  content: string
  marker: NoteColor
  created_at: Date
  updated_at: Date
}

export interface CreateNoteDTO {
  title: string
  content: string
  marker: NoteColor
}

export interface UpdateNoteDTO extends Partial<CreateNoteDTO> {}
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
}

export interface ApiError {
  success: false
  error: string
  message?: string
}

export type SortOption = {
  sortBy: typeof SORT_BY[number]
  order: typeof SORT_ORDER[number]
}