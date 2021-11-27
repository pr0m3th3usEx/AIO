import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ServiceModule } from './services/service.module';
import { UserModule } from './user/user.module';
import { WidgetModule } from './widget/widget.module';

@Module({
  imports: [AuthModule, UserModule, WidgetModule, ServiceModule],
  controllers: [AppController],
})
export class AppModule {}
