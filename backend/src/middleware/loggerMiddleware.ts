import { NextFunction, Request, Response } from "express"

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log("---New Request---\n", `Method: ${req.method} | URL: ${req.url}\n`, `Payload: ${JSON.stringify(req.body)}`)
  next()
}