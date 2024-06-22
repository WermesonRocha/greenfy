import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/entities/user.entity';
import { RepositoryProxy } from 'src/proxy/repository.proxy';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserDto } from '../dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserRepositoryProxy')
    private readonly repositoryProxy: RepositoryProxy<User>,
  ) {}

  async findAll(tenantId: string): Promise<UserDto[]> {
    const users = await this.repositoryProxy.perform(tenantId, 'find');
    return users.map((user) => plainToInstance(UserDto, user));
  }

  async findOne(tenantId: string, id: number): Promise<UserDto> {
    const user = await this.repositoryProxy.perform(tenantId, 'findOneBy', {
      id,
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return plainToInstance(UserDto, user);
  }

  async findByEmail(tenantId: string, email: string): Promise<User> {
    return this.repositoryProxy.perform(tenantId, 'findOneBy', { email });
  }

  async create(
    tenantId: string,
    createUserDto: CreateUserDto,
  ): Promise<UserDto> {
    const { password, ...userData } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await this.repositoryProxy.perform(tenantId, 'create', {
      ...userData,
      password: hashedPassword,
    });
    const savedUser = await this.repositoryProxy.perform(
      tenantId,
      'save',
      newUser,
    );
    return plainToInstance(UserDto, savedUser);
  }
}
