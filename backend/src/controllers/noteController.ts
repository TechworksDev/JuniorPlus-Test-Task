import { Request, Response, NextFunction } from "express";
import { noteRepository } from "../repositories/noteRepository";
import { AppError } from "../middleware/errorHandler";

export class NoteController {
  async getAllNotes(req: Request, res: Response, next: NextFunction) {
    try {
      const notes = await noteRepository.findAll();
      res.json(notes);
    } catch (error) {
      next(error);
    }
  }

  async getNoteById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const note = await noteRepository.findById(id);

      if (!note) {
        const error: AppError = new Error("Note not found");
        error.statusCode = 404;
        return next(error);
      }

      res.json(note);
    } catch (error) {
      next(error);
    }
  }

  async createNote(req: Request, res: Response, next: NextFunction) {
    try {
      const note = await noteRepository.create(req.body);
      res.status(201).json(note);
    } catch (error) {
      next(error);
    }
  }

  async updateNote(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const note = await noteRepository.update(id, req.body);

      if (!note) {
        const error: AppError = new Error("Note not found");
        error.statusCode = 404;
        return next(error);
      }

      res.json(note);
    } catch (error) {
      next(error);
    }
  }

  async deleteNote(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const deleted = await noteRepository.delete(id);

      if (!deleted) {
        const error: AppError = new Error("Note not found");
        error.statusCode = 404;
        return next(error);
      }

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export const noteController = new NoteController();
