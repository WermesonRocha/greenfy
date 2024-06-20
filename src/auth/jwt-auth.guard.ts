import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { BlacklistService } from './blacklist.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly blacklistService: BlacklistService,
  ) {
    super();
  }

  // @ts-ignore
  async handleRequest(err, user, info, context) {
    if (err || !user) {
      throw (
        err || new UnauthorizedException('Invalid token or session expired')
      );
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new HttpException(
        'Authorization header missing',
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new HttpException('Token missing', HttpStatus.BAD_REQUEST);
    }

    if (token && (await this.blacklistService.isBlacklisted(token))) {
      throw new UnauthorizedException('Token has been invalidated');
    }

    return user;
  }
}
