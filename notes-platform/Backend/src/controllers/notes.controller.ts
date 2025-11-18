import { Request, Response, NextFunction } from 'express';
import { NoteModel } from '../models/note.model';
import { AppError } from '../middlewares/errorHandler';

export class NotesController {
    // GET /api/notes
    static async getAllNotes(req: Request, res: Response, next: NextFunction) {
        try {
            const notes = await NoteModel.findAll();
            res.json({
                success: true,
                data: notes
            });
        } catch (error) {
            next(error);
        }
    }

    // GET /api/notes/search?
    static async searchNotes(req: Request, res: Response, next: NextFunction) {
        try {
            const { q } = req.query;

            if (!q || typeof q !== 'string' || q.trim() === '') {
                const notes = await NoteModel.findAll();
                return res.json({
                    success: true,
                    data: notes,
                    total: notes.length
                });
            }

            const notes = await NoteModel.search(q.trim());

            res.json({
                success: true,
                data: notes,
                total: notes.length,
                query: q
            });
        } catch (error) {
            next(error);
        }
    }

    // GET /api/notes/:id
    static async getNoteById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const note = await NoteModel.findById(id);

            if (!note) {
                throw new AppError('Заметка не найдена', 404);
            }

            res.json({
                success: true,
                data: note
            });
        } catch (error) {
            next(error);
        }
    }

    // POST /api/notes
    static async createNote(req: Request, res: Response, next: NextFunction) {
        try {
            const note = await NoteModel.create(req.body);
            res.status(201).json({
                success: true,
                data: note
            });
        } catch (error) {
            next(error);
        }
    }

    // PUT /api/notes/:id
    static async updateNote(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const note = await NoteModel.update(id, req.body);

            if (!note) {
                throw new AppError('Заметка не найдена', 404);
            }

            res.json({
                success: true,
                data: note
            });
        } catch (error) {
            next(error);
        }
    }

    // DELETE /api/notes/:id
    static async deleteNote(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const deleted = await NoteModel.delete(id);

            if (!deleted) {
                throw new AppError('Заметка не найдена', 404);
            }

            res.json({
                success: true,
                data: { message: 'Заметка удалена' }
            });
        } catch (error) {
            next(error);
        }
    }
}