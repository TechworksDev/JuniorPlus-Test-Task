import noteController from "../controllers/noteController"
import { Router } from "express"
import { authMiddleware } from "../middleware/authMiddleware"
const router = Router()

/**
 * @openapi
 * /notes/getNotes:
 *   get:
 *     summary: Получить все заметки пользователя
 *     tags:
 *       - Notes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список заметок
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 notes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       owner_id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       text:
 *                         type: string
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *       500:
 *         description: Ошибка сервера
 */
router.get('/getNotes', authMiddleware, noteController.getNotes)

/**
 * @openapi
 * /notes/addNote:
 *   post:
 *     summary: Создать новую заметку
 *     tags:
 *       - Notes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - text
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Список покупок"
 *               text:
 *                 type: string
 *                 example: "Молоко, хлеб, яблоки"
 *     responses:
 *       201:
 *         description: Заметка создана
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 owner_id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 text:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: Заголовок и текст обязательны
 *       500:
 *         description: Ошибка сервера
 */
router.post('/addNote', authMiddleware, noteController.addNote)

/**
 * @openapi
 * /notes/removeNote:
 *   delete:
 *     summary: Удалить заметку
 *     tags:
 *       - Notes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Заметка успешно удалена
 *       500:
 *         description: Ошибка сервера
 */
router.delete('/removeNote', authMiddleware, noteController.removeNote)

/**
 * @openapi
 * /notes/updateNote:
 *   put:
 *     summary: Обновить заметку
 *     tags:
 *       - Notes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - title
 *               - text
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               title:
 *                 type: string
 *                 example: "Новый заголовок"
 *               text:
 *                 type: string
 *                 example: "Обновленный текст заметки"
 *     responses:
 *       200:
 *         description: Заметка успешно обновлена
 *       500:
 *         description: Ошибка сервера
 */
router.put('/updateNote', authMiddleware, noteController.updateNote)

export default router