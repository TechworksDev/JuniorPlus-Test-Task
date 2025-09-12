import dotenv from 'dotenv'
import 'dotenv/config'
dotenv.config()
import express from 'express'
import cors from "cors"
import bodyParser from "body-parser"
import authRoutes from "./routes/authRoutes"
import noteRouters from "./routes/noteRoutes"
import { loggerMiddleware } from './middleware/loggerMiddleware'
import { setupSwagger } from './utils/swagger'
import { errorMiddleware } from './middleware/errorMiddleware'

const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())
app.use(loggerMiddleware)
setupSwagger(app)

app.use("/auth", authRoutes)
app.use("/notes", noteRouters)

app.use(errorMiddleware)

app.listen(port, () => {
  console.log(`NekoNotes server listening on ${port}, swagger docs: http://localhost:3000/swagger`)
})