import { body, param } from "express-validator";

export const createNoteValidation = [
  body("title").isString().notEmpty().withMessage("Title is required"),
  body("content").isString().notEmpty().withMessage("Content is required"),
];

export const updateNoteValidation = [
  param("id").isString().withMessage("ID must be a string"),
  body("title").isString().notEmpty().withMessage("Title is required"),
  body("content").isString().notEmpty().withMessage("Content is required"),
];

export const idValidation = [
  param("id").isString().withMessage("ID must be a string"),
];