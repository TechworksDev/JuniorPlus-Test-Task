import { Router } from "express";
import { checkSchema } from "express-validator";
import { Schema } from "express-validator";
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/notesController";
import { validate } from "../middlewares/validate";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Управление заметками
 */

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Получить все заметки
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: Список заметок
 *
 *   post:
 *     summary: Создать заметку
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Моя заметка"
 *               content:
 *                 type: string
 *                 example: "Текст заметки"
 *     responses:
 *       201:
 *         description: Заметка создана
 */

/**
 * @swagger
 * /api/notes/{id}:
 *   get:
 *     summary: Получить заметку по ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID заметки
 *     responses:
 *       200:
 *         description: Заметка найдена
 *       404:
 *         description: Не найдено
 *
 *   put:
 *     summary: Обновить заметку по ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID заметки
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Заметка обновлена
 *       404:
 *         description: Не найдено
 *
 *   delete:
 *     summary: Удалить заметку по ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID заметки
 *     responses:
 *       200:
 *         description: Успешно удалено
 *       404:
 *         description: Не найдено
 */

const noteSchema: Schema = {
  title: {
    in: ["body"] as const,
    isString: { errorMessage: "title must be a string" },
    trim: true,
    notEmpty: { errorMessage: "title is required" },
    isLength: {
      options: { max: 255 },
      errorMessage: "max 255 characters",
    },
  },
  content: {
    in: ["body"] as const,
    optional: true,
    isString: { errorMessage: "content must be a string" },
  },
};

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", checkSchema(noteSchema), validate, createNote);
router.put("/:id", checkSchema(noteSchema), validate, updateNote);
router.delete("/:id", deleteNote);

export default router;
