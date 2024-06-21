import { Injectable } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';

@Injectable()
export class TenantService {
  private dataSourceMap: Map<string, DataSource> = new Map();

  private createDataSource(tenantId: string): DataSourceOptions {
    return {
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: `${process.env.DB_PREFIX}_${tenantId}`,
      entities: [__dirname + '../../**/*.entity{.ts,.js}'],
      synchronize: true,
      extra: { authPlugin: 'mysql_native_password' },
    };
  }

  public async getTenantConnection(tenantId: string): Promise<DataSource> {
    if (this.dataSourceMap.has(tenantId)) {
      const existingDataSource = this.dataSourceMap.get(tenantId);
      if (existingDataSource.isInitialized) {
        return existingDataSource;
      }
      await existingDataSource.initialize();
      return existingDataSource;
    }

    const newDataSource = new DataSource(this.createDataSource(tenantId));
    await newDataSource.initialize();
    this.dataSourceMap.set(tenantId, newDataSource);
    return newDataSource;
  }
}
