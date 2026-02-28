import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain } from "express-validator";
import { AppError } from "./errorHandler";

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: AppError = new Error("Validation failed");
      error.statusCode = 400;
      (error as any).errors = errors.array();
      return next(error);
    }

    next();
  };
};

export const validationErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  if (err.statusCode === 400 && err.errors) {
    return res.status(400).json({
      error: {
        message: "Validation failed",
        details: err.errors,
      },
    });
  }

  if (err) {
    return res.status(500).json({
      error: {
        message: "Internal server error",
      },
    });
  }

  next(err);
};
