import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { AppError } from "./errorHandlers";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const msg = errors.array().map(err => err.msg).join(", ");
    throw new AppError(msg, 400);
  }
  next();
};
