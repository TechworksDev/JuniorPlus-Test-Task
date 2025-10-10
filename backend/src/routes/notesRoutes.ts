import { Router } from 'express'
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote
} from '../controllers/notesController'
import { validateNote } from '../middlewares/validateNote'

const router = Router()

// GET /api/notes - get all notes
router.get('/', getAllNotes)

// GET /api/notes/:id - get note by ID
router.get('/:id', getNoteById)

// POST /api/notes - create a new note
router.post('/', validateNote, createNote)

// PUT /api/notes/:id - update a note by ID
router.put('/:id', validateNote, updateNote)

// DELETE /api/notes/:id - delete a note by ID
router.delete('/:id', deleteNote)

export default router