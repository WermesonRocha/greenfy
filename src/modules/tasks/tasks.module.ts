import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BlacklistService } from 'src/auth/blacklist/blacklist.service';
import { Task } from 'src/entities/task.entity';
import { UsersService } from 'src/modules/users/services/users.service';
import { ProxyModule } from 'src/proxy/proxy.module';
import { TenantService } from 'src/tenant/tenant.service';
import { TasksController } from './controllers/tasks.controller';
import { TasksService } from './services/tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), ProxyModule, AuthModule],
  controllers: [TasksController],
  providers: [TasksService, BlacklistService, UsersService, TenantService],
  exports: [TasksService],
})
export class TasksModule {}
