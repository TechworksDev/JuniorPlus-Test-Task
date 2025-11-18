import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import notesRoutes from './routes/notes.routes';
import { logger } from './middlewares/logger';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(logger);

// Swagger config
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Notes API',
            version: '1.0.0',
            description: 'API для управления заметками',
            contact: {
                name: 'Bekassyl',
                email: 'bekasyl0101@gmail.com'
            },
            license: { name: 'MIT', url: 'https://opensource.org/licenses/MIT' }
        },
        servers: [
            { url: 'http://localhost:3000', description: 'Development server' }
        ],
        components: {
            schemas: {
                Note: {
                    type: 'object',
                    required: ['id', 'name'],
                    properties: {
                        id: { type: 'string', format: 'uuid', example: '123e4567-e89b-12d3-a456-426614174000' },
                        name: { type: 'string', example: 'Моя заметка' },
                        content: { type: 'string', example: 'Текст заметки' }
                    }
                },
                CreateNoteDTO: {
                    type: 'object',
                    required: ['name'],
                    properties: {
                        name: { type: 'string', example: 'Новая заметка' },
                        content: { type: 'string', example: 'Текст...' }
                    }
                }
            }
        }
    },
    apis: ['./dist/routes/*.js'], //
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Notes API Documentation'
}));

app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('/api/notes', notesRoutes);

app.use(errorHandler);

export default app;
