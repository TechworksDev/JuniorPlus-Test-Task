import axios from "axios";

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const api = axios.create({
  baseURL: "http://localhost:8080/api", 
});

export const NotesApi = {
  async getAll(): Promise<Note[]> {
    const res = await api.get("/notes");
    return res.data.data;
  },

  async getById(id: string): Promise<Note> {
    const res = await api.get(`/notes/${id}`);
    return res.data.data;
  },

  async create(title: string, content: string): Promise<Note> {
    const res = await api.post("/notes", { title, content });
    return res.data.data;
  },

  async update(id: string, title: string, content: string): Promise<Note> {
    const res = await api.put(`/notes/${id}`, { title, content });
    return res.data.data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/notes/${id}`);
  },
};
