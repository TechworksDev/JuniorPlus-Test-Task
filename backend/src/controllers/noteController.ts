import { Response } from "express"
import { pool } from "../database/db"
import { AuthRequest } from "../middleware/authMiddleware";

async function getNotes(req: AuthRequest, res: Response) {
  try {
    const notes = await pool.query("SELECT * FROM notes WHERE owner_id = $1", [req.user?.userId])
    res.status(200).send({ notes: notes.rows })
  } catch (err) {
    res.status(500).send({ message: "Что-то пошло не так" })
  }
}

async function addNote(req: AuthRequest, res: Response) {
  try {
    const { title, text } = req.body
    if (!title || !text) {
      res.status(401).send({ message: "Заголовок и текст обязательны" })
    } else {
      const newNote = await pool.query(
        "INSERT INTO notes (owner_id, title, text) VALUES ($1, $2, $3) RETURNING id, owner_id, title, text, created_at",
        [req.user?.userId, title, text]
      )
      res.status(201).send(newNote.rows[0])
    }
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: "Что-то пошло не так" })
  }
}

async function removeNote(req: AuthRequest, res: Response) {
  try {
    const { id } = req.body
    await pool.query("DELETE FROM notes WHERE id = $1 AND owner_id = $2", [id, req.user?.userId])
    res.status(200).send({ message: "Заметка успешно удалена" })
  } catch (err) {
    res.status(500).send({ message: "Что-то пошло не так" })
  }
}

async function updateNote(req: AuthRequest, res: Response) {
  try {
    const { id, title, text } = req.body
    await pool.query("UPDATE notes SET title = $1, text = $2 WHERE id = $3 AND owner_id = $4", [title, text, id, req.user?.userId])
    res.status(200).send({ message: "Заметка успешно обновлена" })
  } catch (err) {
    res.status(500).send({ message: "Что-то пошло не так" })
  }
}

const noteController = {
  addNote,
  removeNote,
  getNotes,
  updateNote
}

export default noteController