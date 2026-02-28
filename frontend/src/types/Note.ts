export interface Note {
  id: number;
  title: string;
  content: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateNoteDto {
  title: string;
  content?: string;
}

export interface UpdateNoteDto {
  title?: string;
  content?: string;
}
