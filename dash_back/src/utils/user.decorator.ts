import { User } from '.prisma/client';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserDec = createParamDecorator(
  (
    data: unknown,
    ctx: ExecutionContext,
  ): Pick<User, 'password' | 'created_at' | 'updated_at'> => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
