import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Request() req): Promise<UserDto[]> {
    return this.usersService.findAll(req.tenantId);
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Request() req): Promise<UserDto> {
    return this.usersService.findOne(req.tenantId, id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(
    @Body() createUserDto: CreateUserDto,
    @Request() req,
  ): Promise<UserDto> {
    return this.usersService.create(req.tenantId, createUserDto);
  }
}
