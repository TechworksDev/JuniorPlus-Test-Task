import { Router } from "express";
import { NotesController } from "../controllers/controllers";
import {
  createNoteValidation,
  updateNoteValidation,
  idValidation,
} from "../validator/notes";
import { validateRequest } from "../middlewares/validators";

const router = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Note:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "123"
 *         title:
 *           type: string
 *           example: "My Note"
 *         content:
 *           type: string
 *           example: "This is my note content"
 *     CreateNoteInput:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         title:
 *           type: string
 *           example: "New Note"
 *         content:
 *           type: string
 *           example: "Some content"
 */

/**
 * @openapi
 * /api/notes:
 *   get:
 *     summary: Получить все заметки
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: Список заметок
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 */
router.get("/", NotesController.getAll);

/**
 * @openapi
 * /api/notes/{id}:
 *   get:
 *     summary: Получить заметку по ID
 *     tags: [Notes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID заметки
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Успешно
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       404:
 *         description: Заметка не найдена
 */
router.get("/:id", idValidation, validateRequest, NotesController.getById);

/**
 * @openapi
 * /api/notes:
 *   post:
 *     summary: Создать новую заметку
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateNoteInput'
 *     responses:
 *       201:
 *         description: Заметка создана
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 */
router.post("/", createNoteValidation, validateRequest, NotesController.create);

/**
 * @openapi
 * /api/notes/{id}:
 *   put:
 *     summary: Обновить заметку
 *     tags: [Notes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateNoteInput'
 *     responses:
 *       200:
 *         description: Заметка обновлена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 */
router.put("/:id", updateNoteValidation, validateRequest, NotesController.update);

/**
 * @openapi
 * /api/notes/{id}:
 *   delete:
 *     summary: Удалить заметку
 *     tags: [Notes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Заметка удалена
 */
router.delete("/:id", idValidation, validateRequest, NotesController.remove);

export default router;
