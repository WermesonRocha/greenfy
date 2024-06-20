import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum TaskStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.PENDING })
  status: TaskStatus;
}
