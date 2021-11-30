import { User } from '.prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

export type CleanedUser = Omit<User, 'password'>;

export class ChangePasswordDto {
  @ApiProperty()
  @MinLength(8, { message: 'Password is too short (min. 8 characters)' })
  oldPassword: string;

  @ApiProperty()
  @MinLength(8, { message: 'Password is too short (min. 8 characters)' })
  newPassword: string;
}

export type PasswordChangeConfirmation = {
  passwordChanged: boolean;
};
