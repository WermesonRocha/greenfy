import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../../modules/users/services/users.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    tenantId: string,
    email: string,
    password: string,
  ): Promise<any> {
    const user = await this.usersService.findByEmail(tenantId, email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(payload: JwtPayload) {
    return { access_token: this.jwtService.sign(payload) };
  }
}
