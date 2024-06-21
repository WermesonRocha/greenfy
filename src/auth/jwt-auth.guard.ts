import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { BlacklistService } from './blacklist.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly blacklistService: BlacklistService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {
    super();
  }

  // @ts-ignore
  async handleRequest(err, user, info, context) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    const tenantId = request.headers['x-tenant-id'];

    if (err) throw err;
    if (!user)
      throw new UnauthorizedException('Invalid token or session expired');
    if (!authHeader) {
      throw new HttpException(
        'Authorization header missing',
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = authHeader.split(' ')[1];
    if (!token)
      throw new HttpException('Token missing', HttpStatus.BAD_REQUEST);

    if (await this.blacklistService.isBlacklisted(token))
      throw new UnauthorizedException('Token has been invalidated');

    let decodedToken;
    try {
      decodedToken = this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token or session expired');
    }

    const userId = decodedToken.sub;
    const userFromDb = await this.usersService.findOne(tenantId, userId);
    if (!userFromDb) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}
