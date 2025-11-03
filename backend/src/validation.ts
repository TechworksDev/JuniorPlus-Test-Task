import { z } from 'zod';

export const createNoteSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title must be less than 255 characters'),
  content: z.string().min(1, 'Content is required'),
});

export const updateNoteSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title must be less than 255 characters').optional(),
  content: z.string().min(1, 'Content is required').optional(),
});

export type CreateNoteRequest = z.infer<typeof createNoteSchema>;
export type UpdateNoteRequest = z.infer<typeof updateNoteSchema>;
