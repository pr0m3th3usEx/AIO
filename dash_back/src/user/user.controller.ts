import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/local/jwt-auth.guard';
import { UserDec } from 'src/utils/user.decorator';
import {
  ChangePasswordDto,
  CleanedUser,
  PasswordChangeConfirmation,
} from './user.dto';
import { UserService } from './user.service';

@Controller('/api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@UserDec() user: User): Promise<CleanedUser> {
    return this.userService.cleanUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('changepassword')
  async changePassword(
    @UserDec() user: User,
    @Body() dto: ChangePasswordDto,
  ): Promise<PasswordChangeConfirmation> {
    return this.userService.changePassword(user, dto);
  }
}
