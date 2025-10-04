import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { testConnection } from './config/database'
import { requestLogger } from './middlewares/logger'
import { errorHandler, notFound } from './middlewares/errorHandler'
import notesRoutes from './routes/notesRoutes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(requestLogger)

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  })
})

// API Routes
app.use('/api/notes', notesRoutes)

// 404 Handler
app.use(notFound)

// Error Handler
app.use(errorHandler)

const startServer = async () => {
  try {
    console.log('🔄 Connecting to database...')
    const isConnected = await testConnection()
    
    if (!isConnected) {
      console.error('Failed to connect to database')
      process.exit(1)
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
      console.log(`Health check: http://localhost:${PORT}/health`)
      console.log(`API endpoint: http://localhost:${PORT}/api/notes`)
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing server')
  process.exit(0)
})

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing server')
  process.exit(0)
})