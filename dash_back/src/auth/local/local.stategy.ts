import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { User } from '.prisma/client';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password' | 'created_at' | 'updated_at'>> {
    const user = this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
