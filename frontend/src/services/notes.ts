import api from "./api";
import type { Note, CreateNoteDTO, UpdateNoteDTO, ApiResponse } from "../types";

export const notesService = {
  // Get all notes with optional search and sorting
  async getAll(params?: { search?: string; sort_by?: string; order?: string }) {
    const response = await api.get<ApiResponse<Note[]>>("/api/notes", {
      params,
    });
    return response.data;
  },

  // Get note by ID
  async getById(id: number) {
    const response = await api.get<ApiResponse<Note>>(`/api/notes/${id}`);
    return response.data;
  },

  // Create note
  async create(data: CreateNoteDTO) {
    const response = await api.post<ApiResponse<Note>>("/api/notes", data);
    return response.data;
  },

  // Update note
  async update(id: number, data: UpdateNoteDTO) {
    const response = await api.put<ApiResponse<Note>>(`/api/notes/${id}`, data);
    return response.data;
  },

  // Delete note
  async delete(id: number) {
    const response = await api.delete<ApiResponse<null>>(`/api/notes/${id}`);
    return response.data;
  },
};
