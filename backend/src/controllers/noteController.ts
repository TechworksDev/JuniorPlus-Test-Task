import { Request, Response } from "express"
import { pool } from "../database/db"
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";

//* POST
export async function addNote(req: Request, res: Response) {
  res.status(201).send({message: "Заметка успешно создана"})
}

export async function removeNote(req: Request, res: Response){
  res.status(201).send({message: "Заметка успешно удалена"})
}