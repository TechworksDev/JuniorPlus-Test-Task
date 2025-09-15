import { Repository } from 'typeorm';
import { db } from '../appDataSource';
import { Note } from '../entities/Note.entity';

export class NoteRepository {
  private readonly repo: Repository<Note>;

  constructor() {
    this.repo = db.getRepository(Note);
  }

  findAll(): Promise<Note[]> {
    return this.repo.find({ order: { created: 'DESC' } });
  }

  findById(id: number): Promise<Note | null> {
    return this.repo.findOneBy({ id });
  }

  create(note: Pick<Note, 'title' | 'text'>): Promise<Note> {
    const entity = this.repo.create(note);
    return this.repo.save(entity);
  }

  async delete(id: number): Promise<boolean> {
    const res = await this.repo.delete({ id });
    return (res.affected ?? 0) > 0;
  }
}
