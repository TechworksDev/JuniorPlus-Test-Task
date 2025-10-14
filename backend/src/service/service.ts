import { AppError } from "../middlewares/errorHandlers";
import { Note, Notes } from "../queries/query";
import { HttpStatus } from "../utils/httpStatus";
import logger from "../utils/logger";

export const NotesService = {
  async getNotes(): Promise<Note[]> {
    const notes = await Notes.getAll();
    logger.info(`Fetched ${notes.length} notes`);
    return notes;
  },

  async addNote(title: string, content: string): Promise<Note> {
    const note = await Notes.create(title, content);
    logger.info(`Created note: ${note.id}`);
    return note;
  },

  async removeNote(id: string): Promise<Note> {
    const note = await Notes.delete(id); 
    logger.info(`Deleted note: ${note.id}`);
    return note;
  },

  async updateNote(id: string, title: string, content: string): Promise<Note> {
    const updatedNote = await Notes.update(id, title, content); 
    logger.info(`Updated note: ${updatedNote.id}`);
    return updatedNote;
  },

  async getNoteById(id: string): Promise<Note> {
    const note = await Notes.getById(id);
    if (!note) throw new AppError("Note not found", HttpStatus.NOT_FOUND);

    logger.info(`Fetched note: ${note.id}`);
    return note;
  },
};
