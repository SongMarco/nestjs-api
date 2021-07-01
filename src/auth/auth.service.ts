import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { comparePassword } from '../users/users.utils';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginId: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(loginId);

    const isPasswordCorrect = await comparePassword(password, user?.password);

    if (user && isPasswordCorrect) {
      const { password, ...result } = user;
      // return user except password
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.loginId, sub: user.id };
    console.log('login-> payload', payload);
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
