import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { JWT_SECRET } from 'src/config';
import { JwtPayload } from '../auth.service';
import { User } from '.prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(
    payload: JwtPayload,
  ): Promise<Pick<User, 'id' | 'username' | 'email'>> {
    return {
      id: payload.id,
      username: payload.username,
      email: payload.email,
    };
  }
}
