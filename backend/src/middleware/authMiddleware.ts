import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from "express"
import { verifyToken } from '../utils/jwt'

const JWT_SECRET = process.env.JWT_SECRET || 'secret'

export interface AuthRequest extends Request {
  user?: {
    id: number
    email: string
  }
}

export const authMiddleware = (req: AuthRequest , res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1] // Bearer <token>

  if (!token) return res.sendStatus(401).json({message: "Not authorized!"});
  try{
    const decoded = verifyToken(token) as {id: number, email: string}
    req.user = decoded;
    next()
  } catch (err) {
    return res.status(401).json({message: "Corrupted or expired token!"})
  }
}