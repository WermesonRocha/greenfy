import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BlacklistService } from './auth/blacklist.service';
import { TenantMiddleware } from './middlewares/tenant.middleware';
import { ProxyModule } from './proxy/proxy.module';
import { MyRedisModule } from './redis/redis.module';
import { TasksModule } from './tasks/tasks.module';
import { TenantService } from './tenant/tenant.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      extra: { authPlugin: 'mysql_native_password' },
    }),
    TasksModule,
    UsersModule,
    AuthModule,
    MyRedisModule.forRoot(),
    ProxyModule,
  ],
  controllers: [AppController],
  providers: [AppService, BlacklistService, TenantService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
