import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from 'src/auth/local/jwt.stategy';
import { JWT_SECRET } from 'src/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    AuthModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [UserService, JwtStrategy, PrismaService],
  controllers: [UserController],
})
export class UserModule {}
