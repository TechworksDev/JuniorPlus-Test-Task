import { NextFunction, Request, Response } from "express"
import { pool } from "../database/db"
import bcrypt from "bcrypt"
import { generateToken } from "../utils/jwt"
import { AuthRequest } from "../middleware/authMiddleware"

async function registerUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      res.status(401).send({ message: "Email и пароль обязательны" })
    } else if (password.length < 8) {
      res.status(401).send({ message: "Пароль должен быть длинее 8 символов" })
    } else if (!email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      res.status(401).send({ message: "Некорректный email" })
    }

    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    )
    if (userExists.rows.length > 0) {
      res.send({ message: "Пользователь с таким email уже существует" })
    }

    const hashedPassword = bcrypt.hashSync(password, 10)
    const newUser = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, created_at",
      [email, hashedPassword]
    )
    const user = {
      ...newUser.rows[0],
      avatar: "https://i.pinimg.com/236x/68/31/12/68311248ba2f6e0ba94ff6da62eac9f6.jpg",
      token: generateToken(newUser.rows[0].id, email)
    }
    res.status(201).send(user)
  } catch (err) {
    next(err)
  }
}

async function loginUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      res.status(401).send({ message: "Email и пароль обязательны" })
    }

    const user = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    )
    if (user.rows.length === 0) {
      res.status(401).send({ message: "Пользователь не найден" })
    } else if (!bcrypt.compareSync(password, user.rows[0].password)) {
      res.status(401).send({ message: "Неверный пароль" })
    } else {
      const userWithToken = {
        id: user.rows[0].id,
        email: user.rows[0].email,
        created_at: user.rows[0].created_at,
        avatar: user.rows[0].avatar || "https://i.pinimg.com/236x/68/31/12/68311248ba2f6e0ba94ff6da62eac9f6.jpg",
        token: generateToken(user.rows[0].id, email)
      }
      res.status(200).send(userWithToken)
    }
  } catch (err) {
    next(err)
  }
}

async function deleteUser(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const id = req.user?.userId
    const user = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    )
    if (user.rows.length === 0) {
      res.status(401).send({ message: "Пользователь не найден" })
    } else {
      await pool.query(
        "DELETE FROM users WHERE id = $1",
        [id]
      )
      res.status(200).send({ message: "Пользователь успешно удален" })
    }
  } catch (err) {
    next(err)
  }
}

async function updateProfile(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { avatar } = req.body
    await pool.query("UPDATE users SET avatar = $1 WHERE id = $2", [avatar, req.user?.userId])
    res.status(200).send({ message: "Профиль успешно обновлен" })
  } catch (err) {
    next(err)
  }
}

const authController = {
  registerUser,
  loginUser,
  deleteUser,
  updateProfile
}

export default authController