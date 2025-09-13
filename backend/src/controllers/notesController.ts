import { Request, Response, NextFunction } from "express";
import pool from "../db";

export const getAllNotes = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await pool.query(
      "SELECT id, title, content, created_at, updated_at FROM notes ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

export const getNoteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT id, title, content, created_at, updated_at FROM notes WHERE id = $1",
      [id]
    );
    if (result.rowCount === 0) return res.status(404).json({ message: "Note not found" });
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const createNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content } = req.body;
    const result = await pool.query(
      "INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING id, title, content, created_at, updated_at",
      [title, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const updateNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const result = await pool.query(
      "UPDATE notes SET title = $1, content = $2, updated_at = NOW() WHERE id = $3 RETURNING id, title, content, created_at, updated_at",
      [title, content, id]
    );
    if (result.rowCount === 0) return res.status(404).json({ message: "Note not found" });
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM notes WHERE id = $1", [id]);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
