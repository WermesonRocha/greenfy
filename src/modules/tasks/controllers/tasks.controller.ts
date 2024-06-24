import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { TaskDto } from '../dtos/task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { TasksService } from '../services/tasks.service';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll(@Request() req): Promise<TaskDto[]> {
    const { status } = req.query;
    return this.tasksService.findAll(req.tenantId, req.user.id, status);
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Request() req): Promise<TaskDto> {
    return this.tasksService.findOne(req.tenantId, id, req.user.id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @Request() req,
  ): Promise<TaskDto> {
    return this.tasksService.create(req.tenantId, createTaskDto, req.user);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async update(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req,
  ): Promise<void> {
    return this.tasksService.update(
      req.tenantId,
      id,
      updateTaskDto,
      req.user.id,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req): Promise<void> {
    return this.tasksService.remove(req.tenantId, id, req.user.id);
  }
}
