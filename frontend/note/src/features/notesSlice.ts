
import type { Note, CreateNoteInput } from "../types/types";
import { axiosApiClient } from "../helpers/axiosApiClient";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type NotesState = {
  items: Note[];
  loading: boolean;
  error: string | null;
};

const initialState: NotesState = { items: [], loading: false, error: null };

export const loadNotes = createAsyncThunk<Note[]>(
  "notes/load",
  async () => {
    const res = await axiosApiClient.get<Note[]>("/notes");
    return res.data;
  }
);

export const addNote = createAsyncThunk<Note, CreateNoteInput>(
  "notes/add",
  async (input) => {
    const res = await axiosApiClient.post<Note>("/notes", input);
    return res.data;
  }
);

export const removeNote = createAsyncThunk<number, number>(
  "notes/remove",
  async (id) => {
    await axiosApiClient.delete(`/notes/${id}`);
    return id;
  }
);

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadNotes.fulfilled, (state, action: PayloadAction<Note[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error";
      })
      .addCase(addNote.fulfilled, (state, action: PayloadAction<Note>) => {
        state.items.unshift(action.payload);
      })
      .addCase(addNote.rejected, (state, action) => {
        state.error = action.error.message ?? "Error";
      })
      .addCase(removeNote.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((n) => n.id !== action.payload);
      });
  },
});

export default notesSlice.reducer;
