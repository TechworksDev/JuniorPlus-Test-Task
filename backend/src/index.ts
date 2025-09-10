import express from 'express'
import cors from "cors"
import bodyParser from "body-parser"
import authRoutes from "./routes/authRoutes"

const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())

app.use("/auth", authRoutes)

app.listen(port, () => {
  console.log(`NekoNotes server listening on ${port}`)
})