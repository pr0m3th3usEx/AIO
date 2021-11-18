import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AccessToken, AuthService } from './auth.service';
import { JwtAuthGuard } from './local/jwt-auth.guard';
import { LocalAuthGuard } from './local/local-auth.guard';

import { IsString, IsEmail, Length, MinLength } from 'class-validator';
import { Match } from 'src/utils/match.decorator';
import { User } from '.prisma/client';
import { UserDec } from 'src/utils/user.decorator';

export class UserRegistrationDto {
  @IsString()
  @Length(2, 20, {
    message: 'Username should contain between 2 and 20 characters',
  })
  username: string;

  @IsEmail({}, { message: 'E-mail format is not valid' })
  email: string;

  @MinLength(8, { message: 'Password is too short (min. 8 characters)' })
  password: string;

  @Match('password', { message: 'Password does not match' })
  rePassword: string;
}

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<AccessToken> {
    return this.authService.login(req.user);
  }

  @HttpCode(201)
  @Post('register')
  async register(
    @Body() body: UserRegistrationDto,
  ): Promise<Pick<User, 'id' | 'username' | 'email'>> {
    return this.authService.register(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@UserDec() user): Promise<Pick<User, 'id' | 'username' | 'email'>> {
    return user;
  }
}
