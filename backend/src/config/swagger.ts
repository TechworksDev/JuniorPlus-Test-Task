import swaggerJsdoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Notes Platform API",
    version: "1.0.0",
    description: "API documentation for Notes Platform",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
  components: {
    schemas: {
      Note: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            description: "Note ID",
            example: 1,
          },
          title: {
            type: "string",
            description: "Note title",
            example: "My First Note",
          },
          content: {
            type: "string",
            description: "Note content",
            example: "This is the content of my note",
            nullable: true,
          },
          created_at: {
            type: "string",
            format: "date-time",
            description: "Creation timestamp",
          },
          updated_at: {
            type: "string",
            format: "date-time",
            description: "Last update timestamp",
          },
        },
      },
      CreateNoteDto: {
        type: "object",
        required: ["title"],
        properties: {
          title: {
            type: "string",
            description: "Note title",
            example: "My First Note",
            minLength: 1,
            maxLength: 255,
          },
          content: {
            type: "string",
            description: "Note content",
            example: "This is the content of my note",
          },
        },
      },
      UpdateNoteDto: {
        type: "object",
        properties: {
          title: {
            type: "string",
            description: "Note title",
            example: "Updated Note Title",
            minLength: 1,
            maxLength: 255,
          },
          content: {
            type: "string",
            description: "Note content",
            example: "Updated note content",
          },
        },
      },
      Error: {
        type: "object",
        properties: {
          error: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Error message",
              },
            },
          },
        },
      },
    },
  },
  tags: [
    {
      name: "Notes",
      description: "Operations related to notes",
    },
  ],
};

const options = {
  definition: swaggerDefinition,
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
