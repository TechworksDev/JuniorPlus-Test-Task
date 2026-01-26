import axios from 'axios';
import type { Note, CreateNoteRequest, UpdateNoteRequest, ApiResponse } from '@/types/note';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

export class NoteService {
  static async getAllNotes(): Promise<Note[]> {
    const response = await api.get<ApiResponse<{ notes: Note[] }>>('/notes');
    return response.data.data?.notes || [];
  }

  static async getNoteById(id: number): Promise<Note> {
    const response = await api.get<ApiResponse<{ note: Note }>>(`/notes/${id}`);
    if (!response.data.data?.note) {
      throw new Error('Note not found');
    }
    return response.data.data.note;
  }

  static async createNote(noteData: CreateNoteRequest): Promise<Note> {
    const response = await api.post<ApiResponse<{ note: Note }>>('/notes', noteData);
    if (!response.data.data?.note) {
      throw new Error('Failed to create note');
    }
    return response.data.data.note;
  }

  static async updateNote(id: number, noteData: UpdateNoteRequest): Promise<Note> {
    const response = await api.put<ApiResponse<{ note: Note }>>(`/notes/${id}`, noteData);
    if (!response.data.data?.note) {
      throw new Error('Failed to update note');
    }
    return response.data.data.note;
  }

  static async deleteNote(id: number): Promise<void> {
    await api.delete(`/notes/${id}`);
  }
}

export default api;