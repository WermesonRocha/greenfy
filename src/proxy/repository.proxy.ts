import { Injectable } from '@nestjs/common';
import { TenantService } from 'src/tenant/tenant.service';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class RepositoryProxy<T> {
  private repositoryMap: Map<string, Repository<T>> = new Map();

  constructor(
    private readonly tenantService: TenantService,
    private readonly entity: any,
    private readonly dataSource: DataSource,
  ) {}

  private async getRepository(tenantId: string): Promise<Repository<T>> {
    if (this.repositoryMap.has(tenantId)) {
      return this.repositoryMap.get(tenantId);
    }

    const connection = await this.tenantService.getTenantConnection(tenantId);
    const repository = connection.getRepository<T>(this.entity);
    this.repositoryMap.set(tenantId, repository);

    return repository;
  }

  async perform(
    tenantId: string,
    method: keyof Repository<T>,
    ...args: any[]
  ): Promise<any> {
    const repository = await this.getRepository(tenantId);
    // @ts-ignore
    return repository[method](...args);
  }
}
