import { Request, Response, NextFunction } from "express";
import { NotesService } from "../service/service";

export const NotesController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const notes = await NotesService.getNotes();
      res.json({ success: true, data: notes });
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const note = await NotesService.getNoteById(id);
      res.json({ success: true, data: note });
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, content } = req.body;
      const note = await NotesService.addNote(title, content);
      res.status(201).json({ success: true, data: note });
    } catch (error) {
      next(error);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const note = await NotesService.removeNote(id);
      res.json({ success: true, data: note });
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      const note = await NotesService.updateNote(id, title, content);
      res.json({ success: true, data: note });
    } catch (error) {
      next(error);
    }
  },
};
