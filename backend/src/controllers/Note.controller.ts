import { RequestHandler } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NoteService } from '../services/Note.service';
import { CreateNoteDto } from '../dto/note.dto';
import { formatErrors } from '../helpers/formatErrors';

export class NoteController {
  private service = new NoteService();

  list: RequestHandler = async (_req, res) => {
    const notes = await this.service.getAll();
    return res.json(notes);
  };

  get: RequestHandler = async (req, res) => {
    const id = Number(req.params.id);
    const note = await this.service.getOne(id);
    if (!note) return res.status(404).json({ message: 'Not found' });
    return res.json(note);
  };

  create: RequestHandler = async (req, res) => {
    const dto = plainToInstance(CreateNoteDto, req.body);
    const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
    if (errors.length) {
      return res.status(400).json({
        message: 'Validation error',
        details: formatErrors(errors),
      });
    }
    const created = await this.service.create(dto);
    return res.status(201).json(created);
  };

  delete: RequestHandler = async (req, res) => {
    const id = Number(req.params.id);
    const ok = await this.service.remove(id);
    if (!ok) return res.status(404).json({ message: 'Not found' });
    return res.status(204).send();
  };
}
