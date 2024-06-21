import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BlacklistService } from 'src/auth/blacklist.service';
import { Task } from 'src/entities/task.entity';
import { ProxyModule } from 'src/proxy/proxy.module';
import { TenantService } from 'src/tenant/tenant.service';
import { UsersService } from 'src/users/users.service';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), ProxyModule, AuthModule],
  controllers: [TasksController],
  providers: [TasksService, BlacklistService, UsersService, TenantService],
  exports: [TasksService],
})
export class TasksModule {}
