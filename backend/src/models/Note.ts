export interface Note {
  id: number;
  title: string;
  content: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreateNoteDto {
  title: string;
  content?: string;
}

export interface UpdateNoteDto {
  title?: string;
  content?: string;
}
