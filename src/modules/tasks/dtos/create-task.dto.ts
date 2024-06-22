import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TaskStatus } from 'src/entities/task.entity';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(TaskStatus, { message: 'Status must be PENDING or COMPLETED' })
  status: TaskStatus;
}
