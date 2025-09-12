import authController from "../controllers/authController"
import { Router } from "express"
import { authMiddleware } from "../middleware/authMiddleware"
const router = Router()

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Регистрация нового пользователя
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: name@example.com
 *               password:
 *                 type: string
 *                 example: userpassword
 *     responses:
 *       201:
 *         description: Пользователь успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 avatar:
 *                   type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: Пароль короче 8 символов, неверный email, такой email уже используется
 *       500:
 *         description: Ошибка сервера
 */
router.post('/register', authController.registerUser)

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Авторизация пользователя
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: name@example.com
 *               password:
 *                 type: string
 *                 example: userpassword
 *     responses:
 *       200:
 *         description: Успешный вход, возвращает токен и данные пользователя
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 avatar:
 *                   type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: Неверный email или пароль, пользователь не найден, не предоставлен email или пароль
 *       500:
 *         description: Ошибка сервера
 */
router.post('/login', authController.loginUser)

/**
 * @openapi
 * /auth/delete:
 *   delete:
 *     summary: Удаление пользователя
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Пользователь успешно удален
 *       401:
 *         description: Пользователь не найден или нет доступа
 *       500:
 *         description: Ошибка сервера
 */
router.delete('/delete', authMiddleware, authController.deleteUser)

/**
 * @openapi
 * /auth/update:
 *   put:
 *     summary: Обновление профиля пользователя (аватар)
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 example: https://i.pinimg.com/236x/68/31/12/68311248ba2f6e0ba94ff6da62eac9f6.jpg
 *     responses:
 *       200:
 *         description: Профиль успешно обновлен
 *       401:
 *         description: Пользователь не найден или нет доступа
 *       500:
 *         description: Ошибка сервера
 */
router.put('/updateProfile', authMiddleware, authController.updateProfile)

export default router