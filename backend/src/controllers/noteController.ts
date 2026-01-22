import { Request, Response, NextFunction } from 'express';
import { NoteModel } from '../models/noteModel';
import { CreateNoteRequest, UpdateNoteRequest, NoteResponse } from '../types/note';

export class NoteController {
  static async getAllNotes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const notes = await NoteModel.findAll();
      const notesResponse: NoteResponse[] = notes.map(note => ({
        ...note,
        created_at: note.created_at.toISOString(),
        updated_at: note.updated_at.toISOString(),
      }));

      res.json({
        status: 'success',
        data: {
          notes: notesResponse,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getNoteById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({
          status: 'fail',
          message: 'Invalid note ID',
        });
        return;
      }

      const note = await NoteModel.findById(id);
      if (!note) {
        res.status(404).json({
          status: 'fail',
          message: 'Note not found',
        });
        return;
      }

      const noteResponse: NoteResponse = {
        ...note,
        created_at: note.created_at.toISOString(),
        updated_at: note.updated_at.toISOString(),
      };

      res.json({
        status: 'success',
        data: {
          note: noteResponse,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async createNote(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const noteData: CreateNoteRequest = req.body;
      const note = await NoteModel.create(noteData);

      const noteResponse: NoteResponse = {
        ...note,
        created_at: note.created_at.toISOString(),
        updated_at: note.updated_at.toISOString(),
      };

      res.status(201).json({
        status: 'success',
        data: {
          note: noteResponse,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateNote(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({
          status: 'fail',
          message: 'Invalid note ID',
        });
        return;
      }

      const noteData: UpdateNoteRequest = req.body;
      const note = await NoteModel.update(id, noteData);

      if (!note) {
        res.status(404).json({
          status: 'fail',
          message: 'Note not found',
        });
        return;
      }

      const noteResponse: NoteResponse = {
        ...note,
        created_at: note.created_at.toISOString(),
        updated_at: note.updated_at.toISOString(),
      };

      res.json({
        status: 'success',
        data: {
          note: noteResponse,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteNote(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({
          status: 'fail',
          message: 'Invalid note ID',
        });
        return;
      }

      const deleted = await NoteModel.delete(id);
      if (!deleted) {
        res.status(404).json({
          status: 'fail',
          message: 'Note not found',
        });
        return;
      }

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}