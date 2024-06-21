import { Module } from '@nestjs/common';
import { Task } from 'src/entities/task.entity';
import { User } from 'src/entities/user.entity';
import { TenantService } from 'src/tenant/tenant.service';
import { DataSource } from 'typeorm';
import { RepositoryProxy } from './repository.proxy';

@Module({
  providers: [
    TenantService,
    {
      provide: 'UserRepositoryProxy',
      useFactory: (tenantService: TenantService, dataSource: DataSource) =>
        new RepositoryProxy<User>(tenantService, User, dataSource),
      inject: [TenantService, DataSource],
    },
    {
      provide: 'TaskRepositoryProxy',
      useFactory: (tenantService: TenantService, dataSource: DataSource) =>
        new RepositoryProxy<Task>(tenantService, Task, dataSource),
      inject: [TenantService, DataSource],
    },
  ],
  exports: ['UserRepositoryProxy', 'TaskRepositoryProxy'],
})
export class ProxyModule {}
