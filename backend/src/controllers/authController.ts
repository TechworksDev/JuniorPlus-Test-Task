import { Request, Response } from "express"
import { pool } from "../database/db"
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";

//* POST
export async function registerUser(req: Request, res: Response) {
  try{
    const {email, password} = req.body
    if(!email ||  !password) {
      res.send({message: "Email и пароль обязательны"})
    } else if (password.length < 8) {
      res.send({message: "Пароль должен быть длинее 8 символов"})
    }

    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    )
    if(userExists.rows.length > 0) {
      res.send({message: "Пользователь с таким email уже существует"})
    }

    const hashedPassword = bcrypt.hashSync(password, 10)
    const newUser = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, created_at",
      [email, hashedPassword]
    )
    const user = {
      ...newUser.rows[0],
      token: generateToken(newUser.rows[0].id, email)
    }
    res.status(201).send({message: "Пользователь успешно зарегистрирован", user})
  } catch (err) {
    console.log(err)
    res.status(500).send({message: "Что-то пошло не так"})
  }
}

export async function loginUser(req: Request, res: Response) {
  try{
    const {email, password} = req.body
    if (!email || !password) {
      res.status(401).send({message: "Email и пароль обязательны"})
    }

    const user = await pool.query(
      "SELECT FROM users WHERE email = $1",
      [email]
    )
    if(user.rows.length === 0) {
      res.status(401).send({message: "Пользователь не найден"})
    } else if (!bcrypt.compareSync(password, user.rows[0].password)) {
      res.status(401).send({message: "Неверный пароль"})
    } else {
      const userWithToken = {
        id: user.rows[0].id,
        email: user.rows[0].email,
        created_at: user.rows[0].created_at,
        avatar: user.rows[0].avatar,
        token: generateToken(user.rows[0].id, email)
      }
      res.status(200).send({message: "Пользователь успешно авторизован", user: userWithToken})
    }

  } catch (err) {

  }
}