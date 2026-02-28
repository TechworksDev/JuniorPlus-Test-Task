import axios from "axios";
import type { Note, CreateNoteDto, UpdateNoteDto } from "../types/Note";

const getApiUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
  let baseUrl = envUrl.replace(/\/+$/, "");

  if (!baseUrl.endsWith("/api")) {
    baseUrl = `${baseUrl}/api`;
  }

  return baseUrl;
};

const API_URL = getApiUrl();

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const notesApi = {
  async getAllNotes(): Promise<Note[]> {
    const response = await api.get<Note[]>("/notes");
    return response.data;
  },

  async getNoteById(id: number): Promise<Note> {
    const response = await api.get<Note>(`/notes/${id}`);
    return response.data;
  },

  async createNote(data: CreateNoteDto): Promise<Note> {
    const response = await api.post<Note>("/notes", data);
    return response.data;
  },

  async updateNote(id: number, data: UpdateNoteDto): Promise<Note> {
    const response = await api.put<Note>(`/notes/${id}`, data);
    return response.data;
  },

  async deleteNote(id: number): Promise<void> {
    await api.delete(`/notes/${id}`);
  },
};
