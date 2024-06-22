import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from 'src/entities/task.entity';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsEnum(TaskStatus, { message: 'Status must be PENDING or COMPLETED' })
  status: TaskStatus;
}
