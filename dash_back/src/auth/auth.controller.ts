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
import {
  ApiBadRequestResponse,
  ApiProperty,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export class UserRegistrationDto {
  @ApiProperty()
  @IsString()
  @Length(2, 20, {
    message: 'Username should contain between 2 and 20 characters',
  })
  username: string;

  @ApiProperty()
  @IsEmail({}, { message: 'E-mail format is not valid' })
  email: string;

  @ApiProperty()
  @MinLength(8, { message: 'Password is too short (min. 8 characters)' })
  password: string;

  @ApiProperty()
  @Match('password', { message: 'Password does not match' })
  rePassword: string;
}

@ApiTags('auth')
@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({
    status: 200,
    description: 'Allow authenticatation user through JWT Token',
  })
  @ApiUnauthorizedResponse({ description: 'Bad credentials' })
  @ApiBadRequestResponse({ description: 'Missing or invalid fields' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<AccessToken> {
    return this.authService.login(req.user);
  }

  @ApiResponse({
    status: 201,
    description: 'Register user and give him a JWT token',
  })
  @ApiBadRequestResponse({ description: 'Bad information given' })
  @HttpCode(201)
  @Post('register')
  async register(@Body() body: UserRegistrationDto): Promise<AccessToken> {
    return this.authService.register(body);
  }
}
