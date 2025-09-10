import { Request, Response } from "express"

export async function registerUser(req: Request, res: Response) {
  res.send({message: "Miaw!"})
}

export async function loginUser(req: Request, res: Response) {
  res.send({message: "Miaw miaw!!!!"})
}