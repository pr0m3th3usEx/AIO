import { User } from '.prisma/client';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import {
  ChangePasswordDto,
  CleanedUser,
  PasswordChangeConfirmation,
} from './user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  cleanUser(user: User): CleanedUser {
    const { password, ...cleanUser } = user;

    return cleanUser;
  }

  async changePassword(
    user: User,
    dto: ChangePasswordDto,
  ): Promise<PasswordChangeConfirmation> {
    if (!(await bcrypt.compare(dto.oldPassword, user.password))) {
      throw new UnauthorizedException('Current password invalid');
    }
    const password = await bcrypt.hash(dto.newPassword, 10);

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password,
      },
    });
    return { passwordChanged: true };
  }
}
