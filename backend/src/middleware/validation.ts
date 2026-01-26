import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateBody = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      res.status(400).json({
        status: 'fail',
        message: 'Validation failed',
        errors,
      });
      return;
    }

    next();
  };
};

export const createNoteSchema = Joi.object({
  title: Joi.string().min(1).max(255).required().messages({
    'string.empty': 'Title is required',
    'string.max': 'Title must be less than 255 characters',
  }),
  content: Joi.string().allow('').optional(),
});

export const updateNoteSchema = Joi.object({
  title: Joi.string().min(1).max(255).optional().messages({
    'string.empty': 'Title cannot be empty',
    'string.max': 'Title must be less than 255 characters',
  }),
  content: Joi.string().allow('').optional(),
});