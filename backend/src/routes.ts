import express, { Router } from 'express';
import Note from './models';
import { createNoteSchema, updateNoteSchema } from './validation';
import { ZodError } from 'zod';
import logger from './logger';

const router = Router();

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Get all notes
 *     description: Retrieve a list of all notes ordered by creation date (newest first)
 *     tags:
 *       - Notes
 *     responses:
 *       200:
 *         description: Successfully retrieved all notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *               example:
 *                 - id: 1
 *                   title: "First Note"
 *                   content: "This is the first note"
 *                   createdAt: "2025-11-03T12:00:00.000Z"
 *                   updatedAt: "2025-11-03T12:00:00.000Z"
 *                 - id: 2
 *                   title: "Second Note"
 *                   content: "This is the second note"
 *                   createdAt: "2025-11-03T11:00:00.000Z"
 *                   updatedAt: "2025-11-03T11:00:00.000Z"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/notes', async (req, res) => {
  try {
    const notes = await Note.findAll({
      order: [['createdAt', 'DESC']],
    });
    logger.databaseOperation('SELECT', 'notes', 'SUCCESS', { count: notes.length });
    res.json(notes);
  } catch (error) {
    logger.databaseOperation('SELECT', 'notes', 'FAILURE', { error: error instanceof Error ? error.message : String(error) });
    logger.error('Error fetching notes', error);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

/**
 * @swagger
 * /api/notes/{id}:
 *   get:
 *     summary: Get a single note by ID
 *     description: Retrieve a specific note using its unique identifier
 *     tags:
 *       - Notes
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Note ID
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved the note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       404:
 *         description: Note not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Note not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note) {
      logger.warn('Note not found', { id: req.params.id, operation: 'SELECT' });
      return res.status(404).json({ error: 'Note not found' });
    }
    logger.databaseOperation('SELECT', 'notes', 'SUCCESS', { id: req.params.id });
    res.json(note);
  } catch (error) {
    logger.databaseOperation('SELECT', 'notes', 'FAILURE', { id: req.params.id, error: error instanceof Error ? error.message : String(error) });
    logger.error('Error fetching note', error, { id: req.params.id });
    res.status(500).json({ error: 'Failed to fetch note' });
  }
});

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Create a new note
 *     description: Create a new note with title and content
 *     tags:
 *       - Notes
 *     requestBody:
 *       description: Note data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NoteInput'
 *           example:
 *             title: "My New Note"
 *             content: "This is the content of my new note"
 *     responses:
 *       201:
 *         description: Note created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/notes', async (req, res) => {
  try {
    const validatedData = createNoteSchema.parse(req.body);
    const note = await Note.create(validatedData);
    logger.databaseOperation('INSERT', 'notes', 'SUCCESS', { id: note.id, title: validatedData.title });
    res.status(201).json(note);
  } catch (error) {
    if (error instanceof ZodError) {
      logger.warn('Validation error on note creation', { errors: error.errors });
      return res.status(400).json({ error: error.errors });
    }
    logger.databaseOperation('INSERT', 'notes', 'FAILURE', { error: error instanceof Error ? error.message : String(error) });
    logger.error('Error creating note', error);
    res.status(500).json({ error: 'Failed to create note' });
  }
});

/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     summary: Update a note
 *     description: Update an existing note with new title and/or content
 *     tags:
 *       - Notes
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Note ID
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       description: Updated note data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NoteInput'
 *           example:
 *             title: "Updated Title"
 *             content: "Updated content here"
 *     responses:
 *       200:
 *         description: Note updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Note not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note) {
      logger.warn('Note not found for update', { id: req.params.id, operation: 'UPDATE' });
      return res.status(404).json({ error: 'Note not found' });
    }

    const validatedData = updateNoteSchema.parse(req.body);
    await note.update(validatedData);
    logger.databaseOperation('UPDATE', 'notes', 'SUCCESS', { id: req.params.id });
    res.json(note);
  } catch (error) {
    if (error instanceof ZodError) {
      logger.warn('Validation error on note update', { id: req.params.id, errors: error.errors });
      return res.status(400).json({ error: error.errors });
    }
    logger.databaseOperation('UPDATE', 'notes', 'FAILURE', { id: req.params.id, error: error instanceof Error ? error.message : String(error) });
    logger.error('Error updating note', error, { id: req.params.id });
    res.status(500).json({ error: 'Failed to update note' });
  }
});

/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     summary: Delete a note
 *     description: Delete an existing note by ID
 *     tags:
 *       - Notes
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Note ID
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Note deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Note deleted successfully"
 *       404:
 *         description: Note not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Note not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note) {
      logger.warn('Note not found for deletion', { id: req.params.id, operation: 'DELETE' });
      return res.status(404).json({ error: 'Note not found' });
    }

    await note.destroy();
    logger.databaseOperation('DELETE', 'notes', 'SUCCESS', { id: req.params.id });
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    logger.databaseOperation('DELETE', 'notes', 'FAILURE', { id: req.params.id, error: error instanceof Error ? error.message : String(error) });
    logger.error('Error deleting note', error, { id: req.params.id });
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

export default router;
