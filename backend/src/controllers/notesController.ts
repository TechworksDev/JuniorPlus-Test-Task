import { Request, Response, NextFunction } from 'express'
import { pool } from '../config/database'
import { Note, CreateNoteDTO, UpdateNoteDTO, ApiResponse } from '../types'
import { AppError } from '../middlewares/errorHandler'

// Get all notes with optional search, sorting, and ordering
export const getAllNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { search, sort_by = 'created_at', order = 'DESC' } = req.query

    let query = 'SELECT * FROM notes WHERE 1=1'
    const values: any[] = []

    if (search && typeof search === 'string') {
      values.push(`%${search}%`)
      query += ` AND (title ILIKE $${values.length} OR content ILIKE $${values.length})`
    }

    const allowedSortFields = ['created_at', 'updated_at', 'title']
    const sortField = allowedSortFields.includes(sort_by as string) 
      ? sort_by 
      : 'created_at'
    const sortOrder = order === 'ASC' ? 'ASC' : 'DESC'
    query += ` ORDER BY ${sortField} ${sortOrder}`

    const result = await pool.query(query, values)

    const response: ApiResponse<Note[]> = {
      success: true,
      data: result.rows
    }

    res.json(response)
  } catch (error) {
    next(error)
  }
}

// Get a single note by ID
export const getNoteById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const result = await pool.query(
      'SELECT * FROM notes WHERE id = $1',
      [id]
    )

    if (result.rows.length === 0) {
      throw new AppError('Note not found', 404)
    }

    const response: ApiResponse<Note> = {
      success: true,
      data: result.rows[0]
    }

    res.json(response)
  } catch (error) {
    next(error)
  }
}

// Create a new note
export const createNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, content, marker = 'gray' } = req.body as CreateNoteDTO

    const result = await pool.query(
      `INSERT INTO notes (title, content, marker) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [title.trim(), content.trim(), marker]
    )

    const response: ApiResponse<Note> = {
      success: true,
      data: result.rows[0],
      message: 'Note created successfully'
    }

    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
}

// Update an existing note
export const updateNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const { title, content, marker } = req.body as UpdateNoteDTO

    const checkResult = await pool.query(
      'SELECT id FROM notes WHERE id = $1',
      [id]
    )

    if (checkResult.rows.length === 0) {
      throw new AppError('Note not found', 404)
    }

    const updates: string[] = []
    const values: any[] = []
    let paramIndex = 1

    if (title !== undefined) {
      updates.push(`title = $${paramIndex}`)
      values.push(title.trim())
      paramIndex++
    }

    if (content !== undefined) {
      updates.push(`content = $${paramIndex}`)
      values.push(content.trim())
      paramIndex++
    }

    if (marker !== undefined) {
      updates.push(`marker = $${paramIndex}`)
      values.push(marker)
      paramIndex++
    }

    if (updates.length === 0) {
      throw new AppError('No fields to update', 400)
    }

    values.push(id)
    const query = `
      UPDATE notes 
      SET ${updates.join(', ')} 
      WHERE id = $${paramIndex} 
      RETURNING *
    `

    const result = await pool.query(query, values)

    const response: ApiResponse<Note> = {
      success: true,
      data: result.rows[0],
      message: 'Note updated successfully'
    }

    res.json(response)
  } catch (error) {
    next(error)
  }
}

// Delete a note by ID
export const deleteNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const result = await pool.query(
      'DELETE FROM notes WHERE id = $1 RETURNING id',
      [id]
    )

    if (result.rows.length === 0) {
      throw new AppError('Note not found', 404)
    }

    const response: ApiResponse<null> = {
      success: true,
      message: 'Note deleted successfully'
    }

    res.json(response)
  } catch (error) {
    next(error)
  }
}