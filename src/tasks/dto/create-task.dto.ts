import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatus } from 'src/entities/task.entity';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsEnum(TaskStatus, { message: 'Status must be PENDING or COMPLETED' })
  status: TaskStatus;
}
