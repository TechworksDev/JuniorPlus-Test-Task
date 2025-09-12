import { Request, Response, NextFunction } from "express"

export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  console.error("Ошибка при исполнении запроса:", err)

  const statusCode = err.statusCode || 500
  const message = err.message || "Что-то пошло не так"

  res.status(statusCode).json({
    success: false,
    message,
  })
}