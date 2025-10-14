import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
import { HttpStatus } from "../utils/httpStatus";

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = HttpStatus.INTERNAL_SERVER_ERROR) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`[${req.method}] ${req.url} - ${err.message}`);

  res.status(err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
