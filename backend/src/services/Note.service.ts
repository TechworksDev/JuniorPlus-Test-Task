import { Note } from '../entities/Note.entity';
import { NoteRepository } from '../repository/Note.repository';

export class NoteService {
  constructor(private readonly repo = new NoteRepository()) {}

  getAll(): Promise<Note[]> {
    return this.repo.findAll();
  }

  getOne(id: number): Promise<Note | null> {
    return this.repo.findById(id);
  }

  create(data: Pick<Note, 'title' | 'text'>): Promise<Note> {
    return this.repo.create({ title: data.title, text: data.text });
  }

  remove(id: number): Promise<boolean> {
    return this.repo.delete(id);
  }
}
