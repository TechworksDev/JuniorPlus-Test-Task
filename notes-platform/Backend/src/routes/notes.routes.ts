import { Router } from 'express';
import { NotesController } from '../controllers/notes.controller';
import {
    validateCreateNote,
    validateUpdateNote,
    validateNoteId,
    validateSearch,
    handleValidationErrors
} from '../middlewares/validation';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: API для работы с заметками
 */

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Получить все заметки
 *     tags: [Notes]
 *     description: Возвращает список всех заметок пользователя
 *     responses:
 *       200:
 *         description: Успешный ответ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Note'
 *       500:
 *         description: Ошибка сервера
 */
router.get('/', NotesController.getAllNotes);

/**
 * @swagger
 * /api/notes/search:
 *   get:
 *     summary: Поиск заметок
 *     tags: [Notes]
 *     description: Поиск заметок по названию
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Поисковый запрос
 *         example: покупки
 *     responses:
 *       200:
 *         description: Результаты поиска
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Note'
 *                 total:
 *                   type: integer
 *                 query:
 *                   type: string
 */
router.get('/search', validateSearch, handleValidationErrors, NotesController.searchNotes);

/**
 * @swagger
 * /api/notes/{id}:
 *   get:
 *     summary: Получить заметку по ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID заметки
 *     responses:
 *       200:
 *         description: Заметка найдена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Note'
 *       404:
 *         description: Заметка не найдена
 */
router.get('/:id', validateNoteId, handleValidationErrors, NotesController.getNoteById);

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Создать новую заметку
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateNoteDTO'
 *           example:
 *             name: "Моя новая заметка"
 *             content: "Текст заметки"
 *     responses:
 *       201:
 *         description: Заметка создана
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Note'
 *       400:
 *         description: Ошибка валидации
 */
router.post('/', validateCreateNote, handleValidationErrors, NotesController.createNote);

/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     summary: Обновить заметку
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               content:
 *                 type: string
 *           example:
 *             name: "Обновлённое название"
 *             content: "Новый текст"
 *     responses:
 *       200:
 *         description: Заметка обновлена
 *       404:
 *         description: Заметка не найдена
 */
router.put('/:id', validateUpdateNote, handleValidationErrors, NotesController.updateNote);

/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     summary: Удалить заметку
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Заметка удалена
 *       404:
 *         description: Заметка не найдена
 */
router.delete('/:id', validateNoteId, handleValidationErrors, NotesController.deleteNote);

export default router;