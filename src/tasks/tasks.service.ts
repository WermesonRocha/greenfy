import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Task } from 'src/entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async findAll(userId: number): Promise<TaskDto[]> {
    const tasks = await this.tasksRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
    return tasks.map((task) => plainToInstance(TaskDto, task));
  }

  async findOne(id: number, userId: number): Promise<TaskDto> {
    const task = await this.tasksRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['user'],
    });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found for user`);
    }
    return plainToInstance(TaskDto, task);
  }

  async create(createTaskDto: CreateTaskDto, user): Promise<TaskDto> {
    const task = this.tasksRepository.create({
      ...createTaskDto,
      user,
    });
    const savedTask = await this.tasksRepository.save(task);
    return plainToInstance(TaskDto, savedTask);
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
    userId: number,
  ): Promise<void> {
    const task = await this.findOne(id, userId);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found for user`);
    }
    await this.tasksRepository.update({ id }, { ...updateTaskDto });
  }

  async remove(id: number, userId: number): Promise<void> {
    const task = await this.findOne(id, userId);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found for user`);
    }
    await this.tasksRepository.delete(id);
  }
}
