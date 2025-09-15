import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";


@Entity('notes')
export class Note {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 250 })
  title!: string;

  @Column({ type: 'text' })
  text!: string;

  @CreateDateColumn()
  created!: Date;
}
