import pool from "../database/db";
import { AppError } from "../middlewares/errorHandlers";
import { HttpStatus } from "../utils/httpStatus";

export interface Note {
  id: string;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
}

export const Notes = {
  // Получить все заметки
  async getAll(): Promise<Note[]> {
    const result = await pool.query<Note>(
      "SELECT * FROM note ORDER BY created_at DESC"
    );
    return result.rows;
  },

  // Создать новую заметку
  async create(title: string, content: string): Promise<Note> {
    const result = await pool.query<Note>(
      `INSERT INTO note (title, content)
       VALUES ($1, $2)
       RETURNING *`,
      [title, content]
    );
    return result.rows[0];
  },

  // Получить заметку по id
  async getById(id: string): Promise<Note | null> {
    const result = await pool.query<Note>(
      "SELECT * FROM note WHERE id = $1",
      [id]
    );
    return result.rows[0] || null;
  },

  // Обновить заметку
  async update(id: string, title: string, content: string): Promise<Note> {
    const result = await pool.query<Note>(
      `UPDATE note
       SET title = $1,
           content = $2,
           updated_at = NOW()
       WHERE id = $3
       RETURNING *`,
      [title, content, id]
    );

    if (result.rowCount === 0) {
      throw new AppError(`Note with id=${id} not found`, HttpStatus.NOT_FOUND);
    }

    return result.rows[0];
  },

  // Удалить заметку
  async delete(id: string): Promise<Note> {
    const result = await pool.query<Note>(
      "DELETE FROM note WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      throw new AppError(`Note with id=${id} not found`, HttpStatus.NOT_FOUND);
    }

    return result.rows[0];
  },
};
