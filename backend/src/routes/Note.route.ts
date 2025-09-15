import { Router } from 'express';
import { NoteController } from '../controllers/Note.controller';

export class NoteRoute {
  public path = '/api/notes';
  public router = Router();
  private controller = new NoteController();

  constructor() { this.init(); }

  private init(): void {
    this.router.get('/', this.controller.list);
    this.router.get('/:id', this.controller.get);
    this.router.post('/', this.controller.create);
    this.router.delete('/:id', this.controller.delete);
  }
}
