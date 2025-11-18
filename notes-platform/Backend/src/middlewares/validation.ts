import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { query } from 'express-validator';
export const validateCreateNote = [
    body('name')
        .trim()
        .notEmpty().withMessage('Название обязательно')
        .isLength({ min: 1, max: 100 }).withMessage('Название от 1 до 100 символов'),
    body('content')
        .optional()
        .isLength({ max: 5000 }).withMessage('Содержимое максимум 5000 символов'),
];

export const validateUpdateNote = [
    param('id').isUUID().withMessage('Неверный ID заметки'),
    body('name')
        .optional()
        .trim()
        .isLength({ min: 1, max: 100 }).withMessage('Название от 1 до 100 символов'),
    body('content')
        .optional()
        .isLength({ max: 5000 }).withMessage('Содержимое максимум 5000 символов'),
];

export const validateNoteId = [
    param('id').isUUID().withMessage('Неверный формат ID'),
];



export const validateSearch = [
    query('q')
        .optional()
        .isString().withMessage('Запрос должен быть строкой')
        .isLength({ max: 100 }).withMessage('Максимум 100 символов'),
];

export const handleValidationErrors = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            error: 'Ошибка валидации',
            details: errors.array()
        });
    }
    next();
};