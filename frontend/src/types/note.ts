export interface Note {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface CreateNoteRequest {
  title: string;
  content: string;
}

export interface UpdateNoteRequest {
  title?: string;
  content?: string;
}

export interface ApiResponse<T> {
  status: 'success' | 'fail';
  data?: T;
  message?: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}