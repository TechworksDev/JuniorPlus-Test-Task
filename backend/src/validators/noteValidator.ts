import { body, param, ValidationChain } from "express-validator";

export const createNoteValidator: ValidationChain[] = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 1, max: 255 })
    .withMessage("Title must be between 1 and 255 characters"),
  body("content").optional().isString().withMessage("Content must be a string"),
];

export const updateNoteValidator: ValidationChain[] = [
  param("id").isInt({ min: 1 }).withMessage("ID must be a positive integer"),
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ min: 1, max: 255 })
    .withMessage("Title must be between 1 and 255 characters"),
  body("content").optional().isString().withMessage("Content must be a string"),
];

export const idParamValidator: ValidationChain[] = [
  param("id").isInt({ min: 1 }).withMessage("ID must be a positive integer"),
];
