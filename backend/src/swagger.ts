import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Notes Platform API',
      version: '1.0.0',
      description: 'A simple REST API for managing notes with CRUD operations',
      contact: {
        name: 'Notes Platform',
        email: 'support@notesplatform.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: 'http://localhost:5000',
        description: 'Production server',
      },
    ],
    components: {
      schemas: {
        Note: {
          type: 'object',
          required: ['title', 'content'],
          properties: {
            id: {
              type: 'integer',
              description: 'Note ID',
              example: 1,
            },
            title: {
              type: 'string',
              description: 'Note title',
              example: 'My First Note',
              minLength: 1,
            },
            content: {
              type: 'string',
              description: 'Note content',
              example: 'This is the content of my note',
              minLength: 1,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
              example: '2025-11-03T12:00:00.000Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp',
              example: '2025-11-03T12:00:00.000Z',
            },
          },
        },
        NoteInput: {
          type: 'object',
          required: ['title', 'content'],
          properties: {
            title: {
              type: 'string',
              description: 'Note title',
              example: 'New Note',
              minLength: 1,
            },
            content: {
              type: 'string',
              description: 'Note content',
              example: 'Note content here',
              minLength: 1,
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message',
              example: 'Note not found',
            },
          },
        },
        ValidationError: {
          type: 'object',
          properties: {
            error: {
              type: 'array',
              description: 'Validation errors',
              items: {
                type: 'object',
                properties: {
                  path: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                  message: {
                    type: 'string',
                  },
                  code: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
        },
        NotFoundError: {
          description: 'Resource not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
        ValidationErrorResponse: {
          description: 'Validation error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ValidationError',
              },
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes.ts'], // Path to API routes with JSDoc comments
};

export const swaggerSpec = swaggerJsdoc(options);
