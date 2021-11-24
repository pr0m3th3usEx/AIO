import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local/local.stategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './local/jwt.stategy';
import { JWT_SECRET } from 'src/config';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
