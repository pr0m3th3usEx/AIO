import { User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CleanedUser } from './user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async cleanUser(user: User): Promise<CleanedUser> {
    const { password, ...cleanUser } = user;

    return cleanUser;
  }
}
