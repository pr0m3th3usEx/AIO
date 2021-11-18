import { User } from '.prisma/client';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserRegistrationDto } from './auth.controller';
import * as bcrypt from 'bcrypt';

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

      if (await bcrypt.compare(password, user.password)) {
        return user;
      }
    } catch (err) {
      return undefined;
    }

    return undefined;
  }

  async register(
    dto: UserRegistrationDto,
  ): Promise<Omit<User, 'password' | 'created_at' | 'updated_at'>> {
    const password = await bcrypt.hash(dto.password, 10);

    try {
      const user = await this.prisma.user.create({
        data: {
          username: dto.username,
          email: dto.email,
          password,
          is_admin: false,
        },
      });

      return user;
    } catch (err) {
      throw new BadRequestException('User already exists');
    }
  }

  async login(
    user: Omit<User, 'is_admin' | 'password' | 'created_at' | 'updated_at'>,
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
