import { pool } from '../config/database';
import { Note, CreateNoteDTO, UpdateNoteDTO } from '../types';

export class NoteModel {
    static async findAll(): Promise<Note[]> {
        const result = await pool.query(
            'SELECT * FROM notes'
        );
        return result.rows;
    }

    static async findById(id: string): Promise<Note | null> {
        const result = await pool.query(
            'SELECT * FROM notes WHERE id = $1',
            [id]
        );
        return result.rows[0] || null;
    }

    static async search(query: string): Promise<Note[]> {
        const result = await pool.query(
            `SELECT * FROM notes 
       WHERE name ILIKE $1`,
            [`%${query}%`]
        );
        return result.rows;
    }

    static async create(data: CreateNoteDTO): Promise<Note> {
        const result = await pool.query(
            `INSERT INTO notes (name, content)
             VALUES ($1, $2)
                 RETURNING *`,
            [data.name, data.content || '']
        );
        return result.rows[0];
    }

    static async update(id: string, data: UpdateNoteDTO): Promise<Note | null> {
        const fields: string[] = [];
        const values: any[] = [];
        let paramCount = 1;

        if (data.name !== undefined) {
            fields.push(`name = $${paramCount}`);
            values.push(data.name);
            paramCount++;
        }

        if (data.content !== undefined) {
            fields.push(`content = $${paramCount}`);
            values.push(data.content);
            paramCount++;
        }

        if (fields.length === 0) {
            return this.findById(id);
        }

        values.push(id);

        const result = await pool.query(
            `UPDATE notes SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
            values
        );

        return result.rows[0] || null;
    }

    static async delete(id: string): Promise<boolean> {
        const result = await pool.query(
            'DELETE FROM notes WHERE id = $1 RETURNING id',
            [id]
        );
        return result.rowCount !== null && result.rowCount > 0;
    }
}