import express from 'express';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import sequelize from './db';
import routes from './routes';
import logger from './logger';
import { swaggerSpec } from './swagger';

const app = express();
const PORT = 3000;

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Setup Morgan logging
const accessLogStream = fs.createWriteStream(
  path.join(logsDir, 'access.log'),
  { flags: 'a' }
);

// Custom Morgan format for detailed logging
morgan.token('date', (req, res, tz) => {
  return new Date().toISOString();
});

// Morgan middleware with combined format + custom tokens
app.use(morgan(':date[iso] :method :url :status :res[content-length] - :response-time ms', {
  stream: accessLogStream
}));

// Also log to console in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Middleware
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Swagger API documentation
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      persistAuthorization: true,
      displayOperationId: false,
    },
    customCss: '.swagger-ui .topbar { display: none }',
  })
);

// Redirect root to Swagger docs
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Routes
app.use('/api', routes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error logging middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  const errorLog = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    status: err.status || 500,
    message: err.message,
    stack: err.stack,
  };

  // Log to file
  const errorLogStream = fs.createWriteStream(
    path.join(logsDir, 'error.log'),
    { flags: 'a' }
  );
  errorLogStream.write(JSON.stringify(errorLog) + '\n');
  errorLogStream.end();

  // Log to console
  console.error('[ERROR]', errorLog);

  // Send error response
  res.status(errorLog.status).json({
    error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
  });
});

// Initialize database and start server
const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    logger.info('Database connection established successfully', { event: 'DB_CONNECT' });

    // NOTE: Database schema is managed via migrations
    // Run migrations with: npm run migrate
    // In development, you can use sync for quick prototyping (uncomment below)
    // await sequelize.sync({ alter: true });
    // logger.info('Database synchronized successfully', { event: 'DB_SYNC' });

    // Start server
    app.listen(PORT, () => {
      logger.info(`Server started successfully`, {
        event: 'SERVER_START',
        port: PORT,
        environment: process.env.NODE_ENV || 'development',
        url: `http://localhost:${PORT}`,
      });

      console.log(`\n[SERVER] running on http://localhost:${PORT}`);
      console.log(`[API] endpoints available at http://localhost:${PORT}/api/notes`);
      console.log(`[DOCS] Swagger documentation at http://localhost:${PORT}/api-docs`);
      console.log(`[HEALTH] Health check at http://localhost:${PORT}/health`);
      console.log(`[LOGS] Log files available in: ${logger.getLogsDir()}\n`);
    });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    logger.error('Failed to start server', error, { event: 'STARTUP_FAILURE' });
    process.exit(1);
  }
};

startServer();

export default app;
