import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task, TaskStatus } from 'src/entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async findAll(status?: TaskStatus): Promise<Task[]> {
    if (status) {
      return this.tasksRepository.find({ where: { status } });
    }
    return this.tasksRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    return this.tasksRepository.findOneBy({ id });
  }

  async create(task: Partial<Task>): Promise<Task> {
    const newTask = this.tasksRepository.create(task);
    return this.tasksRepository.save(newTask);
  }

  async update(id: number, task: Partial<Task>): Promise<void> {
    await this.tasksRepository.update(id, task);
  }

  async remove(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}
