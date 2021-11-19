import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/local/jwt.stategy';
import { JWT_SECRET } from 'src/config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ServiceModule } from 'src/services/service.module';
import { UserModule } from 'src/user/user.module';
import { WidgetController } from './widget.controller';
import { WidgetService } from './widget.service';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
  ],
  controllers: [WidgetController, ServiceModule],
  providers: [WidgetService, JwtStrategy],
  exports: [WidgetService],
})
export class WidgetModule {}
