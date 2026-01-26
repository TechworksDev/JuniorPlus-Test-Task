import { pool } from '../config/database';
import { Note, CreateNoteRequest, UpdateNoteRequest } from '../types/note';

export class NoteModel {
  static async findAll(): Promise<Note[]> {
    const query = 'SELECT * FROM notes ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id: number): Promise<Note | null> {
    const query = 'SELECT * FROM notes WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  static async create(noteData: CreateNoteRequest): Promise<Note> {
    const query = `
      INSERT INTO notes (title, content)
      VALUES ($1, $2)
      RETURNING *
    `;
    const values = [noteData.title, noteData.content];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async update(id: number, noteData: UpdateNoteRequest): Promise<Note | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (noteData.title !== undefined) {
      fields.push(`title = $${paramCount}`);
      values.push(noteData.title);
      paramCount++;
    }

    if (noteData.content !== undefined) {
      fields.push(`content = $${paramCount}`);
      values.push(noteData.content);
      paramCount++;
    }

    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    const query = `
      UPDATE notes
      SET ${fields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
    `;
    values.push(id);

    const result = await pool.query(query, values);
    return result.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const query = 'DELETE FROM notes WHERE id = $1';
    const result = await pool.query(query, [id]);
    return (result.rowCount ?? 0) > 0;
  }
}