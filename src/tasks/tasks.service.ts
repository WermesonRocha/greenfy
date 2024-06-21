import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Task } from 'src/entities/task.entity';
import { RepositoryProxy } from 'src/proxy/repository.proxy';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TaskRepositoryProxy')
    private readonly repositoryProxy: RepositoryProxy<Task>,
  ) {}

  async findAll(tenantId: string, userId: number): Promise<TaskDto[]> {
    const tasks = await this.repositoryProxy.perform(tenantId, 'find', {
      where: { user: { id: userId } },
      relations: ['user'],
    });
    return tasks.map((task) => plainToInstance(TaskDto, task));
  }

  async findOne(
    tenantId: string,
    id: number,
    userId: number,
  ): Promise<TaskDto> {
    const task = await this.repositoryProxy.perform(tenantId, 'findOne', {
      where: { id, user: { id: userId } },
      relations: ['user'],
    });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found for user`);
    }
    return plainToInstance(TaskDto, task);
  }

  async create(
    tenantId: string,
    createTaskDto: CreateTaskDto,
    user,
  ): Promise<TaskDto> {
    const task = await this.repositoryProxy.perform(tenantId, 'create', {
      ...createTaskDto,
      user,
    });
    const savedTask = await this.repositoryProxy.perform(
      tenantId,
      'save',
      task,
    );
    return plainToInstance(TaskDto, savedTask);
  }

  async update(
    tenantId: string,
    id: number,
    updateTaskDto: UpdateTaskDto,
    userId: number,
  ): Promise<void> {
    const task = await this.findOne(tenantId, id, userId);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found for user`);
    }
    await this.repositoryProxy.perform(
      tenantId,
      'update',
      { id },
      { ...updateTaskDto },
    );
  }

  async remove(tenantId: string, id: number, userId: number): Promise<void> {
    const task = await this.findOne(tenantId, id, userId);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found for user`);
    }
    await this.repositoryProxy.perform(tenantId, 'delete', id);
  }
}
