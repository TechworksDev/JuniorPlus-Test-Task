import { body, param } from "express-validator";

export const createNoteValidation = [
  body("title")
    .isString().withMessage("Заголовок должен быть строкой")
    .notEmpty().withMessage("Заголовок обязателен")
    .isLength({ max: 255 }).withMessage("Заголовок не должен превышать 255 символов"),
  body("content")
    .isString().withMessage("Содержание должно быть строкой")
    .notEmpty().withMessage("Содержание обязательно"),
];

export const updateNoteValidation = [
  param("id")
    .isUUID().withMessage("Некорректный формат ID (ожидается UUID)"),
  body("title")
    .optional()
    .isString().withMessage("Заголовок должен быть строкой")
    .isLength({ max: 255 }).withMessage("Заголовок не должен превышать 255 символов"),
  body("content")
    .optional()
    .isString().withMessage("Содержание должно быть строкой"),
];

export const idValidation = [
  param("id")
    .isUUID().withMessage("Некорректный формат ID (ожидается UUID)"),
];
