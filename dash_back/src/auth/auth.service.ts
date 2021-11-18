import { User } from '.prisma/client';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserRegistrationDto } from './auth.controller';

export type JwtPayload = {
  id: string;
  username: string;
  email: string;
};

export type AccessToken = {
  access_token: string;
};

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<User | undefined> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (user.password == password) {
        return user;
      }
    } catch (err) {
      return undefined;
    }

    return undefined;
  }

  async register(dto: UserRegistrationDto): Promise<User> {
    try {
      const user = await this.prisma.user.create({
        data: {
          username: dto.username,
          email: dto.email,
          password: dto.password,
          is_admin: false,
        },
      });

      return user;
    } catch (err) {
      throw new BadRequestException('User already exists');
    }
  }

  async login(
    user: Pick<User, 'id' | 'username' | 'email'>,
  ): Promise<AccessToken> {
    const payload: JwtPayload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
