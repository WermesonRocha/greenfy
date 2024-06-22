import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { ProxyModule } from 'src/proxy/proxy.module';
import { TenantService } from 'src/tenant/tenant.service';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ProxyModule],
  providers: [UsersService, TenantService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
