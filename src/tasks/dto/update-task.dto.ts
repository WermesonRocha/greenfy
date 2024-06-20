import { IsOptional, IsEnum } from 'class-validator';
import { TaskStatus } from 'src/entities/task.entity';

export class UpdateTaskDto {
  @IsOptional()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  @IsEnum(TaskStatus, { message: 'Status must be PENDING or COMPLETED' })
  status: TaskStatus;
}
