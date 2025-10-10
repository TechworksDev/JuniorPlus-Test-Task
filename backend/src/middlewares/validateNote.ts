import { Request, Response, NextFunction } from 'express'
import { z } from 'zod/mini'
import { AppError } from './errorHandler'
import { NOTE_COLORS } from '../types'

// Schema
const noteSchema = z.object({
  title: z
    .string()
    .check(
      z.trim(),
      z.minLength(1, 'Title is required'),
      z.maxLength(255, 'Title must be at most 255 characters long')
    ),
  content: z
    .string()
    .check(
      z.trim(),
      z.minLength(1, 'Content is required'),
      z.maxLength(500, 'Content must be at most 500 characters long')
    ),
  marker: z.enum(NOTE_COLORS, {
    message: 'Marker color is required'
  })
})

// Middleware

export const validateNote = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const result = noteSchema.safeParse(req.body)

  if (!result.success) {
    const message = result.error.issues.map(i => i.message).join(', ')
    return next(new AppError(message, 400))
  }

  req.body = result.data
  next()
}