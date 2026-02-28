import pool from "../db/connection";
import { Note, CreateNoteDto, UpdateNoteDto } from "../models/Note";

export class NoteRepository {
  async findAll(): Promise<Note[]> {
    const result = await pool.query(
      "SELECT * FROM notes ORDER BY created_at DESC"
    );
    return result.rows;
  }

  async findById(id: number): Promise<Note | null> {
    const result = await pool.query("SELECT * FROM notes WHERE id = $1", [id]);
    return result.rows[0] || null;
  }

  async create(data: CreateNoteDto): Promise<Note> {
    const result = await pool.query(
      "INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *",
      [data.title, data.content || null]
    );
    return result.rows[0];
  }

  async update(id: number, data: UpdateNoteDto): Promise<Note | null> {
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.title !== undefined) {
      updates.push(`title = $${paramCount++}`);
      values.push(data.title);
    }
    if (data.content !== undefined) {
      updates.push(`content = $${paramCount++}`);
      values.push(data.content);
    }

    if (updates.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const result = await pool.query(
      `UPDATE notes SET ${updates.join(
        ", "
      )} WHERE id = $${paramCount} RETURNING *`,
      values
    );
    return result.rows[0] || null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query("DELETE FROM notes WHERE id = $1", [id]);
    return result.rowCount !== null && result.rowCount > 0;
  }
}

export const noteRepository = new NoteRepository();
