import prisma from "../database/db";
import { Prisma } from "@prisma/client";
import { AppError } from "../middlewares/errorHandlers";
import { HttpStatus } from "../utils/httpStatus";

export type Note = Awaited<ReturnType<typeof prisma.note.create>>;

export const NotesRepo = {
  async getAll(): Promise<Note[]> {
    return prisma.note.findMany({ orderBy: { createdAt: "desc" } });
  },

  async create(title: string, content: string): Promise<Note> {
    return prisma.note.create({
      data: { title, content },
    });
  },

  async delete(id: string): Promise<Note> {
    try {
      return await prisma.note.delete({ where: { id } });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2025"
      ) {
        throw new AppError(`Note with id=${id} not found`, HttpStatus.NOT_FOUND);
      }
      throw err;
    }
  },

  async getById(id: string): Promise<Note | null> {
    return prisma.note.findUnique({ where: { id } });
  },

  async update(id: string, title: string, content: string): Promise<Note> {
    try {
      return await prisma.note.update({
        where: { id },
        data: { title, content },
      });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2025"
      ) {
        throw new AppError(`Note with id=${id} not found`, HttpStatus.NOT_FOUND);
      }
      throw err;
    }
  },
};
