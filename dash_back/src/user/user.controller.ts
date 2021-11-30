import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/local/jwt-auth.guard';
import { UserDec } from 'src/utils/user.decorator';
import {
  ChangePasswordDto,
  CleanedUser,
  PasswordChangeConfirmation,
} from './user.dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('/api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiResponse({
    status: 200,
    description: 'Get information about authenticated user',
  })
  @ApiUnauthorizedResponse({ description: 'User not authenticated' })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@UserDec() user: User): Promise<CleanedUser> {
    return this.userService.cleanUser(user);
  }

  @ApiResponse({
    status: 200,
    description: 'The passwrd has been updated successfully',
  })
  @ApiUnauthorizedResponse({ description: 'User not authenticated' })
  @UseGuards(JwtAuthGuard)
  @Post('changepassword')
  async changePassword(
    @UserDec() user: User,
    @Body() dto: ChangePasswordDto,
  ): Promise<PasswordChangeConfirmation> {
    return this.userService.changePassword(user, dto);
  }
}
