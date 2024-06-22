import { DynamicModule, Global, Module } from '@nestjs/common';
import Redis, { Redis as RedisClient } from 'ioredis';

@Global()
@Module({})
export class RedisModule {
  static forRoot(): DynamicModule {
    const redisProvider = {
      provide: 'REDIS_CLIENT',
      useFactory: (): RedisClient => {
        const redisClient = new Redis({
          host: process.env.REDIS_HOST || 'localhost',
          port: parseInt(process.env.REDIS_PORT, 10) || 6379,
          password: process.env.REDIS_PASSWORD || '',
          db: parseInt(process.env.REDIS_DB, 10) || 0,
        });

        redisClient.on('connect', () => console.log('Connected to Redis'));

        redisClient.on('error', (err) => console.error('Redis error:', err));

        return redisClient;
      },
    };

    return {
      module: RedisModule,
      providers: [redisProvider],
      exports: [redisProvider],
    };
  }
}
