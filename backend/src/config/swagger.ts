import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Notes Platform API',
      version: '1.0.0',
      description: 'API для платформы заметок',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Note: {
          type: 'object',
          required: ['id', 'title', 'content', 'created_at', 'updated_at'],
          properties: {
            id: {
              type: 'integer',
              description: 'Уникальный идентификатор заметки',
            },
            title: {
              type: 'string',
              description: 'Заголовок заметки',
              maxLength: 255,
            },
            content: {
              type: 'string',
              description: 'Содержимое заметки',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Дата создания',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Дата последнего обновления',
            },
          },
        },
        CreateNoteRequest: {
          type: 'object',
          required: ['title'],
          properties: {
            title: {
              type: 'string',
              description: 'Заголовок заметки',
              maxLength: 255,
            },
            content: {
              type: 'string',
              description: 'Содержимое заметки',
            },
          },
        },
        UpdateNoteRequest: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'Заголовок заметки',
              maxLength: 255,
            },
            content: {
              type: 'string',
              description: 'Содержимое заметки',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'fail',
            },
            message: {
              type: 'string',
              example: 'Error description',
            },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: { type: 'string' },
                  message: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

export const specs = swaggerJSDoc(options);