import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { JWT_SECRET } from 'src/config';
import { JwtPayload } from '../auth.service';
import { User } from '.prisma/client';
import { CleanedUser } from 'src/user/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    return this.prisma.user
      .findUnique({ where: { id: payload.id }, rejectOnNotFound: true })
      .catch(() => Promise.reject(new UnauthorizedException()));
  }
}
