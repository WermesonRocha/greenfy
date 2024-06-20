import { Inject, Injectable } from '@nestjs/common';
import { Redis as RedisClient } from 'ioredis';

@Injectable()
export class BlacklistService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClient,
  ) {}

  async add(token: string) {
    const expiresIn = 3600;
    await this.redisClient.set(
      token,
      'blacklisted',
      'EX',
      parseInt(process.env.JWT_EXPIRES_IN, 10) || expiresIn,
    );
  }

  async isBlacklisted(token: string): Promise<boolean> {
    const result = await this.redisClient.get(token);
    return result === 'blacklisted';
  }

  async getBlacklist() {
    return await this.redisClient.get('blacklisted');
  }
}
