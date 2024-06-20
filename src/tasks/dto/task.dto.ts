import { Exclude, Expose, Type } from 'class-transformer';
import { UserDto } from '../../users/dto/user.dto';

@Exclude()
export class TaskDto {
  @Expose() id: number;
  @Expose() title: string;
  @Expose() description: string;
  @Expose() status: string;
  @Expose() createdAt: Date;
  @Expose() updatedAt: Date;

  @Expose()
  @Type(() => UserDto)
  user: UserDto;
}
