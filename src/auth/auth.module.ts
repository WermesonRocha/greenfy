import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RedisModule } from 'src/configs/redis/redis.module';
import { TenantService } from 'src/tenant/tenant.service';
import { UsersModule } from '../modules/users/users.module';
import { BlacklistService } from './blacklist/blacklist.service';
import { AuthController } from './controllers/auth.controller';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Global()
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    RedisModule.forRoot(),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    BlacklistService,
    JwtAuthGuard,
    TenantService,
  ],
  controllers: [AuthController],
  exports: [AuthService, BlacklistService, JwtAuthGuard, JwtModule],
})
export class AuthModule {}
