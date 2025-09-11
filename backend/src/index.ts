import dotenv from 'dotenv'
import 'dotenv/config'
dotenv.config()
import express from 'express'
import cors from "cors"
import bodyParser from "body-parser"
import authRoutes from "./routes/authRoutes"
import noteRouters from "./routes/noteRoutes"
import { loggerMiddleware } from './middleware/loggerMiddleware'

const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())
app.use(loggerMiddleware)

app.use("/auth", authRoutes)
app.use("/notes", noteRouters)

app.listen(port, () => {
  console.log(`NekoNotes server listening on ${port}`)
})